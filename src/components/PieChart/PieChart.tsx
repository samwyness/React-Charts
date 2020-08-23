import React, { Component } from 'react';

import { colors } from '../../utils/colors';
import {
  dataArrayToObject,
  getCalculatedValuesFromData,
  calculatePieSlices,
} from '../../utils/chartData';

export type PieChartProps = {
  data: any;
  config: any;
};

export type PieChartState = {
  dataObject: any;
  selectedSlice: any;
};

export default class PieChart extends Component<PieChartProps, PieChartState> {
  dataObject = dataArrayToObject(this.props.data);
  selectedSlice = -1;

  constructor(props) {
    super(props);

    this.handleMouseEnterSlice = this.handleMouseEnterSlice.bind(this);
    this.handleMouseLeaveSlice = this.handleMouseLeaveSlice.bind(this);
  }

  handleMouseEnterSlice(event, sliceIndex) {
    this.setState({
      selectedSlice: sliceIndex,
    });
  }

  handleMouseLeaveSlice() {
    this.setState({
      selectedSlice: -1,
    });
  }

  render() {
    let { config } = this.props;
    let { dataObject, selectedSlice } = this.state;

    let { itemData, valueData } = dataObject;
    let calcValues = getCalculatedValuesFromData(dataObject);

    let pieSize = config.size || 250;
    let slices = calculatePieSlices(pieSize, dataObject);

    let chartDataClass = ['chartData', 'flex-content-center'];
    let chartLegendClass = ['chart-legend', 'flex-content-center'];

    if (selectedSlice !== -1) {
      chartDataClass = [...chartDataClass, 'slice-selected'];
      chartLegendClass = [...chartLegendClass, 'slice-selected'];
    }

    let donutValueNull = '--';
    let donutFontSize = '24px';

    if (calcValues.maxValue < 999) {
      donutFontSize = '40px';
    }

    return (
      <div className="flex-row flex-content-center">
        <div className={chartDataClass.join(' ')}>
          <svg viewBox={`0 0 ${pieSize} ${pieSize}`}>
            {slices.map((slice, index) => {
              let pathData = [
                'M' + slice.L + ',' + slice.L,
                'L' + slice.L + ',0',
                'A' +
                  slice.L +
                  ',' +
                  slice.L +
                  ' 0 ' +
                  slice.arcSweep +
                  ',1 ' +
                  slice.X +
                  ', ' +
                  slice.Y,
                'z',
              ].join(' ');

              let selectedSliceClass =
                selectedSlice === index ? 'selected' : '';

              return (
                <path
                  key={index}
                  className={`pie-slice ${selectedSliceClass}`}
                  d={pathData}
                  fill={slice.color}
                  transform={`rotate(${slice.R}, ${slice.L}, ${slice.L})`}
                  stroke="#FFF"
                  strokeWidth="1"
                  onMouseEnter={(event) =>
                    this.handleMouseEnterSlice(event, index)
                  }
                  onMouseLeave={this.handleMouseLeaveSlice}
                ></path>
              );
            })}

            {config.type === 'donut' && (
              <g>
                <circle
                  cx={pieSize / 2 + 'px'}
                  cy={pieSize / 2 + 'px'}
                  r={pieSize / 3 + 'px'}
                  style={{ fill: '#FFF' }}
                ></circle>

                <g>
                  <text
                    x="50%"
                    y="50%"
                    dy="-.3em"
                    textAnchor="middle"
                    style={{
                      fontWeight: 'bold',
                      fill: colors.dark,
                    }}
                  >
                    <tspan
                      x="50%"
                      y="50%"
                      dy=""
                      style={{ fontSize: donutFontSize }}
                    >
                      {selectedSlice !== -1
                        ? valueData.values[selectedSlice]
                        : donutValueNull}
                    </tspan>

                    <tspan x="50%" y="50%" dy="2em">
                      {dataObject.valueData.title}
                    </tspan>
                  </text>
                </g>
              </g>
            )}
          </svg>
        </div>

        <div className={chartLegendClass.join(' ')}>
          <div className="chart-legend-box">
            <div className="chart-legend-title">
              <strong>{itemData.title}</strong>
            </div>

            {itemData.values.map((itemValue, index) => {
              let pieFraction =
                (valueData.values[index] / calcValues.valueTotal) * 100;
              let percentage = pieFraction.toFixed(1);
              let selectedSliceClass =
                selectedSlice === index ? 'selected' : '';

              return (
                <div
                  key={index}
                  className={`chart-legend-item ${selectedSliceClass}`}
                  onMouseEnter={(event) =>
                    this.handleMouseEnterSlice(event, index)
                  }
                  onMouseLeave={this.handleMouseLeaveSlice}
                >
                  <div
                    className="chart-legend-item-color"
                    style={{ backgroundColor: valueData.options[index].color }}
                  ></div>
                  <div className="chart-legend-item-text">
                    <span style={{ opacity: '0.6' }}>{`[${percentage}%]`}</span>{' '}
                    <strong>{itemValue}</strong>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
