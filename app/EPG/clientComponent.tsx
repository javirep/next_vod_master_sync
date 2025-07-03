'use client'

import React, { useState, useEffect } from "react";

import './EPG.scss';
import Typography from "@/app/components/Typography/Typography";
import Layout from "../components/Layout/Layout";
import EPGContainer from "../components/EPGContainer/EPGContainer";
import { LiveFeed } from "../models/ProgramModel";
import { DateInput } from "../components/Inputs/DateInput/DateInput";
import { getRokuEPG, getFrequencyEPG, getGracenoteEPG} from "../services/EPGs";
import { SelectInput } from "../components/Inputs/SelectInput/SelectInput";
import CSVUpload from "../components/CSVUpload/CSVUpload";

type FilteredLiveFeeds = {
    'roku': LiveFeed[];
    'frequency': LiveFeed[];
    'gracenote': LiveFeed[];
}

function Page() {
    const [rokuLiveFeed, setRokuLiveFeed] = useState<LiveFeed[]>([]);
    const [frequencyLiveFeed, setFrequencyLiveFeed] = useState<LiveFeed[]>([]);
    const [gracenoteLiveFeed, setGracenoteLiveFeed] = useState<LiveFeed[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [filteredLiveFeeds, setFilteredLiveFeeds] = useState<FilteredLiveFeeds>({
        'roku': [],
        'frequency': [],
        'gracenote': []
    });
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [liveFeed1, setLiveFeed1] = useState<string>('frequency');
    const [liveFeed2, setLiveFeed2] = useState<string>('roku');

    const inputOptions = [
        { value: 'frequency', label: 'Frequency EPG' },
        { value: 'roku', label: 'Roku EPG' },
        { value: 'gracenote', label: 'GraceNote EPG' },
    ];
    
    const loadEPGs = async () => {
        const rokuEPG = await getRokuEPG();
        if (rokuEPG) {
            setRokuLiveFeed(rokuEPG.epg);
        } else {
            console.error('Failed to fetch Roku EPG');
        }

        const frequencyEPG = await getFrequencyEPG();
        if (frequencyEPG) {
            setFrequencyLiveFeed(frequencyEPG.epg);
        } else {
            console.error('Failed to fetch Frequency EPG');
        }

        setFilteredLiveFeeds({
            'roku': rokuEPG ? rokuEPG.epg : [],
            'frequency': frequencyEPG ? frequencyEPG.epg : [],
            'gracenote': []
        });

        setLoading(false);
    }

    useEffect(() => {
        loadEPGs()
    }, []);

    useEffect(() => {
        if (!selectedDate){
            setFilteredLiveFeeds({
                'roku': rokuLiveFeed,
                'frequency': frequencyLiveFeed,
                'gracenote': gracenoteLiveFeed
            });
            return;
        }

        else {
            const filteredRoku = rokuLiveFeed.filter((feed) => {
                const feedDate = new Date(feed.date + 'T' + feed.startTime);
                return feedDate.toISOString().startsWith(selectedDate);
            });

            const filteredFrequency = frequencyLiveFeed.filter((feed) => {
                const feedDate = new Date(feed.date + 'T' + feed.startTime);
                return feedDate.toISOString().startsWith(selectedDate);
            });
            
            const filteredGracenote = gracenoteLiveFeed.filter((feed) => {
                const feedDate = new Date(feed.date + 'T' + feed.startTime);
                return feedDate.toISOString().startsWith(selectedDate);
            });

            setFilteredLiveFeeds({
                'roku': filteredRoku,
                'frequency': filteredFrequency,
                'gracenote': filteredGracenote
            });
        }

    }, [selectedDate, gracenoteLiveFeed]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);
    }

    const handleOption = (option: { value: string | number, label: string }, index: number) => {
        if (index === 1) {
            if ( typeof option.value === 'string') setLiveFeed1(option.value);
        } else if (index === 2) {
            if ( typeof option.value === 'string') setLiveFeed2(option.value);
        }
    }

    const filteredLiveFeed1 = filteredLiveFeeds[liveFeed1 as keyof FilteredLiveFeeds];
    const filteredLiveFeed2 = filteredLiveFeeds[liveFeed2 as keyof FilteredLiveFeeds];

    const handleCSVUpload = (data: any[]) => {
        const liveFeed = data.map(epgItem => {
            const {tmsid, title, start_time, start_date, season_number, episode_number , episode_title, end_time, description} = epgItem
            const finalTitle = title + episode_title ? ` > ${episode_title}` : ''; 
            const duration = getTimeDifference(start_time, end_time);
            return {
                id: tmsid,
                date: start_date,
                startTime: start_time,
                duration: duration,
                program: {
                    title: finalTitle,
                    description: description,
                    thumbnail: '',
                    season: season_number,
                    episode: episode_number
                }
            } as LiveFeed;
        })

       setGracenoteLiveFeed(liveFeed);
    }

    function getTimeDifference(start_time: string, end_time: string): number {
        function parseTimeToDate(timeStr: string): Date {
            const [time, modifier] = timeStr.split(" ");
            let [hours, minutes] = time.split(":").map(Number);

            if (modifier === "PM" && hours !== 12) hours += 12;
            if (modifier === "AM" && hours === 12) hours = 0;

            // Use a fixed date to avoid date-based edge cases
            return new Date(2000, 0, 1, hours, minutes);
        }

        const startDate: Date = parseTimeToDate(start_time);
        const endDate: Date = parseTimeToDate(end_time);

        // Handle overnight wraparound
        if (endDate < startDate) {
            endDate.setDate(endDate.getDate() + 1);
        }

        const diffMs: number = endDate.getTime() - startDate.getTime();
        return Math.round(diffMs / 1000); // Convert milliseconds to minutes
    }
    
    return (
        <div>
            <Typography type='title' className='epg-title'> EPG validation </Typography>

            {
                loading ? <Typography type='body'>Loading EPGs...</Typography> 
                :
                (
                    <>
                        <div className="epg-inputs-container">
                            <div>
                                <DateInput placeholder="YYYY-MM-DD" labelText='Filter by Date:' onChange={(e) => { handleDateChange(e) }} />

                                <div className="epg-inputs">
                                    <SelectInput labelText="Select EPG" options={inputOptions} onChange={(o) => handleOption(o, 1)}/>
                                    <SelectInput labelText="Select EPG" options={inputOptions} onChange={(o) => handleOption(o, 2)}/>
                                </div>
                            </div>
                            <CSVUpload handleData={handleCSVUpload} />

                        </div>

                        <div className="epgs-container">
                            <EPGContainer liveFeeds={filteredLiveFeed1} liveFeedId={liveFeed1}/>
                            <EPGContainer liveFeeds={filteredLiveFeed2} liveFeedId={liveFeed2} />
                        </div>
                    </>
                )
            }

    
        </div>
    );
}

const PageWrapper = () => <Layout><Page /></Layout>

export default PageWrapper;