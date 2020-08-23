import React, { Component } from 'react';

import { colors } from '../../utils/colors';
import {
  dataArrayToObject,
  getCalculatedValuesFromData,
} from '../../utils/chartData';

export type BarVerticalProps = {
  data: any;
  config: any;
};

export type BarVerticalState = {
  dataObject: any;
};

export default class BarVertical extends Component<
  BarVerticalProps,
  BarVerticalState
> {
  dataObject = dataArrayToObject(this.props.data);

  constructor(props) {
    super(props);
  }

  renderVerticalAxis() {
    let { config } = this.props;
    let { dataObject } = this.state;

    let value_prefix = config.value_prefix || '';

    let calcValues = getCalculatedValuesFromData(dataObject);
    let { end_value, gridlines } = calcValues;

    let gridline_major_offest = gridlines.major - 1;
    let value_pos = (end_value / gridline_major_offest / end_value) * 100;

    return (
      <div className="chart-vertical-axis col">
        {Array(gridlines.major).map((line, index) => (
          <div
            key={index}
            className="chart-vertical-axis-value"
            style={{ top: `${value_pos * index}%` }}
          >
            {value_prefix +
              Math.floor(
                end_value - (index * end_value) / gridline_major_offest
              )}
          </div>
        ))}
      </div>
    );
  }

  renderChartData() {
    let { dataObject } = this.state;
    let { item_data, value_data } = dataObject;

    // Items
    let items = item_data.values;
    let item_width = 100 / items.length;

    // Values
    let values = value_data.values;
    let calcValues = getCalculatedValuesFromData(dataObject);
    let { end_value, gridlines } = calcValues;

    let gridline_major_offest = gridlines.major - 1;
    let gridline_major_pos =
      (end_value / gridline_major_offest / end_value) * 100;

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
              top: `${gridline_major_pos * index}%`,
              backgroundColor: colors.grey,
            }}
          ></div>

          // TODO: Set the last line color to dark
          // if ( i === gridline_major_offest ) {
          // 	gridline.style.backgroundColor = colors.dark;
          // 	gridline.style.zIndex = '150';
          // }
        ))}

        {values.map((value, index) => {
          let item_height =
            ((values[index] - calcValues.start_value) / calcValues.remainder) *
            100;
          let item_color =
            value_data.options[index] && value_data.options[index].color
              ? value_data.options[index].color
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
  }

  renderHorizontalSpacer() {
    return <div className="chart-horizontal-spacer col"></div>;
  }

  renderHorizontalAxis() {
    let { dataObject } = this.state;

    let item_data = dataObject.item_data;
    let items = item_data.values;

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
          <strong>{item_data.title}</strong>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="flex-row">
        {
          // Vertical axis
          this.renderVerticalAxis()
        }

        {
          // Chart Data
          this.renderChartData()
        }

        <div className="flex-row">
          {
            // Horizontal Spacer
            this.renderHorizontalSpacer()
          }

          {
            // Horizontal Axis
            this.renderHorizontalAxis()
          }
        </div>
      </div>
    );
  }
}
