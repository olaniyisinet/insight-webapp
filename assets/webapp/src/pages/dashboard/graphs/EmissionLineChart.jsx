import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthedContext } from "../../../context/AuthedContext";
import { getRequestUrl } from '../../../util/backend-util';
import { Line } from '@ant-design/plots';
import { message, Select } from 'antd';
import './EmissionLineChart.css';

const EmissionLineChart = () => {

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
        "graphName": "emission-savings",
        "graphOption": graphOption
      })
      .then((response) => {
        setApiData(response.data);
      })
      .catch(error => {
        let errorMessage = "Error orrcured while loading emission savings graph";
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
      xField: 'date',
      yField: 'emission',
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
      smooth: true,
      animation: {
        appear: {
          animation: 'path-in',
          duration: 5000,
        },
      },
      color: '#42b01b',
    };

    return (
        <div>
            {contextHolder}
            <div className='EmissionLineChart_Header'>
              <div className='EmissionLineChart_Title'>
                <span className='EmissionLineChart_TitleHighlight'>Emission Savings</span>{graphDataUnit}
              </div>
              <div className='EmissionLineChart_Options'>
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
            <div className='EmissionLineChart_Box'>
              <Line {...config} />
            </div>
        </div>
    );
};

export default EmissionLineChart;