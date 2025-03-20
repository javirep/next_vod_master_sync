'use client';

import React, { useEffect, useState } from "react";

import './Checkboxes.scss';
import { Checkbox } from "../Checkbox/Checkbox";

export type CheckboxType = {
    value: string;
    label: string;
    checked: boolean;
}

type CheckboxesProps = {
    checkboxes: CheckboxType[];
    onChange: (checked: CheckboxType[]) => void;
    className?: string;
}

export const Checkboxes = (props: CheckboxesProps) => {
    const { checkboxes, onChange, className } = props;

    const [checkedBoxes, setCheckedBoxes] = useState<CheckboxType[]>(checkboxes);

    useEffect(() => {
        setCheckedBoxes(checkboxes);
    }
    , [checkboxes]);

    const handleCheckboxChange = (checkbox: CheckboxType) => {
        const newCheckedBoxes = checkedBoxes.map(cb => {
            if (cb.value === checkbox.value) {
                return { ...cb, checked: !cb.checked }
            }
            return cb;
        });

        setCheckedBoxes(newCheckedBoxes);
        onChange(newCheckedBoxes);
    }

    return (
        <div className={"checkboxes-wrapper " + className}>
            {checkboxes.map((checkbox, index) => (
                <Checkbox key={index} label={checkbox.label} checked={checkbox.checked} onChange={() => handleCheckboxChange(checkbox)} />
            ))}
        </div>
    )
}