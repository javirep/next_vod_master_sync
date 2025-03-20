'use client'

import React from 'react'

import TextInput from '../TextInput/TextInput';

type PasswordInputProps = {
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    labelText?: string;
    initialValue?: string;
    inputCSS?: React.CSSProperties;
}

export const PasswordInput = (props: PasswordInputProps) => {
    const { placeholder, onChange, className="", labelText, initialValue, inputCSS={}} = props;
    
    return (
        <TextInput
            placeholder={placeholder}
            labelText={labelText}
            onChange={onChange}
            className={`password-input ${className}`}
            initialValue={initialValue ? initialValue.toString() : ''}
            inputCSS={inputCSS}
            type='password'
        />
    )
}