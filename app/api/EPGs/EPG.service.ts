import axios from 'axios'
import { RokuEPG, FrequencyEPG, Program, LiveFeed } from '@/app/models/ProgramModel';
import moment from 'moment';



export const getRokuEPG = async (url) => {
    try{
        const response = await axios.get(
                url
            );

        const data: RokuEPG = response.data
        const liveFeed = data.liveFeeds[0]
        const movies = data.movies
        const series = data.series
        const tvSpecial = data.tvSpecials

        const feeds: LiveFeed[] = [];
        
        liveFeed.content.schedule.forEach(
            (feed) => {
                let program: Program | null = null;
                if (!program) program = getShowFromRokuMovies(feed.id, movies)
                if (!program) program = getShowFromRokuSeries(feed.id, series);
                if (!program) program = getShowFromTvSpecials(feed.id, tvSpecial);

                feed.times.forEach( time => {
                    let startDate = new Date(feed.date + 'T' + time)
                    startDate.setHours(startDate.getHours() - 4);

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
                    title: episode.title,
                    description: episode.shortDescription,
                    thumbnail: episode.thumbnail,
                    season: season.seasonNumber,
                    episode: episode.episodeNumber
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
            description: rokuShow.shortDescription,
            thumbnail: rokuShow.thumbnail,
        };
    }
    
    return null;
}

export const getFrequencyEPG = async (url: string) => {
    const response = await axios.get(
        url
    );

    const data: FrequencyEPG = response.data

    const schedule = data.schedule

    let frequencyLiveFeed = schedule.map(
        feed => {
            let startDate = new Date(feed.start)
            startDate.setHours(startDate.getHours() - 4);
            return {             
                    id: feed.programId,
                    program:  {
                        title: feed.title,
                        description: feed.description,
                        thumbnail: feed.thumbnail,
                        season: feed.season,
                        episode: feed.episode,
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