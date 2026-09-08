import { XmlOutputDefinition } from "./types";

export const XumoEpisodes: XmlOutputDefinition = {
    name: "Xumo Episodes RSS",
    id: "XumoEpisodesRSS",
    outputName: "XumoEpisodesRSS",
    outputFormat: "xml",
    requiresDownloadLink: true,

    namespaces: {
        "xmlns:media": "http://search.yahoo.com/mrss/",
        "xmlns:xumo": "http://www.xumo.com/rss/extensions/",
        "xmlns:dcterms": "http://purl.org/dc/terms/",
        "version": "2.0"
    },

    channel_tree: [
        {
            tag: "item",
            children: [
                {
                    tag: "guid",
                    att: {
                        isPermaLink: {
                            key: "",
                            defaultValue: "false"
                        }
                    },
                    text: {
                        key: "series_id",
                        defaultValue: ""
                    }
                },
                {
                    tag: "title",
                    text: {
                        key: "series_seriesName",
                        defaultValue: ""
                    }
                },
                {
                    tag: "description",
                    text: {
                        key: "series_seriesShortSynopsis",
                        defaultValue: "",
                        validation:{
                            required: true, 
                            maxLength: 100,
                        }
                    }
                },
                {
                    tag: "media:thumbnail",
                    att: {
                        swerve_id: { key: "series_id" },
                        width: {
                            key: "",
                            defaultValue: "1980"
                        },
                        height: {
                            key: "",
                            defaultValue: "1020"
                        },
                        url: {
                            key: "",
                            defaultValue: "$seriesDefaultArt$"
                        }
                    }
                },
                {
                    tag: "media:keywords",
                    text: {
                        key: "tags",
                        defaultValue: "",
                        validation: {
                            required: true
                        }
                    },
                },
                {
                    tag: "xumo:episodic",
                    att: {
                        type:{
                            key:"",
                            defaultValue: "series"
                        }
                    },
                },
            ]
        }
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
            tag: "description",
            text: {
                key: "shortSynopsis",
                defaultValue: ""
            }
        },
        {
            tag: "media:content",
            att: {
                swerve_id: { key: "guid" },
                type: {
                    key: "",
                    defaultValue: "video/mp4"
                },
                medium: {
                    key: "",
                    defaultValue: "video"
                },
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
                width: {
                    key: "",
                    defaultValue: "1980"
                },
                height: {
                    key: "",
                    defaultValue: "1020"
                },
                url: {
                    key: "",
                    defaultValue: "$titleArt$"
                }
            }
        },
        {
            tag: "media:subtitle",
            att: {
                swerve_id: { key: "guid" },
                type: {
                    key: "",
                    defaultValue: "text/srt"
                },
                lang: {
                    key: "",
                    defaultValue: "en"
                },
                href: {
                    key: "",
                    defaultValue: "$titleCaptions$"
                }
            }
        },
        {
            tag: "media:keywords",
            text: {
                key: "tags",
                defaultValue: "",
                validation: {
                    required: true
                }
            },
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
                key: "genre",
                defaultValue: ""
            }
        },
        {
            tag: "media:rating",
            att: {
                scheme: {
                    key: "rating",
                    defaultValue: "", 
                    transform: {
                        type: "ratingSource", 
                        from: "ratingValue", 
                        to: "xumoRatingSource"
                    }
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
                key: "adBreaks",
                defaultValue: "",
                transform: {
                    type: "adBreaks",
                    from: "HH:mm:ss;ff",
                    to: "seconds"
                },
                validation: {
                    required: true
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
        {
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
                        key: "series_id",
                        defaultValue: ""
                    }
                },
                {
                    tag: "xumo:seasonNum",
                    text: {
                        key: "season",
                        defaultValue: ""
                    }
                },
                {
                    tag: "xumo:episodeNum",
                    text: {
                        key: "episode",
                        defaultValue: ""
                    }
                }
            ]
        }
    ]
};