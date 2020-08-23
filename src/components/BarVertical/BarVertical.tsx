import React, { Component } from 'react';

import { colors } from '../../utils/colors';
import {
  dataArrayToObject,
  getCalculatedValuesFromData,
} from '../../utils/chartData';

import './BarVertical.scss';

export type BarVerticalProps = {
  data: any;
  config: any;
};

export type BarVerticalState = {
  dataObject: any;
};

export const BarVertical = ({ data, config }: BarVerticalProps) => {
  const dataObject = dataArrayToObject(data);

  const renderVerticalAxis = () => {
    const valuePrefix = config.valuePrefix || '';
    const calcValues = getCalculatedValuesFromData(dataObject);
    const { endValue, gridlines } = calcValues;
    const gridlineMajorOffest = gridlines.major - 1;
    const valuePos = (endValue / gridlineMajorOffest / endValue) * 100;

    return (
      <div className="chart-vertical-axis col">
        {Array(gridlines.major).map((line, index) => (
          <div
            key={index}
            className="chart-vertical-axis-value"
            style={{ top: `${valuePos * index}%` }}
          >
            {valuePrefix +
              Math.floor(endValue - (index * endValue) / gridlineMajorOffest)}
          </div>
        ))}
      </div>
    );
  };

  const renderChartData = () => {
    let { itemData, valueData } = dataObject;

    // Items
    let items = itemData.values;
    let item_width = 100 / items.length;

    // Values
    let values = valueData.values;
    let calcValues = getCalculatedValuesFromData(dataObject);
    let { endValue, gridlines } = calcValues;

    let gridlineMajorOffest = gridlines.major - 1;
    let gridlineMajorPos = (endValue / gridlineMajorOffest / endValue) * 100;

    // TODO: Implement bar height animation
    // setTimeout( function( item, item_height, item_color ) {
    // 	return function() {
    // 		item.style.height = item_height + '%';
    // 		item.style.backgroundColor = item_color;
    // 	};
    // }( chart_item, chart_item_height, chart_item_color ), 1000 );

    return (
      <div className="chartData col">
        {Array(gridlines.major).map((line, index) => (
          <div
            key={index}
            className="chartData-gridline"
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

        {values.map((value, index) => {
          let item_height =
            ((values[index] - calcValues.startValue) / calcValues.remainder) *
            100;
          let item_color =
            valueData.options[index] && valueData.options[index].color
              ? valueData.options[index].color
              : colors.blue_300;

          return (
            <div
              key={index}
              className="chartData-bar-wrap"
              style={{ width: item_width + '%' }}
            >
              <div
                className="chartData-bar"
                style={{
                  height: item_height + '%',
                  // backgroundColor: colors.dark
                  backgroundColor: item_color,
                }}
                data-tooltip={value}
              ></div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderHorizontalSpacer = () => {
    return <div className="chart-horizontal-spacer col"></div>;
  };

  const renderHorizontalAxis = () => {
    let itemData = dataObject.itemData;
    let items = itemData.values;

    return (
      <div className="chart-horizontal-axis col flex-row">
        {items.map((item, index) => (
          <div
            key={index}
            className="chart-horizontal-axis-value"
            style={{ width: 100 / items.length + '%' }}
            data-tooltip={item}
          >
            {item}
          </div>
        ))}

        <div className="chart-horizontal-axis-title">
          <strong>{itemData.title}</strong>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-row">
      {renderVerticalAxis()}
      {renderChartData()}

      <div className="flex-row">
        {renderHorizontalSpacer()}
        {renderHorizontalAxis()}
      </div>
    </div>
  );
};
