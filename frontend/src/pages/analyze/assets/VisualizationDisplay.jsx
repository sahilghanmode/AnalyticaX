import React from 'react'
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js'
import { useExcelData } from '@/lib/excel-context'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend
)


const VisualizationDisplay = ({ chartType, xAxisColumn, yAxisColumn }) => {
    const { data } = useExcelData()
    if (!data || data.length === 0) return <p>No data available</p>

    const colorPalette = [
        'rgba(75, 192, 192, 0.6)',   // Teal
        'rgba(255, 99, 132, 0.6)',   // Red
        'rgba(54, 162, 235, 0.6)',   // Blue
        'rgba(255, 206, 86, 0.6)',   // Yellow
        'rgba(153, 102, 255, 0.6)',  // Purple
        'rgba(255, 159, 64, 0.6)'    // Orange
    ];

    const borderColors = [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ];

    const keys = Object.keys(data[0])
    const labelKey = keys[0]
    const valueKeys = keys.slice(1)

    console.log("Raw data:", data);
    console.log("X axis key:", xAxisColumn);
    console.log("Y axis keys:", yAxisColumn);


    const chartData = {
        labels: data.map(item => item?.[xAxisColumn]),
        datasets: yAxisColumn.map((key, index) => ({
            label: key,
            data: data.map(item => item?.[key]),
            backgroundColor: colorPalette[index % colorPalette.length],
            borderColor: borderColors[index % borderColors.length],
            borderWidth: 1,
        })),
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false }
        }
    }

    const renderChart = () => {
        switch (chartType) {
            case 'bar':
                return <Bar data={chartData} options={chartOptions} />
            case 'line':
                return <Line data={chartData} options={chartOptions} />
            case 'pie':
                return <Pie data={{
                    labels: valueKeys,
                    datasets: [{
                        data: valueKeys.map(key => data.reduce((sum, item) => sum + item[key], 0)),
                        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
                    }]
                }} />
            case 'doughnut':
                return <Doughnut data={{
                    labels: valueKeys,
                    datasets: [{
                        data: valueKeys.map(key => data.reduce((sum, item) => sum + item[key], 0)),
                        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56']
                    }]
                }} />
            default:
                return <p>Invalid chart type</p>
        }
    }

    return <div className="w-full h-full">{renderChart()}</div>
}

export default VisualizationDisplay
