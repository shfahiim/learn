import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const CurseOfDimensionality = () => {
  // Volume of unit hypersphere vs dimension
  // V_n(R) = (pi^(n/2) / Gamma(n/2 + 1)) * R^n
  const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
  const gamma = (n: number) => factorial(n - 1); // Only for integers, rough approx for visualization

  const data = Array.from({ length: 15 }, (_, i) => {
    const d = i + 1;
    // Simplified volume of unit cube (1^d = 1) vs unit sphere
    // We'll show how the sphere's volume relative to the cube shrinks to zero
    const volSphere = (Math.pow(Math.PI, d / 2) / (d / 2 * (d / 2 - 1) || 1)) * Math.pow(0.5, d); 
    // Wait, let's just use the standard formula for volume of unit hypersphere
    // But for visualization, the "sparsity" is better shown by volume ratio or distance concentration
    return {
      dimension: d,
      ratio: Math.pow(0.5, d), // Ratio of inner cube to outer cube (shrinks exponentially)
    };
  });

  return (
    <div className="my-8">
      <ChartCard title="The Sparsity of High-Dimensional Space" subtitle="Volume of a central 'neighborhood' (e.g., a smaller cube with side 0.5 inside a unit cube) shrinks exponentially as dimensions increase. Data points become incredibly far apart.">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis dataKey="dimension" label={{ value: 'Dimensions (d)', position: 'insideBottom', offset: -5 }} {...chartAxisProps} />
              <YAxis label={{ value: 'Relative Volume', angle: -90, position: 'insideLeft' }} {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Line type="monotone" dataKey="ratio" stroke="#8884d8" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default CurseOfDimensionality;
