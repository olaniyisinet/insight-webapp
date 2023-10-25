import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthedContext } from "../../../context/AuthedContext";
import { getRequestUrl } from '../../../util/backend-util';
import { Column } from '@ant-design/plots';
import { message, Select, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import {csvFormat} from 'd3-dsv';
import './AssetsPPAREGOCertificatesBarChart.css';

const AssetsPPAREGOCertificatesBarChart = () => {

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
        "graphName": "generator-rego-certificates",
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

    const exportData = () => {
      // Convert to CSV string
      const csvData = csvFormat(apiData.graphData);
  
      // Create blob
      const blob = new Blob([csvData], { type: 'text/csv' });
  
      // Download blob as file
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = 'assetpparegocertificates.csv';
      link.href = url;
      link.click();
    }

    return (
      <div>
        {contextHolder}
        <div className='AssetsPPAREGOCertificatesBarChart_Header'>
          <div className='AssetsPPAREGOCertificatesBarChart_Title'>
            <span className='AssetsPPAREGOCertificatesBarChart_TitleHighlight'>REGO Certificates</span>{graphDataUnit}
          </div>
          <div className='AssetsPPAREGOCertificatesBarChart_Options'>
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
              defaultValue="Last 7 Days"
              style={{ width: 142 }}
              onChange={handleChange}
              options={[
                { value: 'LASTDAY', label: 'Last Day' },
                { value: 'LAST7DAYS', label: 'Last 7 Days' },
                { value: 'LAST30DAYS', label: 'Last 30 Days' },
                { value: 'LAST6MONTHS', label: 'Last 6 Months' },
                { value: 'LAST12MONTHS', label: 'Last 12 Months' }
              ]}
            />
          </div>
        </div>
        <div className='AssetsPPAREGOCertificatesBarChart_Box'>
            {contextHolder}
            <Column {...config} />
        </div>
      </div>
    );
};

export default AssetsPPAREGOCertificatesBarChart;