import React, { Component } from 'react';

import {
	dataArrayToObject,
	getCalculatedValuesFromData
} from '../lib/chart-data';

import { colors } from '../lib/colors';

import '../css/chart-bar.css';

export default class BarVertical extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			data_object: dataArrayToObject( this.props.data )
		};
	}

	renderVerticalAxis() {
		let { config } = this.props;
		let { data_object } = this.state;

		let value_prefix = config.value_prefix || '';

		let calcValues = getCalculatedValuesFromData( data_object );
		let { end_value, gridlines } = calcValues;

		let gridline_major_offest = gridlines.major - 1;
		let value_pos = ( end_value / ( gridline_major_offest ) ) / end_value * 100;

		return (
			<div className="chart-vertical-axis col">
				{ Array( gridlines.major ).fill().map( ( line, index ) => (
					<div
						key={ index }
						className="chart-vertical-axis-value"
						style={ { top: `${ value_pos * index }%` } }
					>
						{ value_prefix + Math.floor( end_value - ( index * end_value / gridline_major_offest ) ) }
					</div>
				) ) }
			</div>
		);
	}

	renderChartData() {
        let { data_object } = this.state;
		let { item_data, value_data } = data_object;

        // Items
        let items = item_data.values;
        let item_width = 100 / items.length;

        // Values
        let values = value_data.values;
        let calcValues = getCalculatedValuesFromData( data_object );
		let { end_value, gridlines } = calcValues;

		let gridline_major_offest = gridlines.major - 1;
		let gridline_major_pos = ( end_value / ( gridline_major_offest ) ) / end_value * 100;

		// TODO: Implement bar height animation
		// setTimeout( function( item, item_height, item_color ) {
		// 	return function() {
		// 		item.style.height = item_height + '%';
		// 		item.style.backgroundColor = item_color;
		// 	};
		// }( chart_item, chart_item_height, chart_item_color ), 1000 );

		return (
			<div className="chart-data col">
				{ Array( gridlines.major ).fill().map( ( line, index ) => (
					<div
						key={ index }
						className="chart-data-gridline"
						style={ {
							top: `${ gridline_major_pos * index }%`,
							backgroundColor: colors.grey,
						} }
					></div>

					// TODO: Set the last line color to dark
					// if ( i === gridline_major_offest ) {
					// 	gridline.style.backgroundColor = colors.dark;
					// 	gridline.style.zIndex = '150';
					// }

				) ) }

				{ values.map( ( value, index ) => {
					let item_height = ( ( values[index] - calcValues.start_value ) / calcValues.remainder * 100 );
					let item_color = ( value_data.options[index] && value_data.options[index].color ) ? value_data.options[index].color : colors.blue;

					return (
						<div key={ index } className="chart-data-bar-wrap" style={ { width: item_width + '%' } } >
							<div
								className="chart-data-bar"
								style={ {
									height: item_height + '%',
									// backgroundColor: colors.dark
									backgroundColor: item_color
								} }
								datatooltip={ value }
							></div>
						</div>
					);
				} ) }

			</div>
		);
	}

	renderHorizontalSpacer() {
		return (
			<div className="chart-horizontal-spacer col"></div>
		);
	}

	renderHorizontalAxis() {
		let { data_object } = this.state;

        let item_data = data_object.item_data;
        let items = item_data.values;

		return (
			<div className="chart-horizontal-axis col flex-row">
				{ items.map( ( item, index ) => (
					<div
						key={ index }
						className="chart-horizontal-axis-value"
						style={ { width: ( 100 / items.length ) + '%' } }
						datatooltip= { item }
					>
						{ item }
					</div>
				) ) }

				<div className="chart-horizontal-axis-title">
					<strong>{ item_data.title }</strong>
				</div>
			</div>
		);
	}

	render() {
		return (
			<div className="flex-row">
				{ // Vertical axis
					this.renderVerticalAxis()
				}

				{ // Chart Data
					this.renderChartData()
				}

				<div className="flex-row">

					{ // Horizontal Spacer
						this.renderHorizontalSpacer()
					}

					{ // Horizontal Axis
						this.renderHorizontalAxis()
					}
				</div>
			</div>
		);
    }
}
