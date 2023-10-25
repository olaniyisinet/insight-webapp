import React from "react";
import { Col, Row } from 'antd';
import PPAFinancialsBarChart from "./graphs/PPAFinancialsBarChart";
import PPASupplyBarChart from "./graphs/PPASupplyBarChart";
import AssetsPPAREGOCertificatesBarChart from "./graphs/AssetsPPAREGOCertificatesBarChart";
import PPAAssetsAvailabilityBarChart from "./graphs/PPAAssetsAvailabilityBarChart"

const AssetsPPAPage = () => {

    return (
        <div>
             <div className='PPAPage_Description'>
                Perfomance of Your Assets Power Purchase Agreements (PPA)
            </div>

            <div className='PPAPage_Graphs'>
                <Row gutter={[24, 24]}>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                        <PPAFinancialsBarChart />
                    </Col>

                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                        <PPAAssetsAvailabilityBarChart />
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                        <PPASupplyBarChart />
                    </Col>
                    <Col className="gutter-row" xs={24} sm={24} md={24} lg={12} xl={12}>
                        <AssetsPPAREGOCertificatesBarChart />
                    </Col>
                </Row>
            </div>

            </div>
            );
};

export default AssetsPPAPage;