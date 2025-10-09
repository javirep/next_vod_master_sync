'use client'

import React, { useState, useEffect } from "react";

import './EPG.scss';
import Typography from "@/app/components/Typography/Typography";
import Layout from "../components/Layout/Layout";
import EPGContainer from "../components/EPGContainer/EPGContainer";
import { LiveFeed } from "../models/ProgramModel";
import { DateInput } from "../components/Inputs/DateInput/DateInput";
import { getRokuEPG, getPlutoEPG } from "../services/EPGs";
import { SelectInput } from "../components/Inputs/SelectInput/SelectInput";

type FilteredLiveFeeds = {
    'combatRoku': LiveFeed[];
    'sportsRoku': LiveFeed[];
    'sportsPluto': LiveFeed[];
}

function Page() {
    const [loading, setLoading] = useState<boolean>(true);
    const [combatRokuLiveFeed, setRokuLiveFeed] = useState<LiveFeed[]>([]);
    const [sportsRokuLiveFeed, setSportsRokuLiveFeed] = useState<LiveFeed[]>([]);
    const [sportsPlutoLiveFeed, setSportsPlutoLiveFeed] = useState<LiveFeed[]>([]);

    const [filteredLiveFeeds, setFilteredLiveFeeds] = useState<FilteredLiveFeeds>({
        'combatRoku': [],
        'sportsRoku': [],
        'sportsPluto': []
    });
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [liveFeed1, setLiveFeed1] = useState<string>('sportsPluto');
    const [liveFeed2, setLiveFeed2] = useState<string>('sportsRoku');

    const inputOptions = [
        { value: 'combatRoku', label: 'Combat Roku EPG' },
        { value: 'sportsRoku', label: 'Sports Roku EPG' },
        { value: 'sportsPluto', label: 'Sports Pluto EPG' },
    ];

    const filterPastFeedsFn = (feed: LiveFeed): boolean => {
        const feedDate = new Date(feed.date + 'T' + feed.startTime);
        return feedDate.getTime() > new Date().getTime() - 4 * 60 * 60 * 1000; // Filter out feeds older than 4 hours
    }
    
    const loadEPGs = async () => {
        const combatRokuEPG = await getRokuEPG('253');
        if (combatRokuEPG) {
            setRokuLiveFeed(combatRokuEPG.epg);
        } else {
            console.error('Failed to fetch Roku EPG');
        }
        
        const sportsRokuEPG = await getRokuEPG('1013');
        if (sportsRokuEPG) {
            setSportsRokuLiveFeed(sportsRokuEPG.epg);
        } else {
            console.error('Failed to fetch Roku EPG');
        }

        const sportsPlutoEPG = await getPlutoEPG('1013');
        if (sportsPlutoEPG) {
            setSportsPlutoLiveFeed(sportsPlutoEPG.epg);
        } else {
            console.error('Failed to fetch Frequency EPG');
        }

        setFilteredLiveFeeds({
            'combatRoku': combatRokuEPG ? combatRokuEPG.epg.filter(filterPastFeedsFn) : [],
            'sportsRoku': sportsRokuEPG ? sportsRokuEPG.epg.filter(filterPastFeedsFn) : [],
            'sportsPluto': sportsPlutoEPG ? sportsPlutoEPG.epg.filter(filterPastFeedsFn): []
        });


        setLoading(false);
    }

    useEffect(() => {
        loadEPGs()
    }, []);

    useEffect(() => {
        const startsWithFn = (feed: LiveFeed): boolean => {
            const feedDate = new Date(feed.date + 'T' + feed.startTime);
            return feedDate.toISOString().startsWith(selectedDate);
        }

        if (!selectedDate){
            setFilteredLiveFeeds({
                'combatRoku': combatRokuLiveFeed.filter(filterPastFeedsFn),
                'sportsRoku': sportsRokuLiveFeed.filter(filterPastFeedsFn),
                'sportsPluto': sportsPlutoLiveFeed.filter(filterPastFeedsFn)
            });
            return;
        }

        else {
            setFilteredLiveFeeds({
                'combatRoku': combatRokuLiveFeed.filter(startsWithFn),
                'sportsRoku': sportsRokuLiveFeed.filter(startsWithFn),
                'sportsPluto': sportsPlutoLiveFeed.filter(startsWithFn)
            });
        }

    }, [selectedDate]);

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

    /* function getTimeDifference(start_time: string, end_time: string): number {
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
    } */
    
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