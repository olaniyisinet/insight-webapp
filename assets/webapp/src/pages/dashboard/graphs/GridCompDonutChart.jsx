import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthedContext } from "../../../context/AuthedContext";
import { getRequestUrl } from '../../../util/backend-util';
import { Pie } from '@ant-design/plots';
import { message, Select } from 'antd';
import './GridCompDonutChart.css';

const GridCompDonutChart = () => {

    const [graphData, setGraphData] = useState([]);
    const { authedState } = useContext(AuthedContext);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
      asyncFetch('LASTDAY');
    }, []);

    const asyncFetch = (graphOption) => {
      axios.post(getRequestUrl("/graph-by-name"), {
        "userId": authedState.tenantUser.userId,
        "userEmail": authedState.tenantUser.userEmail,
        "graphName": "grid-composition",
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
      return `<div class='GridCompDonutChart_Title'><span class='GridCompDonutChart_CenterHighlight'>UK Grid</span>
        <br/>Composition by<br/>Energy Source
      </div>`;
    }

    const getColorCode = ({ type }) => {
      if(type === 'Solar'){
        return '#54C22D';
      } else if(type === 'Wind') {
        return '#05D2C6';
      } else if(type === 'Hydro') {
        return '#2D60C2';
      } else if(type === 'Interconnector') {
        return '#434349';
      } else if(type === 'Nuclear') {
        return '#964b01';
      } else if(type === 'Gas') {
        return '#d59010';
      } else if(type === 'Oil') {
        return '#c0561f';
      } else if(type === 'Biomass') {
        return '#F9CA23';
      }
      return '#9d8e14';
    };

    const config = {
      appendPadding: 10,
      data: graphData,
      angleField: 'value',
      radius: 1,
      innerRadius: 0.7,
      endArrow: {
        fill: 'red'
      },
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
          },
          pageNavigator: {
            marker: {
              style: {
                fill: '#809599'
              }
            },
            text: {
              style: {
                fill: '#809599'
              }
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
      <div className='GridCompDonutChart'>
      {contextHolder}
      <div className='GridCompDonutChart_Header'>
        <div className='GridCompDonutChart_Title'>
          <span className='GridCompDonutChart_TitleHighlight'>Grid Composition</span>%
        </div>
        <div className='GridCompDonutChart_Options'>
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
      <div className='GridCompDonutChart_Box'>
          {contextHolder}
          <Pie {...config} />
      </div>
    </div>
    );
};

export default GridCompDonutChart;