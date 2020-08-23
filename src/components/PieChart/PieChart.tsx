import React, { useState, useCallback } from 'react';

import { ChartConfig } from '../Chart/Chart';
import {
  colors,
  dataArrayToObject,
  getCalculatedValuesFromData,
  calculatePieSlices,
  ChartDataArray,
} from '../../utils';

import './PieChart.scss';

export type PieChartProps = {
  data: ChartDataArray;
  config: ChartConfig;
};

export const PieChart = ({ data, config }: PieChartProps) => {
  const dataObject = dataArrayToObject(data);
  const [selectedSlice, setSelectedSlice] = useState(-1);
  const { itemData, valueData } = dataObject;
  const calcValues = getCalculatedValuesFromData(dataObject);

  const pieSize = config.size || 250;
  const slices = calculatePieSlices(pieSize, dataObject);

  const donutValueNull = '--';
  const donutFontSize = calcValues.maxValue < 999 ? '40px' : '24px';

  const handleMouseEnterSlice = useCallback((event, sliceIndex) => {
    setSelectedSlice(sliceIndex);
  }, []);

  const handleMouseLeaveSlice = useCallback(() => {
    setSelectedSlice(-1);
  }, []);

  return (
    <div className="flex-col flex-content-center">
      <div
        className={`chart-series flex-content-center ${selectedSlice !== -1 && 'slice-selected'}`}
      >
        <svg viewBox={`0 0 ${pieSize} ${pieSize}`}>
          {slices.map((slice, index) => (
            <path
              key={index}
              className={`pie-slice ${selectedSlice === index ? 'selected' : ''}`}
              fill={slice.color}
              transform={`rotate(${slice.R}, ${slice.L}, ${slice.L})`}
              stroke="#FFF"
              strokeWidth="1"
              onMouseEnter={(event) => handleMouseEnterSlice(event, index)}
              onMouseLeave={handleMouseLeaveSlice}
              d={[
                `M${slice.L}, ${slice.L}`,
                `L${slice.L}, 0`,
                `A${slice.L}, ${slice.L} 0 ${slice.arcSweep}, 1 ${slice.X}, ${slice.Y}`,
                'z',
              ].join(' ')}
            ></path>
          ))}

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
                  <tspan x="50%" y="50%" dy="" style={{ fontSize: donutFontSize }}>
                    {selectedSlice !== -1 ? valueData.values[selectedSlice] : donutValueNull}
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

      <div
        className={`chart-legend flex-content-center ${selectedSlice !== -1 && 'slice-selected'}`}
      >
        <div className="chart-legend__box">
          <div className="chart-legend__title">
            <strong>{itemData.title}</strong>
          </div>

          {itemData.values.map((itemValue, index) => (
            <div
              key={index}
              className={`chart-legend__item ${selectedSlice === index ? 'selected' : ''}`}
              onMouseEnter={(event) => handleMouseEnterSlice(event, index)}
              onMouseLeave={handleMouseLeaveSlice}
            >
              <div
                className="chart-legend__item__color"
                style={{ backgroundColor: valueData.options[index].color }}
              ></div>
              <div className="chart-legend__item__text">
                <strong>{itemValue}&nbsp;</strong>
                <span style={{ opacity: '0.6' }}>
                  {`[${((Number(valueData.values[index]) / calcValues.valueTotal) * 100).toFixed(
                    1
                  )}%]`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
