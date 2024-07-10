import React, { useEffect, useState } from 'react';
import { fetchChurnResults } from '../utils/api';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Churn = () => {
  const [data, setData] = useState({ actual: [], predicted: [] });
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    fetchChurnResults().then((fetchedData) => {
      console.log('Fetched Data:', fetchedData);
      setData(fetchedData);
    });
  }, []);

  const chartData = data.actual.map((value, index) => ({
    name: `User ${index + 1}`,
    Actual: value,
    Predicted: data.predicted[index],
  }));

  console.log('Chart Data:', chartData);

  return (
    <div>
      <h2>Spotify Churn Prediction</h2>
      <button onClick={() => setShowChart(!showChart)}>
        {showChart ? 'Hide Chart' : 'Show Chart'}
      </button>
      {showChart && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <Bar dataKey="Actual" fill="#1f77b4" />
            <Bar dataKey="Predicted" fill="#ff7f0e" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Churn;
