import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Area, ComposedChart } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const BayesianRegressionViz = () => {
  const data = useMemo(() => [
    { x: 1, y: 7 },
    { x: 2, y: 9.5 },
    { x: 3, y: 11 },
    { x: 4, y: 14 },
    { x: 5, y: 15 },
    // Notice the data points are clustered in one region
  ], []);

  const predictiveData = useMemo(() => {
    const results = [];
    for (let x = 0; x <= 10; x += 0.5) {
      const mean = 2 * x + 5;
      // Bayesian uncertainty increases away from data points (x=1 to x=5)
      const distanceToData = Math.min(Math.abs(x - 1), Math.abs(x - 5));
      const uncertainty = x < 1 || x > 5 ? 0.5 + 0.3 * Math.pow(x - (x < 1 ? 1 : 5), 2) : 0.5;
      
      results.push({
        x,
        mean,
        upper: mean + uncertainty,
        lower: mean - uncertainty,
      });
    }
    return results;
  }, []);

  return (
    <div className="my-8">
      <ChartCard title="Bayesian Predictive Uncertainty" subtitle="Unlike OLS, which gives a single point estimate, Bayesian regression provides a full predictive distribution. Notice how uncertainty (shaded area) increases as we move away from the training data (x=1 to x=5).">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={predictiveData} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="x" {...chartAxisProps} />
              <YAxis type="number" name="y" {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Area dataKey={d => [d.lower, d.upper]} stroke="none" fill="var(--chart-primary)" fillOpacity={0.2} />
              <Line type="monotone" dataKey="mean" stroke="var(--chart-primary)" strokeWidth={3} dot={false} />
              <Scatter name="Data" data={data} fill="#ff4d4f" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default BayesianRegressionViz;
