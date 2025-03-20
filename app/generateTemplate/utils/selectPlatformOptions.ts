const platformOptions = {
    roku: {
        label: 'Roku',
        states: [
            'Avails Not Sent',
            'Avails Sent',
            'Rejected',
            'Approved',
            'Uploading',
            'Pending Metadata', 
            'On Platform',
            'N/A'
        ]
    },

    fubo: {
        label: 'Fubo',
        states: [
            'Not Delivered', 
            'Uploading',
            'Delivered',
            'N/A'
        ]
    }
}


export default platformOptions;