import React from 'react';
import './AvgPriceBox.css';

const AvgPriceBox = ({statsSummary}) => {

    let statsData = statsSummary?.statisticsData;
    let averageUnitPrice = statsData?.averageUnitPrice ? 
        `${statsData?.averageUnitPrice}`: '';
    let averageUnitChange = statsData?.averageUnitChange ? 
        `${statsData?.averageUnitChange}%`: '%';
    let averagePriceUnit = statsData?.averagePriceUnit ? 
        `${statsData?.averagePriceUnit}`: '';

    return (
        <div className='AvgPriceBox'>
            <div className='AvgPriceBox_Title'>Avg. Price per Unit</div>
            <div className='AvgPriceBox_Text'><span className='AvgPriceBox_Value'>{averageUnitPrice}</span> {averagePriceUnit}</div>
            <div className='AvgPriceBox_Comparision'>{averageUnitChange} less than previous day</div>
        </div>
    );
};

export default AvgPriceBox;