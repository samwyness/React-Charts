import React from 'react';

import { colors } from '../../utils/colors';
import { Chart } from './Chart';

export default {
  title: 'Components / Charts',
  component: Chart,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const Template = (args) => <Chart {...args} />;

export const BarVertical = Template.bind({});
BarVertical.args = {
  type: 'bar-vertical',
  title: 'Income',
  valuePrefix: '$',
  data: [
    ['Financial Year', 'Net Income'],
    ['2015/2016', 2698, { color: colors.green500 }],
    ['2016/2017', 44438, { color: colors.green500 }],
    ['2017/2018', 19639, { color: colors.green500 }],
    ['2018/2019', 22914, { color: colors.green500 }],
    ['2019/2020', 86409, { color: colors.green500 }],
    ['2020/2021', 13526, { color: colors.green500 }],
  ],
};

export const PieChart = Template.bind({});
PieChart.args = {
  type: 'donut',
  title: 'Income',
  valuePrefix: '$',
  data: [
    ['Task status', 'Tasks'],
    ['Open', 26, { color: colors.blue500 }],
    ['In progress', 44, { color: colors.deepPurple500 }],
    ['Review', 96, { color: colors.amber500 }],
    ['Completed', 29, { color: colors.green500 }],
  ],
};
