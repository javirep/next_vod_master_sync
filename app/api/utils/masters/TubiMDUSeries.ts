import { outputMasterType } from "./types";

export const TubiMDUSeriesMaster: outputMasterType = {
    name: 'Tubi MDU Series',
    id: 'tubiMDUSeries',
    outputName: 'Tubi-MDU-Series',
    outputFormat: 'csv',

    tabs : [
        {
            tabName: 'main',
            content: [
                {
                    header: "content type",
                    key: "",
                    defaultValue: "series"
                },
                {
                    header: "series title",
                    key: "series_seriesName",
                    defaultValue: "",
                    validation: { 
                        required: true
                    }
                },
                {
                    header: "description",
                    key: "series_seriesShortSynopsis",
                    defaultValue: "",
                    validation: { 
                        required: true
                    }
                },
                {
                    header: "poster filename",
                    key: "",
                    defaultValue: ""
                },
                {
                    header: "landscape filename",
                    key: "series_seriesArtFilename",
                    defaultValue: ""
                },
                {
                    header: "hero filename",
                    key: "",
                    defaultValue: ""
                },
                {
                    header: "background filename",
                    key: "",
                    defaultValue: ""
                },
                {
                    header: "release date",
                    key: "series_seriesReleaseDate",
                    defaultValue: "",
                    transform:{
                        type: "date",
                        from: "YYYY-MM-DD",
                        to: "YYYY"
                    },
                    validation: { 
                        required: true,
                    }
                },
                {
                    header: "parental rating",
                    key: "series_seriesRating",
                    defaultValue: "",
                    validation: { 
                        required: true,
                        allowedValues: ["TV-G", "TV-PG", "TV-14"]
                    }
                },
                {
                    header: "languages",
                    key: "",
                    defaultValue: "EN"
                },
                {
                    header: "countries",
                    key: "countryOfOrigin",
                    defaultValue: ""
                },
                {
                    header: "genres",
                    key: "series_seriesGenre",
                    defaultValue: "",
                    validation: { 
                        required: true,
                    }
                },
                {
                    header: "directors",
                    key: "",
                    defaultValue: ""
                },
                {
                    header: "actors",
                    key: "",
                    defaultValue: ""
                },
                {
                    header: "keywords",
                    key: "series_seriesTags",
                    defaultValue: ""
                },
                {
                    header: "imdb id",
                    key: "",
                    defaultValue: ""
                },
                {
                    header: "provider id",
                    key: "series_id",
                    defaultValue: "",
                    validation: { 
                        required: true
                    }
                },
                {
                    header: "legal lines",
                    key: "",
                    defaultValue: ""
                },
            ]
        }
    ]
}
