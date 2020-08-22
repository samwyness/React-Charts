import React, { Component } from 'react';

import BarVertical from '../BarVertical';
import PieChart from '../PieChart';

import '../css/charts.css';

export default class ChartComponent extends Component {
    constructor( props ) {
		super( props );

        if ( !this.props.data ) {
            return new Error( 'Missing props \'data\'' );
        }
    }

	render() {
		let { data, config } = this.props;
		let ChartType;

		switch ( config.type ) {
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
			<div className={ `chart-container chart-type-${ config.type }` }>
				<div className="chart-title">
					<strong>{ config.title }</strong>
				</div>

				<ChartType data={ data } config={ config } />
			</div>
		);
    }
}
