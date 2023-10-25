import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthedContext } from "../../../context/AuthedContext";
import { getRequestUrl } from '../../../util/backend-util';
import { Pie } from '@ant-design/plots';
import { message, Select } from 'antd';
import './GridVsRenDonutChart.css';

const GridVsRenDonutChart = () => {

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
        "graphName": "grid-vs-renewables",
        "graphOption": graphOption
      })
      .then((response) => {
        setApiData(response.data);
      })
      .catch(error => {
        let errorMessage = "Error orrcured while loading grid vs renewables graph";
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
      let percentage = '';
      if(apiData.graphData) {
        apiData.graphData.forEach((item, index) => {
          if(item.type === 'Renewable Energy') {
            percentage = `${item.value}%`
          }
        });
      }
      return `<div class='GridVsRenDonutChart_Title'><span class='GridVsRenDonutChart_CenterHighlight'>${percentage}</span>
        <br/>Renewable Energy<br/>Usage vs. Grid
      </div>`;
    }

    const getColorCode = ({ type }) => {
      if(type === 'Renewable Energy'){
        return '#42b01b';
      } else if(type === 'Grid Energy') {
        return '#F9CA23';
      }
      return '#664BB4';
    };

    const config = {
      appendPadding: 10,
      data: apiData.graphData,
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
        style: {
          textAlign: 'center',
          fontSize: 0,
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
      color: getColorCode,
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
      <div className='GridVsRenDonutChart'>
      {contextHolder}
      <div className='GridVsRenDonutChart_Header'>
        <div className='GridVsRenDonutChart_Title'>
          <span className='GridVsRenDonutChart_TitleHighlight'>Grid vs. Renewables</span>{graphDataUnit}
        </div>
        <div className='GridVsRenDonutChart_Options'>
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
      <div className='GridVsRenDonutChart_Box'>
          {contextHolder}
          <Pie {...config} />
      </div>
    </div>
    );
};

export default GridVsRenDonutChart;