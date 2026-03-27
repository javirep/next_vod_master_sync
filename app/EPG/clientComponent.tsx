'use client'

import React, { useState, useEffect } from "react";

import './EPG.scss';
import Typography from "@/app/components/Typography/Typography";
import Layout from "../components/Layout/Layout";
import EPGContainer from "../components/EPGContainer/EPGContainer";
import { LiveFeed } from "../models/ProgramModel";
import { DateInput } from "../components/Inputs/DateInput/DateInput";
import { getRokuEPG, getPlutoEPG, getAmazonEPG } from "../services/EPGs";
import { SelectInput } from "../components/Inputs/SelectInput/SelectInput";

type FilteredLiveFeeds = {
    'combatAmazon': LiveFeed[];
    'combatRoku': LiveFeed[];
    'sportsRoku': LiveFeed[];
    'sportsPluto': LiveFeed[];
    'profGRoku': LiveFeed[];
    'profGAmazon': LiveFeed[];
}

function Page() {
    const [loading, setLoading] = useState<boolean>(true);
    const [combatAmazonLiveFeed, setCombatAmazonLiveFeed] = useState<LiveFeed[]>([]);
    const [combatRokuLiveFeed, setRokuLiveFeed] = useState<LiveFeed[]>([]);
    const [sportsRokuLiveFeed, setSportsRokuLiveFeed] = useState<LiveFeed[]>([]);
    const [sportsPlutoLiveFeed, setSportsPlutoLiveFeed] = useState<LiveFeed[]>([]);
    const [profGRokuLiveFeed, setProfGRokuLiveFeed] = useState<LiveFeed[]>([]);
    const [profGAmazonLiveFeed, setProfGAmazonLiveFeed] = useState<LiveFeed[]>([]);

    const [filteredLiveFeeds, setFilteredLiveFeeds] = useState<FilteredLiveFeeds>({
        'combatAmazon': [],
        'combatRoku': [],
        'sportsRoku': [],
        'sportsPluto': [],
        'profGRoku': [],
        'profGAmazon': []
    });
    const [selectedDate, setSelectedDate] = useState<string>('');
    
    const channelOptions = [
        { value: 'combat', label: 'Swerve Combat' },
        { value: 'sports', label: 'Swerve Sports' },
        { value: 'profG', label: 'Prof G Channel' },
    ];
    
    const platformsOptions = [
        { value: 'Roku', label: 'Roku' },
        { value: 'Amazon', label: 'Amazon Prime' },
        { value: 'Pluto', label: 'Pluto' },
    ];
    const initialChannel1Index = 0;
    const intialPlatform1Index = 0;
    const initialChannel2Index = 1;
    const intialPlatform2Index = 0;

    const [channel1, setChannel1] = useState<string>(channelOptions[initialChannel1Index].value);
    const [platform1, setPlatform1] = useState<string>(platformsOptions[intialPlatform1Index].value);
    const [channel2, setChannel2] = useState<string>(channelOptions[initialChannel2Index].value);
    const [platform2, setPlatform2] = useState<string>(platformsOptions[intialPlatform2Index].value);

    const filterPastFeedsFn = (feed: LiveFeed): boolean => {
        const feedDate = new Date(feed.date + 'T' + feed.startTime);
        return feedDate.getTime() > new Date().getTime() - 5 * 60 * 60 * 1000; // Filter out feeds older than 4 hours
    }
    
    const loadEPGs = async () => {
        const combatAmazonEPG = await getAmazonEPG('253');
        if (combatAmazonEPG) {
            setCombatAmazonLiveFeed(combatAmazonEPG.epg);
            console.log('Combat Amazon EPG loaded:', combatAmazonEPG.epg);
        } else {
            console.error('Failed to fetch Frequency EPG');
        }

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
            console.log('Sports Pluto EPG loaded:', sportsPlutoEPG.epg);
        } else {
            console.error('Failed to fetch Frequency EPG');
        }

        const profGRokuEPG = await getRokuEPG('1562');
        if (profGRokuEPG) {
            setProfGRokuLiveFeed(profGRokuEPG.epg);
        } else {
            console.error('Failed to fetch Roku EPG');
        }

        const profGAmazonEPG = await getAmazonEPG('1562');
        if (profGAmazonEPG) {
            setProfGAmazonLiveFeed(profGAmazonEPG.epg);
            console.log('Professional Wrestling Amazon EPG loaded:', profGAmazonEPG.epg);
        } else {
            console.error('Failed to fetch Frequency EPG');
        }

        setFilteredLiveFeeds({
            'combatAmazon': combatAmazonEPG ? combatAmazonEPG.epg.filter(filterPastFeedsFn) : [],
            'combatRoku': combatRokuEPG ? combatRokuEPG.epg.filter(filterPastFeedsFn) : [],
            'sportsRoku': sportsRokuEPG ? sportsRokuEPG.epg.filter(filterPastFeedsFn) : [],
            'sportsPluto': sportsPlutoEPG ? sportsPlutoEPG.epg.filter(filterPastFeedsFn): [],
            'profGRoku': profGRokuEPG ? profGRokuEPG.epg.filter(filterPastFeedsFn) : [],
            'profGAmazon': profGAmazonEPG ? profGAmazonEPG.epg.filter(filterPastFeedsFn) : []
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
                'combatAmazon': combatAmazonLiveFeed.filter(filterPastFeedsFn),
                'combatRoku': combatRokuLiveFeed.filter(filterPastFeedsFn),
                'sportsRoku': sportsRokuLiveFeed.filter(filterPastFeedsFn),
                'sportsPluto': sportsPlutoLiveFeed.filter(filterPastFeedsFn),
                'profGRoku': profGRokuLiveFeed.filter(filterPastFeedsFn),
                'profGAmazon': profGAmazonLiveFeed.filter(filterPastFeedsFn)
            });
            return;
        }

        else {
            setFilteredLiveFeeds({
                'combatAmazon': combatAmazonLiveFeed.filter(startsWithFn),
                'combatRoku': combatRokuLiveFeed.filter(startsWithFn),
                'sportsRoku': sportsRokuLiveFeed.filter(startsWithFn),
                'sportsPluto': sportsPlutoLiveFeed.filter(startsWithFn),
                'profGRoku': profGRokuLiveFeed.filter(startsWithFn),
                'profGAmazon': profGAmazonLiveFeed.filter(startsWithFn)
            });
        }

    }, [selectedDate]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);
    }

    const handleOption = (option: { value: string | number, label: string }, input:string, index: number) => {
        if (input === "channel") {
            if (index === 1) {
                if ( typeof option.value === 'string') setChannel1(option.value);
            } else if (index === 2) {
                if ( typeof option.value === 'string') setChannel2(option.value);
            }
        } 
        else if (input === "platform") {
            if (index === 1) {
                if ( typeof option.value === 'string') setPlatform1(option.value);
            } else if (index === 2) {
                if ( typeof option.value === 'string') setPlatform2(option.value);
            }
        }
    }

    const filteredLiveFeed1 = filteredLiveFeeds[channel1 + platform1 as keyof FilteredLiveFeeds] || [];
    const filteredLiveFeed2 = filteredLiveFeeds[channel2 + platform2 as keyof FilteredLiveFeeds] || [];
    
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
                                    <div>
                                        <Typography type='input-label' className='select-label'>Select Live Feed 1:</Typography>
                                        <SelectInput placeholder="Select Channel" options={channelOptions} onChange={(o) => handleOption(o, "channel", 1)} initialValue= {channelOptions[initialChannel1Index]}/>
                                        <SelectInput placeholder="Select Platform" options={platformsOptions} onChange={(o) => handleOption(o, "platform", 1)} initialValue={platformsOptions[intialPlatform1Index]}/>
                                    </div>
                                    <div>
                                        <Typography type='input-label' className='select-label'>Select Live Feed 2:</Typography>
                                        <SelectInput placeholder="Select Channel" options={channelOptions} onChange={(o) => handleOption(o, "channel", 2)} initialValue={channelOptions[initialChannel2Index]}/>
                                        <SelectInput placeholder="Select Platform" options={platformsOptions} onChange={(o) => handleOption(o, "platform", 2)} initialValue={platformsOptions[intialPlatform2Index]}/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="epgs-container">
                            <EPGContainer liveFeeds={filteredLiveFeed1} liveFeedId={channel1 + platform1} />
                            <EPGContainer liveFeeds={filteredLiveFeed2} liveFeedId={channel2 + platform2} />
                        </div>
                    </>
                )
            }

    
        </div>
    );
}

const PageWrapper = () => <Layout><Page /></Layout>

export default PageWrapper;