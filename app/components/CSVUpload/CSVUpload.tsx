'use client';

import Image from 'next/image';
import React, { useCallback } from 'react';
import Papa from 'papaparse';
import { useDropzone } from 'react-dropzone';
import uploadSvg from '../../assets/icons/upload.svg';
import * as XLSX from 'xlsx';
import Typography from '../Typography/Typography';

import './CSVUpload.scss';


type CSVUploadProps = {
  handleData: (data: any) => void;
};

const CSVUpload = (props: CSVUploadProps) => {
  const { isMobile } = { isMobile: false }; // Replace with actual mobile detection logic
  const { handleData } = props;

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

  const handleExcelUpload = useCallback((file: File) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      if (event.target) {
        const workbook = XLSX.read(event.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const sheetData = XLSX.utils.sheet_to_json(sheet) as any[];

        handleData(sheetData);
      }
    };

    reader.readAsArrayBuffer(file);
  }, []);

  const extractRecipients = useCallback((data: any) => {
    const trythyValues = ['true', 'yes', '1', 'y'];

    handleData(data);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="dropzone-container">
      <div
        {...getRootProps()}
        className="dropzone"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <Image width={32} height={32} src={uploadSvg.src} alt="upload" />
            <Typography
              type="body"
              className="text-seaFoam-800 mt-2"
            >
              {isMobile
                ? 'Upload Excel or CSV file'
                : 'Drag and drop an Excel or CSV file or click to browse'}
            </Typography>
          </>
        )}
      </div>
    </div>
  );
};

export default CSVUpload;
