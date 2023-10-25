import React from 'react';
import { Row, Col } from 'antd';
import { formatNumber } from '../../../util/numberformat-util';

import {
    CaretUpOutlined,
    CaretDownOutlined
} from '@ant-design/icons';

import './AssetStatistics.css';

const AssetStatisics = ({ statsSummary }) => {

    let statsData = statsSummary?.statisticsData;

    let generation = statsData?.generation ?
        `${statsData?.generation}` : '';
    let generationChange = statsData?.generationChange ?
        `${statsData?.generationChange}%` : '%';
    let generationUnit = statsData?.generationUnit ?
        `${statsData?.generationUnit}` : '';

    let revenue = statsData?.revenue ?
        `${statsData?.revenue}` : '';
    let revenueChange = statsData?.revenueChange ?
        `${statsData?.revenueChange}%` : '%';
    let revenueUnit = statsData?.revenueUnit ?
        `${statsData?.revenueUnit}` : '';

    let averageUnitPrice = statsData?.averageUnitPrice ?
        `${statsData?.averageUnitPrice}` : '';
    let averageUnitChange = statsData?.averageUnitChange ?
        `${statsData?.averageUnitChange}%` : '%';
    let averagePriceUnit = statsData?.averagePriceUnit ?
        `${statsData?.averagePriceUnit}` : '';

    let totalAssets = statsData?.totalAssets ?
        `${statsData?.totalAssets}` : '';
    let assetsChange = statsData?.assetsChange ?
        `${statsData?.assetsChange}%` : '%';

    return (

        <div className='StatsSummary'>
            <Row gutter={[24, 24]}>
                <Col className="gutter-row" xs={12} sm={12} md={12} lg={6} xl={6}>
                    <div className='StatsSummary_Box'>
                        <div className='GreenEnergyBox'>
                            <div className='Statistics_Title'>Energy Generation</div>
                            <div className='StatisticsBox_Text'>
                                <span className='StatisticsBox_Value'>{formatNumber(generation)}</span> {generationUnit}</div>
                            <div className='StatisticsBox_Comparision'>{<CaretUpOutlined style={{ color: 'green' }} />} {generationChange} more than the day before</div>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row" xs={12} sm={12} md={12} lg={6} xl={6}>
                    <div className='StatsSummary_Box'>
                        <div className='GreenEnergyBox'>
                            <div className='StatisticsBox_Title'>Revenue</div>
                            <div className='Statistics_Text'>{revenueUnit} <span className='AvgPriceBox_Value'>{formatNumber(revenue)}</span></div>
                            <div className='Statistics_Comparision'>{<CaretUpOutlined style={{ color: 'green' }} />} {revenueChange} more than previous day</div>
                        </div>
                    </div>
                </Col>
                <Col className="gutter-row" xs={12} sm={12} md={12} lg={6} xl={6}>
                    <div className='StatsSummary_Box'>
                        <div className='GreenEnergyBox'>
                            <div className='StatisticsBox_Title'>Avg. Price Per Unit</div>
                            <div className='StatisticsBox_Text'>{averagePriceUnit} <span className='AvgPriceBox_Value'>{averageUnitPrice}</span></div>
                            <div className='StatisticsBox_Comparision'>{<CaretDownOutlined style={{ color: 'red' }} />} {averageUnitChange} less than yesterday</div>
                        </div>
                    </div>
                </Col>

                <Col className="gutter-row" xs={12} sm={12} md={12} lg={6} xl={6}>
                    <div className='StatsSummary_Box'>
                        <div className='ConsumptionBox'>
                            <div className='StatisticsBox_Title'>Total Assets</div>
                            <div className='StatisticsBox_Text'>
                                <span className='StatisticsBox_Value'>{totalAssets}</span> </div>
                            <div className='StatisticsBox_Comparision'>{<CaretDownOutlined style={{ color: 'red' }} />} {assetsChange} less than last month</div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AssetStatisics;
