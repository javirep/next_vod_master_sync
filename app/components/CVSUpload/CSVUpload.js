
import React, { useCallback } from 'react';
import Papa from 'papaparse';
import { useDropzone } from 'react-dropzone';
//import uploadSvg from '../../assets/icons/upload.svg';
import * as XLSX from 'xlsx';
import Typography from '../Typography/Typography';
import { MasterTrackerMaster } from '../../utils/masters/MasterTracker';

import './CSVUpload.scss';

const CSVUpload = (props) => {

  const { addVideosFromCSVFile } = props;

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return alert('Enter a valid file');

    if (
      file.type !== 'text/csv' &&
      file.type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
      return alert('Please upload a CSV or Excel file');

    if (
      file.type ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      return handleExcelUpload(file);
    }

    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      if (!target) return;
      const csv = Papa.parse(target.result, {
        header: true,
      });
      const parsedData = csv?.data;
      extractRecipients(parsedData);
    };
    reader.readAsText(file);
  }, []);

  const handleExcelUpload = useCallback((file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const sheetData = XLSX.utils.sheet_to_json(sheet);

        extractRecipients(sheetData);
      }
    };

    reader.readAsArrayBuffer(file);
  }, []);

  const extractRecipients = useCallback((data) => {
    const truthyValues = ['true', 'yes', 'y', 'TRUE', 'YES', 'Y'];
    const falsyValues = ['false', 'no', 'n', 'FALSE', 'NO', 'N'];


    const recipients = data.map((data, index) => {

      const video = {};

      Object.keys(MasterTrackerMaster).forEach((key) => {
        let value = data[MasterTrackerMaster[key].key];


        if (truthyValues.includes(value)) video[key] = true;
        else if (falsyValues.includes(value)) video[key] = false;
        else video[key] = data[MasterTrackerMaster[key].key];
      });

      return video
    });

    // Filter out recipients with all missing fields
    const filteredRecipients = recipients.filter(
      (recipient) => Object.values(recipient).filter(Boolean).length > 1
    );

    addVideosFromCSVFile(filteredRecipients);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const uploadIcon = <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.09 122.88" width={32} height={32}>
    <title>file-upload</title>
    <path 
      className="cls-1"
      d="M64.64,13,86.77,36.21H64.64V13ZM42.58,71.67a3.25,3.25,0,0,1-4.92-4.25l9.42-10.91a3.26,3.26,0,0,1,4.59-.33,5.14,5.14,0,0,1,.4.41l9.3,10.28a3.24,3.24,0,0,1-4.81,4.35L52.8,67.07V82.52a3.26,3.26,0,1,1-6.52,0V67.38l-3.7,4.29ZM24.22,85.42a3.26,3.26,0,1,1,6.52,0v7.46H68.36V85.42a3.26,3.26,0,1,1,6.51,0V96.14a3.26,3.26,0,0,1-3.26,3.26H27.48a3.26,3.26,0,0,1-3.26-3.26V85.42ZM99.08,39.19c.15-.57-1.18-2.07-2.68-3.56L63.8,1.36A3.63,3.63,0,0,0,61,0H6.62A6.62,6.62,0,0,0,0,6.62V116.26a6.62,6.62,0,0,0,6.62,6.62H92.46a6.62,6.62,0,0,0,6.62-6.62V39.19Zm-7.4,4.42v71.87H7.4V7.37H57.25V39.9A3.71,3.71,0,0,0,61,43.61Z"
      fill="#000"
    />
  </svg>

  return (
    <div className="csv-upload-container">
      <div
        {...getRootProps()}
        className="csv-upload"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            {uploadIcon}
            <Typography
              type="body"
              className="mt-2"
            > Drag and drop an Excel or CSV file or click to browse
            </Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default CSVUpload;
