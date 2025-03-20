import React from "react";

import './Separator.scss';
import classNames from "classnames";

type SeparatorProps = {
    variant?: 'horizontal' | 'vertical';
    className?: string;
}

export const Separator = (props) => {
    const { variant = 'horizontal', className = '' } = props;

    return (
        <div className={classNames('separator', {
            'horizontal': variant === 'horizontal',
            'vertical': variant === 'vertical',
            [className]: className
        })}></div>
    );
}