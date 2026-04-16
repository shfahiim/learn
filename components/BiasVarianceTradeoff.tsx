import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const BiasVarianceTradeoff = () => {
  const data = [
    { complexity: 1, biasSq: 10, variance: 0.5, total: 11, noise: 0.5 },
    { complexity: 2, biasSq: 6.5, variance: 1, total: 8, noise: 0.5 },
    { complexity: 3, biasSq: 4.5, variance: 1.8, total: 6.8, noise: 0.5 },
    { complexity: 4, biasSq: 3, variance: 2.8, total: 6.3, noise: 0.5 },
    { complexity: 5, biasSq: 2, variance: 4.2, total: 6.7, noise: 0.5 },
    { complexity: 6, biasSq: 1.3, variance: 6.5, total: 8.3, noise: 0.5 },
    { complexity: 7, biasSq: 0.8, variance: 9, total: 10.3, noise: 0.5 },
  ];

  return (
    <div className="my-8">
      <ChartCard title="The Bias-Variance Tradeoff" subtitle="Total expected test error = (Bias)^2 + Variance + Irreducible Noise. As complexity increases, bias decreases but variance increases. The goal is to find the 'Sweet Spot' at the minimum of the Total Error curve.">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis dataKey="complexity" label={{ value: 'Model Complexity', position: 'insideBottom', offset: -5 }} {...chartAxisProps} />
              <YAxis label={{ value: 'Error', angle: -90, position: 'insideLeft' }} {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Legend />
              <Line name="Total Error" type="monotone" dataKey="total" stroke="var(--chart-danger)" strokeWidth={4} dot={{ r: 6 }} />
              <Line name="Bias^2 (Underfitting)" type="monotone" dataKey="biasSq" stroke="var(--chart-primary)" strokeWidth={3} strokeDasharray="5 5" dot={false} />
              <Line name="Variance (Overfitting)" type="monotone" dataKey="variance" stroke="var(--chart-success)" strokeWidth={3} strokeDasharray="5 5" dot={false} />
              <Line name="Irreducible Noise" type="monotone" dataKey="noise" stroke="#666" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default BiasVarianceTradeoff;
