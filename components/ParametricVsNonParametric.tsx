import React, { useState, useMemo } from 'react';
import { LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceArea, AreaChart, Area } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const generateData = () => {
  const data = [];
  for (let x = 0; x <= 10; x += 0.5) {
    const y = Math.sin(x * 0.5) * 5 + 5 + (Math.random() - 0.5) * 2;
    data.push({ x, y });
  }
  return data;
};

const ParametricVsNonParametric = () => {
  const data = useMemo(() => generateData(), []);
  
  // Parametric: Simple linear fit
  const parametricFit = useMemo(() => {
    // Basic linear regression: y = mx + c
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    data.forEach(p => {
      sumX += p.x; sumY += p.y; sumXY += p.x * p.y; sumXX += p.x * p.x;
    });
    const m = (data.length * sumXY - sumX * sumY) / (data.length * sumXX - sumX * sumX);
    const c = (sumY - m * sumX) / data.length;
    
    return data.map(p => ({ x: p.x, y: m * p.x + c }));
  }, [data]);

  // Non-parametric: Moving average (k-NN like)
  const nonParametricFit = useMemo(() => {
    return data.map((p, i) => {
      const window = data.slice(Math.max(0, i - 1), Math.min(data.length, i + 2));
      const avgY = window.reduce((acc, curr) => acc + curr.y, 0) / window.length;
      return { x: p.x, y: avgY };
    });
  }, [data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
      <ChartCard title="Parametric (Linear Fit)" subtitle="Assumes a fixed functional form (e.g., straight line). Fast but potentially biased.">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="x" {...chartAxisProps} />
              <YAxis type="number" dataKey="y" name="y" {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Data" data={data} fill="#8884d8" />
              <Line data={parametricFit} type="monotone" dataKey="y" stroke="#ff7300" strokeWidth={3} dot={false} activeDot={false} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Non-Parametric (Flexible Fit)" subtitle="Adjusts complexity to the data. Captures complex patterns but risks overfitting.">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="x" {...chartAxisProps} />
              <YAxis type="number" dataKey="y" name="y" {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Data" data={data} fill="#8884d8" />
              <Line data={nonParametricFit} type="monotone" dataKey="y" stroke="#82ca9d" strokeWidth={3} dot={false} activeDot={false} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default ParametricVsNonParametric;
