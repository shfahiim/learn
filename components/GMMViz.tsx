import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ZAxis } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const GMMViz = () => {
  const data = useMemo(() => {
    const points = [];
    // Cluster 1 (Probabilistic)
    for (let i = 0; i < 30; i++) {
      const x = 3 + (Math.random() - 0.5) * 4;
      const y = 3 + (Math.random() - 0.5) * 4;
      // Probability of belonging to Cluster 1 vs Cluster 2
      const dist1 = Math.sqrt(Math.pow(x-3, 2) + Math.pow(y-3, 2));
      const dist2 = Math.sqrt(Math.pow(x-7, 2) + Math.pow(y-7, 2));
      const p1 = 1 / (1 + Math.exp(dist1 - dist2));
      points.push({ x, y, p1, p2: 1-p1 });
    }
    // Cluster 2
    for (let i = 0; i < 30; i++) {
      const x = 7 + (Math.random() - 0.5) * 4;
      const y = 7 + (Math.random() - 0.5) * 4;
      const dist1 = Math.sqrt(Math.pow(x-3, 2) + Math.pow(y-3, 2));
      const dist2 = Math.sqrt(Math.pow(x-7, 2) + Math.pow(y-7, 2));
      const p1 = 1 / (1 + Math.exp(dist1 - dist2));
      points.push({ x, y, p1, p2: 1-p1 });
    }
    return points;
  }, []);

  return (
    <div className="my-8">
      <ChartCard title="Gaussian Mixture Models (Soft Assignment)" subtitle="Unlike K-Means, GMMs provide a probability distribution over clusters. Opacity here represents 'certainty' of cluster membership.">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" {...chartAxisProps} />
              <YAxis type="number" dataKey="y" {...chartAxisProps} />
              <ZAxis type="number" dataKey="p1" range={[0, 1]} />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Points" data={data}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.p1 > 0.5 ? '#8884d8' : '#82ca9d'} 
                    fillOpacity={Math.max(entry.p1, entry.p2)} 
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default GMMViz;
