import React from 'react';

import { ChartConfig } from '../Chart/Chart';
import {
  colors,
  dataArrayToObject,
  getCalculatedValuesFromData,
  ChartDataArray,
  formatNumber,
} from '../../utils/';

import './BarVertical.scss';

export type BarVerticalProps = {
  data: ChartDataArray;
  config: ChartConfig;
};

export const BarVertical = ({ data, config }: BarVerticalProps) => {
  const dataObject = dataArrayToObject(data);
  const calcValues = getCalculatedValuesFromData(dataObject);
  const { valuePrefix } = config;

  let { itemData, valueData } = dataObject;
  const itemWidth = 100 / itemData.values.length;

  const { endValue, gridlines } = calcValues;
  const gridlineMajorOffest = gridlines.major - 1;
  const gridlineMajorPos = (endValue / gridlineMajorOffest / endValue) * 100;
  const valuePos = (endValue / gridlineMajorOffest / endValue) * 100;

  // TODO: Implement bar height animation
  // setTimeout( function( item, itemHeight, itemColor ) {
  // 	return function() {
  // 		item.style.height = itemHeight + '%';
  // 		item.style.backgroundColor = itemColor;
  // 	};
  // }( chart_item, chart_itemHeight, chart_itemColor ), 1000 );

  return (
    <div className="flex-row">
      <div className="chart-vertical-axis" style={{ minHeight: `${config.size}px` }}>
        {Array.from(Array(gridlines.major).keys()).map(
          (line, index) => (
            <div
              key={index}
              className="chart-vertical-axis__value"
              style={{ top: `${valuePos * index}%` }}
            >
              {`${valuePrefix || ''}${formatNumber(
                Math.floor(endValue - (index * endValue) / gridlineMajorOffest)
              )}`}
            </div>
          ),
          Number
        )}
      </div>

      <div className="flex-col">
        <div className="chart-series" style={{ minHeight: `${config.size}px` }}>
          {Array.from(Array(gridlines.major).keys()).map((line, index) => (
            <div
              key={index}
              className="chart-series__gridline"
              style={{
                top: `${gridlineMajorPos * index}%`,
                backgroundColor: colors.grey,
              }}
            ></div>

            // TODO: Set the last line color to dark
            // if ( i === gridlineMajorOffest ) {
            // 	gridline.style.backgroundColor = colors.dark;
            // 	gridline.style.zIndex = '150';
            // }
          ))}

          {valueData.values.map((value, index) => (
            <div key={index} className="chart-series__bar-wrap" style={{ width: itemWidth + '%' }}>
              <div
                className="chart-series__bar"
                style={{
                  height: `${
                    ((Number(valueData.values[index]) - calcValues.startValue) /
                      calcValues.remainder) *
                    100
                  }%`,
                  backgroundColor: valueData.options[index].hasOwnProperty('color')
                    ? valueData.options[index].color
                    : colors.blue300,
                }}
                data-tooltip={value}
              ></div>
            </div>
          ))}
        </div>

        <div className="chart-horizontal-axis flex-col">
          <div className="flex-row">
            {itemData.values.map((item, index) => (
              <div
                key={index}
                className="chart-horizontal-axis__value"
                style={{ width: 100 / itemData.values.length + '%' }}
                data-tooltip={item}
              >
                {item}
              </div>
            ))}
          </div>
          <div className="chart-horizontal-axis__title">
            <strong>{itemData.title}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
