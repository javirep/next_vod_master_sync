import react from 'react';
import './EPGItem.scss';

import Typography from '@/app/components/Typography/Typography';
import { LiveFeed } from '@/app/models/ProgramModel';
import classNames from 'classnames';

type EPGItemProps = {
    item: LiveFeed
};

export default function EPGItem({ item }: EPGItemProps) {
    const { program, date, startTime, duration } = item;


    function getDuration(duration: number): string {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = duration % 60;
        
        return `${hours}h ${minutes}m ${seconds}s`;
    }

    const checkError = (program: any): string => {
        if (!program) {
            return 'program';
        }

        if (!program.title) {
            return 'title';
        }

        if (!program.description) {
            return 'description';
        }
        
        if (!program.thumbnail) {
            return 'thumbnail';
        }

        if (program.duration >= 14400) { 
            return 'duration';
        }

        if (program.duration < 15*60) {
            return 'duration';
        }
    
        return ''; 
    }

    const error = checkError(program);


    return (
        <div className={classNames('epg-item', {
            'epg-item--error': error
        })}>
            <div className='epg-item__thumbnail'>
                {program.thumbnail ? (
                    <img src={program.thumbnail} alt={program.title} />
                ) : (
                    <div className='epg-item__thumbnail-placeholder'>
                        <Typography type='body'>No Image</Typography>
                    </div>
                )}
            </div>
            <div>
                <div className='epg-item__data'>
                    <Typography type='body' >
                        Frequency id: {item.id}
                    </Typography>
                    <Typography type='body'>
                        Streaming on: { date } { startTime }
                    </Typography>
                    <Typography type={error == 'duration' ? 'error' : 'body'}>
                        Duration: { getDuration(duration) } 
                    </Typography>
                
                    <Typography type={error == 'title' ? 'error' : 'body'}>
                        Title: {program.title}
                    </Typography>

                    <Typography type={error == 'description' ? 'error' : 'body'}>
                        Description: {program.description}
                    </Typography>
                </div>
            </div>
        </div>
    )

}
