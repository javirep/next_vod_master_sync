'use client';

import React, { useEffect, useState } from "react";

import { Typography } from "../components/Typography/Typography";
import { Button } from "../components/Button/Button";
import { RowType, Table } from "../components/Table/Table";
import { VideoModel } from "../models/VideoModel";
import moment from "moment";
import { generateTemplate } from "../services/generateTemplate";
import TextInput from "../components/Inputs/TextInput/TextInput";
import { Checkbox } from "../components/Inputs/Checkbox/Checkbox";
import outputMasters from "../utils/masters/outputMasters";

import './generateTemplate.scss';
import { SelectInput, SelectOption } from "../components/Inputs/SelectInput/SelectInput";
import RootLayout from "../layout";
import selectPlatformsOptions from "./utils/selectPlatformOptions";

type TableFilters = {
    distributor: string
    title: string
    brandedVOD: boolean
    unbrandedVOD: boolean
    thirdPartyLinear: boolean
    platformStatus: string
}

type VideoModelObj = { [key:string]: VideoModel }

type propsType = { titles: VideoModel[] }

const Page = ( props: propsType ) => {

    const { titles  } = props;

    const videoInit = {} as VideoModelObj;

    titles.forEach(title => {
        videoInit[title.guid] = title;
    })

    const [ videos, setVideos ] = useState<VideoModelObj>(videoInit);
    const [ filteredVideos, setFilteredVideos ] = useState<VideoModel[]>([]);
    const [ rowsPerPage, setRowsPerPage ] = React.useState<number>(50);
    const [ currentPage, setCurrentPage ] = React.useState<number>(0);
    const [ selectedVideos, setSelectedVideos ] = useState<string[]>([]);
    const [ platformFilter, setPlatformFilter ] = React.useState<string>('');

    const [filters, setFilters] = useState<TableFilters>({
        distributor: '',
        title: '',
        brandedVOD: false,
        unbrandedVOD: false,
        thirdPartyLinear: false,
        platformStatus: ''
    })

    useEffect(() => {
        setFilteredVideos( getVideosAsVideoModel(videos).filter(applyFilters) );
        setCurrentPage(0);
    }
    , [filters])

    const [masterId, setMasterId] = useState('')

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

            row.id = video.guid;

            rows.push(row) ;
        })

        return rows;
    }

    const handleGenerateTemplate = () => {

        if (!masterId || masterId == '') {
            alert('Please select an export type');
            return
        };

        const master = outputMasters.find(master => master.id === masterId);

        if (!master) return;

        const tableContent = generateTemplate(master, selectedVideos.map(videoId => videos[videoId]));

        downloadCsv(tableContent);
    }

    const downloadCsv = (tableContent: any[]) => {
        const csvContent = tableContent.map(row => row.join(',')).join('\n')

        const blob = new Blob([csvContent], {type: 'text/csv'})
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'data.csv'
        a.click()
    }

    const handleTextFilters = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        setFilters({...filters, [key]: e.target.value})
    }

    const handleCheckboxFilters = (value: boolean, key: string) => {
        setFilters({...filters, [key]: value})
    }

    const handleSelectMaster = (o: SelectOption) => {
        setMasterId(o.value as string)
    }

    const handleSelectRows = (rowsId: string[], selected: boolean) => {
        setSelectedVideos(selected ? [...selectedVideos, ...rowsId] : selectedVideos.filter(id => !rowsId.includes(id)))
    }

    const handleSelectFilters = (value: string, key: string) => {
        setFilters({...filters, [key]: value})
    }

    const applyFilters = (video: VideoModel) => {
        if (filters.distributor && video.distributor.toLowerCase().indexOf(filters.distributor.toLowerCase()) === -1) return false;
        if (filters.title && video.title.toLowerCase().indexOf(filters.title.toLowerCase()) === -1) return false;
        if (filters.brandedVOD && !video.brandedVOD) return false;
        if (filters.unbrandedVOD && !video.unbrandedVOD) return false;
        if (filters.thirdPartyLinear && !video.thirdPartyLinear) return false;
        if (filters.platformStatus && video[platformFilter] !== filters.platformStatus ) return false;

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

        <div className='top-container'>
                <div>
                    <div className='filters-container'>
                        <TextInput labelText="Distributor" onChange={(e) => handleTextFilters(e, 'distributor')}/>
                        <TextInput labelText="Title" onChange={(e) => handleTextFilters(e, 'title')}/>
                    </div>
                    <div className='filters-container'>
                        <Checkbox label="Branded VOD" onChange={(value) => handleCheckboxFilters(value, 'brandedVOD')} checked={filters.brandedVOD}/>
                        <Checkbox label="Unbranded VOD" onChange={(value) => handleCheckboxFilters(value, 'unbrandedVOD')} checked={filters.unbrandedVOD}/>
                        <Checkbox label="3rd Party Linear" onChange={(value) => handleCheckboxFilters(value, 'thirdPartyLinear')} checked={filters.thirdPartyLinear}/>
                    </div>
                </div>

                <div className='filters-container'>
                    <SelectInput options={getSelectPlatformOptions()} onChange={(o) => setPlatformFilter(o.value as string)} />
                    <SelectInput options={getSelectPlatformStatusOptions()} onChange={(o) => handleSelectFilters(o.value as string, 'platformStatus')}/>
                </div>
                <div className='buttons-container'>
                    <SelectInput options={outputMasters.map(master => {return { value: master.id, label: master.name}})} onChange={handleSelectMaster} />
                    <Button type='primary' text='Generate Template' onClick={() => handleGenerateTemplate()}/>
                </div>
            </div>

            <Table
                header={[
                    {colKey: 'distributor', colText: 'Distributor', width: 120},
                    {colKey: 'type', colText: 'Type', width: 80},
                    {colKey: 'title', colText: 'Title', width: 200},
                    {colKey: 'rightsStart', colText: 'Rights Start', width: 100},
                    {colKey: 'rightsEnd', colText: 'Rights End', width: 100},
                    {colKey: 'brandedVOD', colText: 'Branded VOD', width: 50},
                    {colKey: 'unbrandedVOD', colText: 'Unbranded VOD', width: 50},
                    {colKey: 'thirdPartyLinear', colText: '3rd Party Linear', width: 50},
                    {colKey: 'fubo', colText: 'Fubo', width: 100},
                    {colKey: 'sling', colText: 'Sling', width: 100},
                    {colKey: 'xumo', colText: 'Xumo', width: 100},
                    {colKey: 'amazon', colText: 'Amazon', width: 100},
                    {colKey: 'pluto', colText: 'Pluto', width: 100},
                    {colKey: 'roku', colText: 'Roku', width: 100},
                    {colKey: 'vizio', colText: 'Vizio', width: 100},
                    {colKey: 'fsn', colText: 'FSN', width: 100},
                    {colKey: 'rsc', colText: 'RSC', width: 100},
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
        
    </div>
    )
}

export default (props) => <RootLayout><Page {... props} /></RootLayout>;