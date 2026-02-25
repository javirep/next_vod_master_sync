import { outputMasterType } from "./types";

export const FutureTodaySeriesMaster: outputMasterType = {
    name: 'Future Today Series',
    id: 'FutureTodaySeriesMDU',
    outputFormat: 'xlsx',

    tabs: [
        {
            tabName: 'main',
            content: [
                {
                    header: 'Title Name',
                    key: 'title',
                    defaultValue: '',
                },
                {
                    header: 'Series Name', 
                    key: 'series_seriesName',
                    defaultValue:''
                },
                {
                    header: 'Season', 
                    key: 'season',
                    defaultValue:''
                },
                {
                    header: 'Episode', 
                    key: 'episode',
                    defaultValue:''
                },
                {
                    header: 'Content Type',
                    key: '',
                    defaultValue: 'TV Series',
                },
                {
                    header: 'Permit Worldwide',
                    key: 'rightsTerritory',
                    defaultValue: '',
                    transform: {
                        type: "territory",
                        from: "MasterTracker",
                        to: "FutureTodayWW",
                    }
                },
                {
                    header: 'PERMIT US/CS/UK/AUS/GE/FR/IT',
                    key: 'rightsTerritory',
                    defaultValue: '',
                    transform: {
                        type: "territory",
                        from: "MasterTracker",
                        to: "FutureTodayOther",
                    }
                },
                {
                    header: 'Description',
                    key: 'synopsis',
                    defaultValue: '',
                },
                {
                    header: 'Actors',
                    key: 'mainCast',
                    defaultValue: '',
                },
                {
                    header: 'Director',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'MPAA RATING',
                    key: 'ratingSource',
                    defaultValue: '',
                    transform:{
                        type: "ratingSource",
                        from: "MasterTracker", 
                        to: "FutureToday"
                    }
                },
                {
                    header: 'Popularity Rating (As per IMDB)',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'ORIGINAL RELEASE DATE',
                    key: 'releaseDate',
                    defaultValue: '',
                    transform: {
                        type: "date",
                        from: "YYYY-MM-DD",
                        to: "MM/DD/YYYY"
                    }
                },
                {
                    header: 'GENRES',
                    key: 'genre',
                    defaultValue: '',
                },
                {
                    header: 'KEYWORDS',
                    key: 'tags',
                    defaultValue: '',
                },
                {
                    header: 'CUE POINTS',
                    key: 'adBreaks',
                    defaultValue: '',
                    transform: {
                        type: "adBreaks", 
                        from:"HH:mm:ss;ff", 
                        to: "seconds"
                    }
                },
                {
                    header: 'Run Time',
                    key: 'duration',
                    defaultValue: '',
                    transform:{
                        type: "duration", 
                        from: "min",
                        to: "seconds"
                    }
                },
                {
                    header: "Ad breaks (separated by a comma and space", 
                    key: "adBreaks", 
                    defaultValue: "",
                    transform:  {
                        type: "adBreaks",
                        from: "HH:mm:ss;ff", 
                        to: "seconds"
                    }
                },
                {
                    header: 'IMDB Link',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'TMS ID',
                    key: 'TMSID',
                    defaultValue: '',
                },
                {
                    header: 'Skip Credits (If Available)',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Live Date (ASAP/Future)',
                    key: '',
                    defaultValue: 'ASAP',
                },
                {
                    header: 'Future Start Date',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Live Date',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'End Date',
                    key: 'rightsEnd',
                    defaultValue: '',
                },

            ]
        }
    ]
}
