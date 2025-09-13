import { VideoModel } from "../models/VideoModel";

type masterTrackerResponse = {
    titles: VideoModel[]
}

export const getMasterTrackerData = async () => {
    try{ 
        const response = await fetch('/api/masterTracker/', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data: masterTrackerResponse = await response.json();
            
            return data;
        } else {
            const { message } = await response.json();
            console.log(message);
            return false;
        }
    } catch (error) {
      console.log(error);
      return false;
    }
}

export const getNewFilePath = (title: VideoModel) => { 

    let newFilePath = "/Titles/"

    newFilePath += toCamelCase(title.licensor) + '/'

    newFilePath += title.type + '/'

    let titleFileName = title.seriesTitle ? toCamelCase(title.seriesTitle) : toCamelCase(title.title)

    newFilePath += titleFileName + "/" + titleFileName

    if (title.season && title.episode) newFilePath += '_' + title.season.toString().padStart(2, '0') + title.episode.toString().padStart(2, '0')

    newFilePath += '.mp4'

    return newFilePath

}

const toCamelCase = (string: string) => {

    const replacements = [
        "/",
        "\\",
        ".",
        ":",
        "&",
        '"',
        "(",
        ")",
        "[",
        "]",
        "{",
        "}",
        "<",
        ">",
        "?",
        ";",
        "!",
        "@",
        "#",
        "$",
        "%",
        "^",
        "*",
        "+",
        "=",
        "-",
        "|",
    ]
    

    replacements.forEach(char => string = string.replace(char, ''))

    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.substring(1)).join('')
}