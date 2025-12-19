import { NextResponse } from 'next/server';
import masters from './../utils/masters/outputMasters'
import { generateTab } from '../utils/generateTemplate';
import { getSeries, getTitles } from '../masterTracker/masterTracker.service';
import moment from 'moment';

export const dynamicParams = true;

export async function POST( _req ) {
  
    // Access the URLSearchParams object
    const body = await _req.json()

    const masterId = body.masterId
    const guids = body.uuids

    let selectedMaster = masters.find( master => master.id == masterId)

    if (!selectedMaster) return NextResponse.json({
        success: false,
        error: "Master Id not Found"
    }, {
        status: 404,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
        }
    });

    let allTitles = await getTitles()
    let allSeries = await getSeries()

    allTitles.forEach( title => {
        title.series = allSeries[title.seriesTitle]
    })

    let selectedVideos = guids.map(guid => {
        return allTitles.find( title => guid == title.guid)
    })

    let fileContent = {
        main: [[]]
    }
    let errorsContent = [['title', 'error_field', 'error_message', 'date']]

    selectedMaster.tabs.forEach( tab => {
            const {content, errors} = generateTab(tab.content, selectedVideos)
            fileContent[tab.tabName] = content
            if (errors.length) errors.forEach( error => errorsContent.push(error))
        }
    );

    const now = moment().format('YYYY-MM-DD-HH-mm-ss');

    console.log({errorsContent, fileContent})
    
    const ouputFileName = selectedMaster.outputName ? `${selectedMaster.outputName}-${now}.csv` : `data-${now}.csv`;

    let response = {
        success: true,
        file: {
            fileName: ouputFileName, 
            fileFormat: selectedMaster.outputFormat
        }
    }
    
    if (errorsContent.length > 1) response['errorFile'] = {
        fileName: 'errors.csv',
        fileContent: errorsContent.map(row => row.join(',')).join('\n'),
        fileFormat: 'csv'
    }

    if (selectedMaster.outputFormat == 'xlsx') {
        response.file['fileContent'] = fileContent.main.map(row => row.join(',')).join('\n');
    
        return NextResponse.json( response, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': `attachment; filename="${ouputFileName}.csv"`,
                'Cache-Control': 'no-store'
            }
        });
    }

    // Regular CSV
    response.file['fileContent'] = fileContent.main.map(row => row.join(',')).join('\n');

    return NextResponse.json( response, {
        status: 200,
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="${ouputFileName}.csv"`,
            'Cache-Control': 'no-store'
        }
    });

}
