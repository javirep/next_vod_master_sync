import axios from "axios";
import { VideoModel } from "../models/VideoModel";
import { MasterTrackerTitles, MasterTrackerSeries } from "../utils/masters/MasterTracker";
import { SeriesModel } from "../models/SeriesModel";

export const getTitles = async () => {
    const apiKey = process.env.NEXT_API_KEY;
    const spreadsheetId = process.env.NEXT_MASTER_TRACKER_ID;
    const range = 'Titles'; // Adjust if neededimport React from 'react';
    
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

export const getSeries = async () => {
    const apiKey = process.env.NEXT_API_KEY;
    const spreadsheetId = process.env.NEXT_MASTER_TRACKER_ID;
    const range = 'Series'; // Adjust if needed
    try {
        const response = await axios.get(
            `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`
        );

        let data: string[][] = response.data.values || [];

        let series: SeriesMapType = mapDataToSeriesModel(data);
    
        return series || {};
        
    }
    catch (error) {
        console.error('Error fetching data:', error);
        return []
    }
}

type IndexType <T extends Record<string, any>> = {
    [K in keyof T]: number;
  };

const mapDataToVideoModel = (data: string[][]): VideoModel[] => {
    let template = {} as IndexType<VideoModel>;

    Object.keys(MasterTrackerTitles).forEach(key => {
        template[key] = data[0].indexOf(MasterTrackerTitles[key].key); 
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

type SeriesMapType = {
    [key: string]: SeriesModel;
}

const mapDataToSeriesModel = (data: string[][]): SeriesMapType => {
    let template = {} as IndexType<SeriesModel>;

    Object.keys(MasterTrackerSeries).forEach(key => {
        template[key] = data[0].indexOf(MasterTrackerSeries[key].key); 
    });

    let series: SeriesMapType = {};

    data.slice(1).forEach(row => {
        let title = {} as SeriesModel;

        Object.keys(template).forEach(key => {
            title[key] = row[template[key]];
        });

        series[title.seriesName] = title;
    });

    return series;
}