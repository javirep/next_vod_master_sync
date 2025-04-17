type MasterField = {
    key: string;
    defaultValue?: any;
}

type MasterType = {
    [key: string]: MasterField;
}


export const MasterTrackerTitles: MasterType = {
    id: {
        key: 'Title GUID',
    },
    distributor: {
        key: 'Distributor',
    },
    type: {
        key: 'Type',
    },
    title: {
        key: 'Title',
    },
    fileName: {
        key: 'File Name',
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
    ratingSource: {
        key: 'Rating Source',
    },
    ratingValue: {
        key: 'Official Rating',
    },
    duration: {
        key: 'Duration',
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
    women: {
        key: 'Women',
    },
    adBreaks: {
        key: 'Ad Breaks Frames',
    },
    guid: {
        key: 'Title GUID',
    },
    seriesTitle: {
        key: 'Series Title',
    },
    seriesDescription: {
        key: 'Series Title',
    },
    seriesId: {
        key: 'Series GUID',
    },
    slingId: {
        key: 'Sling ID',
    },
    slingCategory: {
        key: 'Sling Category',
    },
    teamsID: {
        key: 'Teams ID',
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
    videoPath: {
        key: 'Video File Path',
    },
    captionsFileName: {
        key: 'Captions Filename',
    },
    artFileName: {
        key: 'Art Filename',
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
        key: '12 digits id',
    },
    seriesSynopsis: {
        key: 'Synopsis Long',
    }, 
    seriesShortSynopsis: {
        key: `Synopsis Short (< 110 Char)`,
    },
    seriesArtFileName: {
        key: 'Art Filename',
    },
}
