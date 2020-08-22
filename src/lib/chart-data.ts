import { getRandomColor } from './colors';

/**
 * [isObject description]
 * @param  {[type]}  val [description]
 * @return {Boolean}     [description]
 */
export function isObject( val ) {
    return val !== null && typeof val === 'object';
}

/**
 * [arraySum description]
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
export function arraySum( array ) {
	return array.reduce( function( total, num ) {
		return total + num;
	} );
}

/**
 * [arrayCompare description]
 * @param  {[type]} a1 [description]
 * @param  {[type]} a2 [description]
 * @return {[type]}    [description]
 */
export function arrayCompare( a1, a2 ) {
    if ( a1.length !== a2.length ) {
        return false;
    }

    let test1 = false;
    let test2 = false;

    for ( let i = 0; i < a1.length; i++ ) {
        test1 = a1[i];
        test2 = a2[i];

        if ( isObject( test1 ) ) {
            test1 = JSON.stringify( test1 );
        }

        if ( isObject( test2 ) ) {
            test2 = JSON.stringify( test2 );
        }

        if ( test1 !== test2 ) {
            return false;
        }
    }

    return true;
}

/**
 * [inArray description]
 * @param  {[type]} needle   [description]
 * @param  {[type]} haystack [description]
 * @return {[type]}          [description]
 */
export  function inArray( needle, haystack ) {
    let length = haystack.length;

    for (let i = 0; i < length; i++) {
        if ( isObject( haystack[i] ) ) {
            if ( arrayCompare(haystack[i], needle) ) {
                return true;
            }
        } else {
            if ( haystack[i] === needle ) {
                return true;
            }
        }
    }

    return false;
}

/**
 * [dataArrayToObject description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export function dataArrayToObject( data ) {
	let title_array;
	let data_array;

	data = data || false;
	title_array = data[0];
	data_array = data.slice( 1 );

	let item_data = {
		title: title_array[0],
		values: [],
	};

	let value_data = {
		title: title_array[1],
		values: [],
		options: [],
	};

	data_array.map( ( item, index ) => {
		item_data.values.push( data_array[index][0] );
		value_data.values.push( data_array[index][1] );

		if ( data_array[index][2] ) {
			value_data.options.push( data_array[index][2] );
		}
	} );

	if ( value_data.options.length < 1 ) {
		let new_color = false;
		let used_colors = [];

		value_data.values.map( () => {
			new_color = getRandomColor( used_colors );
			value_data.options = [ ...value_data.options, { color: new_color } ];
			used_colors = [ ...used_colors, new_color ];
		} );
	}

	let data_object = {
		item_data,
		value_data,
	};

	return data_object;
}

/**
 * [getCalculatedValuesFromData description]
 * @param  {[type]} data_object [description]
 * @return {[type]}             [description]
 */
export function getCalculatedValuesFromData( data_object ) {
	let values = data_object.value_data.values;

	let min_value = Math.min( ...values );
	let max_value = Math.max( ...values );
	let value_count = values.length;
	let value_total = arraySum( values );

	// Gridlines
	let gridlines = {
		major: 5,
		minor: 10,
	};

	// Set default values for our charts main data
	let start_value = 0;
	let end_value = 0;
	let remainder = 0;
	let rounding = 1;
	let average = remainder / gridlines.major;

	// Determine the rounding for the end value of the chart
	if ( max_value > 999999 ) {
		rounding = 1000000;
	} else if ( max_value > 99999 ) {
		rounding = 100000;
	} else if ( max_value > 9999 ) {
		rounding = 10000;
	} else if ( max_value > 999 ) {
		rounding = 1000;
	} else if ( max_value > 99 ) {
		rounding = 100;
	}

	// Calculate our end_value then update remainder & average
	end_value = Math.ceil( max_value / rounding ) * rounding;
	remainder = ( end_value - start_value );
	average = remainder / gridlines.major;

	return {
		min_value,
		max_value,
		value_count,
		value_total,
		start_value,
		end_value,
		remainder,
		gridlines,
		average,
	};
}

/**
 * [calculatePieSlices description]
 * @param  {[type]} pie_size    [description]
 * @param  {[type]} data        [description]
 * @param  {[type]} data_object [description]
 * @return {[type]}             [description]
 */
export function calculatePieSlices( pie_size, data_object ) {
	let value_data = data_object.value_data;
	let values = value_data.values;
	let value_total = arraySum( values );

	let slices = [];
	let item_color;

	let l = pie_size / 2;

	let a = 0; // Angle
	let aRad = 0; // Angle in Rad
	let aCalc = 0;
	let arcSweep = 0;

	let z = 0; // Size z
	let x = 0; // Side x
	let y = 0; // Side y

	let X = 0; // SVG X coordinate
	let Y = 0; // SVG Y coordinate
	let R = 0; // Rotation

	values.map( ( value_item, index ) => {
		a = 360 * ( value_item / value_total );
		aCalc = ( a > 180 ) ? 360 - a : a;
		aRad = aCalc * Math.PI / 180;
		z = Math.sqrt( 2 * l * l - ( 2 * l * l * Math.cos( aRad ) ) );

		if ( aCalc <= 90 ) {
			x = l * Math.sin( aRad );
		} else {
			x = l * Math.sin( ( 180 - aCalc ) * Math.PI / 180 );
		}

		y = Math.sqrt( z * z - x * x );
		Y = y;

		if ( a <= 180 ) {
			X = l + x;
			arcSweep = 0;
		} else {
			X = l - x;
			arcSweep = 1;
		}

		item_color = value_data.options[index] ? value_data.options[index].color : null;

		slices.push( {
			percentage: ( value_item / value_total ),
			color: item_color,
			arcSweep: arcSweep,
			L: l,
			X: X,
			Y: Y,
			R: R
		} );

		R = R + a;
	} );

	return slices;
}
