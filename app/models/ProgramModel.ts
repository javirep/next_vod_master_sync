export type RokuEPG = {
    liveFeeds: {
        id: 'string'
        content: {
            schedule: {
                id: string,
                durationInSeconds: number,
                date: string,
                isLive: boolean,
                times: string [],
                attributes: string []
            }[]
        }
    }[], 
    movies: {
        id: number,
        title: string,
        shortDescription: string,
        genres: string [],
        thumbnail: string,
        rating: {
            ratingSource: string,
            rating: string
        }
    }[],

    series: {
        id: string,
        title: string,
        genres: string[],
        thumbnail: string,
        rating: {
            ratingSource: string,
            rating: string
        },
        seasons: [
            {
                seasonNumber: number,
                episodes: [
                    {
                    id: string,
                    episodeNumber: number,
                    title: string,
                    shortDescription: string,
                    genres: string [],
                    thumbnail: string,
                    rating: {
                        ratingSource: string,
                        rating: string
                    }
                }
            ]
            }
        ]
    }[],
    
    tvSpecials: {
      id: string,
      title: string,
      genres: string [],
      shortDescription: string,
      thumbnail: string,
      rating: {
        ratingSource: string,
        rating: string
      }
    }[]
}

export type Program = {
        title: string;
        description: string;
        thumbnail: string;
        season?: string;
        episode?: string;
    };

export type LiveFeed = {
    id: string;
    program: Program;
    date: string;
    startTime: string;
    duration: number;

};