import Plot from 'react-plotly.js';
import { useExcelData } from '@/lib/excel-context';

export const ThreeDGraph = () => {
    const {data}=useExcelData()
  if (!data || data.length === 0) return <p>No data available</p>;

  const numericKeys = Object.keys(data[0]).filter(key => typeof data[0][key] === 'number');
  if (numericKeys.length < 3) return <p>Need at least 3 numeric columns for 3D plot</p>;

  const [xKey, yKey, zKey] = numericKeys;

  const x = data.map(row => row[xKey]);
  const y = data.map(row => row[yKey]);
  const z = data.map(row => row[zKey]);
  const text = data.map(row => row.student); 

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
          title: `3D Scatter Plot: ${xKey} vs ${yKey} vs ${zKey}`,
          autosize: true,
          width:undefined,
          height: 500,
          scene: {
            xaxis: { title: xKey },
            yaxis: { title: yKey },
            zaxis: { title: zKey },
          },
        }}
        style={{width:'100%', height:'100%'}}
      />
    </div>
  );
};
