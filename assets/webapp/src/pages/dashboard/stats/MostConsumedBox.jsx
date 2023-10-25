import React from 'react';
import './MostConsumedBox.css';

const MostConsumedBox = ({statsSummary}) => {

    let statsData = statsSummary?.statisticsData;
    let mostConsumed = statsData?.mostConsumed ? 
        `${statsData?.mostConsumed}`: '';
    let mostConsumedHour = '';
    if(statsData?.mostConsumedHour || statsData?.mostConsumedHour === 0) {
        let hour = statsData.mostConsumedHour
        mostConsumedHour = `${hour}.00 - ${hour + 1}.00`;
    }

    let mostConsumedUnit = statsData?.mostConsumedUnit ? 
        `${statsData?.mostConsumedUnit}`: '';

    return (
        <div className='MostConsumedBox'>
            <div className='MostConsumedBox_Title'>Most Consumed</div>
            <div className='MostConsumedBox_Text'>
                <span className='MostConsumedBox_Value'>{mostConsumed}</span> {mostConsumedUnit}</div>
            <div className='MostConsumedBox_Comparision'>Between {mostConsumedHour} hrs.</div>
        </div>
    );
};

export default MostConsumedBox;