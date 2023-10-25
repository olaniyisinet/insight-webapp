import React from 'react';
import { Col, Row } from 'antd';
import ConsumptionBox from './ConsumptionBox';
import MostConsumedBox from './MostConsumedBox';
import AvgPriceBox from './AvgPriceBox';
import GreenEnergyBox from './GreenEnergyBox';
import './StatsSummary.css';

const StatsSummary = ({statsSummary}) => {

    return (
        <div className='StatsSummary'>
            <Row gutter={[24, 24]}>
                <Col className="gutter-row" xs={12} sm={12} md={12} lg={6} xl={6}>
                    <div className='StatsSummary_Box'>
                        <ConsumptionBox statsSummary={statsSummary}/>
                    </div>
                </Col>
                <Col className="gutter-row" xs={12} sm={12} md={12} lg={6} xl={6}>
                    <div className='StatsSummary_Box'>
                        <MostConsumedBox statsSummary={statsSummary}/>
                    </div>
                </Col>
                <Col className="gutter-row" xs={12} sm={12} md={12} lg={6} xl={6}>
                    <div className='StatsSummary_Box'>
                        <AvgPriceBox statsSummary={statsSummary}/>
                    </div>
                </Col>
                <Col className="gutter-row" xs={12} sm={12} md={12} lg={6} xl={6}>
                    <div className='StatsSummary_Box'>
                        <GreenEnergyBox statsSummary={statsSummary}/>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default StatsSummary;