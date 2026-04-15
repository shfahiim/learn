import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const LogisticRegressionViz = () => {
  const data = useMemo(() => {
    const results = [];
    for (let z = -6; z <= 6; z += 0.2) {
      // Sigmoid function: sigma(z) = 1 / (1 + exp(-z))
      const p = 1 / (1 + Math.exp(-z));
      results.push({ z, p });
    }
    return results;
  }, []);

  return (
    <div className="my-8">
      <ChartCard title="The Sigmoid (Logistic) Function" subtitle="Logistic regression uses the sigmoid function to map any real-valued input (z) to a probability between 0 and 1. This represents the posterior probability p(C1 | x).">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis dataKey="z" label={{ value: 'Linear Predictor (z)', position: 'insideBottom', offset: -5 }} {...chartAxisProps} />
              <YAxis label={{ value: 'Probability (p)', angle: -90, position: 'insideLeft' }} {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Area type="monotone" dataKey="p" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default LogisticRegressionViz;
