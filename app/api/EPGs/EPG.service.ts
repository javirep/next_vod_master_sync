import axios from 'axios'
import { RokuEPG, LiveFeed, Program } from '@/app/models/ProgramModel';



export const getRokuEPG = async () => {
    try{
        const response = await axios.get(
                `https://epg.frequency.com/output?id=253&format=roku_true_epg`
            );

        const data: RokuEPG = response.data
        const liveFeed = data.liveFeeds[0]
        const movies = data.movies
        const series = data.series
        const tvSpecial = data.tvSpecials
        
        let rokuLiveFeed = liveFeed.content.schedule.map(
            (feed) => {
                let program: Program | null = null;
                if (!program) program = getShowFromRokuMovies(feed.id, movies)
                if (!program) program = getShowFromRokuSeries(feed.id, series);
                if (!program) program = getShowFromTvSpecials(feed.id, tvSpecial);

                return {             
                    id: feed.id,
                    program: program ? program : { } ,
                    date: feed.date,
                    startTime: feed.times[0],
                    duration: feed.durationInSeconds
            }}
        )

        rokuLiveFeed = rokuLiveFeed.sort((a, b) => {
            const dateA = new Date(a.date + 'T' + a.startTime);
            const dateB = new Date(b.date + 'T' + b.startTime);
            return dateA.getTime() - dateB.getTime();
        });
            
        
        return rokuLiveFeed;
        
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
        
        rokuSeries.forEach((series) => {
            const seasons = series.seasons

            seasons.forEach((season) => {
                const episodes = season.episodes;

                const episode = episodes.find((ep) => ep.id === id);
                
                if (episode) {
                    return {
                        title: episode.title,
                        description: episode.shortDescription,
                        thumbnail: episode.thumbnail,
                        season: season.seasonNumber,
                        episode: episode.episodeNumber
                    };
                }
            });
        });

        return null;
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