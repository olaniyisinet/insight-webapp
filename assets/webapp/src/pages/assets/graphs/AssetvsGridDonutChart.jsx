import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AuthedContext } from "../../../context/AuthedContext";
import { getRequestUrl } from '../../../util/backend-util';
import { Pie } from '@ant-design/plots';
import { message, Select } from 'antd';
import './AssetvsGridDonutChart.css';

const AssetvsGridDonutChart = () => {

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
      "graphName": "generator-asset-grid",
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
      if(type === 'Grid Energy'){
        return '#54C22D';
      } else if(type === 'Asset Portfilio') {
        return '#05D2C6';
      } 
      return '#9d8e14';
    };

    const config = {
      appendPadding: 10,
      data: apiData.graphData,
      angleField: 'value',
      radius: 1,
      innerRadius: 0.8,
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
      <div className='AssetGridCompDonutChart'>
      {/* {contextHolder} */}
      <div className='AssetGridCompDonutChart_Header'>
        <div className='AssetGridCompDonutChart_Title'>
          <span className='AssetGridCompDonutChart_TitleHighlight'>Asset vs Grid</span> {graphDataUnit}
        </div>
        <div className='AssetGridCompDonutChart_Options'>
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
      <div className='AssetGridCompDonutChart_Box'>
          {/* {contextHolder} */}
          <Pie {...config} />
      </div>
    </div>
    );
};

export default AssetvsGridDonutChart;