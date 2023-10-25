import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthedContext } from "../../../context/AuthedContext";
import { getRequestUrl } from '../../../util/backend-util';
import { Column } from '@ant-design/plots';
import { message, Select } from 'antd';
import './UsageBarChart.css';

const UsageBarChart = () => {

    const [ apiData, setApiData] = useState({ graphData:[] });
    const { authedState } = useContext(AuthedContext);
    const [ messageApi, contextHolder] = message.useMessage();

    let graphDataUnit = apiData.graphDataUnit ? apiData.graphDataUnit : '';

    useEffect(() => {
      asyncFetch('LASTDAY');
    }, []);
  
    const asyncFetch = (graphOption) => {
      axios.post(getRequestUrl("/graph-by-name"), {
        "userId": authedState.tenantUser.userId,
        "userEmail": authedState.tenantUser.userEmail,
        "graphName": "green-energy-usage",
        "graphOption": graphOption
      })
      .then((response) => {
        setApiData(response.data);
      })
      .catch(error => {
        let errorMessage = "Error orrcured while loading energy usage graph";
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
      yField: 'usage',
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
      colorField: 'type',
      color: ({ name }) => {
        if(name === 'Solar'){
          return '#54C22D';
        } else if(name === 'Wind') {
          return '#05D2C6';
        } else if(name === 'Hydro') {
          return '#2D60C2';
        } else if(name === 'Gas') {
          return '#F9CA23';
        }
        return '#664BB4';
      }
    };

    return (
      <div className='UsageBarChart'>
        {contextHolder}
        <div className='UsageBarChart_Header'>
          <div className='UsageBarChart_Title'>
            <span className='UsageBarChart_TitleHighlight'>Renewable Usage</span>{graphDataUnit}
          </div>
          <div className='UsageBarChart_Options'>
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
        <div className='UsageBarChart_Box'>
            {contextHolder}
            <Column {...config} />
        </div>
      </div>
    );
};

export default UsageBarChart;