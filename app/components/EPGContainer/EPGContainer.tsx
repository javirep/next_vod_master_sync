
import React from 'react';

import './EPGContainer.scss';
import EPGItem from './EPGItem';
import { LiveFeed } from '@/app/models/ProgramModel'; 
import Typography from '../Typography/Typography';
import { duration } from 'moment';
import { difference } from 'next/dist/build/utils';

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

    const timeCheck = new Date(liveFeeds[0].date + 'T' + liveFeeds[0].startTime);

    const checkLiveFeedGaps = (liveFeeds: LiveFeed[]): boolean => {

        if (liveFeeds.length === 0) return false;   


        return false;
    } 

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
                        < >
                            { 
                                gap && <div className='epg-item epg-item--error'>
                                    <Typography type='error'>GAP BIGGER THAN 30 SECONDS DETECTED</Typography>
                                </div> 
                            }
                            <EPGItem item={feed}/> 
                        </>
                    )

                })

            }
        </div>
    );
}

export default EPGContainer;