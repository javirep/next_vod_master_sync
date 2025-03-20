'use client'

import React from 'react'

import './DateInput.scss'
import TextInput from '../TextInput/TextInput';
import moment from 'moment';

type DateInputProps = {
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    labelText?: string;
    initialValue?: string;
    inputCSS?: React.CSSProperties;
}

export const DateInput = (props: DateInputProps) => {
    const { placeholder, onChange, className="", labelText, initialValue, inputCSS={width: 100}} = props;

    const formatDate = (date: string) => {
            // remove all non-numeric characters
            date = date.replace(/\D/g, '');
    
            if (date.length > 8) {
                date = date.slice(0, 8);
            }
    
            // add a dash after the first two characters
            date = date.replace(/(\d{2})(\d)/, '$1-$2');
            // add a dash after the 5th character
            date = date.replace(/(\d{2}-\d{2})(\d)/, '$1-$2');
            return date;
    
        }

    const isValidFormat = (s: string) => s.length < 10 || moment(s, 'MM-DD-YYYY').isValid();

    const isValidFinalFormat = (s: string) =>  moment(s, 'MM-DD-YYYY').isValid();
    
    return (
        <TextInput
            placeholder={placeholder}
            labelText={labelText}
            onChange={onChange}
            className={`date-input ${className}`}
            format={{
                formatString: formatDate,
                isValidFormat,
                isValidFinalFormat,
                formatError: 'Invalid Date'
            }}
            initialValue={initialValue}
            inputCSS={inputCSS}
        />
    )
}