import React from 'react';
import './GreenEnergyBox.css';

const GreenEnergyBox = ({statsSummary}) => {

    let statsData = statsSummary?.statisticsData;
    let costSaving = statsData?.costSaving ? 
        `${statsData?.costSaving}`: '';
    let costSavingChange = statsData?.costSavingChange ? 
        `${statsData?.costSavingChange}%`: '%';
    let costSavingUnit = statsData?.costSavingUnit ? 
        `${statsData?.costSavingUnit}`: '';

        

    return (
        <div className='GreenEnergyBox'>
            <div className='GreenEnergyBox_Title'>Cost Saving for Day</div>
            <div className='GreenEnergyBox_Text'>{costSavingUnit} <span className='AvgPriceBox_Value'>{costSaving}</span></div>
            <div className='GreenEnergyBox_Comparision'>{costSavingChange} less than previous day</div>
        </div>
    );
};

export default GreenEnergyBox;