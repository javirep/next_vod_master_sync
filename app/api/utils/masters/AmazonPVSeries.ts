import moment from "moment";
import { XmlOutputDefinition } from "./types";

export const AmazonPVSeries: XmlOutputDefinition = {
    name: 'Amazon PV Series',
    id: 'AmazonPVSeries',
    outputName: 'AmazonPVSeries',
    outputFormat: 'xml',
    requiresDownloadLink: true,

    namespaces: {
        "xmlns:media": "http://search.yahoo.com/mrss/",
        "xmlns:itunes": "http://www.itunes.com/dtds/podcast-1.0.dtd",
        "xmlns:dcterms": "http://purl.org/dc/terms/",
        "xmlns:jwplayer": "http://rss.jwpcdn.com/",
        "xmlns:atom": "http://www.w3.org/2005/Atom",
        "version": "2.0"
    },

    channel_tree: [
        {
            "tag": "title",
            "text": {
                key: 'series_seriesName',
            }
        },
        {
        "tag": "guid",
        "att": {
            "isPermaLink": {
                key: '',
                defaultValue: "false",
            }
        },
        "text": { key: 'series_id' }
        },
        {
            "tag": "description",
            "text": { key: 'series_seriesShortSynopsis' }
        },
        {
        "tag": "language",
        "text": { key: '', defaultValue: "En-US" }
        },
        {
        "tag": "pubDate",
        "text": { key: 'series_seriesReleaseDate' }
        },
        {
        "tag": "image",
        "children": [
            {
                "tag": "url",
                "att": { 
                    "swerve_id": { key: "series_id" },
                 },
                "text": { key: '', defaultValue: "$seriesBackgroundArt$" }
            }
        ]
        },
        {
        "tag": "media:group",
        "children": [
            {
            "tag": "media:content",
            "att": {
                    "swerve_id": { key: "series_id" },
                    "url": { key: '', defaultValue: "$seriesDefaultArt$" },
                    "medium": { key: '', defaultValue: "image" }
            },
            "children": [
                {
                    "tag": "media:category",
                    "text": { key: '', defaultValue: "cover" }
                },
                {
                    "tag": "itunes:seasonNumber",
                    "text": { key: "season" }
                }
            ]
            },
            {
            "tag": "media:content",
            "att": {
                "swerve_id": { key: "series_id" },
                "url": { key: '', defaultValue: "$seriesPosterArt$" },
                "medium": { key: '', defaultValue: "image" }
            },
            "children": [
                {
                    "tag": "media:category",
                    "text": { key: '', defaultValue: "image" }
                },
                {
                    "tag": "itunes:seasonNumber",
                    "text": { key: "season" }
                }
            ]
            },
            {
            "tag": "media:content",
            "att": {
                "swerve_id": { key: "series_id" },
                "url": { key: '', defaultValue: "$seriesBoxArt$" },
                "medium": { key: '', defaultValue: "image" }
            },
            "children": [
                {
                    "tag": "media:category",
                    "text": { key: '', defaultValue: "box" }
                },
                {
                    "tag": "itunes:seasonNumber",
                    "text": { key: "season" }
                }
            ]
            },
            {
            "tag": "media:content",
            "att": {
                "swerve_id": { key: "series_id" },
                "url": { key: '', defaultValue: "$seriesHeroArt$" },
            },
            "children": [
                {
                    "tag": "media:category",
                    "text": { key: '', defaultValue: "box" }
                },
                {
                    "tag": "itunes:seasonNumber",
                    "text": { key: 'season', }
                }
            ]
            }
        ]
        }
    ],
    item_tree: [
        {
            tag:"guid",
            att: {
                "isPermaLink": {
                    key: '',
                    defaultValue: "false",
                }
            },
            text:{ 
                key: 'guid',
            }
        },
        {
            tag: "title",
            text: { 
                key: 'title'
            }
        },
        {
            tag: "description",
            text: { 
                key: "shortSynopsis"
            }
        },
        {
            tag: "pubDate",
            text: {
                key: "releaseDate",
                transform: {
                    type: "date",
                    from: "YYY-MM-DD",
                    to: "YYYY-MM-DD[T]HH:mm:ss[Z]"
                }
            }, 
        },
        {
            tag: "media:content",
            att: {
                swerve_id: { key: "guid" },
                url: {
                    key: "",
                    defaultValue: "$titleVideo$"
                }
            }
        },
        {
            tag: "media:thumbnail",
            att: {
                swerve_id: { key: "guid" },
                url: {
                    key: "",
                    defaultValue: "$titleArt$"
                }
            }
        },
        {
            tag: "media:credit",
            att: {
                role : {
                    key:"",
                    defaultValue: "actor"
                }
            },
            text: { 
                key: "mainCast",
                defaultValue: ""
            }
        },
        {
            tag: "media:credit",
            att: {
                role : {
                    key:"",
                    defaultValue: "producer"
                }
            }
        },
        {
            tag: "media:category",
            text: {
                key: "genre",
                defaultValue:""
            }
        },
        {
            tag: "media:rating",
            att: {
                scheme: {
                    key: "rating",
                    transform: {
                        type: "rating",
                        from: "rating",
                        to: "AmazonPVRatingSource"
                    }
                }
            },
            text: {
                key: "rating"
            }
        },
        {
            tag: "itunes:season",
            text: {
                key: "season"
            }
        },
        {
            tag: "itunes:episode",
            text: {
                key: "episode"
            }
        },
        {
            tag: "media:restriction",
            att: {
                relationship: {
                    key: "", 
                    defaultValue: "allow"
                },
                type: {
                    key: "", 
                    defaultValue: "country"
                },
            },
            text: {
                key: "rightsTerritory"
            }
        },
        {
            tag: "dcterms:valid",
            text: {
                key: "rightsEnd",
                transform: {
                    type: "date",
                    from: "YYYY-MM-DD",
                    to: "YYYY-MM-DDTHH:mm:ssZ/YYYY-MM-DDTHH:mm:ssZ",
                    using: ["rightsStart"]
                },
            }
        },
        {
            tag: "media:subTitle",
            att: {
                type:{
                    key: "",
                    defaultValue: "text/srt"
                },
                lang: {
                    key: "",
                    defaultValue: "en-US"
                },
                swerve_id: { key: "guid" },
                href: {
                    key: "",
                    defaultValue: "$titleArt$"
                }
            }
        },
        {
            tag: "jwplayer:cuepoints",
            text: {
                key: "cuePoints"
            }
        },
        {
            tag:"atom:updated",
            text:{
                key:"",
                defaultValue: moment().format('YYYY-MM-DDTHH:mm:ssZ')
            }
        }
    ]
}