import React from 'react';
import './AssetInfoBoxDesktop.css';

const AssetInfoBoxDesktop = ({statsSummary}) => {

    let statsData = statsSummary?.statisticsData;
    let percentage = statsData?.assetPerformancePercentage ? 
        `${statsData?.assetPerformancePercentage}%`: '103%';

    return (
        <div className='AssetInfoBoxDesktop'>
            <div>Heathrow<br/>is performing low at</div>
            <div className='AssetInfoBoxDesktop_Percentage'>{percentage}</div>
            <div className='AssetInfoBoxDesktop_LearnMore'>
                <a href='https://re24.energy/platform/' target='_blank'>Learn More</a>
            </div>
        </div>
    );
};

export default AssetInfoBoxDesktop;