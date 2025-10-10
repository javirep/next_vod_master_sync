import axios from 'axios'
import { RokuEPG, FrequencyEPG, Program, LiveFeed } from '@/app/models/ProgramModel';

const placeholderImage = "https://www.magtrol.com/india/wp-content/uploads/placeholder-16-9-ratio.png";

export const getRokuEPG = async (url) => {
    try{
        const response = await axios.get(
                url
            );

        const data: RokuEPG = response.data
        const liveFeed = data.liveFeeds[0]
        const movies = data.movies
        const series = data.series
        const tvSpecials = data.tvSpecials

        const feeds: LiveFeed[] = [];
        
        liveFeed.content.schedule.forEach(
            (feed) => {
                let program: Program | null = null;
                if (!program) program = getShowFromRokuMovies(feed.id, movies)
                if (!program) program = getShowFromRokuSeries(feed.id, series);
                if (!program) program = getShowFromTvSpecials(feed.id, tvSpecials);

                feed.times.forEach( time => {
                    let startDate = new Date(feed.date + 'T' + time)
                    startDate.setHours(startDate.getHours() - 5);

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
    
    const rokuShow = rokuMovies.find((movie) => movie.id === id);
    
    if (rokuShow) {
        return {
            title: rokuShow.title,
            subtitle: "",
            description: rokuShow.shortDescription,
            thumbnail: rokuShow.thumbnail,
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
                    thumbnail: series.thumbnail,
                };
            }
        });
    });

    return program;
}

const getShowFromTvSpecials = (id: string, rokuTvSpecials) => {
    const rokuShow = rokuTvSpecials.find((tvSpecial) => tvSpecial.id === id);
    
    if (rokuShow) {
        return {
            title: rokuShow.title,
            subtitle: "",
            description: rokuShow.shortDescription,
            thumbnail: rokuShow.thumbnail,
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

    let frequencyLiveFeed = schedule.map(
        feed => {
            let startDate = new Date(feed.start)
            startDate.setHours(startDate.getHours() - 4);

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
                        thumbnail: feed.seriesMetadata.images?.landscape ? feed.seriesMetadata.images.landscape : placeholderImage,
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