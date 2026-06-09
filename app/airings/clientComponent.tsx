'use client';

import React, { useEffect, useState } from "react";

import { Typography } from "../components/Typography/Typography";
import Layout from "../components/Layout/Layout";
import { DateInput } from "../components/Inputs/DateInput/DateInput";
import moment from "moment";
import { Button } from "../components/Button/Button";
import { getFrequencyLogin, getFrequencySchedule } from "../services/Frequency";
import { Table } from "../components/Table/Table";
import { SelectInput } from "../components/Inputs/SelectInput/SelectInput";

import './clientComponent.scss'


type AiringType = {
    guid: string,
    linearChannelId: string,
    linearChannelName: string,
    programStartTime: string, 
    programEndTime: string,
    programDuration: string,
    programId: string, 
    programTitle: string, 
    programDescription: string,
    seriesName: string, 
    seasonNumber: string,
    episodeNumber: string, 
    videoId: string
    selected: boolean
}

const channelOptions = [
    {value: "253", label: "Swerve Combat"},
    {value: "1013", label: "Swerve Sports"},
    {value: "1562", label: "Prof G Channel"}
]



const Page = (  ) =>  {

    const [fromDate, setFromDate] = useState(moment().subtract(10, 'days').format("YYYY-MM-DD"))
    const [toDate, setToDate] = useState(moment().subtract(1, 'days').format("YYYY-MM-DD"))
    const [frequencyTokenAccess, setFrequencyTokenAccess] = useState("");
    const [frequencyDeviceId, setFrequencyDeviceId] = useState("");
    const [fetchedAirings, setFetchedAiringsFn] = useState<AiringType[]>([])
    const [filteredAirings, setFilteredAirings] = useState<AiringType[]>([])
    const [ rowsPerPage, setRowsPerPage ] = React.useState<number>(50);
    const [ currentPage, setCurrentPage ] = React.useState<number>(0);
    const [ isGenerating, setIsGenerating ] = useState(false)
    const [selectedChannel, setSelectedChannel] = useState("")
    

    const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>, type='string') => {
        if (type == 'from') setFromDate (e.target.value)
        if (type == 'to') setToDate (e.target.value)
    }

    useEffect(() =>{
        initContent()
    }, [])


    const initContent = async () => {
        if (!frequencyDeviceId || !frequencyTokenAccess) await loadAuth()
    }

    const loadAuth = async () => { 
        const response = await getFrequencyLogin()

        if (response){
            setFrequencyDeviceId(response.device_id)
            setFrequencyTokenAccess(response.token.token_access)
        }

    }

    const loadSchedule = async () => {
        if (!frequencyDeviceId || !frequencyTokenAccess) {
            alert("Something went wrong")
            return
        }

        const response = await getFrequencySchedule(frequencyDeviceId, frequencyTokenAccess, fromDate, toDate)

        setFetchedAiringsFromString(response.data)
    }

    const setFetchedAiringsFromString = (csvString: string) => {
        const lines = csvString
            .trim()
            .split(/\r?\n/)
            .filter(line => line.length > 0);

        if (lines.length < 2) {
            setFetchedAiringsFn([]);
            return;
        }

        // Remove header
        const dataLines = lines.slice(1);

        const parsedData: AiringType[] = dataLines.map((line, index) => {
            // Handles quoted CSV values
            const values =
            line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)?.map(v =>
                v.replace(/^"|"$/g, "")
            ) || [];

            return {
                guid: index.toString(),
                linearChannelId: values[0] || "",
                linearChannelName: values[1] || "",
                programStartTime: values[2] || "",
                programEndTime: values[3] || "",
                programDuration: values[4] || "",
                programId: values[5] || "",
                programTitle: values[6] || "",
                programDescription: values[7] || "",
                seriesName: values[8] || "",
                seasonNumber: values[9] || "",
                episodeNumber: values[10] || "",
                videoId: values[11] || "",
                selected: true,
            };
        });

        setFetchedAiringsFn(parsedData);
        setFilteredAirings(parsedData)
    };

    const getRows = () => filteredAirings.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    const handleGenerateTemplate = async () => {

        if (!isGenerating) setIsGenerating(true);
        if (filteredAirings.length == 0){
            alert ("No Airings to download")
            setIsGenerating(false)
            return
        }

  
        const headers = [
            "linear_channel_id",
            "linear_channel_name",
            "program_start_time",
            "program_end_time",
            "program_duration",
            "program_id",
            "program_title",
            "program_description",
            "series_name",
            "season_number",
            "episode_number",
            "video_id",
        ];

        const rows = filteredAirings.map((item) => [
            item.linearChannelId,
            item.linearChannelName,
            item.programStartTime,
            item.programEndTime,
            item.programDuration,
            item.programId,
            item.programTitle,
            item.programDescription,
            item.seriesName,
            item.seasonNumber,
            item.episodeNumber,
            item.videoId,
        ]);

        const escapeCsvValue = (value: string) => {
            const safeValue = value ?? "";
            return `"${safeValue.replace(/"/g, '""')}"`;
        };

        const csvContent = [
            headers.map(escapeCsvValue).join(","),
            ...rows.map((row) => row.map(escapeCsvValue).join(",")),
        ].join("\n");

        const blob = new Blob(["\uFEFF" + csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "frequency_airings.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        setIsGenerating(false);
    }

    const handleFilterAirings = (channelId: string) =>{
        setFilteredAirings(fetchedAirings.filter(airing => airing.linearChannelId == channelId))
        setSelectedChannel(channelId)
    }

    return <>
         <Typography type='title' className="mb-4">Airings</Typography>

        <div className="top-container">
            <div className='filters-container'>
                <DateInput labelText="From" placeholder='YYYY-MM-DD' initialValue={fromDate} onChange={(e) => handleDateInputChange(e, 'from')}/>
                <DateInput labelText="To" placeholder='YYYY-MM-DD' initialValue={toDate} onChange={(e) => handleDateInputChange(e, "to")}/>

                <Button type="primary" text="Search" onClick={loadSchedule} />
            </div>

            <div className='filters-container'>
                <Typography type="input-label"> Filter by Channel</Typography>
                <SelectInput labelText="Channel:" options={channelOptions} onChange={(o) => handleFilterAirings(o.value as string)}/>
            </div>

            <div className='filters-container'>
                <Button type='primary' text={isGenerating ? 'Generating ...' : 'Download Airings' } onClick={() => handleGenerateTemplate()}/>
            </div>

        </div>

        {
            filteredAirings.length ? (
                <Table
                    header={[
                        {colKey: 'linearChannelId', colText: 'Channel Id', width: 90},
                        {colKey: 'linearChannelName', colText: 'Channel Name', width: 120},
                        {colKey: 'programStartTime', colText: 'Program Start', width: 200},
                        {colKey: 'programEndTime', colText: 'Program End', width: 200},
                        {colKey: 'programDuration', colText: 'Duration', width: 150},
                        {colKey: 'programId', colText: 'Program Id', width: 90},
                        {colKey: 'programTitle', colText: 'Program Title', width: 100},
                        {colKey: 'programDescription', colText: 'Program Description', width: 120},
                        {colKey: 'seriesName', colText: 'Series', width: 150},
                        {colKey: 'seasonNumber', colText: 'S#', width: 50},
                        {colKey: 'episodeNumber', colText: 'E#', width: 50},
                        {colKey: 'videoId', colText: 'Video Id', width: 100},
                    ]}
    
                    rows={getRows()}
                    onRowsPerPageChange={(num) => setRowsPerPage(num)}
                    onSelectRows={ () => {} }
    
                    indexatorInfo={{
                        totalItems: filteredAirings.length,
                        itemsPerPage: rowsPerPage,
                        currentPage: currentPage,
                        onPageChange: (page) => setCurrentPage(page),
                    }}
                    showSelect={false}
                />
            ) : 
            <></>
        }
    </>
}

const PageWrapper = () => <Layout><Page /></Layout>

export default PageWrapper;