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


const VisualizationDisplay = ({ chartType }) => {
    const {data}=useExcelData()
    if (!data || data.length === 0) return <p>No data available</p>

    const keys = Object.keys(data[0])
    const labelKey = keys[0] 
    const valueKeys = keys.slice(1) 

    const chartData = {
        labels: data.map(item => item[labelKey]),
        datasets: valueKeys.map((key, index) => ({
            label: key,
            data: data.map(item => item[key]),
            backgroundColor: `rgba(${100 + index * 40}, ${150 - index * 20}, ${200 - index * 30}, 0.6)`,
            borderColor: `rgba(${100 + index * 40}, ${150 - index * 20}, ${200 - index * 30}, 1)`,
            borderWidth: 1
        }))
    }

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
