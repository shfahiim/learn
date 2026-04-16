import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const ModelSelectionViz = () => {
  const data = [
    { complexity: 1, trainError: 10, testError: 11 },
    { complexity: 2, trainError: 7, testError: 8.5 },
    { complexity: 3, trainError: 5, testError: 6 },
    { complexity: 4, trainError: 3.5, testError: 4.8 },
    { complexity: 5, trainError: 2.5, testError: 4.2 },
    { complexity: 6, trainError: 1.8, testError: 4.5 },
    { complexity: 7, trainError: 1.2, testError: 5.5 },
    { complexity: 8, trainError: 0.8, testError: 7 },
    { complexity: 9, trainError: 0.5, testError: 9 },
  ];

  return (
    <div className="my-8">
      <ChartCard title="The Model Selection Curve" subtitle="As model complexity increases, training error decreases. However, test error (generalization error) initially decreases then starts to increase once overfitting begins.">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis dataKey="complexity" label={{ value: 'Model Complexity', position: 'insideBottom', offset: -5 }} {...chartAxisProps} />
              <YAxis label={{ value: 'Error', angle: -90, position: 'insideLeft' }} {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Legend />
              <Line name="Training Error" type="monotone" dataKey="trainError" stroke="var(--chart-primary)" strokeWidth={3} dot={{ r: 5 }} />
              <Line name="Test Error (Validation)" type="monotone" dataKey="testError" stroke="var(--chart-success)" strokeWidth={3} dot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default ModelSelectionViz;
