import axios from 'axios'
import { RokuEPG, FrequencyEPG, Program, LiveFeed } from '@/app/models/ProgramModel';

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

    const data: FrequencyEPG = response.data

    const schedule = data.schedule

    const getImages = (feed) => {

        let defaultImage = ''
        let textedImage = ''
        let textlessImage = ''

        if (feed.images) {
            for (let i = 0; i < feed.images.length; i++ ){
                if (feed.images[i].image_type === 'Texted' ){
                    textedImage = feed.images[i].image_url
                }
                if (feed.images[i].image_type === 'Textless' ){
                    textlessImage = feed.images[i].image_url
                } 
                if (feed.images[i].image_type === 'solid' && feed.images[i].width == 1920 ){
                    defaultImage = feed.images[i].image_url
                }
            }
        }

        return {
            default: defaultImage,
            texted: textedImage,
            textless: textlessImage
        }
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
                            thumbnails: getImages(feed)
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