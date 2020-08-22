
import { inArray } from './chart-data';

export const colors = {
	dark: '#49565f',
	light: '#FFF',
	grey: '#e1e2e3',
	light_grey: '#f6f7f9',
	dark_grey: '#b0bec5',

	red_500: '#F44336',
	red_300: '#E57373',
	pink_500: '#E91E63',
	pink_300: '#F06292',
	deep_purple_500: '#673AB7',
	deep_purple_300: '#9575CD',
	blue_500: '#2196F3',
	blue_300: '#64B5F6',
	green_500: '#4CAF50',
	green_300: '#81C784',
	amber_500: '#FFC107',
	amber_300: '#FFD54F',
	orange_500: '#FF9800',
	orange_300: '#FFB74D',
	deep_orange_500: '#FF5722',
	deep_orange_300: '#FF8A65',
};

/**
 * [getRandomColor description]
 * @param  {[type]} last_color [description]
 * @return {[type]}            [description]
 */
export function getRandomColor( used_colors ) {
	let color_names = [
		'red_500', 'red_300',
		'pink_500', 'pink_300',
		'deep_purple_500', 'deep_purple_300',
		'blue_500', 'blue_300',
		'green_500', 'green_300',
		'amber_500', 'amber_300',
		'orange_500', 'orange_300',
		'deep_orange_500', 'deep_orange_300'
	];

	let new_color = colors[ color_names[ Math.floor( Math.random() * color_names.length ) ] ];

	if ( used_colors && inArray( new_color, used_colors ) ) {
		new_color = getRandomColor( used_colors );
	}

	return new_color;
}

export function shadeColor( color, percent ) {
    let R = parseInt( color.substring( 1, 3 ), 16 );
    let G = parseInt( color.substring( 3, 5 ), 16 );
    let B = parseInt( color.substring( 5, 7 ), 16 );

    R = parseInt( R * ( 100 + percent ) / 100 );
    G = parseInt( G * ( 100 + percent ) / 100 );
    B = parseInt( B * ( 100 + percent ) / 100 );

    R = ( R < 255 ) ? R : 255;
    G = ( G < 255 ) ? G : 255;
    B = ( B < 255 ) ? B : 255;

    let RR = ( ( R.toString( 16 ).length == 1 ) ? '0' + R.toString( 16 ): R.toString( 16 ) );
    let GG = ( ( G.toString( 16 ).length == 1 ) ? '0' + G.toString( 16 ): G.toString( 16 ) );
    let BB = ( ( B.toString( 16 ).length == 1 ) ? '0' + B.toString( 16 ): B.toString( 16 ) );

    return '#' + RR + GG + BB;
}
