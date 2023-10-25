import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthedContext } from "../../../context/AuthedContext";
import { getRequestUrl } from '../../../util/backend-util';
import { Column } from '@ant-design/plots';
import { message, Select } from 'antd';
import './CostSavingBarChart.css';

const CostSavingBarChart = () => {

    const [ apiData, setApiData] = useState({ graphData:[] });
    const { authedState } = useContext(AuthedContext);
    const [messageApi, contextHolder] = message.useMessage();

    let graphDataUnit = apiData.graphDataUnit ? apiData.graphDataUnit : '';

    useEffect(() => {
      asyncFetch('LASTDAY');
    }, []);
  
    const asyncFetch = (graphOption) => {
      axios.post(getRequestUrl("/graph-by-name"), {
        "userId": authedState.tenantUser.userId,
        "userEmail": authedState.tenantUser.userEmail,
        "graphName": "cost-savings",
        "graphOption": graphOption
      })
      .then((response) => {
        setApiData(response.data);
      })
      .catch(error => {
        let errorMessage = "Error orrcured while loading cost savings graph";
        if(error.response?.data?.message) {
            errorMessage = error.response.data.message;
        }
        messageApi.error(errorMessage);
      });
    };

    const handleChange = (value) => {
      asyncFetch(value);
    };

    const config = {
      data: apiData.graphData,
      isStack: true,
      xField: 'date',
      yField: 'saving',
      seriesField: 'name',
      legend: {
        layout: 'horizontal',
        position: 'top-left',
        offsetY: -8,
        itemName: {
          style: {
            fill: '#809599'
          }
        }
      },
      color: '#87d546',
    };

    return (
      <div>
        {contextHolder}
        <div className='CostSavingBarChart_Header'>
          <div className='CostSavingBarChart_Title'>
            <span className='CostSavingBarChart_TitleHighlight'>Cost Savings</span>{graphDataUnit}
          </div>
          <div className='CostSavingBarChart_Options'>
            <Select
              defaultValue="Last Day"
              style={{ width: 142 }}
              onChange={handleChange}
              options={[
                /* { value: 'TODAY', label: 'Today' },
                { value: 'YESTERDAY', label: 'Yesterday' }, */
                { value: 'LASTDAY', label: 'Last Day' },
                { value: 'LAST30DAYS', label: 'Last 30 Days' },
                { value: 'LAST12MONTHS', label: 'Last 12 Months' }
              ]}
            />
          </div>
        </div>
        <div className='CostSavingBarChart_Box'>
            {contextHolder}
            <Column {...config} />
        </div>
      </div>
    );
};

export default CostSavingBarChart;