// import React, { Component } from 'react';
//
// import ChartComponent from './ChartComponent';
//
// export default class BarHorizontal extends ChartComponent {
// 	constructor( props ) {
// 		super( props );
// 	}
//
// 	render() {
// 		let chart_y_box, chart_y_box_footer; //, footer_title;
//         let chartdata_box, chart_line, chart_item, chart_item_width, chart_item_color;
//         let chart_x_box, chart_x_boxdata;
//
//         let config = this.config;
//         let data_object = this.data_object;
//
//         // Items
//         let item_data = data_object.item_data;
//         let items = item_data.values;
//
//         // Values
//         let value_data = data_object.value_data;
//         let values = value_data.values;
//         let value_prefix = config.value_prefix || '';
//         let calcValues = this.getCalculatedValuesFromData();
//
//         // window._TOOLS.debug( 'chart', 'Horizontal data helpers', {
//         //     min_value,
//         //     max_value,
//         //     total_values,
//         //     calcValues.start_value,
//         //     calcValues.end_value,
//         //     calcValues.remainder,
//         // } );
//
//         // X Axis Data
//         chart_x_box = new AppComponent( 'div', {
//             style: {
//                 float: 'left',
//                 width: '20%',
//             }
//         }, this.container );
//
//         chart_x_boxdata = new AppComponent( 'div', {
//             style: {
//                 width: '100%',
//                 paddingBottom: '15px',
//             }
//         }, chart_x_box );
//
//         for (let i = 0; i < items.length; i++) {
//             new AppComponent( 'div', {
//                 style: {
//                     width: '100%',
//                     lineHeight: '50px',
//                     padding: '0 15px',
//                     textAlign: 'right',
//                 },
//                 innerText: items[i],
//             }, chart_x_boxdata );
//         }
//
//         // Chart Data Area
//         chartdata_box = new AppComponent( 'div', {
//             style: {
//                 float: 'left',
//                 position: 'relative',
//                 width: '80%',
//                 paddingRight: '60px',
//                 paddingBottom: '10px',
//             }
//         }, this.container );
//
//         let chartdata_box_wrap = new AppComponent( 'div', {
//             style: {
//                 position: 'relative',
//                 width: '100%',
//                 padding: '1px 0',
//                 borderRight: '1px solid' + window._APP.colors.grey,
//                 borderLeft: '1px solid' + window._APP.colors.dark,
//             }
//         }, chartdata_box );
//
//         for ( let i = 0; i < calcValues.remainder; i++ ) {
//             if ( i > 0 ) {
//                 if ( Math.floor( i % ( calcValues.sub_divisions ) === 0 ) ) {
//                     chart_line = new AppComponent( 'div', {
//                         style: {
//                             position: 'absolute',
//                             left: ( 100 / calcValues.remainder * i ) + '%',
//                             width: '1px',
//                             height: '100%',
//                             marginLeft: '-1px',
//                             backgroundColor: window._APP.colors.grey,
//                             zIndex: '10',
//                         },
//                     }, chartdata_box_wrap );
//
//                     if ( Math.floor( i % calcValues.divisions === 0 ) ) {
//                         chart_line.style.backgroundColor = window._APP.colors.dark_grey;
//                     }
//                 }
//             }
//         }
//
//         for ( let j = 0; j < values.length; j++ ) {
//             chart_item = new AppComponent( 'div', {
//                 style: {
//                     position: 'relative',
//                     width: '3%',
//                     height: '40px',
//                     marginTop: '5px',
//                     marginBottom: '10px',
//                     backgroundColor: window._APP.colors.dark,
//                     opacity: 0.9,
//                     zIndex: '100',
//                     transition: 'width 0.34s ease-in-out, background 0.34s ease-in-out',
//                 },
//             }, chartdata_box_wrap );
//
//             chart_item_width = ( ( values[j] - calcValues.start_value ) / calcValues.remainder * 100 );
//             chart_item_color = ( value_data.options[j] && value_data.options[j].color ) ? value_data.options[j].color : window._APP.colors.blue;
//
//             setTimeout( function( item, item_width, item_color ) {
//                 return function() {
//                     item.style.width = item_width + '%';
//                     item.style.backgroundColor = item_color;
//                 };
//             }( chart_item, chart_item_width, chart_item_color ), 1000 );
//         }
//
//         // Y Axis Data
//         chart_y_box = new AppComponent( 'div', {
//             style: {
//                 float: 'right',
//                 width: '80%',
//                 paddingRight: '60px',
//             }
//         }, this.container );
//
//         chart_y_box_footer = new AppComponent( 'div', {
//             style: {
//                 float: 'left',
//                 position: 'relative',
//                 width: '100%',
//                 height: 'auto',
//                 paddingTop: '15px',
//             }
//         }, chart_y_box );
//
//         for ( let k = 0; k < calcValues.remainder; k++ ) {
//             if ( Math.floor( k % calcValues.divisions === 0 ) ) {
//                 new AppComponent( 'div', {
//                     style: {
//                         position: 'absolute',
//                         left: ( 100 / calcValues.remainder * k ) + '%',
//                     },
//                     innerText: value_prefix + Math.floor( ( calcValues.start_value + ( k ) ) ),
//                 }, chart_y_box_footer );
//             }
//         }
//
//         // new AppComponent( 'div', {
//         //     style: {
//         //         position: 'absolute',
//         //         left: '100%',
//         //     },
//         //     innerText: value_prefix + Math.floor( calcValues.end_value ),
//         // }, chart_y_box_footer );
//
//         new AppComponent( 'div', {
//             style: {
//                 float: 'left',
//                 width: '100%',
//                 lineHeight: '50px',
//                 marginTop: '30px',
//                 textAlign: 'center',
//             },
//             innerHTML: '<strong>' + value_data.title + '</strong>',
//         }, chart_y_box_footer );
//     }
// }
