type MasterField = {
    key: string;
    defaultValue?: any;
}

type MasterType = {
    [key: string]: MasterField;
}


export const MasterTrackerMaster: MasterType = {
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
    serie: {
        key: 'Series',
    },
    season: {
        key: 'Season',
    },
    episode: {
        key: '# Episode',
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
    serieId: {
        key: 'Series GUID',
    },
    slingId: {
        key: 'Sling ID',
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
}