type MasterField = {
    key: string;
    defaultValue?: any;
    transform?: MasterFiledTransformObj
}

export type MasterFiledTransformObj = {
    add?: string;
}

type MasterType = {
    [key: string]: MasterField;
}


export const MasterTrackerTitles: MasterType = {
    id: {
        key: 'Title GUID',
    },
    title: {
        key: 'Title',
    },
    licensor: {
        key: 'Distributor',
    },
    type: {
        key: 'Type',
    },
    synopsis: {
        key: 'Synopsis',
    },
    shortSynopsis: {
        key: `Short Synopsis (< 110 Char)`,
    },
    series: {
        key: 'Series Title',
    },
    season: {
        key: 'S#',
    },
    episode: {
        key: 'E#',
    },
    rating: {
        key: 'Rating',
    },
    duration: {
        key: 'Duration',
    },
    releaseDate: {
        key: 'Release Date',
    },
    countryOfOrigin: {
        key: 'Country of Origin',
    },
    genre: {
        key: "Genre",
    },
    tags: {
        key: 'Tags',
    },
    mainCast: {
        key: 'Main Cast',
    },
    filePath: {
        key: 'File Path Formula'
    },
    originalVideoFilename: {
        key: 'Original Video Filename'
    },
    videoFilename: {
        key: 'Asset Filename Formula',
        transform: {
            add: '.mp4'
        }
    },
    captionsFilename: {
        key: 'Captions Filename',
    },
    artFilename: {
        key: 'Art Filename',
    },
    women: {
        key: 'Women',
    },
    TMSID: {
        key: 'TMS ID',
    },
    adBreaks: {
        key: 'Ad Breaks Frames',
    },
    slingId: {
        key: 'Sling ID',
    },
    slingCategory: {
        key: 'Sling Category',
    },
    frequency: {
        key: 'In Frequency',
    },
    rightsStart: {
        key: 'Window Start',
    },
    rightsEnd: {
        key: 'Window End',
    },
    rightsTerritory: {
        key: 'Territory Rights',
    },
    guid: {
        key: 'Title GUID',
    },
    seriesTitle: {
        key: 'Series Title',
    },
    brandedVOD: {
        key: `Branded VOD Rights`,
    },
    unbrandedVOD: {
        key: `Unbranded VOD Rights`,
    },
    thirdPartyLinear: {
        key: `3rd Party Linear Rights`,
    },
    fubo: {
        key: 'Fubo',
    },
    sling: {
        key: 'Sling',
    },
    xumo: {
        key: 'Xumo',
    },
    amazon: {
        key: 'Amazon',
    },
    pluto: {
        key: 'Pluto',
    },
    roku: {
        key: 'Roku',
    },
    vizio: {
        key: 'Vizio',
    },
    fsn: {
        key: 'FSN',
    },
    rsc: {
        key: 'RSC',
    },
}

export const MasterTrackerSeries: MasterType = {
    id: {
        key: 'GUID',
    },
    seriesName: {
        key: 'Series Name',
    },
    seriesLicensor: {
        key: 'Licensor',
    },
    seriesSlingId: {
        key: 'Sling ID',
    },
    seriesSynopsis: {
        key: 'Synopsis Long',
    }, 
    seriesShortSynopsis: {
        key: `Synopsis Short (<110 Char)`,
    },
    seriesReleaseDate: {
        key: 'Release Date',
    },
    seriesGenre: {
        key: 'Genre',
    },
    seriesTags: {
        key: 'Tags',
    },
    seriesArtFilename: {
        key: 'Art Filename',
    },
}
