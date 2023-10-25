import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthedContext } from "../../../context/AuthedContext";
import { getRequestUrl } from '../../../util/backend-util';
import { Column } from '@ant-design/plots';
import { message, Select } from 'antd';
import './PPASupplyBarChart.css';

const PPASupplyBarChart = () => {

    const [ apiData, setApiData] = useState({ graphData:[] });
    const { authedState } = useContext(AuthedContext);
    const [ messageApi, contextHolder] = message.useMessage();

    let graphDataUnit = apiData.graphDataUnit ? apiData.graphDataUnit : '';

    useEffect(() => {
      asyncFetch('LAST7DAYS');
    }, []);
  
    const asyncFetch = (graphOption) => {
      axios.post(getRequestUrl("/graph-by-name"), {
        "userId": authedState.tenantUser.userId,
        "userEmail": authedState.tenantUser.userEmail,
        "graphName": "ppa-supply",
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
      isGroup: true,
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
        if(name === 'Actual'){
          return '#05D2C6';
        } else if(name === 'Expected') {
          return '#F9CA23';
        } 
        return '#664BB4';
      }
    };

    return (
      <div>
        {contextHolder}
        <div className='PPASupplyBarChart_Header'>
          <div className='PPASupplyBarChart_Title'>
            <span className='PPASupplyBarChart_TitleHighlight'>PPA Supply</span>{graphDataUnit}
          </div>
          <div className='PPASupplyBarChart_Options'>
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
        <div className='PPASupplyBarChart_Box'>
            {contextHolder}
            <Column {...config} />
        </div>
      </div>
    );
};

export default PPASupplyBarChart;