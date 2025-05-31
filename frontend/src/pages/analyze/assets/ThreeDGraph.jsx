import Plot from 'react-plotly.js';
import { useExcelData } from '@/lib/excel-context';

export const ThreeDGraph = ({xAxisColumn, yAxisColumn, zAxisColumn}) => {
    const {data}=useExcelData()
  if (!data || data.length === 0) return <p>No data available</p>;
  const numericKeys = Object.keys(data[0]).filter(key => typeof data[0][key] === 'number');
  if (numericKeys.length < 3) return <p>Need at least 3 numeric columns for 3D plot</p>;


  const x = data.map(row => row[xAxisColumn]);
  const y = data.map(row => row[yAxisColumn]);
  const z = data.map(row => row[zAxisColumn]);
  const text = data.map(row => 
  `${xAxisColumn}: ${row[xAxisColumn]}, ${yAxisColumn}: ${row[yAxisColumn]}, ${zAxisColumn}: ${row[zAxisColumn]}`
);


  const colorArray = data.map((_, i) => i);


  return (
    <div className="w-full h-full">
      <Plot
        data={[
          {
            x,
            y,
            z,
            mode: 'markers',
            type: 'scatter3d',
            text, // hover labels (student names)
            marker: {
              size: 8,
              color: colorArray,
              colorscale: 'Rainbow',
              colorbar: { title: 'Index'},
              line: { width: 0.5, color: 'darkgrey' },
            },
          },
        ]}
        layout={{
          title: `3D Scatter Plot: ${xAxisColumn} vs ${yAxisColumn} vs ${zAxisColumn}`,
          autosize: true,
          width:undefined,
          height: 500,
          scene: {
            xaxis: { title: { text: xAxisColumn } },
            yaxis: { title: { text: yAxisColumn } },
            zaxis: { title: { text: zAxisColumn } },
          },
        }}
        style={{width:'100%', height:'100%'}}
      />
    </div>
  );
};
