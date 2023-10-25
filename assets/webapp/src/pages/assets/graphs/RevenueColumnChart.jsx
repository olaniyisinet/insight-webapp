import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthedContext } from "../../../context/AuthedContext";
import { getRequestUrl } from '../../../util/backend-util';
import {Select, Button, message } from 'antd';
import { Column } from '@ant-design/plots';
import { DownloadOutlined } from '@ant-design/icons';
import {csvFormat} from 'd3-dsv';
import './RevenueColumnChart.css'

const RevenueColumnChart = () => {
  
  const [ apiData, setApiData] = useState({ graphData:[] });
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
      "graphName": "generator-revenue",
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

  const filterOptions = [
    { value: 'LAST7DAYS', label: 'Last 7 Days' },
    { value: 'LAST30DAYS', label: 'Last 30 Days' },
    { value: 'LAST6MONTHS', label: 'Last 6 Months' },
    { value: 'LAST12MONTHS', label: 'Last 12 Months' },
  ];

  const config = {
    data: apiData.graphData,
    isStack: true,
    xField: 'date',
    yField: 'revenue',
    seriesField: 'name',
    smooth: true,
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
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
    colorField: 'type',
    color: ({ name }) => {
      if(name === 'PPA'){
        return '#54C22D';
      } else if(name === 'Expected') {
        return '#F9CA23';
      } 
      return '#54C22D';
    }
  };

  const exportData = () => {
    // Convert to CSV string
    const csvData = csvFormat(apiData.graphData);

    // Create blob
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Download blob as file
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'revenue.csv';
    link.href = url;
    link.click();
  }

  return (
  
    <><div className='RevenueHeader' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div className='RevenueTitle'>
        <span className='RevenueTitleHighlight'> Revenue</span>{graphDataUnit}
      </div>
      <div className='RevenueOptions'>
        <Button onClick={exportData}
          icon={<DownloadOutlined />}
          style={{
            borderRadius: '42px',
            borderColor: 'transparent',
            background: 'rgba(255, 255, 255, 0.07)',
            backdropFilter: 'blur(14px)',
            color: '#ffffff',
            marginRight: '15px',
          }} />
        <Select
          defaultValue="LAST7DAYS"
          options={filterOptions}
          onChange={handleChange}
          style={{ width: 150 }} />
      </div>
    </div>
    
    <div className='Revenue_Box' >
    <Column {...config} />
    </div>
    </>   );
};

export default RevenueColumnChart;