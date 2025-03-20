import axios from "axios";
import { VideoModel } from "../models/VideoModel";
import { MasterTrackerMaster } from "../utils/masters/MasterTracker";

export const getTitles = async () => {
    const apiKey = process.env.NEXT_API_KEY;
    const spreadsheetId = process.env.NEXT_MASTER_TRACKER_ID;
    const range = 'All Titles'; // Adjust if neededimport React from 'react';
    
    try {
        
        const response = await axios.get(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
        );

        let data: string[][] = response.data.values || [];


        let titles: VideoModel[] = mapDataToVideoModel(data);
    
        return titles || [];
        
    } catch (error) {
        console.error('Error fetching data:', error);
        return []
    }
}

type IndexType <T extends Record<string, any>> = {
    [K in keyof T]: number;
  };

const mapDataToVideoModel = (data: string[][]): VideoModel[] => {
    let template = {} as IndexType<VideoModel>;

    Object.keys(MasterTrackerMaster).forEach(key => {
        template[key] = data[0].indexOf(MasterTrackerMaster[key].key); 
    });

    let titles: VideoModel[] = [];

    data.slice(1).forEach(row => {
        let title = {} as VideoModel;

        Object.keys(template).forEach(key => {
            title[key] = row[template[key]];
        });

        titles.push(title);
    });

    return titles;

}