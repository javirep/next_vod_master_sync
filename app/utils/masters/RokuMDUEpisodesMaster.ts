import { outputMasterType } from "./types";

export const RokuMDUEpisodesMaster: outputMasterType = {
    name: 'Roku MDU episodes',
    id: 'rokuMDUEpisodes',
    master: [
        {
            header: "Instructions",
            key: '',
            defaultValue: '',
        }, 
        {
            header: "Provider", 
            key: '',
            defaultValue: 'Swerve',
        },
        {
            header: "ContentType",
            key: '',
            defaultValue: 'episode',
        },
        {
            header: "language",
            key: '',
            defaultValue: 'en',
        },
        {
            header: "original_spoken_language",
            key: '',
            defaultValue: 'en',
        },
        {
            header: "country_of_origin",
            key: 'countryOfOrigin',
            defaultValue: '',
            validation: {
                required: false,
                format: 'countryCode',
            }
        },
        {
            header: "series_id",
            key: 'series_id',
            defaultValue: '',
            validation: {
                required: true,
                format: 'uuid'
            }
        },
        {
            header: "series_title",
            key: 'series_seriesName',
            defaultValue: '',
            validation: {
                required: true,
                format: 'title',
            }
        },
        {
            header: "series_tmsId",
            key: '',
            defaultValue: '',
        },
        {
            header: "series_release_date",
            key: 'series_seriesReleaseDate',
            defaultValue: '',
            validation: {
                required: true,
                format: 'YYYY-MM-DD',
            }
        },
        {
            header: "series_genres",
            key: 'series_seriesGenre',
            defaultValue: '',
            validation: {
                required: true,
            }
        },
        {
            header: "series_tags",
            key: 'series_seriesTags',
            defaultValue: '',
        },
        {
            header: "series_cast",
            key: '',
            defaultValue: '',
        },
        {
            header: "series_director",
            key: '',
            defaultValue: '',
        },
        {
            header: "series_short_synopsis",
            key: 'series_seriesShortSynopsis',
            validation: {
                required: true,
                maxLength: 250,
            }
        },
        {
            header: "series_long_synopsis",
            key: 'series_seriesSynopsis',
            defaultValue: '',
        },
        {
            header: "season_id",
            key: 'series_id',
            defaultValue: '',
            transform: {
                type: 'uuid',
                from: 'uuid',
                to: 'uuid-season',
                using: ['season'],
            },
            validation: {
                required: true,
                format: 'uuid-season'
            }
        },
        {
            header: "season_number",
            key: 'season',
            defaultValue: '',
            validation: {
                required: true,
                format: 'wholeNumber',
            }
        },
        {
            header: "season_tmsId",
            key: '',
            defaultValue: '',
        },
        {
            header: "asset_id",
            key: 'id',
            defaultValue: '',
            validation: {
                required: true,
                format: 'uuid',
                isUnique: true,
            }
        },
        {
            header: "episode_title",
            key: 'title',
            defaultValue: '',
            validation: {
                required: true,
                format: 'title',
            }
        },
        {
            header: "episode_number",
            key: 'episode',
            defaultValue: '',
            validation: {
                required: true,
                format: 'wholeNumber',
            }
        },
        {
            header: "episode_release_date",
            key: 'releaseDate',
            defaultValue: '',
            validation: {
                required: true,
                format: 'YYYY-MM-DD',
            }
        },
        {
            header: "episode_run_time",
            key: 'duration',
            defaultValue: '',
            validation: {
                required: true,
                format: 'wholeNumber',
            }
        },
        {
            header: "episode_adBreaks",
            key: 'adBreaks',
            defaultValue: '',
            transform: {
                type: 'adBreaks',
                from: 'HH:mm:ss;ff',
                to: 'HH:mm:ss.fff',
            },
            validation: {
                required: false,
                format: 'adBreaks-HH:mm:ss.fff',
            }
        },
        {
            header: "episode_cuePoints",
            key: '',
            defaultValue: '',
        },
        {
            header: "ratingSystem",
            key: 'ratingSource',
            defaultValue: '',
            transform: {
                type: 'ratingSource',
                from: 'masterTracker',
                to: 'Roku',
            },
            validation: {
                required: true,
                format: 'ratingSource',
            }
        },
        {
            header: "episode_ratings",
            key: 'ratingValue',
            defaultValue: '',
            validation: {
                required: true,
                format: 'ratingValue',
            }
        },
        {
            header: "episode_tags",
            key: 'tags',
            defaultValue: '',
        },
        {
            header: "episode_cast",
            key: 'mainCast',
            defaultValue: '',
        },
        {
            header: "episode_director",
            key: '',
            defaultValue: '',
        },
        {
            header: "episode_short_synopsis",
            key: 'shortSynopsis',
            defaultValue: '',
            validation: {
                required: true,
                maxLength: 250,
            }
        },
        {
            header: "episode_long_synopsis",
            key: 'synopsis',
            defaultValue: '',
        },
        {
            header: "episode_eidr",
            key: '',
            defaultValue: '',
        },
        {
            header: "episode_tmsId",
            key: '',
            defaultValue: '',
        },
        {
            header: "closed_captions",
            key: '',
            defaultValue: 'Y',
        },
        {
            header: "closed_captions_exemption",
            key: '',
            defaultValue: '',
        },
        {
            header: "Video_File_Name",
            key: 'videoPath',
            defaultValue: '',
            transform: {
                type: 'string',
                from: 'filePath',
                to: 'fileName',
            },
            validation: {
                required: true,
                format: 'fileName',
                isUnique: true,
            }
        },
        {
            header: "video_file_language",
            key: '',
            defaultValue: 'en',
        },
        {
            header: "audio_layout",
            key: '',
            defaultValue: '',
        },
        {
            header: "descriptive_audio_file_name",
            key: '',
            defaultValue: '',
        },
        {
            header: "descriptive_audio_language",
            key: '',
            defaultValue: '',
        },
        {
            header: "Closed_Caption_File_Name",
            key: 'captionsFilename',
            defaultValue: '',
            transform: {
                type: 'string',
                from: 'filePath',
                to: 'fileName',
            },
            validation: {
                required: true,
                format: 'fileName',
            }
        },
        {
            header: "Series_KeyArt_File_Name",
            key: 'series_seriesArtFilename',
            defaultValue: '',
            transform: {
                type: 'string',
                from: 'filePath',
                to: 'fileName',
            },
            validation: {
                required: true,
                format: 'fileName',
            }
        },
        {
            header: "Series_BoxCover_File_Name",
            key: 'series_seriesArtFilename',
            defaultValue: '',
            transform: {
                type: 'string',
                from: 'filePath',
                to: 'fileName',
            },
            validation: {
                required: false,
                format: 'fileName',
            }
        },
        {
            header: "Series_Background_File_Name",
            key: 'series_seriesArtFilename',
            defaultValue: '',
            transform: {
                type: 'string',
                from: 'filePath',
                to: 'fileName',
            },
            validation: {
                required: false,
                format: 'fileName',
            }
        },
        {
            header: "Episode_Background_File_Name",
            key: 'artFileame',
            defaultValue: '',
            transform: {
                type: 'string',
                from: 'filePath',
                to: 'fileName',
            },
            validation: {
                required: true,
                format: 'fileName',
                isUnique: true,
            }
        },
        {
            header: "vodType",
            key: '',
            defaultValue: 'avod',
        },
        {
            header: "territory",
            key: 'rightsTerritory',
            defaultValue: '',
            validation: {
                required: true,
                format: 'countryCodes',
            }
        },
        {
            header: "episode_startDate",
            key: '',
            defaultValue: '',
            validation: {
                required: true,
                format: 'YYYY-MM-DD',
            }
        },
        {
            header: "episode_endDate",
            key: 'rightsEnd',
            defaultValue: '',
            validation: {
                required: true,
                format: 'YYYY-MM-DD',
                futureDate: true,
            }
        },
        {
            header: "localized_language",
            key: '',
            defaultValue: '',
        },
        {
            header: "localized_series_title",
            key: '',
            defaultValue: '',
        },
        {
            header: "localized_series_short_synopsis",
            key: '',
            defaultValue: '',
        },
        {
            header: "localized_series_long_synopsis",
            key: '',
            defaultValue: '',
        },
        {
            header: "localized_episode_title",
            key: '',
            defaultValue: '',
        },
        {
            header: "localized_episode_long_synopsis",
            key: '',
            defaultValue: '',
        },
        {
            header: "localized_Subtitle_File_Name",
            key: '',
            defaultValue: '',
        },
        {
            header: "localized_Audio_File_Name",
            key: '',
            defaultValue: '',
        },
        {
            header: "localized_Series_KeyArt_File_Name",
            key: '',
            defaultValue: '',
        },
        {
            header: "localized_Series_BoxCover_File_Name",
            key: '',
            defaultValue: '',
        },
    ]
}