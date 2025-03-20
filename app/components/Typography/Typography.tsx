'use client';

import React from "react";
import classNames from "classnames";

import './Typography.scss';

type TypographyProps = {
    children: string | React.ReactNode;
    type: 'title' | 'subtitle' | 'body' | 'error' | 'input-label' | 'navLink';
    className?: string;
    style?: React.CSSProperties;
}

export const Typography = (props: TypographyProps) => {
    const { children, type, className='', style= {}} = props;

    return (
        <p className={classNames(className, {
            'title': type === 'title',
            'subtitle': type === 'subtitle',
            'body': type === 'body',
            'error': type === 'error',
            'input-label': type === 'input-label',
            'navLink': type === 'navLink',
        })} style={style}>{children}</p>
    );
}

export default Typography;