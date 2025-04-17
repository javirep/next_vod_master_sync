import { outputMasterType } from "./types";

export const XumoMasterJavi: outputMasterType = {
    name: 'Xumo CSV',
    id: 'xumocsv',
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
                to: 'xumo',
            }
        },
        {
            header: 'GUID',
            key: 'guid',
            defaultValue: '',
        },
        {
            header: 'synopsis',
            key: 'synopsis',
            defaultValue: '',
        },
        {
            header: 'tags',
            key: 'tags',
            defaultValue: '-',
        },
        {
            header: 'genre',
            key: 'genre',
            defaultValue: '',
        },
        {
            header: 'rating',
            key: 'ratingValue',
            defaultValue: '',
            transform: {
                type: 'ratingSource',
                from: 'masterTracker',
                to: 'xumo',
            }
        },
        {
            header: 'ad_breaks',
            key: 'adBreaks',
            defaultValue: '',
            transform: {
                type: 'adBreaks',
                from: 'HH:mm:ss;ff',
                to: 'seconds',
            }
        },
        {
            header: 'window_end',
            key: 'rightsEnd',
            defaultValue: '',
        },
        {
            header: 'release_date',
            key: 'releaseDate',
            defaultValue: '',
        },
        {
            header: 'video_link',
            key: '',
            defaultValue: '',
        },
        {
            header: 'main_art_height',
            key: '',
            defaultValue: '',
        },
        {
            header: 'main_art_width',
            key: '',
            defaultValue: '',
        },
        {
            header: 'main_art_link',
            key: '',
            defaultValue: '',
        },
        {
            header: 'captions_link',
            key: '',
            defaultValue: '',
        },
        {
            header: 'tms_id',
            key: 'teamsID',
            defaultValue: '',
        },
        {
            header: 'series_guid',
            key: 'seriesId',
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
            header: 'series_title',
            key: 'seriesTitle',
            defaultValue: '',
        },
        {
            header: 'series_description',
            key: 'seriesDescription',
            defaultValue: '',
        },
        {
            header: 'series_main_art_height',
            key: '',
            defaultValue: '',
        },
        {
            header: 'series_main_art_width',
            key: '',
            defaultValue: '',
        },
        {
            header: 'series_main_art_link',
            key: '',
            defaultValue: '',
        },
        {
            header: 'series_tags',
            key: '',
            defaultValue: '',
        },
    ]
}
