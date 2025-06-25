
import React from 'react';

import './EPGContainer.scss';
import EPGItem from './EPGItem';
import { LiveFeed } from '@/app/models/ProgramModel'; 
import Typography from '../Typography/Typography';

type EPGProps = {
    liveFeeds: LiveFeed[];
    liveFeedId: string;
};


function EPGContainer( props: EPGProps ) {

    const { liveFeeds, liveFeedId } = props;

    const getTitle = (): string => {
        switch (liveFeedId) {
            case 'frequency':
                return 'Frequency EPG:';
            case 'roku':
                return 'Roku EPG';
            case 'gracenote':
                return 'GraceNote EPG:';
            default:
                return 'Live EPG:';
        }
    };

    return (
        <div className='epg-container'>
            <Typography type='subtitle' className='epg-container__title'>
                {getTitle()}
            </Typography>
            {
                liveFeeds.map((feed, index) => (
                   <EPGItem key={index} item={feed}/> 
                ))
            }
        </div>
    );
}

export default EPGContainer;