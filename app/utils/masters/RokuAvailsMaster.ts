import { outputMasterType } from "./types";
import moment from "moment";

export const RokuAvailsMaster: outputMasterType = {
    name: 'Roku Avails',
    id: 'rokuAvails',
    master: [
        {
            key: '', // instructions
            defaultValue: '',
        }, 
        {
            key: '', // content Partner
            defaultValue: 'Swerve',
        },
        {
            key: 'type', // content Type
            defaultValue: '',
            transform: {
                type: 'type',
                from: 'masterTracker',
                to: 'Roku',
            }
        },
        {
            key: '', // License Type
            defaultValue: 'AVOD, Linear OTT',
        },
        {
            key: '', // Excluded rights
            defaultValue: '',
        },
        {
            key: 'rightsStart',
            defaultValue: moment('today').add(30, 'day').format('YYYY-MM-DD'),
        },
        {
            key: 'rightsEnd',
        },
        {
            key: 'countryOfOrigin',
            defaultValue: '',
        },
        {
            key:'', // Original Spoken Language
            defaultValue: 'en',
        },
        {
            key: '', // Language
            defaultValue: 'en',
        },
        {
            key: '', // Localization Type
            defaultValue: 'dub',
        },
        {
            key: '', // Excluded Languages
            defaultValue: '',
        },
        {
            key: 'rightsTerritory', // Territory
            defaultValue: ''
        },
        {
            key: '', // Excluded Territories
            defaultValue: ''
        }, 
        {
            key: 'serie',
            defaultValue: ''
        },
        {
            key: 'serieId',
            defaultValue: ''
        },
        {
            key: 'title',
            defaultValue: ''
        },
        {
            key:'', // roku selection
            defaultValue: ''

        },
        {
            key: 'id',
        },
        {
            key: 'season',
            defaultValue: ''
        },
        {
            key: 'episode',
            defaultValue: ''
        },
        {
            key: 'duration',
            defaultValue: ''
        },
        {
            key: '', // Format
            defaultValue: 'HD'
        },
        {
            key: '', // DBO
            defaultValue: ''
        },
        {
            key: '', // Close Captioned
            defaultValue: 'True'
        },
        {
            key: '', // Caption Exemption
            defaultValue: ''
        },
        {
            key: '', // Audio Description
            defaultValue: ''
        },
        {
            key: '', // Audio Description Exemption
            defaultValue: ''
        },
        {
            key: 'releaseDate', // Original Release Date
            defaultValue: ''
        },
        {
            key: 'genre', // Genre
            defaultValue: ''
        },
        {
            key: 'tags', // Tags
            defaultValue: ''
        },
        {
            key: 'ratingSource',
            defaultValue: '',
            transform: {
                type: 'ratingSource',
                from: 'masterTracker',
                to: 'Roku',
            }
        },
        {
            key: 'ratingValue',
            defaultValue: ''
        },
        {
            key: '', // Kids Directed
            defaultValue: ''
        },
        {
            key: '', // Recommended Age Group
            defaultValue: ''
        },
        {
            key: 'mainCast',
            defaultValue: ''
        },
        {
            key: 'synopsis',
            defaultValue: ''
        }

    ]
}

    