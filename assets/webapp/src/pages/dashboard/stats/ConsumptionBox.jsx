import React from 'react';
import './ConsumptionBox.css';

const ConsumptionBox = ({statsSummary}) => {

    let statsData = statsSummary?.statisticsData;
    let consumption = statsData?.consumption ? 
        `${statsData?.consumption}`: '';
    let consumptionChange = statsData?.consumptionChange ? 
        `${statsData?.consumptionChange}%`: '%';
    let consumptionUnit = statsData?.consumptionUnit ? 
        `${statsData?.consumptionUnit}`: '';

    return (
        <div className='ConsumptionBox'>
            <div className='ConsumptionBox_Title'>Consumption</div>
            <div className='ConsumptionBox_Text'>
                <span className='ConsumptionBox_Value'>{consumption}</span> {consumptionUnit}</div>
            <div className='ConsumptionBox_Comparision'>{consumptionChange} more than previous day</div>
        </div>
    );
};

export default ConsumptionBox;