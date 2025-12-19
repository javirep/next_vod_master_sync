'use client';

import React, { useEffect, useState } from "react";

import { Typography } from "../components/Typography/Typography";
import { Button } from "../components/Button/Button";
import { RowType, Table } from "../components/Table/Table";
import { VideoModel } from "../models/VideoModel";
import moment from "moment";
import { generateTemplate } from "../utils/generateTemplate";
import TextInput from "../components/Inputs/TextInput/TextInput";
import outputMasters from "../utils/masters/outputMasters";

import './generateTemplate.scss';
import { SelectInput, SelectOption } from "../components/Inputs/SelectInput/SelectInput";
import selectPlatformsOptions from "./utils/selectPlatformOptions";
import { getMasterTrackerData } from "../services/masterTracker";
import Layout from "../components/Layout/Layout";
import { downloadFile } from "../services/generateFile";

type TableFilters = {
    distributor: string
    title: string
    guids: string
    series_title: string
    brandedVOD: boolean
    unbrandedVOD: boolean
    thirdPartyLinear: boolean
    platformStatus: string
}

type VideoModelObj = { [key:string]: VideoModel }

const Page = (  ) => {

    const [ videos, setVideos ] = useState<VideoModelObj>({});
    const [ filteredVideos, setFilteredVideos ] = useState<VideoModel[]>([]);
    const [ rowsPerPage, setRowsPerPage ] = React.useState<number>(50);
    const [ currentPage, setCurrentPage ] = React.useState<number>(0);
    const [ platformFilter, setPlatformFilter ] = React.useState<string>('');
    const [ masterId, setMasterId ] = useState('')
    const [ loadingTable, setLoadingTable ] = useState(true)

    const [filters, setFilters] = useState<TableFilters>({
        distributor: '',
        title: '',
        guids: '',
        series_title: '',
        brandedVOD: false,
        unbrandedVOD: false,
        thirdPartyLinear: false,
        platformStatus: ''
    })
    
    const initContent = async () => {
        const response = await getMasterTrackerData();

        
        const { titles } = response ? response : { titles: [] }
        
        const videosInit = {} as VideoModelObj;
        
        titles.forEach(title => {
            if (title.guid && title.title){
                videosInit[title.guid] = title;
            }
        })
        console.log('Videos Init:', response);
        
        setFilteredVideos(getVideosAsVideoModel(videosInit));
        setVideos(videosInit);
        setLoadingTable(false);
    }

    useEffect(() => {
        initContent();
    }, [])

    useEffect(() => {
        let filteredVideos = {} as VideoModelObj;

        if (filters.guids && filters.guids != '') {
            const guids = filters.guids.split(' ').map(guid => guid.trim());
            guids.forEach(guid => {
                if (videos[guid]) {
                    filteredVideos[guid] = videos[guid];
                }
            });
        }
        else {
            filteredVideos = videos;
        }

        setFilteredVideos( getVideosAsVideoModel(filteredVideos).filter(applyFilters) );
        setCurrentPage(0);
    }
    , [filters])

    const getVideosAsVideoModel = (videos: VideoModelObj) => {
        return Object.keys(videos).map(videoId => videos[videoId]);
    }

    const getRows = () => {

        const videoArray: VideoModel[] = filteredVideos.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

        let rows = [] as RowType[];

        videoArray.forEach(video => {
            let row = {} as RowType;

            Object.keys(video).forEach(key => {
                if ( video[key] == null ) row[key] = ''
                else if ( typeof video[key] == 'number') row[key] = video[key].toString()
                else if ( typeof video[key] == 'object') row[key] = moment(video[key]).format('MM-DD-YYYY')
                else if ( typeof video[key] == 'boolean' && key != 'selected') row[key] = video[key] ? 'Yes' : 'No'
                else row[key] = video[key]
            })

            rows.push(row) ;
        })

        return rows;
    }

    const handleGenerateTemplate = async () => {

        if (!masterId || masterId == '') {
            alert('Please select an export type');
            return
        };

        const selectedVideosGuids = Object.values(videos).filter(video => video.selected).map(video => { return video.guid; });

        const response = await downloadFile(masterId, selectedVideosGuids);

        const fileContent = response.file.fileContent;
        const fileName = response.file.fileName;

        if (response.file.fileFormat == 'xlsx') {
            downloadXlsx(fileContent, fileName);
        }

        if (response.file.fileFormat == 'csv') {
            downloadCsv(fileContent, fileName);
        }

        if (response.errorFile) {
            const errorFileContent = response.errorFile.fileContent;
            const errorFileName = response.errorFile.fileName;

            downloadCsv(errorFileContent, errorFileName);
            alert ('Template generated with errors. Please check the error file.' );
        }
    }

    const downloadCsv = (csvContent: string, fileName) => {
        const blob = new Blob([csvContent], {type: 'text/csv'})
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.click()
    }

    const downloadXlsx = (tableContent: any[], fileName: string) => {
        console.log('Downloading XLSX:', tableContent, fileName);
        // Using xlsx library to generate xlsx file
    }

    const handleTextFilters = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setFilters({...filters, [key]: e.target.value})
    }

    const handleSelectMaster = (o: SelectOption) => {
        setMasterId(o.value as string)
    }

    const handleSelectRows = (rowId: string, selected: boolean) => {
        let newSelectedVideo = videos[rowId];
        newSelectedVideo.selected = selected;

        setVideos({
            [rowId]: newSelectedVideo,
            ... videos
        })
        
    }

    const handleSelectFilters = (value: string, key: string) => {
        setFilters({...filters, [key]: value})
    }

    const applyFilters = (video: VideoModel) => {
        if (filters.distributor && video.licensor.toLowerCase().indexOf(filters.distributor.toLowerCase()) === -1) return false;
        if (filters.title && video.title.toLowerCase().indexOf(filters.title.toLowerCase()) === -1) return false;
        if (filters.series_title && (!video.seriesTitle || video.seriesTitle.toLowerCase().indexOf(filters.series_title.toLowerCase()) === -1 )) return false;
        if (filters.brandedVOD && !video.brandedVOD) return false;
        if (filters.unbrandedVOD && !video.unbrandedVOD) return false;
        if (filters.thirdPartyLinear && !video.thirdPartyLinear) return false;
        if (filters.platformStatus && video[platformFilter] !== filters.platformStatus ){
            return false;
        } 

        return true
    }

    const getSelectPlatformOptions = () => {
        return Object.keys(selectPlatformsOptions).map(platform => {return { value: platform, label: selectPlatformsOptions[platform].label}})
    }

    const getSelectPlatformStatusOptions = () => {
        if (!platformFilter || platformFilter == '') return [{ value: '', label: ''}];
        return selectPlatformsOptions[platformFilter].states.map(state => {return { value: state, label: state}})
    }


    return (
    <div>
        <Typography type='title' className="mb-4">Generate Avails Template</Typography>

        {
        
        loadingTable ? <Typography type="body">Loading table data...</Typography> : (

        <>
            <div className='top-container'>
                    <div>
                        <div className='filters-container'>
                            <TextInput labelText="Distributor" onChange={(e) => handleTextFilters(e, 'distributor')}/>
                            <TextInput labelText="Title" onChange={(e) => handleTextFilters(e, 'title')}/>
                            <TextInput labelText="Series Title" onChange={(e) => handleTextFilters(e, 'series_title')}/>
                            <TextInput labelText="GUID(s)" onChange={(e) => handleTextFilters(e, 'guids')}/>
                        
                    
                            {/* <Checkbox label="Branded VOD" onChange={(value) => handleCheckboxFilters(value, 'brandedVOD')} checked={filters.brandedVOD}/>
                            <Checkbox label="Unbranded VOD" onChange={(value) => handleCheckboxFilters(value, 'unbrandedVOD')} checked={filters.unbrandedVOD}/>
                            <Checkbox label="3rd Party Linear" onChange={(value) => handleCheckboxFilters(value, 'thirdPartyLinear')} checked={filters.thirdPartyLinear}/> */}
                        </div>
                    </div>

                    <div className='filters-container'>
                        <Typography type="input-label"> Filter by Platform Status</Typography>
                        <SelectInput labelText="Platform:" options={getSelectPlatformOptions()} onChange={(o) => setPlatformFilter(o.value as string)} />
                        <SelectInput labelText="Status:" options={getSelectPlatformStatusOptions()} onChange={(o) => handleSelectFilters(o.value as string, 'platformStatus')}/>
                    </div>
                    <div className='filters-container'>
                        <SelectInput options={outputMasters.map(master => {return { value: master.id, label: master.name}})} onChange={handleSelectMaster} />
                        <Button type='primary' text='Generate Template' onClick={() => handleGenerateTemplate()}/>
                    </div>
            </div>

            <Table
                header={[
                    {colKey: 'licensor', colText: 'Distributor', width: 120},
                    {colKey: 'type', colText: 'Type', width: 80},
                    {colKey: 'title', colText: 'Title', width: 200},
                    {colKey: 'series', colText: 'Series Name', width: 200},
                    {colKey: 'rightsStart', colText: 'Rights Start', width: 100},
                    {colKey: 'rightsEnd', colText: 'Rights End', width: 100},
                    {colKey: 'frequency', colText: 'In Frequency', width: 150},
                    {colKey: 'brandedVOD', colText: 'Branded VOD', width: 50},
                    {colKey: 'unbrandedVOD', colText: 'Unbranded VOD', width: 50},
                    {colKey: 'thirdPartyLinear', colText: '3rd Party Linear', width: 100},
                ]}
                rows={getRows()}
                onRowsPerPageChange={(num) => setRowsPerPage(num)}
                onSelectRows={ handleSelectRows}

                indexatorInfo={{
                    totalItems: filteredVideos.length,
                    itemsPerPage: rowsPerPage,
                    currentPage: currentPage,
                    onPageChange: (page) => setCurrentPage(page),
                }}
                
            />
        </>
        
        )}
        
    </div>

    
    )
}

const PageWrapper = () => <Layout><Page /></Layout>

export default PageWrapper;