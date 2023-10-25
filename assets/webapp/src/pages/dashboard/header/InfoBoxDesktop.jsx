import React from 'react';
import './InfoBoxDesktop.css';

const InfoBoxDesktop = ({statsSummary}) => {

    let statsData = statsSummary?.statisticsData;
    let percentage = statsData?.renewablePrecentage ? 
        `${statsData?.renewablePrecentage}%`: '%';

    return (
        <div className='InfoBoxDesktop'>
            <div>Your green energy<br/>usage for last day</div>
            <div className='InfoBoxDesktop_Percentage'>{percentage}</div>
            <div className='InfoBoxDesktop_LearnMore'>
                <a href='https://re24.energy/platform/' target='_blank'>Learn More</a>
            </div>
        </div>
    );
};

export default InfoBoxDesktop;