import { XmlOutputDefinition } from "./types";

export const XumoRSS: XmlOutputDefinition = {
    name: "Xumo RSS",
    id: "XumoRSS",
    outputName: "XumoRSS",
    outputFormat: "xml",
    requiresDownloadLink: true,

    namespaces: {
        "xmlns:media": "http://search.yahoo.com/mrss/",
        "xmlns:xumo": "http://www.xumo.com/rss/extensions/",
        "xmlns:dcterms": "http://purl.org/dc/terms/",
        "version": "2.0"
    },

    channel_tree: [
        
    ],

    item_tree: [
        {
            tag: "guid",
            att: {
                isPermaLink: {
                    key: "",
                    defaultValue: "false"
                }
            },
            text: {
                key: "guid",
                defaultValue: ""
            }
        },
        {
            tag: "title",
            text: {
                key: "title",
                defaultValue: ""
            }
        },
        {
            tag: "pubDate",
            text: {
                key: "",
                defaultValue: ""
            }
        },
        {
            tag: "description",
            text: {
                key: "shortSynopsis",
                defaultValue: ""
            }
        },
        {
            tag: "media:content",
            att: {
                type: {
                    key: "",
                    defaultValue: "video/mp4"
                },
                medium: {
                    key: "",
                    defaultValue: "video"
                },
                url: {
                    key: "videoFilename",
                    transform: {
                        type: "filename",
                        from: "filename",
                        to: "downloadLink"
                    }
                }
            }
        },
        {
            tag: "media:thumbnail",
            att: {
                width: {
                    key: "",
                    defaultValue: "1980"
                },
                height: {
                    key: "",
                    defaultValue: "1020"
                },
                url: {
                    key: "artFilename",
                    transform: {
                        type: "filename",
                        from: "filename",
                        to: "downloadLink"
                    }
                }
            }
        },
        {
            tag: "media:subtitle",
            att: {
                type: {
                    key: "",
                    defaultValue: "text/srt"
                },
                lang: {
                    key: "",
                    defaultValue: "en"
                },
                href: {
                    key: "artFilename",
                    transform: {
                        type: "filename",
                        from: "filename",
                        to: "downloadLink"
                    }
                }
            }
        },
        {
            tag: "media:keywords",
            text: {
                key: "tags",
                defaultValue: ""
            }
        },
        {
            tag: "media:category",
            att: {
                scheme: {
                    key: "",
                    defaultValue: "http://www.xumo.com"
                }
            },
            text: {
                key: "Genre",
                defaultValue: ""
            }
        },
        {
            tag: "media:rating",
            att: {
                scheme: {
                    key: "",
                    defaultValue: "mpaa"
                }
            },
            text: {
                key: "rating",
                defaultValue: ""
            }
        },
        {
            tag: "xumo:cuePoints",
            text: {
                key: "adbreaks",
                defaultValue: "",
                transform: {
                    type: "adBreaks",
                    from: "HH:mm:ss;ff",
                    to: "seconds"
                }
            }
        },
        {
            tag: "dcterms:valid",
            text: {
                key: "rightsEnd",
                defaultValue: "",
                transform: {
                    type: "rights",
                    from: "",
                    to: "xumoRights",
                    using: ["rightsStart"]
                }
            }
        },
        /* {
            tag: "xumo:episodic",
            att: {
                type: {
                    key: "",
                    defaultValue: "",

                }
            },
            children: [
                {
                    tag: "xumo:seriesId",
                    text: {
                        key: "",
                        defaultValue: ""
                    }
                },
                {
                    tag: "xumo:seasonNum",
                    text: {
                        key: "",
                        defaultValue: ""
                    }
                },
                {
                    tag: "xumo:episodeNum",
                    text: {
                        key: "",
                        defaultValue: ""
                    }
                }
            ]
        } */
    ]
};