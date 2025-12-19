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
