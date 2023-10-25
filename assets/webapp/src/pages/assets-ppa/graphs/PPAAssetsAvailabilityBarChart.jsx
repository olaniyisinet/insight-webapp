import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthedContext } from "../../../context/AuthedContext";
import { getRequestUrl } from '../../../util/backend-util';
import { DualAxes } from '@ant-design/plots';
import { message, Select, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './PPAAssetsAvailabilityBarChart.css';
import {csvFormat} from 'd3-dsv';

const PPAAssetsAvailabilityBarChart = () => {

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
        "graphName": "generator-asset-availability",
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

    const exportData = () => {
      // Convert to CSV string
      const csvDataActual = csvFormat(apiData.graphData.mainData);
      const csvDataAgreed = csvFormat(apiData.graphData.lineData);

      // Create blob
      const Actualblob = new Blob([csvDataActual], { type: 'text/csv' });
      const Agreedblob = new Blob([csvDataAgreed], { type: 'text/csv' });
  
      // Download blob as file
      const urlActual = URL.createObjectURL(Actualblob);
      const linkActual = document.createElement('a');
      linkActual.download = 'ppaassetsavailabilityactual.csv';
      linkActual.href = urlActual;
      linkActual.click();

      const urlAgreed = URL.createObjectURL(Agreedblob);
      const linkAgreed = document.createElement('a');
      linkAgreed.download = 'ppaassetsavailabilityagreed.csv';
      linkAgreed.href = urlAgreed;
      linkAgreed.click();
    }

    return (
      <div>
        {contextHolder}
        <div className='PPAAssetsAvailabilityBarChart_Header'>
          <div className='PPAAssetsAvailabilityBarChart_Title'>
            <span className='PPAAssetsAvailabilityBarChart_TitleHighlight'>Assets Availability</span>{graphDataUnit}
          </div>
          <div className='PPAAssetsAvailabilityBarChart_Options'>
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
        <div className='PPAAssetsAvailabilityBarChart_Box'>
            {contextHolder}
            <DualAxes {...config} />
        </div>
      </div>
    );
};

export default PPAAssetsAvailabilityBarChart;