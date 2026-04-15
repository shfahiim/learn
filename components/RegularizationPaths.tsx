import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const RegularizationPaths = () => {
  // Mock coefficients shrinkage paths
  const generatePaths = () => {
    const data = [];
    for (let lambda = 0; lambda <= 10; lambda += 0.5) {
      data.push({
        lambda,
        w1: 5 * Math.exp(-0.3 * lambda),
        w2: -3 * Math.exp(-0.5 * lambda),
        w3: 2 * Math.exp(-0.2 * lambda),
        w4: -4 * Math.max(0, 1 - 0.15 * lambda), // Lasso-like linear shrinkage to zero
      });
    }
    return data;
  };

  const data = generatePaths();

  return (
    <div className="my-8">
      <ChartCard title="Coefficient Shrinkage (Ridge/Lasso)" subtitle="As the regularization penalty (lambda) increases, the magnitude of the model's coefficients (w) shrinks towards zero. This prevents the model from relying too heavily on any single feature, thus reducing overfitting.">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis dataKey="lambda" label={{ value: 'Regularization strength (λ)', position: 'insideBottom', offset: -5 }} {...chartAxisProps} />
              <YAxis label={{ value: 'Weight Value (w)', angle: -90, position: 'insideLeft' }} {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Legend />
              <Line type="monotone" dataKey="w1" stroke="#8884d8" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="w2" stroke="#82ca9d" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="w3" stroke="#ffc658" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="w4" stroke="#ff7300" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default RegularizationPaths;
