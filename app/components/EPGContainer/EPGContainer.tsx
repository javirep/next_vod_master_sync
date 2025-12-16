
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
            case 'combatAmazon':
                return 'Swerve Combat on Amazon:';
            case 'combatRoku':
                return 'Swerve Combat on Roku:';
            case 'sportsRoku':
                return 'Swerve Sports on Roku:';
            case 'sportsPluto':
                return 'Swerve Sports on Pluto:';
            default:
                return 'Error Name - Contact Javi';
        }
    };

    return (
        <div className='epg-container'>
            <Typography type='subtitle' className='epg-container__title'>
                {getTitle()}
            </Typography>
            {
                liveFeeds.map((feed, index) => {
                    let gap = false;

                    if ( index ) {
                        let startTime = new Date(liveFeeds[index].date + 'T' + liveFeeds[index].startTime).getTime();
                        let prevEndTime = new Date(liveFeeds[index - 1].date + 'T' + liveFeeds[index - 1].startTime).getTime() + liveFeeds[index - 1].duration * 1000;

                        gap = startTime - prevEndTime + liveFeeds[index - 1].duration > 30 * 1000;
                    }
                    
                    return (
                        <div key={index}>
                            <EPGItem item={feed} gapError = {gap} minImagesLen = {liveFeedId == 'combatAmazon' ? 3 : 1}/> 
                        </div>
                    )

                })

            }
        </div>
    );
}

export default EPGContainer;