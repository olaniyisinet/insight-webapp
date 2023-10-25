import React, {useContext, useState, useEffect} from 'react';
import axios from "axios";
import { message } from 'antd';
import { AuthedContext } from "../../context/AuthedContext";
import { getRequestUrl } from '../../util/backend-util';
import AssetStatistics from './statistics/AssetStatistics';
import AssetsHeader from './header/AssetsHeader';
import AssetsGraphs from './graphs/AssetsGraphs';
import './AssetsPage.css';

const AssetsPage = () => {

    const [statsSummary, setSatsSummary] = useState({});
    const {authedState} = useContext(AuthedContext);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        asyncFetch('LASTDAY');
    }, []);
  
    const asyncFetch = (graphOption) => {
        axios.post(getRequestUrl("/graph-by-name"), {
            "userId": authedState.tenantUser.userId,
            "userEmail": authedState.tenantUser.userEmail,
            "graphName": "generator-dashboard-statistics",
            "graphOption": graphOption
        })
        .then((response) => {
            setSatsSummary(response.data);
        })
        .catch(error => {
            let errorMessage = "Error orrcured while loading grid vs renewables graph";
            if(error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            messageApi.error(errorMessage);
        });
    };

    return (
        <div>
            <div className='AssetsPage_Description'>
                <AssetsHeader statsSummary={statsSummary} />
            </div>
            <AssetStatistics statsSummary={statsSummary}/>
            <AssetsGraphs />

        </div>
    );
};

export default AssetsPage;