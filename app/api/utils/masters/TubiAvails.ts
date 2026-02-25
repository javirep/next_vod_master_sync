import { outputMasterType } from "./types";

export const TubiAvailsMaster: outputMasterType = {
    name: 'Tubi Avails Master',
    id: 'TubiAvails',
    outputName: 'Swerve_Avails_For_Tubi',
    outputFormat: 'xlsx',
    tabs: [
        {
            tabName: 'Sheet 1',
            content: [
                {
                    header: 'Trailer/Screener Link',
                    key: '',
                    defaultValue: ''
                },
                {
                    header: 'Trailer Password',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'IMDB Link',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Title',
                    key: 'title',
                    defaultValue: '',
                },
                {
                    header: 'Type (movie or series)',
                    key: 'type',
                    defaultValue: '',
                    transform: {
                        type: 'type',
                        from: 'masterTracker',
                        to: 'Roku',
                    },
                    validation: {
                        required: true,
                        format: 'tubiContentType',
                    }
                },
                {
                    header: 'Year',
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
                    header: 'Directors',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Country Whitelist',
                    key: 'rightsTerritory',
                    defaultValue: '',
                },
                {
                    header: 'Country Blacklist',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Start Date',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'End Date',
                    key: 'rightsEnd',
                    defaultValue: '',
                },
                {
                    header: 'Series Delivery Type',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Episodes Expected',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Notes',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'description',
                    key: 'shortSynopsis',
                    defaultValue: '',
                },
                {
                    header: 'actors',
                    key: 'mainCast',
                    defaultValue: '',
                },
                {
                    header: 'genres',
                    key: 'genre',
                    defaultValue: '',
                },
                {
                    header: 'countries',
                    key: 'countryOfOrigin',
                    defaultValue: '',
                },
                {
                    header: 'languages',
                    key: '',
                    defaultValue: 'en',
                },
                {
                    header: 'mpaa rating',
                    key: 'rating',
                    defaultValue: '',
                },
                {
                    header: 'tvpg rating',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'tags',
                    key: 'tags',
                    defaultValue: '',
                },
                {
                    header: 'partner id',
                    key: 'guid',
                    defaultValue: '',
                },
                {
                    header: 'imbd id',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'rt id',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'metacritic id',
                    key: '',
                    defaultValue: '',
                },
            ]
        }
    ]
}
