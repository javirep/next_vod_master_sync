'use client';

import React from 'react'
import Typography from '../../Typography/Typography';
import classNames from 'classnames';

import './SelectInput.scss';

export type SelectOption = {
    value: string | number;
    label: string;
}

type SelectInputProps = {
    options: SelectOption[];
    onChange: (o: SelectOption) => void;
    placeholder?: string;
    className?: string;
    labelText?: string;
    initialValue?: SelectOption;
}

export const SelectInput = (props: SelectInputProps) => {
    const { options, onChange, placeholder = 'Select Option', className="", labelText, initialValue} = props;

    const [selectedOption, setSelectedOption] = React.useState<SelectOption | undefined>(initialValue);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');

    const handleOnChange = (option?: SelectOption) => {
        setSelectedOption(option);
        if (option) onChange(option);
        setIsOpen(false);
    }

    const handleOpen = () => {
        setIsOpen(!isOpen);
    }

    const showGrey = !selectedOption && !isOpen;

    const drawerArrow = <svg width="12" height="12" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 11L0.937822 0.5L13.0622 0.5L7 11Z" fill={showGrey ? '#595959' : '#D3D1D1' } 
        transformOrigin="center" transform={isOpen ? "rotate(180)" : ''} />
    </svg>
    
    
    return (
        <div className={classNames("select-input-wrapper " + className, {
                grey: showGrey
            })}
            onClick={handleOpen}
        >

            {labelText && <Typography type='input-label' className='select-input-label'> {labelText} </Typography>}

            <div>
                <div className="select-input-container">
                    <div className='select-input-collapsed'>
                        <Typography type="input-label" className='select-label'>{selectedOption ? selectedOption.label : placeholder}</Typography>

                        {drawerArrow}
                    </div>
                </div>

                
                <div className={classNames("select-options", {'open': isOpen})}>
                    <div className="select-option" onClick={(e) => handleOnChange ()}>Select Option</div>
                    {options.map((option, index) => (
                        <div key={index} className="select-option" onClick={(e) => handleOnChange (option)}>{option.label}</div>
                    ))}
                </div>

                <Typography type="error" className="error-message">{error}</Typography>
            </div>

        </div>
    )
}
