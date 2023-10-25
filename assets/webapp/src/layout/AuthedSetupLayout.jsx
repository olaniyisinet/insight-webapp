import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
const { Header, Sider, Content } = Layout
import { BrowserRouter } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import UserSetupSideMenu from '../components/menu/UserSetupSideMenu'
import MenuLogo from '../components/menu/MenuLogo'
import AppHeader from '../components/header/AppHeader'
import AuthedSetupRoutes from './AuthedSetupRoutes'
import './AuthedSetupLayout.css'


function AuthedSetupLayout({signOut}) {

    const titleConfig = {
      '/': 'User Setup'
    }

    const [selectedKey, setSelectedKey] = useState('/');
    const [collapsed, setCollapsed] = useState(true);
    const [collapsedWidth, setCollapsedWidth] = useState(0);
    const isDesktop = useMediaQuery({ query: '(min-width: 992px)' });
 
    useEffect(() => {
      if(isDesktop) {
        setCollapsed(false);
        setCollapsedWidth(70);
      }
    }, []);

    const onMenuClick = ({key}) => {
      if(key === 'logout') {
        signOut();
      } else {
        setSelectedKey(key);
      }

      if(!isDesktop) {
        setCollapsed(true);
      }
    };
  
    return (
      <Layout className="AuthedSetupLayout">
      <Sider className="AuthedSetupLayout_Sider" 
        breakpoint="md" 
        collapsedWidth={collapsedWidth} 
        trigger={null} 
        collapsible 
        collapsed={collapsed}>
        <MenuLogo collapsed={collapsed}/>
        <UserSetupSideMenu onMenuClick={onMenuClick} selectedKey={selectedKey}/>
      </Sider>
      <Layout className="AuthedSetupLayout_Wrapper">
        <Header className="AuthedSetupLayout_Header">
          <AppHeader collapsed={collapsed} 
            setCollapsed={setCollapsed} 
            isDesktop={isDesktop} 
            title={titleConfig[selectedKey]}/>
        </Header>
        <Content className="AuthedSetupLayout_Content">
            <div className="AuthedSetupLayout_ContenInner">
                <BrowserRouter>
                    <AuthedSetupRoutes path={selectedKey}/>
                </BrowserRouter>
            </div>
        </Content>
      </Layout>
    </Layout>
    )
  }
  
  export default AuthedSetupLayout