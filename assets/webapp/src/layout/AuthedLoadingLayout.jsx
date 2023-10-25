import React from 'react';
import { Spin } from 'antd';
import "./AuthedLoadingLayout.css";

const AuthedLoadingLayout = () => {
    return (
        <div className='AuthedLoadingLayout'>
            <Spin size="large" />
        </div>
    );
};

export default AuthedLoadingLayout;