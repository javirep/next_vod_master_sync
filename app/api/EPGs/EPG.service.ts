import axios from 'axios'
import { RokuEPG, FrequencyEPG, AmazonEPGSchedule, Program, LiveFeed } from '@/app/models/ProgramModel';
import convert from 'xml-js'
import { parse, toSeconds } from "iso8601-duration"

export const getRokuEPG = async (url) => {
    const RokuTimeDif = Number(process.env.NEXT_ROKU_TIME_DIF) || 5
    try{
        const response = await axios.get(
                url
            );

        const data: RokuEPG = response.data
        const liveFeed = data.liveFeeds[0]
        const movies = {}
        const series = data.series
        const tvSpecials = {}

        const feeds: LiveFeed[] = [];
        
        data.movies.forEach(movie => {
            movies[movie.id] = movie
        })

        data.tvSpecials.forEach(tvSpecial => {
            tvSpecials[tvSpecial.id] = tvSpecial
        })

        liveFeed.content.schedule.forEach(
            (feed) => {
                let program: Program | null = null;
                if (!program) program = getShowFromRokuMovies(feed.id, movies)
                if (!program) program = getShowFromRokuSeries(feed.id, series);
                if (!program) program = getShowFromTvSpecials(feed.id, tvSpecials);

                feed.times.forEach( time => {
                    let startDate = new Date(feed.date + 'T' + time)
                    startDate.setHours(startDate.getHours() - RokuTimeDif );

                    feeds.push({             
                        id: feed.id,
                        program: program ? program : { } as Program ,
                        date: startDate.toISOString().split("T")[0],
                        startTime: startDate.toISOString().split("T")[1],
                        duration: feed.durationInSeconds
                    })
                })
        })

        return feeds.sort((a, b) => {
            const dateA = new Date(a.date + 'T' + a.startTime);
            const dateB = new Date(b.date + 'T' + b.startTime);
            return dateA.getTime() - dateB.getTime();
        });
        
    } catch (error) {
        console.error('Error fetching data:', error);
        return []
    }
}

const getShowFromRokuMovies = (id: string, rokuMovies) => {
    
    const rokuShow = rokuMovies[id];
    
    if (rokuShow) {
        return {
            title: rokuShow.title,
            subtitle: "",
            description: rokuShow.shortDescription,
            thumbnails: {
                default: rokuShow.thumbnail,
                textless: "",
                texted: ''
            }
        };
    }
    
    return null;
}

const getShowFromRokuSeries = (id: string, rokuSeries) => {

    let program: Program | null = null
    
    rokuSeries.forEach((series) => {
        const seasons = series.seasons
        
        seasons.forEach((season) => {
            const episodes = season.episodes;
            
            const episode = episodes.find((ep) => ep.id == id);

            if (episode) {

                program = {
                    title: series.title,
                    subtitle: `S${season.seasonNumber} E${episode.episodeNumber} - ${episode.title}`,
                    description: episode.shortDescription,
                    thumbnails: {
                        default: series.thumbnail,
                        textless: "",
                        texted: ''
                    }

                };
            }
        });
    });

    return program;
}

const getShowFromTvSpecials = (id: string, rokuTvSpecials) => {
    const rokuShow = rokuTvSpecials[id];
    
    if (rokuShow) {
        return {
            title: rokuShow.title,
            subtitle: "",
            description: rokuShow.shortDescription,
            thumbnails: {
                        default: rokuShow.thumbnail,
                        textless: "",
                        texted: ''
                    }
        };
    }
    
    return null;
}

export const getPlutoEPG = async (url: string) => {
    const response = await axios.get(
        url
    );

    const data: FrequencyEPG = response.data

    const schedule = data.schedule

    const getImage = (feed) => {

        if (feed.images) {
            for (let i = 0; i < feed.images.length; i++ ){
                if (feed.images[i].image_type === 'Textless' ){
                    return feed.images[i].image_url
                } 
            }
        }
        
        if( feed.seriesMetadata.images?.landscape ) {
            return feed.seriesMetadata.images?.landscape
        }

        return ''
    }

    let frequencyLiveFeed = schedule.map(
        feed => {
            let startDate = new Date(feed.start)
            startDate.setHours(startDate.getHours() - 5);

            const getTitle = (series, title) =>  series || title

            const getSubtitle = ( title, season, episode) => {
                let seasonNum = season ? season : 1
                let episodeNum = episode ? episode : 1
                return "S" + seasonNum + " E" + episodeNum + " " + title
            }

            return {             
                    id: feed.programId,
                    program:  {
                        title: getTitle(feed.series, feed.title),
                        subtitle: getSubtitle( feed.title, feed.season, feed.episode),
                        description: feed.description,
                        thumbnails: {
                            default: getImage(feed),
                            textless: "",
                            texted: ''
                        }
                    },
                    date: startDate.toISOString().split("T")[0],
                    startTime: startDate.toISOString().split("T")[1],
                    duration: feed.duration
            }
        }
    )

    return frequencyLiveFeed.sort((a, b) => {
            const dateA = new Date(a.date + 'T' + a.startTime);
            const dateB = new Date(b.date + 'T' + b.startTime);
            return dateA.getTime() - dateB.getTime();
        });

}

export const getAmazonEPG = async (url: string) => {
    const response = await axios.get(
        url
    );

    const data: string = response.data
    const dataObj = JSON.parse(convert.xml2json(data)).elements[0].elements
    const scheduleObj:AmazonEPGSchedule[] = dataObj.slice(1)
    const catalogObj = dataObj[0].elements

    let programs: {[key: string]: {
        title: string, 
        description: string,
        images: {
            default: string, 
            textless: string,
            texted: string
        },

        parentSeason?: string
    }} = {}
    let seasons: {[key: string]: {
        seasonName: string, 
        parentSeries: string
    } } = {}
    let series: {[key: string]: string} = {}
    let amazonLiveFeed: LiveFeed[] = []

    const addSeries = (serie) => {
        const serieId = serie.attributes.id
        const serieName = serie.elements[0].elements[0].elements[0].cdata

        series[serieId] = serieName
    }

    const addSeason = (season) => {
        const seasonId = season.attributes.id
        const seasonName = season.elements[0].elements[0].elements[0].text
        const parentSeries = season.elements[2].elements[0].attributes.parentRef

        seasons[seasonId] = {
            seasonName, 
            parentSeries
        }
    }

    const addProgram = (program, hasParenElement=false) => {
        const id = program.attributes.id

        const title = program.elements[0].elements[0].elements[0].cdata
        const description = program.elements[1].elements[0].elements[0].cdata
        const defaultImage = program.elements[2].elements[0] ? program.elements[2].elements[0].elements[0].text : ""
        const textlessImage = program.elements[2].elements[1] ? program.elements[2].elements[1].elements[0].text : ""
        const textedImage = program.elements[2].elements[2] ? program.elements[2].elements[2].elements[0].text : ""
        let parentSeason = ""


        if (hasParenElement) parentSeason = program.elements[8].elements[0].attributes.parentRef as string

        programs[id] = {
            title, 
            description, 
            images: {
                default: defaultImage, 
                textless: textlessImage,
                texted: textedImage
            },
            parentSeason
        }
    }

    catalogObj.forEach(catalogElement => {
        if (catalogElement.name === "TVSeries") addSeries(catalogElement)
        else if (catalogElement.name === "TVSeason") addSeason(catalogElement)
        else if (catalogElement.name === "TVEpisode") addProgram(catalogElement, true) 
        else if (catalogElement.name === "Other") addProgram(catalogElement, false)
        else if (catalogElement.name === "Movie") addProgram(catalogElement, false)
    })

    scheduleObj.forEach ( scheduledDay => {
        scheduledDay.elements.forEach( scheduledAiring => {
            let liveFeed: LiveFeed = { } as LiveFeed

            let programId = scheduledAiring.elements[2].attributes?.programRef
            if (!programId) programId = scheduledAiring.elements[3].attributes?.programRef
            
            let program = programs[programId]

            if ( !program ) return 
            
            liveFeed.program = {
                title: program.title,
                subtitle: program.title,
                description: program.description,
                thumbnails : {
                    default: program.images.default,
                    texted: program.images.texted,
                    textless: program.images.textless
                },
            }

            let startDate = new Date(scheduledAiring.elements[0].elements[0].text)
            startDate.setHours(startDate.getHours() - 5);

            liveFeed.date = startDate.toISOString().split("T")[0]
            liveFeed.startTime = startDate.toISOString().split("T")[1]
            liveFeed.duration = toSeconds(parse(scheduledAiring.elements[1].elements[0].text))

            amazonLiveFeed.push(liveFeed)
        })

    })

    return amazonLiveFeed.sort((a, b) => {
            const dateA = new Date(a.date + 'T' + a.startTime);
            const dateB = new Date(b.date + 'T' + b.startTime);
            return dateA.getTime() - dateB.getTime();
        });
}
