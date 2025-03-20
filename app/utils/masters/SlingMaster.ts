import { outputMasterType } from "./types";

export const SlingMaster: outputMasterType = {
    name: 'Sling data CSV',
    id: 'slingDataCSV',
    master: [
        {
            header: 'Title_key',
            key: '',
            defaultValue: '',
        },
        {
            header: 'Title',
            key: 'title',
            defaultValue: '',
        },
        {
            header: 'Summary_Short',
            key: 'shortSynopsis',
            defaultValue: '',
        },
        {
            header: 'Year',
            key: 'releaseDate',
            defaultValue: '',
            transform: {
                type: 'date',
                from: 'YYYY-MM-DD',
                to: 'YYYY',
            }
        },
        {
            header: 'Ad_Content_ID',
            key: 'adContentId',
            defaultValue: '',
        },
        {
            header: 'Sling_Category',
            key: '',
            defaultValue: '',
        },
        {
            header: 'Licensing_Window_Start',
            key: 'rightsStart',
            defaultValue: '',
        },
        {
            header: 'Licensing_Window_End',
            key: 'rightsEnd',
            defaultValue: '',
        },
        {
            header: 'Rating',
            key: 'ratingValue',
            defaultValue: '',
        },
        {
            header: 'Original_Air_Date',
            key: 'releaseDate',
            defaultValue: '',
        },
        {
            header: 'Series_Name',
            key: 'serie',
            defaultValue: '',
        },
        {
            header: 'Episode_Name',
            key: 'title',
            defaultValue: '',
        },
        {
            header: 'Season_Number',
            key: 'season',
            defaultValue: '',
        },
        {
            header: 'Episode_Number',
            key: 'episode',
            defaultValue: '',
        },
        {
            header: 'Ad_Breaks',
            key: 'adBreaks',
            defaultValue: '',
        }

    ]
}
