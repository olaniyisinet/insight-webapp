import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthedContext } from "../../../context/AuthedContext";
import { getRequestUrl } from '../../../util/backend-util';
import { Pie } from '@ant-design/plots';
import { message, Select } from 'antd';
import './YourCompDonutChart.css';

const YourCompDonutChart = () => {

  const [graphData, setGraphData] = useState([]);
  const {authedState} = useContext(AuthedContext);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    asyncFetch('TODAY');
  }, []);

  const asyncFetch = (graphOption) => {
    axios.post(getRequestUrl("/graph-by-name"), {
      "userId": authedState.tenantUser.userId,
      "userEmail": authedState.tenantUser.userEmail,
      "graphName": "renewable-composition",
      "graphOption": graphOption
    })
    .then((response) => {
      setGraphData(response.data.graphData);
    })
    .catch(error => {
      let errorMessage = "Error orrcured while loading grid composition graph";
      if(error.response?.data?.message) {
          errorMessage = error.response.data.message;
      }
      messageApi.error(errorMessage);
    });
  };

  const handleChange = (value) => {
      asyncFetch(value);
  };

  const chartContent = () => {
    return `<div class='YourCompDonutChart_Title'><span class='YourCompDonutChart_CenterHighlight'>RE24</span>
      <br/>Composition by<br/>Energy Source
    </div>`;
  }

  const config = {
    appendPadding: 10,
    data: graphData,
    angleField: 'value',
    radius: 1,
    innerRadius: 0.7,
    pieStyle : {
      lineWidth: 0,
    },
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
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      autoRotate: false,
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    colorField: 'type',
    color: ({ type }) => {
      if(type === 'Solar'){
        return '#54C22D';
      } else if(type === 'Wind') {
        return '#05D2C6';
      } else if(type === 'Hydro') {
        return '#2D60C2';
      } else if(type === 'Gas') {
        return '#F9CA23';
      }
      return '#664BB4';
    },
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        customHtml: chartContent,
      },
    },
  };

  return (
    <div className='YourCompDonutChart'>
    {contextHolder}
    <div className='YourCompDonutChart_Header'>
      <div className='YourCompDonutChart_Title'>
        <span className='YourCompDonutChart_TitleHighlight'>Renewable Composition</span>%
      </div>
      <div className='YourCompDonutChart_Options'>
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
    <div className='YourCompDonutChart_Box'>
        {contextHolder}
        <Pie {...config} />
    </div>
  </div>
  );
};

export default YourCompDonutChart;