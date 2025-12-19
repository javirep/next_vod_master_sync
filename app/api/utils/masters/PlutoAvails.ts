import { outputMasterType } from "./types";

export const PlutoAvailsMaster: outputMasterType = {
    name: 'Pluto Avails Manifest',
    id: 'plutoAvailsManifest',
    outputName: 'Pluto-Avails',
    master: [
        {
            header: 'TMS ID',
            key: 'TMSID',
            defaultValue: '',
        },
        {
            header: 'EIDR ID',
            key: '',
            defaultValue: '',
        },
        {
            header: 'Partner Name',
            key: '',
            defaultValue: 'Swerve LLC',
            validation: {
                required: true,
            }

        },
        {
            header: 'Brand Name',
            key: '',
            defaultValue: '',
        },
        {
            header: 'Partner’s In-House Content Identifier',
            key: 'guid',
            defaultValue: '',
        },
        {
            header: 'Title (Film title or Series Title with Season Number)',
            key: 'title',
            defaultValue: '',
            validation: {
                required: true,
            }
        },
        {
            header: 'Content Type',
            key: 'type',
            defaultValue: '',
            validation: {
                required: true,
            },
            transform: {
                type: 'type',
                from: 'masterTracker',
                to: 'plutoAvails'
            }
        },
        {
            header: 'Release Year',
            key: 'releaseDate',
            defaultValue: '',
            validation: {
                required: true,
            },
            transform: {
                type: 'date',
                from: 'YYYY-MM-DD',
                to: 'YYYY'
            }
        },
        {
            header: 'Runtime (Minutes)',
            key: 'duration',
            defaultValue: '',
            validation: {
                required: true,
            }
        },
        {
            header: 'Localized Title Name',
            key: '',
            defaultValue: '',
        },
        {
            header: 'Series Name',
            key: 'series_seriesName',
            defaultValue: '',
        },
        {
            header: 'Season Number',
            key: 'season',
            defaultValue: '',
        },
        {
            header: 'Total Number of Episodes Submitted',
            key: '',
            defaultValue: '',
        },
        {
            header: 'Included Episodes',
            key: '',
            defaultValue: '',
        },
        {
            header: 'Description',
            key: 'synopsis',
            defaultValue: '',
        },
        {
            header: 'Genre',
            key: 'genre',
            defaultValue: '',
        },
        {
            header: 'Trailer/Screener Link URL',
            key: '',
            defaultValue: '',
        },
        {
            header: 'Trailer/Screener Link Passwords',
            key: '',
            defaultValue: '',
        },
        {
            header: 'Director',
            key: '',
            defaultValue: '',
        },
        {
            header: 'Cast',
            key: 'mainCast',
            defaultValue: '',
        },
        {
            header: 'Content Rating',
            key: 'ratingValue',
            defaultValue: '',
            validation: {
                required: true,
            }
        },
        {
            header: 'Media Rights',
            key: '',
            defaultValue: 'AVOD',
        },
        {
            header: 'Avail Start (YYYY-MM-DD)',
            key: 'rightsStart',
            defaultValue: '',
            validation: {
                required: true,
            }
        },
        {
            header: 'Avail End (YYYY-MM-DD)',
            key: 'rightsEnd',
            defaultValue: '',
            validation: {
                required: true,
            }
        },
        {
            header: 'Regions',
            key: 'rightsTerritory',
            defaultValue: '',
            validation: {
                required: true,
            },
            transform: {
                type: 'territories',
                from: "MasterTracker",
                to: "Pluto"
            }
        },
        {
            header: 'Excluded Territories',
            key: '',
            defaultValue: '',
        },
        {
            header: 'Original Language',
            key: '',
            defaultValue: 'English'
        },
        {
            header: 'Audio Language',
            key: '',
            defaultValue: 'English',
        },
        {
            header: 'Audio Language Dialect',
            key: '',
            defaultValue: '',
        },
        {
            header: 'Secondary Audio Tracks: Descriptive Audio',
            key: '',
            defaultValue: ''
        },
        {
            header: 'Subtitle Language',
            key: '',
            defaultValue: '',
        },
        {
            header: 'Has aired on US TV in language? (Yes/No)',
            key: '',
            defaultValue: 'Yes',
        },
        {
            header: 'Does title have CC in Audio Language? (Yes/No)',
            key: '',
            defaultValue: 'Yes'
        },
        {
            header: 'Secondary: Closed Captioning Languages',
            key: '',
            defaultValue: '',
        },
        {
            header: 'Resolution',
            key: '',
            defaultValue: 'HD',
        },
    ]
}
