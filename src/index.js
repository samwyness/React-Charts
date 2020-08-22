import Chart from './components/ChartComponent';

if ( process.env.NODE_ENV === 'development' ) {
    console.log( '%cCharts started in development mode', 'color: green;' );
}

export default Chart;
