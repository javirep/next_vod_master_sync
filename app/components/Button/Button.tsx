'use client';
import React from "react";
import Typography from "../Typography/Typography";
import classNames from "classnames";

import './Button.scss';

type ButtonProps = {
    text: string | React.ReactNode;
    type: 'primary' | 'secondary' | 'grey';
    onClick: () => void;
    disabled?: boolean;
    className?: string;
}


export const Button = (props: ButtonProps) => {
    const { text, onClick, className="", disabled=false } = props;
    return (
        <div className={classNames('button ' + className, {
            'primary': props.type === 'primary',
            'secondary': props.type === 'secondary',
            'disabled': disabled,
            'grey': props.type === 'grey',

        })} onClick={onClick}>
            <Typography type="body">{text}</Typography>
        </div>
    );
}
