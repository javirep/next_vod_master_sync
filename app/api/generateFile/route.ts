
import { NextResponse } from 'next/server';
import masters from './../utils/masters/outputMasters'
import { generateTab } from '../utils/generateTemplate';
import { getSeries, getTitles } from '../masterTracker/masterTracker.service';
import moment from 'moment';
import * as XLSX from 'xlsx'
import { generateArtworkTab } from '../utils/generateArtworkTab';

export const runtime = "nodejs"; 

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

    let fileContent = {} as {[key:string]: string[][]}

    let errorsContent = [['title', 'error_field', 'error_message', 'date']]

    selectedMaster.tabs.forEach( tab => {
            const {content, errors} = generateTab(tab.content, selectedVideos)
            fileContent[tab.tabName] = content
            if (errors.length) errors.forEach( error => errorsContent.push(error))
        }
    );

    if (masterId == 'frequencyManifestXlsx') {
        const {content, errors} = generateArtworkTab(selectedVideos)
        fileContent['Artwork'] = content

        if (errors.length) errors.forEach( error => errorsContent.push(error))
    }

    const now = moment().format('YYYY-MM-DD-HH-mm-ss');
    
    const baseName = selectedMaster.outputName || "export";
    const ouputFileName = `${baseName}-${now}.${selectedMaster.outputFormat || selectedMaster.outputFormat}`;

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

        const wb = XLSX.utils.book_new();

        for (const [tabName, rows] of Object.entries(fileContent)) {
            const ws = XLSX.utils.aoa_to_sheet(rows as any[][]); // AOA = array of arrays
            XLSX.utils.book_append_sheet(wb, ws, tabName.slice(0, 31)); // Excel tab name limit
        }
        
        const excelBuffer = XLSX.write(wb, {
            type: "buffer",
            bookType: "xlsx",
            compression: true
        });
        response.file['fileContent'] = excelBuffer.toString("base64");

        return NextResponse.json(response, {
             headers: {
               "Content-Type": "application/json",
               "Cache-Control": "no-store"
             }
         });

    }

    // Regular CSV
    response.file['fileContent'] = fileContent.main.map(row => {
        return row.map(cell=> typeof cell === 'string' ? `"${cell.replace(/"/g, '""')}"` : cell ).join(',') // Escape double quotes in strings
    }).join('\n')

    return NextResponse.json( response, {
        status: 200,
        headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename="${ouputFileName}.csv"`,
            'Cache-Control': 'no-store'
        }
    });

}
