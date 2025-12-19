import { outputMasterType } from "./types";

export const VizioMaster: outputMasterType = {
    name: 'Vizio Avails',
    id: 'vizioAvails',
    outputFormat: 'csv',

    tabs : [
        {
            tabName: 'main',
            content: [
                // Content Partner
                {
                    key: '',
                    defaultValue: 'Swerve TV, LLC',
                },
                // Content Type
                {
                    key: 'type',
                    transform: {
                        type: 'type',
                        from: 'MasterTracker',
                        to: 'Vizio',
                    }
                },
                // WW 
                {
                    key: 'rightsTerritory', 
                    transform: {
                        type: 'territory',
                        from: 'masterTracker',
                        to: 'WW',
                    }
                },
                // US
                {
                    key: 'rightsTerritory', 
                    transform: {
                        type: 'territory',
                        from: 'masterTracker',
                        to: 'US',
                    }
                },
                // CA
                {
                    key: 'rightsTerritory', 
                    transform: {
                        type: 'territory',
                        from: 'masterTracker',
                        to: 'CA',
                    }
                },
                // Add Territories
                {
                    key: '', 
                    defaultValue: '',
                },
                // Title
                {
                    key: 'title',
                },
                // Episode
                {
                    key: '',
                    defaultValue: '',
                },
                // Season #
                {
                    key: 'season',
                    defaultValue: '',
                },
                // Episode #
                {
                    key: 'episode',
                    defaultValue: '',
                },
                // Run Time
                {
                    key: 'duration',
                },
                // Scripted/non-scripted
                {
                    key: '',
                    defaultValue: '',
                },
                // HD
                {
                    key: '',
                    defaultValue: 'X',
                },
                // Close captations
                {
                    key: '',
                    defaultValue: 'X',
                },
                // Original release date
                {
                    key: 'releaseDate',
                },
                // Primary Genre
                {
                    key: 'genre',
                },
                // Secondary Genre
                {
                    key: '',
                    defaultValue: '',
                },
                // Tertiary Genre
                {
                    key: '',
                    defaultValue: '',
                },
                // Rating
                {
                    key: 'ratingValue',
                },
                // main Cast
                {
                    key: 'mainCast',
                },
                // Synopsis
                {
                    key: 'synopsis',
                },
                // License Start Date
                {
                    key: 'rightsStart',
                },
                // License End Date
                {
                    key: 'rightsEnd',
                },
                // AVOD (Y/N)
                {
                    key: '',
                    defaultValue: 'Y',
                },
                // CC (Y/N)
                {
                    key: '',
                    defaultValue: 'Y',
                },



            ]
        }
    ]
}
