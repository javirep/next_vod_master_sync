'use client'

import React, { useState, useEffect } from "react";

import './EPG.scss';
import Typography from "@/app/components/Typography/Typography";
import Layout from "../components/Layout/Layout";
import rokuEPG from "../utils/EPGs/RokuEPG.json";
import EPGContainer from "../components/EPGContainer/EPGContainer";
import { LiveFeed, Program } from "../models/ProgramModel";
import { DateInput } from "../components/Inputs/DateInput/DateInput";
import { getRokuEPG } from "../services/EPGs";
import { get } from "http";

function Page() {
    const [rokuLiveFeed, setRokuLiveFeed] = useState<LiveFeed[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [filteredRokuLiveFeed, setFilteredRokuLiveFeed] = useState<LiveFeed[]>(rokuLiveFeed);
    
    const loadEPGs = async () => {
        const rokuEPG = await getRokuEPG();
        console.log('Roku EPG:', rokuEPG);
        if (rokuEPG) {
            setRokuLiveFeed(rokuEPG.epg);
            setFilteredRokuLiveFeed(rokuEPG.epg);
        } else {
            console.error('Failed to fetch Roku EPG');
        }
    }

    useEffect(() => {

        loadEPGs()
        
    }, []);

    useEffect(() => {
        if (!selectedDate){
            console.log('No date selected, showing all feeds');
            console.log('Roku Live Feed:', rokuLiveFeed);
            setFilteredRokuLiveFeed(rokuLiveFeed);
            return;
        }
        

        const filteredFeeds = rokuLiveFeed.filter((feed) => {
            const feedDate = new Date(feed.date);
            const selectedDateObj = new Date(selectedDate);
            return feedDate.toDateString() === selectedDateObj.toDateString();
        });

        setFilteredRokuLiveFeed(filteredFeeds);
    }, [selectedDate]);



    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setSelectedDate(newDate);
    }
    
    return (
        <div>
            <Typography type='title' className='epg-title'> EPG validation </Typography>

            <DateInput placeholder="YYYY-MM-DD" labelText='Start Date:' onChange={(e) => { handleDateChange(e) }} />
    
            <EPGContainer liveFeeds={filteredRokuLiveFeed}/>
        </div>
    );
}



const PageWrapper = () => <Layout><Page /></Layout>

export default PageWrapper;