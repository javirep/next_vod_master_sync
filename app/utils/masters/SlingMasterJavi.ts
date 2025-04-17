import { outputMasterType } from "./types";

export const SlingMasterJavi: outputMasterType = {
    name: 'Sling data CSV (Javi)',
    id: 'slingDataCSVJavi',
    master: [
        {
            header: 'title',
            key: 'title',
            defaultValue: '',
        },
        {
            header: 'type',
            key: 'type',
            defaultValue: '',
            transform: {
                type: 'type',
                from: 'masterTracker',
                to: 'string',
            }
        },
        {
            header: 'GUID',
            key: 'guid',
            defaultValue: '',
        },
        {
            header: 'short_summary',
            key: 'shortSynopsis',
            defaultValue: '',
        },
        {
            header: 'duration',
            key: 'duration',
            defaultValue: '',
            transform: {
                type: 'duration',
                from: 'min',
                to: 'HH:mm:ss',
            }
        },
        {
            header: 'display_run_time',
            key: 'duration',
            defaultValue: '',
            transform: {
                type: 'duration',
                from: 'min',
                to: 'HH:mm:ss',
            }
        },
        {
            header: 'original_air_date',
            key: 'releaseDate',
            defaultValue: '',
        },
        {
            header: 'title_year',
            key: 'releaseDate',
            transform: {
                type: 'date',
                from: 'YYYY-MM-DD',
                to: 'YYYY',
            },
        },
        {
            header: 'window_end',
            key: 'rightsEnd',
            defaultValue: '',
        },
        {
            header: 'window_start',
            key: 'rightsStart',
            defaultValue: '',
        },
        {
            header: 'rating',
            key: 'ratingValue',
            defaultValue: '',
        },
        {
            header: 'sling_id',
            key: 'slingId',
            defaultValue: '',
        },
        {
            header: 'sling_category',
            key: 'slingCategory',
            defaultValue: '',
        },
        {
            header: 'genre',
            key: 'genre',
            defaultValue: '',
        },
        {
            header: 'series',
            key: 'seriesName',
            defaultValue: '',
        },
        {
            header: 'season',
            key: 'season',
            defaultValue: '',
        },
        {
            header: 'episode',
            key: 'episode',
            defaultValue: '',
        },
        {
            header: 'main_cast',
            key: 'mainCast',
            defaultValue: '',
        },
        {
            header: 'ad_breaks',
            key: 'adBreaks',
            defaultValue: '',
        },
        {
            header: 'movie_file_name',
            key: 'videoPath',
            defaultValue: '',
            transform: {
                type: 'string',
                from: 'filePath',
                to: 'fileName',
            }
        },
        {
            header: 'movie_audio_type',
            key: '',
            defaultValue: '',
        },
        {
            header: 'movie_bit_rate',
            key: '',
            defaultValue: '',
        },
        {
            header: 'movie_content_checksum',
            key: '',
            defaultValue: '',
        },
        {
            header: 'movie_content_filesize',
            key: '',
            defaultValue: '',
        },
        {
            header: 'movie_resolution',
            key: '',
            defaultValue: '',
        },
        {
            header: 'poster_file_name',
            key: 'artFileName',
            defaultValue: '',
            transform: {
                type: 'string',
                from: 'filePath',
                to: 'fileName',
            }
        },
        {
            header: 'poster_content_checksum',
            key: '',
            defaultValue: '',
        },
        {
            header: 'poster_content_file_size',
            key: '',
            defaultValue: '',
        },
        {
            header: 'poster_image_aspect_ratio',
            key: '',
            defaultValue: '',
        },
        {
            header: 'franchise_poster_file_name',
            key: 'seriesArtFileName',
            defaultValue: '',
            transform: {
                type: 'string',
                from: 'filePath',
                to: 'fileName',
            }
        },
        {
            header: 'franchise_poster_content_checksum',
            key: '',
            defaultValue: '',
        },
        {
            header: 'franchise_poster_content_file_size',
            key: '',
            defaultValue: '',
        },
        {
            header: 'franchise_poster_image_aspect_ratio',
            key: '',
            defaultValue: '',
        },
        {
            header: 'captions_file_name',
            key: 'captionsFileName',
            defaultValue: '',
            transform: {
                type: 'string',
                from: 'filePath',
                to: 'fileName',
            }
        },
    ]
}
