'use client';

import React, { useState } from "react";

import './TextInput.scss';
import classNames from "classnames";
import Typography from "../../Typography/Typography";

type format = {
    formatString: (s: string) => string;
    isValidFormat: (s: string) => boolean;
    isValidFinalFormat: (s: string) => boolean;
    formatError: string;
}

export type TextInputProps = {
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    labelText?: string;
    icon?: React.ReactNode;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    format?: format;
    initialValue?: string;
    inputCSS?: React.CSSProperties;
    passwordInput?: boolean;
    type?: string;
}

export const TextInput = (props: TextInputProps) => {
    const { placeholder ='', onChange, className="", labelText='', icon, format, initialValue = '', inputCSS={}, type='text'} = props;

    const [value, setValue] = useState(initialValue);
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        let currentValue = e.target.value;

        if (format) {
            const { formatString, isValidFormat, formatError } = format;

            currentValue = formatString(currentValue);
            if (!isValidFormat(currentValue)) setError(formatError);
        }
        
        e.target.value = currentValue;

        setValue(e.target.value);
        onChange(e);
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);
        if (props.onFocus) {
            props.onFocus(e);
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {

        setIsFocused(false);
        if (props.onBlur) {
            props.onBlur(e);
        }

        if (format && !format.isValidFinalFormat(value)) setError(format.formatError);
    }
    
    return (<div className={classNames("text-input-wrapper " + className, {
        grey: value === '' && !isFocused
    })}>
        {labelText && <Typography type='input-label' className="text-input-label"> {labelText} </Typography>}

        <div>
            <div className="text-input-container">
                {icon}
                <input
                    className={'text-input'}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    onFocus={(e) => handleFocus(e)}
                    onBlur={(e) => handleBlur(e)}
                    style={inputCSS}
                    type={type}
                />
            </div>

            {error && <Typography type="error" className="mt-1">{error}</Typography>}
        </div>
    </div>
    );
}

export default TextInput;