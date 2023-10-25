import React, {useContext, useEffect} from 'react';
import axios from "axios";
import { AuthedContext } from "../context/AuthedContext";
import { ConfigProvider, theme } from 'antd';
import { getRequestUrl } from '../util/backend-util';
import AuthedLoadingLayout from './AuthedLoadingLayout';
import AuthedSetupLayout from './AuthedSetupLayout';
import AuthedAppLayout from './AuthedAppLayout';

const AllAuthedLayouts = ({signOut, authedUser}) => {

    const { authedState, authedDispatch } = useContext(AuthedContext);

    useEffect(() => {
        axios.post(getRequestUrl("/user-load-profile"), {
            userEmail : authedUser.attributes.email,
            cognitoId : authedUser.attributes.sub,
            includeTenantSummary: true
        })
        .then((response) => {
            if(response?.data?.tenantUserFound) {
                authedDispatch({ type: "TENANT_USER_FOUND", value: {
                    authedUser: authedUser,
                    tenantUser: response.data.tenantUser
                }});
            } else {
                authedDispatch({ type: "TENANT_USER_NOT_FOUND", value: {
                    authedUser: authedUser,
                }});
            }
        })
        .catch(error => {
            console.log("axios error >>>>>>> ", error);
        });
    }, []);


    let layout = <AuthedLoadingLayout />
    if(authedState.appStatus === "APP") {
        layout = <AuthedAppLayout signOut={signOut}/>
    } else if(authedState.appStatus === "SETUP") {
        layout = <AuthedSetupLayout signOut={signOut}/>
    }

    const customTheme = {
        algorithm: theme.darkAlgorithm,
        token: {
            colorPrimary: '#42b01b',
        }
    };

    return (
        <ConfigProvider theme={customTheme}>
            {layout}
        </ConfigProvider>
    );
};

export default AllAuthedLayouts;