import react from 'react';
import './EPGItem.scss';

import Typography from '@/app/components/Typography/Typography';
import { LiveFeed } from './EPGContainer';

type EPGItemProps = {
    item: LiveFeed
};

export default function EPGItem({ item }: EPGItemProps) {
    const { program, date, startTime, duration } = item;


    return (
        <div className='epg-item'>
            <div className='epg-item__thumbnail'>
                {program.thumbnail ? (
                    <img src={program.thumbnail} alt={program.title} />
                ) : (
                    <div className='epg-item__thumbnail-placeholder'>
                        <Typography type='body'>No Image</Typography>
                    </div>
                )}
            </div>
            <div className='epg-item__time'>
                <Typography type='body'>
                    Streaming on: { date } { startTime }
                </Typography>
            </div>
            <div className='epg-item__details'>
                <Typography type='body'>
                    Title: {program.title}
                </Typography>
                <Typography type='body'>
                    Description: {program.description}
                </Typography>
            </div>
        </div>
    )

}
