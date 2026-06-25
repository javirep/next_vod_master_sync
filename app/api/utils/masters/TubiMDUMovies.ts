import { outputMasterType } from "./types";

export const TubiMDUMoviesMaster: outputMasterType = {
    name: 'Tubi MDU Movies',
    id: 'tubiMDUMovies',
    outputName: 'Tubi-MDU-Movies',
    outputFormat: 'csv',

    tabs : [
        {
            tabName: 'main',
            content: [

                {
                    header: 'content type',
                    key: '',
                    defaultValue: 'movie',
                },
                {
                    header: 'title',
                    key: 'title',
                    defaultValue: '',
                    validation:{
                        required: true
                    }
                },
                {
                    header: 'description',
                    key: 'shortSynopsis',
                    defaultValue: '',
                    validation:{
                        required: true,
                        maxLength: 180
                    }
                },
                {
                    header: 'video filename',
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
                    header: 'trailer filename',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'poster filename',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'landscape filename',
                    key: 'artFilename',
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
                    header: 'hero filename',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'background filename',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'release date',
                    key: 'releaseDate',
                    defaultValue: '',
                    transform:{
                        type: "date",
                        from: "YYYY-MM-DD",
                        to: "YYYY"
                    },
                    validation: {
                        required: true,
                        format: 'YYYY',
                    }
                },
                {
                    header: 'parental rating',
                    key: 'rating',
                    defaultValue: '',
                    transform: {
                        type: 'ratingValue',
                        from: 'masterTracker',
                        to: 'noNR',
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
                    header: '',
                    key: '',
                    defaultValue: '',
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
                    key: '',
                    defaultValue: '',
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
                    header: 'imbd id',
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
                },
                {
                    header: 'legal lines',
                    key: '',
                    defaultValue: '',
                },

            ]
        }
    ]
}
