'use client';
import React from 'react';
import { TextInput, TextInputProps } from '../TextInput/TextInput';

import './SearchInput.scss';

export const SearchInput = (props: TextInputProps) => {
    const { placeholder, onChange, className } = props;

    const [isFocused, setIsFocused] = React.useState(false);
    const [value, setValue] = React.useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        onChange(e);
    }

    const handleFocus = (e) => {
        setIsFocused(true);
        if (props.onFocus) {
            props.onFocus(e);
        }
    }

    const handleBlur = (e) => {
        setIsFocused(false);
        if (props.onBlur) {
            props.onBlur(e);
        }
    }

    const c = isFocused || value 

    const searchIcon = <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5.71429" cy="5.71429" r="5.21429" stroke={c ? "#D3D1D1": "#595959"} strokeWidth={c ? "2" : "1"}/>
        <line x1="9.46291" y1="9.90153" x2="16.3201" y2="15.6158" stroke={c ? "#D3D1D1": "#595959"} strokeWidth={c ? "2" : "1"}/>
    </svg>

    return <TextInput
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
        className={`search-input ${className}`}
        icon={searchIcon}
        onFocus={(e) => handleFocus(e)}
        onBlur={(e) => handleBlur(e)}
    />
}
