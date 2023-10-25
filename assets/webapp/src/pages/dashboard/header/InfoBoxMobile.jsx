import React from 'react';
import './InfoBoxMobile.css';

const InfoBoxMobile = ({statsSummary}) => {

    let statsData = statsSummary?.statisticsData;
    let percentage = statsData?.renewablePrecentage ? 
        `${statsData?.renewablePrecentage}%`: '%';

    return (
        <div className='InfoBoxMobile'>
            <div>Your green energy usage for the day</div>
            <div className='InfoBoxMobile_PriceWrapper'>
                <div className='InfoBoxMobile_Price'>{percentage}</div>
                <div className='InfoBoxMobile_LearnMore'>
                    <a href='https://re24.energy/platform/' target='_blank'>Learn More</a>
                </div>
            </div>
        </div>
    );
};

export default InfoBoxMobile;