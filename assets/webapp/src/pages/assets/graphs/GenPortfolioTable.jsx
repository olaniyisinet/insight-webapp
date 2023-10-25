import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import { AuthedContext } from "../../../context/AuthedContext";
import { getRequestUrl } from '../../../util/backend-util';
import { Select, Button, List, Avatar, message } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import './GenPortfolioTable.css'
import { csvFormat } from 'd3-dsv';


const GenPortfolioTable = () => {

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
      "graphName": "generator-gen-portfolio",
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


    const getColorAtIndex = (index) => {
      if (index >= 0 && index < apiData.graphData.length) {
        return apiData.graphData[index].color;
      }
      // Return a default color or null if the index is out of range
      return '#FFFFFF'; // For example, return white (#FFFFFF) if the index is out of range
    };

  const filterOptions = [
    { value: 'LAST7DAYS', label: 'Last 7 Days' },
    { value: 'LAST30DAYS', label: 'Last 30 Days' },
    { value: 'LAST6MONTHS', label: 'Last 6 Months' },
    { value: 'LAST12MONTHS', label: 'Last 12 Months' },
  ];

  const exportData = () => {
    const filteredData = apiData.graphData.map(({ pre,color, ...rest }) => rest);
    // Convert to CSV string
    const csvData = csvFormat(filteredData);

    // Create blob
    const blob = new Blob([csvData], { type: 'text/csv' });

    // Download blob as file
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'GeneralPorfolio.csv';
    link.href = url;
    link.click();
  }

  return (
    <div>
      <div className='PortfolioHeader'>
        <div className='PortfolioTitle'>
          <span className='PortfolioTitleHighlight'>Gen. Portfolio</span>kWh
        </div>
        <div className='PortfolioOptions'>
          <Button
             onClick={exportData}
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
            style={{ width: 142 }}
            onChange={handleChange}
            options={filterOptions}
          />
        </div>
      </div>
      <div className='Portfolio_Box'>

      <List
      dataSource={apiData.graphData}
      renderItem={(item, index)  => (
        <List.Item
          extra={<span style={{fontSize: '20px', fontWeight: '700'}}>{item.value} <span style={{fontSize: '10px',fontWeight: '200'}}>{graphDataUnit}</span></span>} >

          <List.Item.Meta
            avatar={<Avatar style={{backgroundColor: getColorAtIndex(index) }}>{item.pre}</Avatar>}
            title={item.company}
            description={item.location}
          />

        </List.Item>
          )}
          />
      
      </div>
    </div>
  );

};

export default GenPortfolioTable;