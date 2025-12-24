import { VideoModel } from "@/app/models/VideoModel"
import moment from "moment"

export const generateArtworkTab = (videos: VideoModel[]) => {

    let content: string[][] = [["guid",	'thumbnail_file', 'thumbnail_type', 'metadata_update_date']]
    let errors: string[][] = []

    videos.forEach(video => {
        if (video.textlessArtFilename) {
            let row = [video.guid, video.textlessArtFilename, "Textless", ""];
            content.push(row)
        }
        else {
            errors.push([video.title, 'Textless Art Filename', 'No Textless Art File found', moment().format('YYYY-MM-DD')])
        }

        if ( video.verticalArtFilename){
            let row = [video.guid, video.verticalArtFilename, "Texted", ""];
            content.push(row)
        }
        else {
            errors.push([video.title, 'Textless Art Filename', 'No Vertical Art File Name found', moment().format('YYYY-MM-DD')])
        }

        if (video.artFilename) {
            let row = [video.guid, video.artFilename, "", ""];
            content.push(row)
            let additionalRow = [video.guid, video.artFilename, "Texted", ""];
            content.push(additionalRow)
        }
        else {
            errors.push([video.title, 'Art Filename', 'No Art File found', moment().format('YYYY-MM-DD')])
        }
        
        
    })

    return {
        content, 
        errors,
    }
}