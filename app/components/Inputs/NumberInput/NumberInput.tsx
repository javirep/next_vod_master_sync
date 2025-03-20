'use client'

import React from 'react'

import TextInput from '../TextInput/TextInput';

type numberInputProps = {
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    labelText?: string;
    initialValue?: number;
    inputCSS?: React.CSSProperties;
}

export const NumberInput = (props: numberInputProps) => {
    const { placeholder, onChange, className="", labelText, initialValue, inputCSS={width: 50}} = props;

    const formatNumber = (number: string) =>  number.replace(/\D/g, '') ; // remove all non-numeric characters

    const isValidFormat = (s: string) =>  Number(s) ? true : false;

    const isValidFinalFormat = (s: string) =>  Number(s) ? true : false;
    
    return (
        <TextInput
            placeholder={placeholder}
            labelText={labelText}
            onChange={onChange}
            className={`number-input ${className}`}
            format={{
                formatString: formatNumber,
                isValidFormat,
                isValidFinalFormat,
                formatError: 'Invalid Number'
            }}
            initialValue={initialValue ? initialValue.toString() : ''}
            inputCSS={inputCSS}
            type='number'
        />
    )
}