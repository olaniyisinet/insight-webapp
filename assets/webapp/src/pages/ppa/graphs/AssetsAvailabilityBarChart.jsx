import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthedContext } from "../../../context/AuthedContext";
import { getRequestUrl } from '../../../util/backend-util';
import { DualAxes } from '@ant-design/plots';
import { message, Select } from 'antd';
import './AssetsAvailabilityBarChart.css';

const AssetsAvailabilityBarChart = () => {

    const [ apiData, setApiData] = useState({ graphData:{
      mainData: [],
      lineData: []
    } });
    const { authedState } = useContext(AuthedContext);
    const [messageApi, contextHolder] = message.useMessage();

    let graphDataUnit = apiData.graphDataUnit ? apiData.graphDataUnit : '';

    useEffect(() => {
      asyncFetch('LAST7DAYS');
    }, []);
  
    const asyncFetch = (graphOption) => {
      axios.post(getRequestUrl("/graph-by-name"), {
        "userId": authedState.tenantUser.userId,
        "userEmail": authedState.tenantUser.userEmail,
        "graphName": "asset-availability",
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
      data: [apiData.graphData.mainData, apiData.graphData.lineData],
      xField: 'date',
      yField: ['usage', 'usage'],
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
      meta: {
        usage: { sync: 'usage' },
      },
      geometryOptions: [
        {
          geometry: 'column',
          isGroup: true,
          seriesField: 'name',
          color: '#05ada4',
        },
        {
          geometry: 'line',
          seriesField: 'name',
          lineStyle: {
            lineWidth: 4,
          },
          color: '#87d546',
        },
      ],
    };

    return (
      <div>
        {contextHolder}
        <div className='AssetsAvailabilityBarChart_Header'>
          <div className='AssetsAvailabilityBarChart_Title'>
            <span className='AssetsAvailabilityBarChart_TitleHighlight'>Assets Availability</span>{graphDataUnit}
          </div>
          <div className='AssetsAvailabilityBarChart_Options'>
            <Select
              defaultValue="Last 7 Days"
              style={{ width: 142 }}
              onChange={handleChange}
              options={[
                /* { value: 'TODAY', label: 'Today' },
                { value: 'YESTERDAY', label: 'Yesterday' }, */
                { value: 'LASTDAY', label: 'Last Day' },
                { value: 'LAST7DAYS', label: 'Last 7 Days' },
                { value: 'LAST30DAYS', label: 'Last 30 Days' },
                { value: 'LAST12MONTHS', label: 'Last 12 Months' }
              ]}
            />
          </div>
        </div>
        <div className='AssetsAvailabilityBarChart_Box'>
            {contextHolder}
            <DualAxes {...config} />
        </div>
      </div>
    );
};

export default AssetsAvailabilityBarChart;