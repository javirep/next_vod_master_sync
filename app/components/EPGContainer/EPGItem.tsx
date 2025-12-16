import react, { useState } from 'react';
import './EPGItem.scss';

import Typography from '@/app/components/Typography/Typography';
import { LiveFeed } from '@/app/models/ProgramModel';
import classNames from 'classnames';

type EPGItemProps = {
    item: LiveFeed
    gapError?: boolean
    minImagesLen?: number
};

export default function EPGItem({ item, gapError, minImagesLen = 1 }: EPGItemProps) {
    const { program, date, startTime, duration } = item;
    const [displayMeta, setDisplayMeta] = react.useState(false);
    const [imageToDisplayIndex, setImageToDisplayIndex] = useState(0);
    const placeholderImage = "https://www.magtrol.com/india/wp-content/uploads/placeholder-16-9-ratio.png";
    const imagesToDisplay = minImagesLen == 1 ? ['default'] : ['default','textless', 'texted'];

    const arrowIcon = <svg id="svg" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0, 0, 400,400">
        <g id="svgg">
            <path id="path0" d="M280.859 1.882 C 275.275 4.550,93.830 186.110,91.455 191.406 C 89.183 196.472,89.297 203.901,91.724 208.984 C 94.388 214.563,275.949 396.006,281.250 398.387 C 295.020 404.572,310.160 394.769,310.131 379.688 C 310.114 370.283,314.459 375.078,223.215 283.791 L 139.467 200.004 223.212 116.213 C 314.445 24.931,310.114 29.709,310.131 20.313 C 310.160 4.959,294.740 -4.750,280.859 1.882 " stroke="none" fill="#fff" ></path>
            </g>
        </svg>

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
        
        if (!program.thumbnails || !program.thumbnails.default) {
            return 'thumbnail';
        }

        if (minImagesLen == 3 && (!program.thumbnails.texted || !program.thumbnails.textless)) {
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

    const handleImageCarrousel = (num: number) => {
        let newIndex = imageToDisplayIndex + num;
        if (newIndex < 0) {
            newIndex = imagesToDisplay.length - 1;
        } else if (newIndex >= imagesToDisplay.length) {
            newIndex = 0;
        }
        setImageToDisplayIndex(newIndex);
    }

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
                        { 
                            minImagesLen > 1 ? (
                                <div className='arrow previous' onClick={() => handleImageCarrousel(-1)}>
                                    {arrowIcon}
                                </div>                            
                            ) : null
                        }

                        {program.thumbnails && program.thumbnails[imagesToDisplay[imageToDisplayIndex]] ? (
                            <img src={program.thumbnails[imagesToDisplay[imageToDisplayIndex]]} alt={program.title} />
                        ) : (
                            <img src={placeholderImage} alt="Placeholder" className='error-image'/>
                        )}
                        { 
                            minImagesLen > 1 ? (
                                <div className='arrow next' onClick={() => handleImageCarrousel(1)}>
                                    {arrowIcon}
                                </div>
                            ) : null
                        }
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
