import React, {useContext, useState, useEffect} from 'react';
import axios from "axios";
import { message } from 'antd';
import { AuthedContext } from "../../context/AuthedContext";
import { getRequestUrl } from '../../util/backend-util';
import DashboardHeader from './header/DashboardHeader';
import StatsSummary from './stats/StatsSummary';
import DashboardCharts from './graphs/DashboardCharts';

const DashboardPage = () => {

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
            "graphName": "dashboard-statistics",
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
            {contextHolder}
            <DashboardHeader statsSummary={statsSummary}/>
            <StatsSummary statsSummary={statsSummary}/>
            <DashboardCharts />
        </div>
    );
};

export default DashboardPage;