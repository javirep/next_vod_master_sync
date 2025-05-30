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
            }
        },
        {
            header: 'video_file',
            key: 'videoPath',
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
            key: 'artFileName',
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
            key: 'series',
            defaultValue: '',
        },
        {
            header: 'season_number',
            key: 'season',
            defaultValue: '',
        },
        {
            header: 'episode_number',
            key: 'episode',
            defaultValue: '',
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
            key: '',
            defaultValue: '',
        },
        {
            header: 'country',
            key: 'countryOfOrigin',
            defaultValue: '',
        },
        {
            header: 'rating',
            key: 'ratingValue',
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
            defaultValue: 'en',
            transform: {
                type: 'string',
                from: 'filePath',
                to: 'fileName',
            }
        },
        {
            header: 'captions_file',
            key: 'captionsFileName',
            defaultValue: '',
        },
        {
            header: 'guid',
            key: 'guid',
            defaultValue: ''
        },
    ]
}
