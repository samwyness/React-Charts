import React from 'react';

import { ChartDataArray } from '../../utils';
import { BarVertical } from '../BarVertical';
import { PieChart } from '../PieChart';

import './Chart.scss';

export type ChartConfig = {
  type: 'bar-vertical' | 'pie' | 'donut';
  title: string;
  valuePrefix?: string;
  size?: number;
};

export interface ChartProps extends ChartConfig {
  data: ChartDataArray;
}

export const Chart = (props: ChartProps) => {
  const { type, title, data } = props;
  let ChartType;

  switch (type) {
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
    <div className={`rc-chart chart-type-${type}`}>
      <div className="chart-title">
        <strong>{title}</strong>
      </div>
      <ChartType data={data} config={props} />
    </div>
  );
};
