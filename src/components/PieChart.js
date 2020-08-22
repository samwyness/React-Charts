import React, { Component } from 'react';

import {
	dataArrayToObject,
	getCalculatedValuesFromData,
	calculatePieSlices
} from '../lib/chart-data';

import { colors } from '../lib/colors';

import '../css/chart-pie.css';

export default class PieChart extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			data_object: dataArrayToObject( this.props.data ),
			selected_slice: -1
		};

		this.handleMouseEnterSlice = this.handleMouseEnterSlice.bind( this );
		this.handleMouseLeaveSlice = this.handleMouseLeaveSlice.bind( this );
	}

	handleMouseEnterSlice( event, slice_index ) {
		this.setState( {
			selected_slice: slice_index
		} );
	}

	handleMouseLeaveSlice() {
		this.setState( {
			selected_slice: -1
		} );
	}

	render() {
		let { config } = this.props;
		let { data_object, selected_slice } = this.state;

		let { item_data, value_data } = data_object;
		let calcValues = getCalculatedValuesFromData( data_object );

		let pie_size = config.size || 250;
        let slices = calculatePieSlices( pie_size, data_object );

		let chart_data_class = [ 'chart-data', 'flex-content-center' ];
		let chart_legend_class = [ 'chart-legend', 'flex-content-center' ];

		if ( selected_slice !== -1 ) {
			chart_data_class = [ ...chart_data_class, 'slice-selected' ];
			chart_legend_class = [ ...chart_legend_class, 'slice-selected' ];
		}

		let donut_value_null = '--';
		let donut_font_size = '24px';

		if ( calcValues.max_value < 999 ) {
			donut_font_size = '40px';
		}

		return (
			<div className="flex-row flex-content-center">
				<div className={ chart_data_class.join( ' ' ) }>
					<svg viewBox={`0 0 ${ pie_size } ${ pie_size }`}>
						{ slices.map( ( slice, index ) => {
							let path_data = [
								'M' + slice.L + ',' + slice.L,
								'L' + slice.L + ',0',
								'A' + slice.L + ',' + slice.L + ' 0 ' + slice.arcSweep + ',1 ' + slice.X + ', ' + slice.Y,
								'z',
							].join( ' ' );

							let selected_slice_class = ( selected_slice === index ) ? 'selected' : '';

							return (
								<path
									key={ index }
									className={ `pie-slice ${ selected_slice_class }` }
									d={ path_data }
									fill={ slice.color }
									transform={ `rotate(${ slice.R }, ${ slice.L }, ${ slice.L })` }
									stroke="#FFF"
									strokeWidth="1"
									onMouseEnter={ ( event ) => this.handleMouseEnterSlice( event, index ) }
									onMouseLeave={ this.handleMouseLeaveSlice }
									></path>
							);
						} ) }

						{ config.type === 'donut' &&
							<g>
								<circle
									cx={ ( pie_size / 2 ) + 'px' }
									cy={ ( pie_size / 2 ) + 'px' }
									r={ ( pie_size / 3 ) + 'px' }
									style={ { fill:'#FFF' } }
								></circle>

								<g>
									<text
										x="50%"
										y="50%"
										dy="-.3em"
										textAnchor="middle"
										style={ {
											fontWeight: 'bold',
											fill: colors.dark
										} }
										>
											<tspan x="50%" y="50%" dy="" style={ { fontSize: donut_font_size } }>
												{ selected_slice !== -1 ? (
													value_data.values[selected_slice]
												) : (
													donut_value_null
												) }
											</tspan>

											<tspan x="50%" y="50%" dy="2em">{ data_object.value_data.title }</tspan>
										</text>
									</g>
							</g>

						}
					</svg>
				</div>

				<div className={ chart_legend_class.join( ' ' ) }>
					<div className="chart-legend-box">

						<div className="chart-legend-title"><strong>{ item_data.title }</strong></div>

						{ item_data.values.map( ( item_value, index ) => {
							let pie_fraction = value_data.values[index] / calcValues.value_total * 100;
							let percentage = pie_fraction.toFixed(1);
							let selected_slice_class = ( selected_slice === index ) ? 'selected' : '';

							return (
								<div
									key={ index }
									className={ `chart-legend-item ${ selected_slice_class }` }
									onMouseEnter={ ( event ) => this.handleMouseEnterSlice( event, index ) }
									onMouseLeave={ this.handleMouseLeaveSlice }
								>
									<div className="chart-legend-item-color" style={ { backgroundColor: value_data.options[index].color } }></div>
									<div className="chart-legend-item-text">
										<span style={ { opacity: '0.6' } }>{ `[${ percentage }%]`}</span> <strong>{ item_value }</strong>
									</div>
								</div>
							);
						} ) }

					</div>
				</div>
			</div>
		);
    }
}
