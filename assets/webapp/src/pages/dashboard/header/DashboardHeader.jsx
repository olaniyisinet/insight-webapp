import React from 'react';
import GreetingBox from './GreetingBox';
import InfoBoxDesktop from './InfoBoxDesktop';
import InfoBoxMobile from './InfoBoxMobile';
import { useMediaQuery } from 'react-responsive';
import { Col, Row } from 'antd';

const DashboardHeader = ({statsSummary}) => {

    const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });

    return (
        <div>
            <Row gutter={24}>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={18} xl={18}>
                    <GreetingBox statsSummary={statsSummary}/>
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={6} xl={6}>
                   { isDesktop && <InfoBoxDesktop statsSummary={statsSummary}/> }
                   { !isDesktop && <InfoBoxMobile statsSummary={statsSummary}/> }
                </Col>
            </Row>
        </div>
    );
};

export default DashboardHeader;