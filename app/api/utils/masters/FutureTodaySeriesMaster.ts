import { outputMasterType } from "./types";
import moment from "moment";

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
                    header: 'PERMIT US',
                    key: 'rightsTerritory',
                    defaultValue: '',
                    transform: {
                        type: "territory",
                        from: "MasterTracker",
                        to: "FutureTodayUS",
                    }
                },
                {
                    header: 'PERMIT CA',
                    key: 'rightsTerritory',
                    defaultValue: '',
                    transform: {
                        type: "territory",
                        from: "MasterTracker",
                        to: "FutureTodayCA",
                    }
                },
                {
                    header: 'PERMIT UK/AUS/GE/FR/IT',
                    key: 'rightsTerritory',
                    defaultValue: '',
                    transform: {
                        type: "territory",
                        from: "MasterTracker",
                        to: "FutureTodayOther",
                    }
                },
                {
                    header: 'Short Description',
                    key: 'shortSynopsis',
                    defaultValue: '',
                },
                {
                    header: 'Long Description',
                    key: 'Synopsis',
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
                    header: 'Original Release Date (MM/DD/YYYY) (Mandatory)',
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
                    header: 'Audio/Video Language',
                    key: '',
                    defaultValue: 'EN',
                },
                {
                    header: 'License Start Date',
                    key: 'rightsStart',
                    defaultValue: moment().format('YYYY-MM-DD'),
                },
                {
                    header: 'End Date',
                    key: 'rightsEnd',
                    defaultValue: '',
                },
                {
                    header: 'Internal Mapping ID',
                    key: 'guid',
                    defaultValue: '',
                },
            ]
        }
    ]
}
