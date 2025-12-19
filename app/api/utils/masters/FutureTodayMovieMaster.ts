import { outputMasterType } from "./types";

export const FutureTodayMovieMaster: outputMasterType = {
    name: 'Future Today Movies',
    id: 'FutureTodayMovieMDU',
    master: [
        {
            header: 'Title Name',
            key: 'title',
            defaultValue: '',
        },
        {
            header: 'Content Type',
            key: '',
            defaultValue: 'Movie',
        },
        {
            header: 'Audio/Video Language',
            key: '',
            defaultValue: 'English',
        },
        {
            header: 'Allowed Worldwide',
            key: 'rightsTerritory',
            defaultValue: '',
            transform: {
                type: "territory",
                from: "MasterTracker",
                to: "FutureTodayWW",
            }
        },
        {
            header: 'Allowed in US',
            key: 'rightsTerritory',
            defaultValue: '',
            transform: {
                type: "territory",
                from: "MasterTracker",
                to: "FutureTodayUS",
            }
        },
        {
            header: 'Allowed in CA',
            key: 'rightsTerritory',
            defaultValue: '',
            transform: {
                type: "territory",
                from: "MasterTracker",
                to: "FutureTodayCA",
            }
        },
        {
            header: 'Allowed in other Countries',
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
            header: 'Popularity by Rating',
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
            header: 'genres',
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
            header: 'IMDB Link of the Movie title-Mandatory',
            key: 'TMSID',
            defaultValue: '',
        },
        {
            header: 'Skip Credits (If Available)',
            key: '',
            defaultValue: '',
        },
        {
            header: 'TMS ID/GraceNote ID',
            key: 'TMS',
            defaultValue: '',
        },
        {
            header: 'Content Live Date (ASAP/Future)',
            key: '',
            defaultValue: 'ASAP',
        },
        {
            header: 'Future Start Date',
            key: '',
            defaultValue: '',
        },
        {
            header: '',
            key: '',
            defaultValue: '',
        },
        {
            header: '',
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
