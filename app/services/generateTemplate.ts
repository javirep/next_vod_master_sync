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
            
            if (typeof value === 'string') value = `"${value}"`
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
        if (type === 'Film') return 'movie'
        if (type === 'Episode') return 'episode'
        if (type === 'Combat') return 'episode'
    }

    return type;
}

const transformRatingSource = (rating: string, from: string, to: string) => {
    if ( rating === 'Self-Rated') return 'USA_PR'
    
    return rating;
}