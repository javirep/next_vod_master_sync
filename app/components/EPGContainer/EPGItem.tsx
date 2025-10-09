import react from 'react';
import './EPGItem.scss';

import Typography from '@/app/components/Typography/Typography';
import { LiveFeed } from '@/app/models/ProgramModel';
import classNames from 'classnames';

type EPGItemProps = {
    item: LiveFeed
    gapError?: boolean
};

export default function EPGItem({ item, gapError }: EPGItemProps) {
    const { program, date, startTime, duration } = item;
    const [displayMeta, setDisplayMeta] = react.useState(false);


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

        if (program.title.toLowerCase().includes('season ')) {
            return 'title';
        }
        if (program.title.toLowerCase().includes('  ')) {
            return 'title';
        }

        if (!program.description) {
            return 'description';
        }

        if (program.description.length > 110) {
            return 'description';
        }
        
        if (!program.thumbnail) {
            return 'thumbnail';
        }

        if (duration > 14400) { 
            return 'duration';
        }

        if (duration < 15*60) {
            return 'duration';
        }
    
        return ''; 
    }

    const error = checkError(program);

    return (
        <>
            { 
                gapError && <div className='epg-item epg-item--error'>
                    <Typography type='error'>GAP BIGGER THAN 30 SECONDS DETECTED</Typography>
                </div> 
            }
        
            <div className={classNames('epg-item', {
                'epg-item--error': error
            })}>
                <div className='epg-item__main'>
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
                            <Typography type={error == 'title' ? 'error' : 'epg-title'}>
                                {program.title}
                            </Typography>
                            <Typography type={error == 'title' ? 'error' : 'epg-subtitle'}>
                                {program.subtitle}
                            </Typography>
                            <Typography type={error == 'description' ? 'error' : 'body'}>
                                {program.description}
                            </Typography>
                        </div>
                    </div>
                </div>
                <div className='epg-item__grid' >
                    <Typography type='body'>{program.title}</Typography>
                </div>
                 
                <div className='epg-item__meta' onClick={() => setDisplayMeta(!displayMeta)}>
                    <Typography type='body' >
                        Frequency id: {item.id}
                    </Typography>
                    <Typography type='body'>
                        Streaming on: { date } { startTime }
                    </Typography>
                    <Typography type={error == 'duration' ? 'error' : 'body'}>
                        Duration: { getDuration(duration) } 
                    </Typography>
                </div>
                
            </div>
        </>
    )

}
