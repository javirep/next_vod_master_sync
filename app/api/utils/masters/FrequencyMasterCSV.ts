import { outputMasterType } from "./types";

export const FrequencyMasterCSV: outputMasterType = {
    name: 'Frequency Manifest (.csv)',
    id: 'frequencyManifestCSV',
    outputName: 'Swerve-Metadata-Manifest',
    outputFormat: 'csv',
    tabs: [
        {
            tabName: 'main',
            content: [
                {
                    header: 'guid',
                    key: 'guid',
                    defaultValue: ''
                },
                {
                    header: 'video_file',
                    key: 'videoFilename',
                    defaultValue: '',
                    transform: {
                        type: 'string',
                        from: 'filePath',
                        to: 'fileName',
                    }, 
                    validation: {
                        required: true,
                        isUnique: true,
                    }
                },
                {
                    header: 'original_video',
                    key: 'originalVideoFilename',
                    defaultValue: '',
                    transform: {
                        type: 'string',
                        from: 'filePath',
                        to: 'fileName',
                    }, 
                    validation: {
                        required: true,
                        isUnique: true,
                    }
                },
                {
                    header: 'thumbnail_file',
                    key: 'artFilename',
                    defaultValue: '',
                    transform: {
                        type: 'string',
                        from: 'filePath',
                        to: 'fileName',
                    },
                    validation: {
                        required: true,
                    }
                },
                {
                    header: 'original_thumbnail',
                    key: 'originalArtFilename',
                    defaultValue: '',
                    transform: {
                        type: 'string',
                        from: 'filePath',
                        to: 'fileName',
                    },
                    validation: {
                        required: true,
                    }
                },
                {
                    header: 'captions_file',
                    key: 'captionsFilename',
                    defaultValue: '',
                    transform: {
                        type: 'string',
                        from: 'filePath',
                        to: 'fileName',
                    },
                    validation: {
                        required: true,
                    }
                },
                {
                    header: 'original_captions',
                    key: 'originalCaptionsFilename',
                    defaultValue: '',
                    transform: {
                        type: 'string',
                        from: 'filePath',
                        to: 'fileName',
                    },
                    validation: {
                        required: true,
                    }
                },
                {
                    header: 'file_path',
                    key: 'filePath',
                    defaultValue:''
                },
                {
                    header: 'title',
                    key: 'title',
                    defaultValue: '',
                    validation: {
                        required: true,
                    }
                },
                {
                    header: 'description',
                    key: 'shortSynopsis',
                    defaultValue: '',
                    validation: {
                        required: true,
                        maxLength: 110,
                    }
                },
                {
                    header: 'genre',
                    key: 'genre',
                    defaultValue: '',
                    transform: {
                        type: 'genre',
                        from: 'masterTracker',
                        to: 'frequency',
                    },
                    validation: {
                        required: true,
                    }
                },
                {
                    header: 'content_format',
                    key: 'type',
                    defaultValue: '',
                    transform: {
                        type: 'type',
                        from: 'masterTracker',
                        to: 'frequencyFormat',
                        using: ['series']
                    },
                    validation: {
                        required: true,
                    }
                },
                {
                    header: 'content_type',
                    key: 'type',
                    defaultValue: '',
                    transform: {
                        type: 'type',
                        from: 'masterTracker',
                        to: 'frequencyType',
                    },
                    validation: {
                        required: true,
                    }
                },
                {
                    header: 'country',
                    key: '',
                    defaultValue: 'US',
                },
                {
                    header: 'rating',
                    key: 'rating',
                    defaultValue: '',
                    validation: {
                        required: true,
                    }
                },
                {
                    header: 'audio_language',
                    key: '',
                    defaultValue: 'en',
                },
                {
                    header: 'captions_language',
                    key: '',
                    defaultValue: 'en'
                },
                {
                    header: 'keywords',
                    key: 'tags',
                    defaultValue: '',
                },
                {
                    header: 'series_name',
                    key: 'series_seriesName',
                    defaultValue: '',
                },
                {
                    header: 'season_number',
                    key: 'season',
                    defaultValue: '',
                    validation: {
                        required: false,
                        requiredIfField: 'series'
                    }
                },
                {
                    header: 'episode_number',
                    key: 'episode',
                    defaultValue: '',
                    validation: {
                        required: false,
                        requiredIfField: 'series'
                    }
                },
                {
                    header: 'cue_points',
                    key: 'adBreaks',
                    defaultValue: '',
                    transform: {
                        type: 'adBreaks',
                        from: 'HH:mm:ss;ff',
                        to: 'HH:mm:ss.fff',
                    },
                },
                {
                    header: 'tms_id',
                    key: 'TMSID',
                    defaultValue: '',
                },
                {
                    header: 'publish_date',
                    key: 'releaseDate',
                    defaultValue: '',
                },
                {
                    header: 'expiration_date',
                    key: 'rightsEnd',
                    defaultValue: '',
                },
                {
                    header: 'deal_id',
                    key: 'dealId',
                    defaultValue: '',
                    validation: {
                        required: true
                    }
                },
            ]
        }
    ]
}
