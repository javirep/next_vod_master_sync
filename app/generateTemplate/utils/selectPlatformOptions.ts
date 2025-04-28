const platformOptions = {
    fubo: {
        label: 'Fubo',
        states: [
            'Not Delivered', 
            'Uploading',
            'Delivered',
            'N/A'
        ]
    },
    sling: {
        label: 'Sling',
        states: [
            'Not Delivered',
            'Uploading',
            'Delivered',
            'On Platform',
            'N/A'
        ]
    },
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
    frequency: {
        label: 'Frequency',
        states: [
            'TRUE',
            'FALSE',
        ]
    },
}


export default platformOptions;