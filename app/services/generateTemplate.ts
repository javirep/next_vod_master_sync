import { VideoModel } from "../models/VideoModel";
import { outputMasterType } from "../utils/masters/types";
import moment from "moment";


export const generateTemplate = (masterObj: outputMasterType, videos: VideoModel[]) => {

    let header = masterObj.master.map(field => field.header);

    let content = videos.map(video => {
        let row: any[] = [];

        masterObj.master.forEach(field => {
            let value = field.defaultValue

            if (field.key && video[field.key] && video[field.key] != '') {
                if (field.transform) {
                    value = transform(video[field.key], field.transform.type, field.transform.from, field.transform.to)
                }
                else {
                    value = video[field.key]
                }
            }
            
            if (typeof value === 'string') value = `"${value.replace(/"/g, '""')}"` // Escape double quotes in strings
            row.push(value)
        })

        return row;
        
    })


    return [header, ...content];
}

const transform= (value: string, type: string, from: string, to: string) => {
    if (type === 'date') {
        return transformDate(value, from, to)
    }
    else if (type === 'territory') {
        return transformTerritory(value, from, to)
    }
    else if (type === 'type') {
        return transformType(value, from, to)
    }
    else if (type === 'ratingSource') {
        return transformRatingSource(value, from, to)
    }
    else if (type === 'adBreaks') {
        return transformAdBreaks(value, from, to)
    }
    else if (type === 'duration') {
        return transformDuration(value, from, to)
    }
    else if (type === 'string') {
        return transformString(value, from, to)
    }

    return value;
}


const transformDate = (date: string, from: string, to: string) => {
    return moment(date, from).format(to)
}

const transformTerritory = (territories: string, from: string, to: string) => {
    if ( to == 'WW' ) 
        return territories.includes('WW') ? 'X' : ''

    if ( to == 'US' )
        return territories.includes('US') ? 'X' : ''

    if ( to == 'CA' )
        return territories.includes('CA') ? 'X' : ''

    return territories;
}

const transformType = (type: string, from: string, to: string) => {
    if (to === 'Roku') {
        if (type === 'Movies') return 'movie'
        if (type === 'Television') return 'episode'
        if (type === 'Sports') return 'episode'
    }

    if (to === 'Sling') {
        if (type === 'Movies') return 'Movies'
        else return 'Series'
    }

    if (to === 'Xumo') {
        if (type === 'Movies') return 'Movie'
        if (type === 'Television') return 'Series'
        if (type === 'Sports') return 'Series'
        else return 'Movies'
    }

    if (to === 'frequencyFormat') {
        if (type === 'Movies') return 'Movie'
        if (type === 'Television') return 'Show'
        if (type === 'Sports') return 'Event'
    }

    if (to === 'frequencyType') {
        if (type === 'Movies') return 'Film'
        if (type === 'Television') return 'Episode'
        if (type === 'Sports') return 'Competitive Match'
    }


    return type;
}

const transformRatingSource = (rating: string, from: string, to: string) => {
    if ( rating === 'Self-Rated') return 'USA_PR'
    
    return rating;
}

const transformAdBreaks = (adBreaks: string, from: string, to: string) => {
    return adBreaks.split(', ').map((adBreak: string) => transformDuration(adBreak, from, to)).join(', ')
}


const transformDuration = (value: string, from: string, to: string) => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    if (from == 'HH:mm:ss' || from == 'HH:mm:ss;ff') {
        const durationParts = value.split(':');
        hours = parseInt(durationParts[0], 10);
        minutes = parseInt(durationParts[1], 10);
        seconds = parseInt(durationParts[2], 10);
    }
    else if (from == 'min') {
        hours = Math.floor(Number(value) / 60);
        minutes = Math.floor(Number(value) % 60);
    }

    if ( to == 'HH:mm:ss' ) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    if ( to == 'min' ) {
        return (hours * 60 + minutes + seconds / 60).toFixed(2);
    }
    if ( to == 'seconds' ) {
        return (hours * 3600 + minutes * 60 + seconds);
    }

    return value;
}

const transformString = (value: string, from: string, to: string) => {
    if (from === 'filePath' && to === 'fileName') {
        return value.split('/').pop();
    }

    if (from =='csv' && to == '/sv') {
        return value.split(',').map(val => val.trim()).join('/');
    }

    return value;
}