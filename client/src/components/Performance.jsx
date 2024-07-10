import React, { useEffect, useState } from 'react';
import { fetchPerformanceResults } from '../utils/api';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Performance = () => {
  const [data, setData] = useState({ actual: [], predicted: [] });
  const [showChart, setShowChart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPerformanceResults()
      .then((results) => {
        setData(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching performance results:', err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const chartData = data.actual.map((value, index) => ({
    name: `User ${index + 1}`,
    Actual: value,
    Predicted: data.predicted[index],
  }));

  return (
    <div>
      <h2>Twitter Performance Prediction</h2>
      <button onClick={() => setShowChart(!showChart)}>
        {showChart ? 'Hide Chart' : 'Show Chart'}
      </button>
      {showChart && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <Line type="monotone" dataKey="Actual" stroke="#1f77b4" />
            <Line type="monotone" dataKey="Predicted" stroke="#ff7f0e" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Performance;
