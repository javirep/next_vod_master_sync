import { outputMasterType } from "./types";

export const RokuMDUMoviesMaster: outputMasterType = {
    name: 'Roku MDU movies',
    id: 'rokuMDUMovies',
    outputName: 'Swerve-Roku-MDU',
    outputFormat: 'xlsx',
    
    tabs : [
        {
            tabName: 'main',
            content: [
                {
                    header: "Instructions",
                    key: '',
                    defaultValue: '',
                }, 
                {
                    header: "provider",
                    key: '',
                    defaultValue: 'Swerve',
                }, 
                {
                    header: "ContentType",
                    key: '',
                    defaultValue: 'film',
                },
                {
                    header: "language",
                    key: '',
                    defaultValue: 'en',
                },
                {
                    header: "original_spoken_language",
                    key: '',
                    defaultValue: 'en',
                },
                {
                    header: "country_of_origin",
                    key: 'countryOfOrigin',
                    defaultValue: '',
                    validation: {
                        required: false,
                        format: 'countryCode',
                    }
                },
                {
                    header: "asset_id",
                    key: 'id',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'uuid',
                        isUnique: true,
                    }
                },
                {
                    header: "title",
                    key: 'title',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'title',
                    }
                },
                {
                    header: "genres",
                    key: 'genre',
                    defaultValue: '',
                    validation: {
                        required: true,
                    }
                },
                {
                    header: "tags",
                    key: 'tags',
                    defaultValue: '',
                },
                {
                    header: "runtime",
                    key: 'duration',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'wholeNumber',
                    }
                },
                {
                    header: "release_date",
                    key: 'releaseDate',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'YYYY-MM-DD',
                    }
                },
                {
                    header: "adBreaks",
                    key: 'adBreaks',
                    defaultValue: '',
                    transform: {
                        type: 'adBreaks',
                        from: 'HH:mm:ss;ff',
                        to: 'HH:mm:ss.fff',
                    },
                    validation: {
                        required: false,
                        format: 'adBreaks-HH:mm:ss.fff',
                    }
                },
                {
                    header: "cuePoints",
                    key: '',
                    defaultValue: '',
                },
                {
                    header: "ratingSystem",
                    key: 'rating',
                    defaultValue: '',
                    transform: {
                        type: 'ratingSource',
                        from: 'masterTracker',
                        to: 'ratingSource',
                    },
                    validation: {
                        required: true,
                        format: 'ratingSource',
                    }
                },
                {
                    header: "ratings",
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
                    header: "cast",
                    key: 'mainCast',
                    defaultValue: '',
                },
                {
                    header: "director",
                    key: '',
                    defaultValue: '',
                },
                {
                    header: "short_synopsis",
                    key: 'shortSynopsis',
                    defaultValue: '',
                    validation: {
                        required: true,
                        maxLength: 250,
                    }
                },
                {
                    header: "long_synopsis",
                    key: 'synopsis',
                    defaultValue: '',
                },
                {
                    header: "eidr",
                    key: '',
                    defaultValue: '',
                },
                {
                    header: "tmsId",
                    key: 'TMSID',
                    defaultValue: '',
                },
                {
                    header: "closed_captions",
                    key: '',
                    defaultValue: 'Y',
                },
                {
                    header: "closed_captions_exemption",
                    key: '',
                    defaultValue: '',
                },
                {
                    header: "Video_File_Name",
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
                    header: "video_file_language",
                    key: '',
                    defaultValue: 'en',
                },
                {
                    header: "audio_layout",
                    key: '',
                    defaultValue: '',
                },
                {
                    header: "descriptive_audio_file_name",
                    key: '',
                    defaultValue: '',
                },
                {
                    header: "descriptive_audio_language",
                    key: '',
                    defaultValue: '',
                },
                {
                    header: "caption_file_name",
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
                    header: "keyart_file_name",
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
                    header: "background_file_name",
                    key: '',
                    defaultValue: '',
                },
                {
                    header: "boxcover_file_name",
                    key: '',
                    defaultValue: '',
                },
                {
                    header: "territory",
                    key: 'rightsTerritory',
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
                    header: "vodType",
                    key: '',
                    defaultValue: 'avod',
                },
                {
                    header: "license_start_date",
                    key: 'rightsStart',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'YYYY-MM-DD',
                    }
                },
                {
                    header: "license_end_date",
                    key: 'rightsEnd',
                    defaultValue: '',
                    validation: {
                        required: true,
                        format: 'YYYY-MM-DD',
                        futureDate: true,
                    }
                },
            ]
        }
    ]
}