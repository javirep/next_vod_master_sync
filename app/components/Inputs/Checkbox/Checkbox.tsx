'use client'

import React from 'react'
import Typography from '../../Typography/Typography';
import classNames from 'classnames';

import './Checkbox.scss';

type CheckboxProps = {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export const Checkbox = (props: CheckboxProps) => {
    const { label, checked, onChange } = props;

    const uncheckedIcon = <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="12" height="12" rx="2" fill="#595959"/>
    </svg>

    const checkedIcon = <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="12" height="12" rx="2" fill="#007AFF"/>
        <path d="M3.5 6L5.5 8L9.5 4" stroke="white" strokeWidth="1.5"/>
    </svg>
    


    return (
        <div className="checkbox-wrapper" onClick={() => onChange(!checked)}>
            {checked ? checkedIcon : uncheckedIcon}
            <Typography type="input-label" className={classNames({'grey': !checked})}>{label}</Typography>
        </div>
    )
}