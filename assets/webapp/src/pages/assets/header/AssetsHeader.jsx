import React from 'react';
import { Col, Row ,Typography} from 'antd';
import './AssetsHeader.css'
import AssetGreetingBox from './AssetGreetingBox';
import AssetInfoBoxDesktop from './AssetInfoBoxDesktop';
import AssetInfoBoxMobile from './AssetInfoBoxMobile';
import { useMediaQuery } from 'react-responsive';

const AssetsHeader = ({statsSummary}) => {

    const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });

  return (

    <Row gutter={24}>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={18} xl={18}>
                    <AssetGreetingBox statsSummary={statsSummary} />
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={6} xl={6}>
                   { isDesktop && <AssetInfoBoxDesktop statsSummary={statsSummary}/> }
                   { !isDesktop && <AssetInfoBoxMobile statsSummary={statsSummary}/> }
                </Col>
            </Row>

  );
};

export default AssetsHeader;
