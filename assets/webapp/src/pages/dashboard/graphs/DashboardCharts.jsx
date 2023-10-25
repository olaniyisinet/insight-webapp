import React from 'react';
import { Col, Row } from 'antd';
import EmissionLineChart from './EmissionLineChart';
import UsageBarChart from './UsageBarChart';
import CostSavingBarChart from './CostSavingBarChart';
import GridVsRenDonutChart from './GridVsRenDonutChart';
import GridCompDonutChart from './GridCompDonutChart';
import YourCompDonutChart from './YourCompDonutChart';
import './DashboardCharts.css';

const DashboardCharts = () => {
    return (
        <div className='DashboardCharts'>
            <Row gutter={[24, 24]}>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                    <CostSavingBarChart />
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                    <EmissionLineChart />
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                    <UsageBarChart />
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                    <GridVsRenDonutChart />
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                    <YourCompDonutChart />
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                    <GridCompDonutChart />
                </Col>
            </Row>
        </div>
    );
};

export default DashboardCharts;