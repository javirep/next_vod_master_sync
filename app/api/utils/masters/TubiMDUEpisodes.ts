import { outputMasterType } from "./types";

export const TubiMDUEpisodesMaster: outputMasterType = {
    name: 'Tubi MDU Episodes',
    id: 'tubiMDUEpisodes',
    outputName: 'Tubi-MDU-Episodes',
    outputFormat: 'csv',

    tabs : [
        {
            tabName: 'main',
            content: [

                {
                    header: 'content type',
                    key: '',
                    defaultValue: 'episode',
                },
                {
                    header: 'series title',
                    key: 'series_seriesName',
                    defaultValue: '',
                    validation:{
                        required: true,
                        format: 'title',
                    }
                },
                {
                    header: 'episode title',
                    key: 'title',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'title',
                    }
                },
                {
                    header: 'season_number',
                    key: 'season',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'wholeNumber',
                    }
                },
                {
                    header: 'episode number',
                    key: 'episode',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'wholeNumber',
                    }
                },
                {
                    header: "description",
                    key: 'shortSynopsis',
                    validation: {
                        required: true,
                        maxLength: 180,
                    }
                },
                {
                    header: "video filename",
                    key: 'videoFilename',
                    defaultValue: '',
                    transform: {
                        type: 'string',
                        from: 'filePath',
                        to: 'fileName',
                    },
                    validation: {
                        required: true,
                        format: 'fileName',
                        isUnique: true,
                    }
                },
                {
                    header: 'audio description sidecar filename',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'audio description track number(s) - comma separated',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'subtitle or caption filename',
                    key: 'captionsFilename',
                    defaultValue: '',
                    transform: {
                        type: 'string',
                        from: 'filePath',
                        to: 'fileName',
                    },
                    validation: {
                        required: true,
                        format: 'fileName',
                    }
                },
                {
                    header: 'thumbnail filename',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'release date',
                    key: 'releaseDate',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'YYYY-MM-DD',
                    }
                },
                {
                    header: 'country whitelist',
                    key: 'rightsTerritory',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'countryCodes',
                    },
                    transform : {
                        type: "territory",
                        from: "MasterTracker",
                        to: "tubi"
                    }
                },
                {
                    header: 'country blacklist',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'available date',
                    key: 'rightsStart',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'YYYY-MM-DD',
                    }
                },
                {
                    header: 'expiration date',
                    key: 'rightsEnd',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'YYYY-MM-DD',
                        futureDate: true,
                    }
                },
                {
                    header: 'parental rating',
                    key: 'rating',
                    defaultValue: '',
                    transform: {
                        type: 'ratingValue',
                        from: 'masterTracker',
                        to: 'TV-Rating',
                    },
                    validation: {
                        required: true,
                        format: 'ratingValue',
                    }
                },
                {
                    header: 'languages',
                    key: '',
                    defaultValue: 'EN',
                },
                {
                    header: 'countries',
                    key: 'countryOfOrigin',
                    defaultValue: '',
                    validation: {
                        required: false,
                        format: 'countryCode',
                    }
                },
                {
                    header: 'genres',
                    key: 'genre',
                    defaultValue: '',
                    transform: {
                        type: 'genre',
                        from: 'masterTracker',
                        to: 'Tubi',
                    },
                },
                {
                    header: 'directors',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'actors',
                    key: 'mainCast',
                    defaultValue: '',
                },
                {
                    header: 'keywords',
                    key: 'tags',
                    defaultValue: '',
                },
                {
                    header: 'imdb id',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'provider id',
                    key: 'guid',
                    defaultValue: '',
                },
                {
                    header: 'cue points',
                    key: 'adBreaks',
                    defaultValue: '',
                    validation: {
                        required: false,
                    }
                },
                {
                    header: 'legal lines',
                    key: '',
                    defaultValue: 'Not Required',
                },
            ]
        }
    ]
}
