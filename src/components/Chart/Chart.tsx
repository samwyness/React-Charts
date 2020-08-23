import React, { Component } from 'react';

import BarVertical from '../BarVertical';
import PieChart from '../PieChart';

export type ChartProps = {
  data: any;
  config: any;
};

export type ChartState = {};

export default class ChartComponent extends Component<ChartProps, ChartState> {
  constructor(props) {
    super(props);

    if (!this.props.data) {
      new Error("Missing props 'data'");
    }
  }

  render() {
    let { data, config } = this.props;
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
  }
}
