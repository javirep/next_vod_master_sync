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

export type FrequencyEPG = {
    output: {
        type: string,
        format: string,
        version: string,
        timeframe: string,
        start: string,
        end: string,
        query: string,
        queryDuration: number,
        responseCharacters: number,
        scheduleItems: number
    }
    schedule: {
      start: string,
      end: string,
      duration: number,
      programType: string,
      programId: string,
      videoId: string,
      videoIdPartner: string,
      thumbnail: string,
      title: string,
      titleInternal: string,
      description: string,
      keywords: string,
      ratingAge: null,
      parentalRating: string,
      country: string,
      countryName: string,
      language: string,
      languageName: string,
      contentType: string,
      contentFormat: string,
      genre: string,
      seriesId: string,
      series: string,
      season: number,
      episode: number,
      seriesMetadata: {
        episodeTitle: string,
        seasonTitle: string,
        extended_metadata: null,
        images: {
          landscape?: string,
        },
      },
      adBreakPositions: string,
      externalMetadataId: string,
      videoPublishDate: string,
      images: string[],
      localizedMetadata: string[],
    }[]
}

export type AmazonEPGSchedule = {
    attributes: xmlAttribute, 
    elements: {
        name: string
        type: string
        elements: {
            name: string
            type: string
            attributes: {
                programRef: string
            }
            elements: {
                name: string
                type: string
            }
        }[]
    }[]
}



type xmlAttribute = {
    id?: string, 
    version?: string, 
    default?: string, 
    locale?: string

}

export type Program = {
        title: string;
        subtitle: string;
        description: string;
        thumbnails: {
            default: string,
            textless: string, 
            texted: string
        };
        season?: string, 
        episode?: string,
    };

export type LiveFeed = {
    id: string;
    program: Program;
    date: string;
    startTime: string;
    duration: number;

};