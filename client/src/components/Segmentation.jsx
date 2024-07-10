import React, { useEffect, useState } from 'react';
import { fetchSegmentationResults } from '../utils/api';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Segmentation = () => {
  const [data, setData] = useState([]);
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    fetchSegmentationResults().then(setData);
  }, []);

  // Prepare the data for the pie chart
  const segmentsCount = data.reduce((acc, item) => {
    acc[item.segment] = (acc[item.segment] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(segmentsCount).map(key => ({
    name: `Segment ${key}`,
    value: segmentsCount[key],
  }));

  return (
    <div>
      <h2>Instagram User Segmentation</h2>
      <button onClick={() => setShowChart(!showChart)}>
        {showChart ? 'Hide Chart' : 'Show Chart'}
      </button>
      {showChart && (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Segmentation;
