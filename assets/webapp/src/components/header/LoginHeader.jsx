import React from 'react'
import logoFull from '../../assets/logo_full.png'
import './LoginHeader.css'

const LoginHeader = () => {
    return (
     <div className='LoginHeader'>
            <div className='LoginHeader_AppLogo'>
                <img src={logoFull}  height="42" alt="logo"/>
                <div className='LoginHeader_AppName'>Insights</div>
            </div>
      </div>
    );
};

export default LoginHeader;