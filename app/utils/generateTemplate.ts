
import { VideoModel } from "../models/VideoModel";
import { outputMasterType, transformType, validationType } from "./masters/types";
import moment from "moment";
import { genresMaster } from "./masters/genresMaster";

type validationOutputType = {
    success: boolean;
    errorMessage?: string;
}

export const generateTemplate = (masterObj: outputMasterType, videos: VideoModel[]) => {

    let header = masterObj.master.map(field => field.header);
    let errors: any[][] = [['title', 'error_field', 'error_message', 'date']];

    let content = videos.map((video, index) => {
        let row: any[] = [];

        masterObj.master.forEach(field => {
            let value = field.defaultValue

            if (field.key && video[field.key] && video[field.key] != '') {
                if (field.transform) {
                    value = transform(video[field.key], field.transform.type, field.transform.from, field.transform.to, field.transform.using?.map(useField => video[useField]))
                }
                else {
                    value = video[field.key]
                }
            }

            if (field.validation && field.validation.required) {
                let validationOutput: validationOutputType = isRequired( value )
                if (!validationOutput.success) {
                    errors.push([video.title, field.header, validationOutput.errorMessage, moment().format('YYYY-MM-DD')])
                }
            }

            if (field.validation && field.validation.format) {
                let validationOutput: validationOutputType = isFormated( value, field.validation.format )
                if (!validationOutput.success) {
                    errors.push([video.title, field.header, validationOutput.errorMessage, moment().format('YYYY-MM-DD')])
                }
            }

            if ( field.validation && field.validation.afterThan ) {
                let threshold = row[field.validation.afterThan];
                let isBeforeThanResult = isBeforeThan( value, threshold )

                if ( isBeforeThanResult.success ) {
                    errors.push([video.title, field.header, `${field.key} ( ${value} ) should be later than ${threshold.replaceAll('"', "")}`, moment().format('YYYY-MM-DD')])
                }
            }

            if ( field.validation && field.validation.futureDate ) {
                let isBeforeThanResult = isBeforeThan( value, moment().format('YYYY-MM-DD') )

                if ( isBeforeThanResult.success ) {
                    errors.push([video.title, field.header, `"${field.key} (value: ${value}) should be in the future"`, moment().format('YYYY-MM-DD')])
                }
            }

            if ( field.validation && field.validation.maxLength ) {
                if ( !noLongerThan( value, field.validation.maxLength ) ) {
                    errors.push([video.title, field.header, `"${field.header} (value: ${value}) should be shorter than ${field.validation.maxLength}"`, moment().format('YYYY-MM-DD')])
                }
            }

            if ( field.validation && field.validation.isUnique ) {
                let isUniqueResult = isUnique( value, field.key, index, videos, field.transform)
                if ( isUniqueResult.success === false  && isUniqueResult.errorMessage ) {
                    errors.push([video.title, field.header, isUniqueResult.errorMessage, moment().format('YYYY-MM-DD')])
                }
            }
            
            if (typeof value === 'string') value = `"${value.replace(/"/g, '""')}"` // Escape double quotes in strings
            row.push(value)
        })

        return row;
        
    })


    return {
        content: [header, ...content], 
        errors: [...errors],
    }
}

const transform = (value: string, type: string, from: string, to: string, using: string[] = []) => {
    if (type === 'date') {
        return transformDate(value, from, to)
    }
    else if (type === 'territory') {
        return transformTerritory(value, from, to)
    }
    else if (type === 'type') {
        return transformTypeFn(value, from, to)
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
    else if ( type === 'uuid' ) {
        return transformUUID(value, from, to, using)
    }
    else if (type === 'genre') {
        return transformGenre(value, from, to)
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

    if ( to == "FutureTodayWW")
        return territories.includes("WW") ? 'Yes' : "No"

    if ( to == "FutureTodayUS")
        return territories.includes("WW") || territories.includes("US") ? 'Yes' : "No"

    if ( to == "FutureTodayCA")
        return territories.includes("WW") || territories.includes("CA")  ? 'Yes' : "No"

    if (to == "FutureTodayOther") {
        const other = [ 
            {
                country: 'United Kingdom', 
                code: 'UK'
            }, 
            {
                country: 'Mexico', 
                code: 'MX'
            }, 
            {
                country: 'Australia', 
                code: 'AU'
            }, 
            {
                country: 'France', 
                code: 'FR'
            }, 
            {
                country: 'Germany', 
                code: 'DE'
            }, 
            {
                country: 'Italy', 
                code: 'IT'
            }, 
            {
                country: 'Brazil', 
                code: 'BR'
            }, 
            {
                country: 'China', 
                code: 'CN'
            }, 
            {
                country: 'India', 
                code: 'IN'
            }, 
            {
                country: 'Poland', 
                code: 'PO'
            }, 
            {
                country: 'Portugal', 
                code: 'PW'
            }, 
            {
                country: 'Spain', 
                code: 'ES'
            }
         ]

        let result = ''
        
        other.forEach( countryObj =>{
            if (territories.includes(countryObj.code)) {
                if (!result) result = countryObj.country
                else result += ", " + countryObj.country
            }
        })

        return result
    }
        

    return territories;
}

const transformTypeFn = (type: string, from: string, to: string) => {
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

    if (to = "FutureToday") {
        if ( 
            rating == 'Self-Rated' || 
            rating == 'TV-MA' || 
            rating == 'NR' ||
            rating == ''
        ) return "13+"
        if ( rating.includes("TV") ) return rating.split("TV-")[1]
    }
    
    return rating;
}

const transformAdBreaks = (adBreaks: string, from: string, to: string) => {
    return adBreaks.split(', ').map((adBreak: string) => transformDuration(adBreak, from, to)).join(', ')
}

const transformDuration = (value: string, from: string, to: string) => {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let frames = 0;

    if (from == 'HH:mm:ss' || from == 'HH:mm:ss;ff') {
        const durationParts = value.split(':');
        hours = parseInt(durationParts[0], 10);
        minutes = parseInt(durationParts[1], 10);
        seconds = parseInt(durationParts[2].split(";")[0], 10);
        frames = parseInt(durationParts[2].split(";")[1], 10) || 0;
    }
    else if (from == 'min') {
        hours = Math.floor(Number(value) / 60);
        minutes = Math.floor(Number(value) % 60);
    }

    if ( to == 'HH:mm:ss' ) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    if ( to == 'HH:mm:ss;ff' ) {
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')};${String(frames).padStart(2, '0')}`;
    }
    if (to == 'HH:mm:ss.fff') {
        frames = Math.floor(Number(frames) * 100 / 30);
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(frames).padStart(3, '0')}`;
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

const transformUUID = (value: string, from: string, to: string, using: string[]) => {
    let uuid = value;

    if (from === 'uuid' && to == 'uuid-season') {
        const season = using[0];
        return `${uuid}-${season.padStart(2, '0')}`;
    }

    return value;
}

const transformGenre = (value: string, from: string, to: string) => {
    if (to === 'frequency') {
        value = value.split(',')[0].trim()
    }

    const masterKey = value.replaceAll(" ", "_")

    if (genresMaster[masterKey]) {
        return genresMaster[masterKey][to];
    }

    return value
}

const isRequired = ( value: string ) => {
    if ( value ) return  {success: true};
    return {success: false, errorMessage: `No value provided for required field`};
}

const isFormated = ( value: string, format: string ) => {
    if (!value) return { success: true };

    if (format === 'YYYY-MM-DD' && !moment(value, format, true).isValid()) {
       return {
            success: false,
            errorMessage: `"Invalid date format for date ${value}. Expected format is ${format}"`,
        }
    }

    else if (format === "rokuContentType" && !['movie', 'episode', 'shortForm'].includes(value)) {
        return {
            success: false,
            errorMessage: `"Invalid content type ${value}. Expected values are movie, episode, shortForm"`,
        }
    }

    else if ( format === 'countryCode' && !/^[A-Z]{2}$/.test(value)) {
        return {
            success: false,
            errorMessage: `"Invalid country code ${value}. Expected format is 2 uppercase letters"`,
        }
    }

    else if ( format === 'countryCodes' && !/^[A-Z]{2}(,\s*[A-Z]{2})*$/.test(value)) {
        return {
            success: false,
            errorMessage: `"Invalid country codes ${value}. Expected format is 2 uppercase letters separated by commas"`,
        }
    }

    else if ( format === 'uuid' && !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)) {
        return {
            success: false,
            errorMessage: `"Invalid UUID ${value}. Expected format is 8-4-4-4-12 hexadecimal characters"`,
        }
    }

    else if ( format === 'wholeNumber' && Number.isInteger(Number(value)) === false) {
        return {
            success: false,
            errorMessage: `"Invalid whole number ${value}. Expected format is a whole number"`,
        }
    }

    else if ( format === "ratingSource" && !['MPAA', 'USA_PR', 'BBFC', 'CHVRS', 'CPR', 'RTC' ].includes(value)) {
        return {
            success: false,
            errorMessage: `"Invalid rating source ${value}. Expected values are MPAA, USA_PR, BBFC, CHVRS, CPR, RTC"`,
        }
    }
    else if ( format.includes("adBreaks") ) {
        return areValidAdBreaks(value, format.split('-')[1]);
    }

    return {success: true};

}

const isBeforeThan = ( value: string, threshold: string ) => {
    if ( value.charAt(0) === '"' ) {
        value = value.substring(1, value.length - 1);
    }
    
    return { success: moment(value).isBefore(threshold) }
}

const noLongerThan = ( value: string, threshold: number ) => {
    if (!value) return { success: true };

    if (value.length <= threshold) {
        return { success: true };
    }

    return {
        success: false,
    }
}

const areValidAdBreaks = ( adBreaks: string, format: string ) => {
    if ( !adBreaks ) return { success: true };

    let errors: string[] = [];
    
    const adBreaksArray = adBreaks.split(', ');
    for ( let i = 0; i < adBreaksArray.length; i++ ) {
        const validation = isValidAdBreak(adBreaksArray[i], format);
        if ( !validation.success && validation.errorMessage ) {
            errors.push(validation.errorMessage);
        }
    }

    return { success: true };
}

const isValidAdBreak = ( adBreak: string, format: string ) => {
    if ( !adBreak ) return { success: true };

    if ( !/^[0-9]+:[0-5][0-9]$/.test(adBreak) ) {
        return {
            success: false,
            errorMessage: `Invalid ad break ${adBreak}. Expected format is mm:ss`,
        }
    }

    return { success: true };
}

const isUnique = ( value: string, key:string, index: number, videos: VideoModel[], transformData?: transformType ) => {
    
    if ( !value ) return { success: true };

    let isUnique = true;
    let i = 0;

    for (i; i < index; i++) {
        const comparingValue = transformData ? transform ( videos[i][key], transformData.type, transformData.from, transformData.to, transformData.using?.map(useField => videos[i][useField])) 
        : videos[i][key];

        if (comparingValue === value) {
            isUnique = false;
            break;
        }
    }

    if (isUnique) {
        return { success: true };
    }

    return {
        success: false,
        errorMessage: `"${value} should be unique. Repeated in row ${i + 1}"`,
    }
}