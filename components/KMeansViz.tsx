import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const KMeansViz = () => {
  const data = useMemo(() => {
    const points = [];
    // Cluster 1
    for (let i = 0; i < 20; i++) points.push({ x: Math.random() * 3 + 1, y: Math.random() * 3 + 1, id: i });
    // Cluster 2
    for (let i = 0; i < 20; i++) points.push({ x: Math.random() * 3 + 6, y: Math.random() * 3 + 6, id: i + 20 });
    // Cluster 3
    for (let i = 0; i < 20; i++) points.push({ x: Math.random() * 3 + 1, y: Math.random() * 3 + 6, id: i + 40 });
    return points;
  }, []);

  const [centroids, setCentroids] = useState([
    { x: 2, y: 2, color: '#8884d8' },
    { x: 8, y: 8, color: '#82ca9d' },
    { x: 2, y: 8, color: '#ffc658' }
  ]);

  const assignedData = useMemo(() => {
    return data.map(p => {
      let minDist = Infinity;
      let closest = centroids[0];
      centroids.forEach(c => {
        const dist = Math.sqrt(Math.pow(p.x - c.x, 2) + Math.pow(p.y - c.y, 2));
        if (dist < minDist) {
          minDist = dist;
          closest = c;
        }
      });
      return { ...p, color: closest.color };
    });
  }, [centroids, data]);

  return (
    <div className="my-8">
      <ChartCard title="K-Means Clustering" subtitle="K-Means iteratively assigns each data point to the nearest centroid and then re-calculates the centroids based on the mean of all assigned points.">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="x" {...chartAxisProps} />
              <YAxis type="number" dataKey="y" name="y" {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Points" data={assignedData}>
                {assignedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Scatter>
              <Scatter name="Centroids" data={centroids}>
                {centroids.map((entry, index) => (
                  <Cell key={`centroid-${index}`} fill={entry.color} stroke="#000" strokeWidth={2} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default KMeansViz;
