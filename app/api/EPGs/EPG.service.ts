import axios from 'axios'
import { RokuEPG, FrequencyEPG, Program, LiveFeed } from '@/app/models/ProgramModel';
import moment from 'moment';



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

        const feeds: LiveFeed[] = [];
        
        liveFeed.content.schedule.forEach(
            (feed) => {
                let program: Program | null = null;
                if (!program) program = getShowFromRokuMovies(feed.id, movies)
                if (!program) program = getShowFromRokuSeries(feed.id, series);
                if (!program) program = getShowFromTvSpecials(feed.id, tvSpecial);

                feed.times.forEach( time => {
                    feeds.push({             
                        id: feed.id,
                        program: program ? program : { } as Program ,
                        date: feed.date,
                        startTime: subtractHours(time, 4),
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

function subtractHours(timeStr: string, hoursToSubtract: number): string {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);

  // Create a date with arbitrary date parts, just to use the time
  const date = new Date(2000, 0, 1, hours, minutes, seconds);
  date.setHours(date.getHours() - hoursToSubtract);

  // Format back to "HH:MM:SS" with leading zeros
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
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

export const getFrequencyEPG = async () => {
    const response = await axios.get(
        `https://epg.frequency.com/output?id=253`
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