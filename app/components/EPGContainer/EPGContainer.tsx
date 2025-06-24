
import React from 'react';

import './EPGContainer.scss';
import EPGItem from './EPGItem';
import { LiveFeed } from '@/app/models/ProgramModel'; 

type EPGProps = {
    liveFeeds: LiveFeed[];
};


function EPGContainer( props: EPGProps ) {

    const { liveFeeds } = props;

    return (
        <div className='epg-container'>
            {
                liveFeeds.map((feed, index) => (
                   <EPGItem key={index} item={feed}/> 
                ))
            }
        </div>
    );
}

export default EPGContainer;