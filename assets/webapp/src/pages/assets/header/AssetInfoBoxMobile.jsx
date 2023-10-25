import React from 'react';
import './AssetInfoBoxMobile.css';

const AssetInfoBoxMobile = ({statsSummary}) => {

    let statsData = statsSummary?.statisticsData;
    let percentage = statsData?.renewablePrecentage ? 
        `${statsData?.renewablePrecentage}%`: '103%';

    return (
        <div className='InfoBoxMobile'>
           <div>Heathrow<br/>is performing low at</div>
            <div className='AssetInfoBoxMobile_PriceWrapper'>
                <div className='AssetInfoBoxMobile_Price'>{percentage}</div>
                <div className='AssetInfoBoxMobile_LearnMore'>
                    <a href='https://re24.energy/platform/' target='_blank'>Learn More</a>
                </div>
            </div>
        </div>
    );
};

export default AssetInfoBoxMobile;