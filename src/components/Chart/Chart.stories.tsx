import React from 'react';

import { colors } from '../../utils/colors';

import { Chart } from './Chart';
import { BarVertical } from '../BarVertical';
import { PieChart } from '../PieChart';

export type ChartProps = {
  data: any;
  config: any;
};

export default {
  title: 'Components / Chart',
  component: Chart,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args: ChartProps) => {
  let ChartType;

  switch (args.config.type) {
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
    <div className={`chart-container chart-type-${args.config.type}`}>
      <div className="chart-title">
        <strong>{args.config.title}</strong>
      </div>

      <ChartType {...args} />
    </div>
  );
};

export const BarVerticalExample = Template.bind({});
BarVerticalExample.args = {
  data: [
    ['Task Status', 'Tasks'],
    ['Open', 100, { color: colors.deep_purple_300 }],
    ['In Progress', 100, { color: colors.blue_300 }],
    ['Review', 100, { color: colors.red_300 }],
    ['Complete', 100, { color: colors.green_300 }],
  ],
  config: {
    type: 'bar-vertical',
    title: 'Project Tasks',
  },
};

export const PieChartExample = Template.bind({});
PieChartExample.args = {
  data: [
    ['Task Status', 'Tasks'],
    ['Open', 100, { color: colors.deep_purple_300 }],
    ['In Progress', 100, { color: colors.blue_300 }],
    ['Review', 100, { color: colors.red_300 }],
    ['Complete', 100, { color: colors.green_300 }],
  ],
  config: {
    type: 'donut',
    title: 'Project Tasks',
  },
};
