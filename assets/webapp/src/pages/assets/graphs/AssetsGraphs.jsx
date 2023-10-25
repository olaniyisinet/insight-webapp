import React from "react";
import { Col, Row } from 'antd';
import RevenueColumnChart from './RevenueColumnChart';
import GenPortfolioTable from './GenPortfolioTable';
import AssetREGOCertificatesBarChart from './AssetREGOCertificatesBarChart';
import AssetvsGridDonutChart from './AssetvsGridDonutChart';
import RevenuePortfolio from './RevenuePortfolioTable'; 
import PPAREGOCertificatesBarChart from './PPAREGOCertificatesBarChart';
import './AssetsGraphs.css';

const AssetsGraphs = () => {

    return (
        <div>
    
            <div className='AssetsPage_Graphs'>
                <Row gutter={[24, 24]}>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                        <RevenueColumnChart />
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                        <RevenuePortfolio />
                    </Col>
                   <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                        <AssetREGOCertificatesBarChart />
                    </Col>
                     <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                        <AssetvsGridDonutChart />
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                        <PPAREGOCertificatesBarChart />
                    </Col>
                     <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                        <GenPortfolioTable />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default AssetsGraphs;