import { outputMasterType } from "./types";
import moment from "moment";

const headers = [
    "Instructions",
    "Content Partner",
    "Content Type",
    "License Type",
    "Excluded Rights",
    "Start Date",
    "End Date",
    "Country of Origin",
    "Original Spoken Language",
    "Language",
    "LocalizationType",
    "Excluded Languages",
    "Territory",
    "ExcludedTerritories",
    "Series Title",
    "Series ID",
    "Title",
    "Title ID",
    "Season Number",
    "Episode Number",
    "Run Time",
    "Format",
    "DBO",
    "Closed Captioning",
    "Caption Exemption",
    "Audio Description",
    "Audio Description Exemption",
    "Original Release Date",
    "Genre",
    "Tags",
    "Rating Source",
    "Rating Value",
    "Kids-Directed",
    "Recommended Age Group",
    "Main Cast",
    "Synopsis",
    "External ID Source",
    "Series External ID",
    "External ID",
    "Screener Link",
    "Exclusive",
    "Notes",
    "Merchant of Record",
    "Day Parting"
  ];
  

export const RokuAvailsMaster: outputMasterType = {
    name: 'Roku Avails',
    id: 'rokuAvails',
    outputName: 'Swerve-Roku-Avails',
    outputFormat: 'xlsx',
    
    tabs : [
        {
            tabName: 'main',
            content: [
                {
                    header: headers[0],
                    key: '', // instructions
                    defaultValue: '',
                }, 
                {
                    header: headers[1],
                    key: '', // content Partner
                    defaultValue: 'Swerve',
                },
                {
                    header: headers[2],
                    key: 'type', // content Type
                    defaultValue: '',
                    transform: {
                        type: 'type',
                        from: 'masterTracker',
                        to: 'Roku',
                    },
                    validation: {
                        required: true,
                        format: 'rokuContentType',
                    }
                },
                {
                    header: headers[3],
                    key: '', // License Type
                    defaultValue: 'AVOD, Linear OTT',
                },
                {
                    header: headers[4],
                    key: '', // Excluded rights
                    defaultValue: '',
                },
                {
                    header: headers[5],
                    key: '',
                    defaultValue: moment().add(60, 'day').format('YYYY-MM-DD') // Start Date
                },
                {
                    header: headers[6],
                    key: 'rightsEnd',
                    validation: {
                        required: true,
                        format: 'YYYY-MM-DD',
                        afterThan: 5,
                        futureDate: true,
                    }
                },
                {
                    header: headers[7],
                    key: 'countryOfOrigin',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'countryCode',
                    }
                },
                {
                    header: headers[8],
                    key:'', // Original Spoken Language
                    defaultValue: 'en',
                },
                {
                    header: headers[9],
                    key: '', // Language
                    defaultValue: 'en',
                },
                {
                    header: headers[10],
                    key: '', // Localization Type
                    defaultValue: 'dub',
                },
                {
                    header: headers[11],
                    key: '', // Excluded Languages
                    defaultValue: '',
                },
                {
                    header: headers[12],
                    key: 'rightsTerritory', // Territory
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'countryCodes',
                    },
                    transform : {
                        type: "territory",
                        from: "MasterTracker",
                        to: "rokuAvails"
                    }
                
                },
                {
                    header: headers[13],
                    key: '', // Excluded Territories
                    defaultValue: ''
                }, 
                {
                    header: headers[14],
                    key: 'series_seriesName',
                    defaultValue: '',
                    validation: {
                        required: false,
                        format: 'title',
                    }
                },
                {
                    header: headers[15],
                    key: 'series_id',
                    defaultValue: '',
                    validation: {
                        required: false,
                        format: 'uiid',
                    }
                },
                {
                    header: headers[16],
                    key: 'title',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'title',
                    }
                },
                {
                    header: headers[17],
                    key: 'id',
                    validation: {
                        required: true,
                        format: 'uiid',
                    }
                },
                {
                    header: headers[18],
                    key: 'season',
                    defaultValue: '',
                    validation: {
                        required: false,
                        format: 'wholeNumber',
                    }
                },
                {
                    header: headers[19],
                    key: 'episode',
                    defaultValue: '',
                    validation: {
                        required: false,
                        format: 'wholeNumber',
                    }
                },
                {
                    header: headers[20],
                    key: 'duration',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'wholeNumber',
                    }
                },
                {
                    header: headers[21],
                    key: '', // Format
                    defaultValue: 'HD'
                },
                {
                    header: headers[22],
                    key: '', // DBO
                    defaultValue: ''
                },
                {
                    header: headers[23],
                    key: '', // Close Captioned
                    defaultValue: 'true'
                },
                {
                    header: headers[24],
                    key: '', // Caption Exemption
                    defaultValue: ''
                },
                {
                    header: headers[25],
                    key: '', // Audio Description
                    defaultValue: ''
                },
                {
                    header: headers[26],
                    key: '', // Audio Description Exemption
                    defaultValue: ''
                },
                {
                    header: headers[27],
                    key: 'releaseDate', // Original Release Date
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'YYYY-MM-DD',
                    }
                },
                {
                    header: headers[28],
                    key: 'genre', // Genre
                    defaultValue: '',
                    validation: {
                        required: true,
                    }
                },
                {
                    header: headers[29],
                    key: 'tags', // Tags
                    defaultValue: ''
                },
                {
                    header: "ratingSystem",
                    key: 'rating',
                    defaultValue: '',
                    transform: {
                        type: 'rating',
                        from: 'masterTracker',
                        to: 'ratingSource',
                    },
                    validation: {
                        required: true,
                        format: 'ratingSource',
                    }
                },
                {
                    header: headers[31],
                    key: 'rating',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'ratingValue',
                    }
                },
                {
                    header: headers[32],
                    key: '', // Kids Directed
                    defaultValue: ''
                },
                {
                    header: headers[33],
                    key: '', // Recommended Age Group
                    defaultValue: ''
                },
                {
                    header: headers[34],
                    key: 'mainCast',
                    defaultValue: '',
                },
                {
                    header: headers[35],
                    key: 'shortSynopsis',
                    defaultValue: '',
                    validation: {
                        required: true,
                        maxLength: 250,
                    }
                }

            ]
        }
    ]
}

    