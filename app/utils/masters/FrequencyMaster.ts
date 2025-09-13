import { outputMasterType } from "./types";

export const FrequencyMaster: outputMasterType = {
    name: 'Frequency Manifest',
    id: 'frequencyManifest',
    outputName: 'Swerve-Metadata-Manifest',
    master: [
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
            header: 'keywords',
            key: 'tags',
            defaultValue: '',
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
            header: 'duration_seconds',
            key: 'duration',
            defaultValue: '',
            transform: {
                type: 'duration',
                from: 'min',
                to: 'seconds',
            },
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
            header: 'publish_date',
            key: 'releaseDate',
            defaultValue: '',
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
            header: 'captions_file',
            key: 'captionsFilename',
            defaultValue: '',
            transform: {
                type: 'string',
                from: 'filePath',
                to: 'fileName',
            }
        },
        {
            header: 'guid',
            key: 'guid',
            defaultValue: ''
        },
        {
            header: 'File Path',
            key: 'filePath'
        },
        {
            header: 'Updated File Path', 
            key: 'updatedFilename',
            defaultValue:''
        }
    ]
}
