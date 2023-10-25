import React from 'react';
import { Col, Row } from 'antd';
import PPASupplyBarChart from './graphs/PPASupplyBarChart';
import AssetsAvailabilityBarChart from './graphs/AssetsAvailabilityBarChart';
import PPACostSavingsBarChart from './graphs/PPACostSavingsBarChart';
import REGOCertificatesBarChart from './graphs/REGOCertificatesBarChart';
import './PPAPage.css';

const PPAPage = () => {

    return (
        <div>
             <div className='PPAPage_Description'>
                Perfomance of Your Power Purchase Agreements (PPA)
            </div>
            <div className='PPAPage_Graphs'>
                <Row gutter={[24, 24]}>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                        <PPASupplyBarChart />
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                        <AssetsAvailabilityBarChart />
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                        <PPACostSavingsBarChart />
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                        <REGOCertificatesBarChart />
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default PPAPage;