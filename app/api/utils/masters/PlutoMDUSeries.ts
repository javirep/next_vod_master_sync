import { outputMasterType } from "./types";

export const PlutoMDUSeriesMaster: outputMasterType = {
    name: 'Pluto MDU Series',
    id: 'plutoMDUSeriesManifest',
    outputName: 'Pluto-MDU-Series',
    outputFormat: 'xlsx',

    tabs : [
        {
            tabName: 'SERIES & TELEVISION',
            content: [
                {
                    header: 'GUID or custom code',
                    key: 'guid',
                    defaultValue: '',
                },
                {
                    header: 'Gracenote Series TMS ID',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Gracenote Episode TMS ID',
                    key: 'TMSID',
                    defaultValue: '',
                },
                {
                    header: 'EIDR ID Series',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'EIDR ID Episode',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'IMDb Series ID',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'IMDb Episode ID',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Pluto Avails ID',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'TV Series Name',
                    key: 'series_seriesName',
                    defaultValue: '',
                    validation: {
                        required: true
                    }
                },
                {
                    header: 'Localized TV Series Name',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'TV Series Long Description',
                    key: 'series_seriesSynopsis',
                    defaultValue: '',
                    validation: {
                        required: true
                    }
                },
                {
                    header: 'TV Series Short Description',
                    key: 'series_seriesShortSynopsis',
                    defaultValue: '',
                    validation: {
                        required: true
                    }
                },
                {
                    header: 'TV Series Season Number',
                    key: 'season',
                    defaultValue: '',
                    validation: {
                        required: true,
                    }
                },
                {
                    header: 'Episode Number',
                    key: 'episode',
                    defaultValue: '',
                    validation: {
                        required: true,
                    }
                },
                {
                    header: 'Episode Name',
                    key: 'title',
                    defaultValue: '',
                    validation: {
                        required: true
                    }
                },
                {
                    header: 'Episode Long Description',
                    key: 'synopsis',
                    defaultValue: '',
                    validation: { 
                        required: true
                    }
                },
                {
                    header: 'Episode Short Description ',
                    key: 'shortSynopsis',
                    defaultValue: '',
                    validation: {
                        required: true
                    }
                },
                {
                    header: 'Ad Breakpoints',
                    key: 'adBreaks',
                    defaultValue: '',
                    validation: {
                        required: true
                    }
                },
                {
                    header: 'Regions',
                    key: 'rightsTerritory',
                    defaultValue: '',
                    transform: {
                        type: 'territories',
                        from: "MasterTracker",
                        to: "Pluto"
                    }
                },
                {
                    header: 'Copyright Information',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Content Rating**',
                    key: 'rating',
                    defaultValue: '',
                    transform: {
                        type: 'rating',
                        from: "MasterTracekr", 
                        to: "NoNR"
                    }
                },
                {
                    header: 'Content Rating Descriptors**',
                    key: '',
                    defaultValue: 'MPAA',
                },
                {
                    header: 'TV Series Tags or Keywords',
                    key: 'series_seriesTags',
                    defaultValue: '',
                },
                {
                    header: 'Original Release Date',
                    key: 'releaseDate',
                    defaultValue: '',
                    validation:{
                        required: true
                    }
                },
                {
                    header: 'Production Company',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Production Countries',
                    key: 'countryOfOrigin',
                    defaultValue: '',
                    validation: {
                        required: true
                    }
                },
                {
                    header: 'Production Year',
                    key: 'releaseDate',
                    transform: {
                        type: 'date',
                        from: "YYYY-MM-DD",
                        to: "YYYY"
                    }
                },
                {
                    header: 'Series Metadata Language',
                    key: '',
                    defaultValue: 'en',
                },
                {
                    header: 'Episode Metadata Language',
                    key: '',
                    defaultValue: 'en',
                },
                {
                    header: 'Director',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Actor(s)',
                    key: 'mainCast',
                    defaultValue: '',
                },
                {
                    header: 'Writer(s)',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Producer(s)',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Series Trailer File Name',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Video File Name',
                    key: 'videoFilename',
                    defaultValue: ''
                },
                {
                    header: 'Film Color',
                    key: '',
                    defaultValue: 'c',
                },
                {
                    header: 'Video Language',
                    key: '',
                    defaultValue: 'en',
                },
                {
                    header: 'Dubbed Languages',
                    key: '',
                    defaultValue: ''
                },
                {
                    header: 'Dubbed Language File Name',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Descriptive Video Service (DVS) / Audio Description Tracks Languages Ordered',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'DVS / AD File Name',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Closed Caption Requirements',
                    key: '',
                    defaultValue: 'True',
                },
                {
                    header: 'CC Language',
                    key: '',
                    defaultValue: 'en',
                },
                {
                    header: 'CC File Name',
                    key: 'captionsFilename',
                    defaultValue: '',
                    validation: {
                        required: true
                    }
                },
                {
                    header: 'Subtitle Language',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Subtitle File Name',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Featured Artwork',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Vertical Artwork',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Horizontial Artwork',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Square Artwork',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Screenshot 16x9',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Screenshot 4x3',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Title Treatment White',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Title Treatment Color',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Featured 2x3',
                    key: '',
                    defaultValue: '',
                },
                {
                    header: 'Backdrop 16x9',
                    key: '',
                    defaultValue: '',
                },
            ]
        }
    ]
}
