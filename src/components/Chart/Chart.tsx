import React, { Component } from 'react';

import { BarVertical } from '../BarVertical';
import { PieChart } from '../PieChart';

import './Chart.scss';

export type ChartProps = {
  data: any;
  config: any;
};

export const Chart = ({ data, config }: ChartProps) => {
  let ChartType;

  switch (config.type) {
    case 'bar-vertical':
      ChartType = BarVertical;
      break;

    case 'pie':
    case 'donut':
      ChartType = PieChart;
      break;

    default:
      ChartType = BarVertical;
      break;
  }

  return (
    <div className={`chart-container chart-type-${config.type}`}>
      <div className="chart-title">
        <strong>{config.title}</strong>
      </div>

      <ChartType data={data} config={config} />
    </div>
  );
};
