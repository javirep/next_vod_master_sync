'use client';

import React from "react";
import classNames from "classnames";

import './Typography.scss';

type TypographyProps = {
    children: string | React.ReactNode;
    type: 'title' | 'subtitle' | 'body' | 'error' | 'input-label' | 'navLink' | 'epg-title' | 'epg-subtitle' | 'epg-body';
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
            'epg-title': type === 'epg-title',
            'epg-subtitle': type === 'epg-subtitle',
        })} style={style}>{children}</p>
    );
}

export default Typography;