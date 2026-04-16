import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const generateData = () => {
  const data = [];
  const testData = [];
  for (let x = 1; x <= 10; x++) {
    const y = 2 * x + 5 + (Math.random() - 0.5) * 6;
    data.push({ x, y });
  }
  for (let x = 1.5; x < 10; x += 2) {
    const y = 2 * x + 5 + (Math.random() - 0.5) * 6;
    testData.push({ x, y });
  }
  return { data, testData };
};

const OverfittingViz = () => {
  const { data, testData } = useMemo(() => generateData(), []);

  // Underfitting: Horizontal line (y = mean)
  const meanY = data.reduce((acc, curr) => acc + curr.y, 0) / data.length;
  const underfit = data.map(p => ({ x: p.x, y: meanY }));

  // Good fit: Linear regression
  const goodFit = useMemo(() => {
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    data.forEach(p => {
      sumX += p.x; sumY += p.y; sumXY += p.x * p.y; sumXX += p.x * p.x;
    });
    const m = (data.length * sumXY - sumX * sumY) / (data.length * sumXX - sumX * sumX);
    const c = (sumY - m * sumX) / data.length;
    return Array.from({ length: 11 }, (_, i) => ({ x: i, y: m * i + c }));
  }, [data]);

  // Overfitting: Interpolating line (very wiggly)
  const overfit = useMemo(() => {
    const sorted = [...data].sort((a, b) => a.x - b.x);
    const result = [];
    for (let i = 0; i < sorted.length - 1; i++) {
      const p1 = sorted[i];
      const p2 = sorted[i+1];
      // Add midpoints to make it "wiggly"
      result.push(p1);
      result.push({ x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 + (Math.random() - 0.5) * 5 });
    }
    result.push(sorted[sorted.length - 1]);
    return result;
  }, [data]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
      <ChartCard title="Underfitting (High Bias)" subtitle="Model is too simple to capture the underlying trend.">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="x" hide {...chartAxisProps} />
              <YAxis type="number" dataKey="y" name="y" hide {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Data" data={data} fill="var(--chart-primary)" />
              <Line data={underfit} type="monotone" dataKey="y" stroke="var(--chart-secondary)" strokeWidth={2} dot={false} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Balanced (Good Fit)" subtitle="Model captures the general trend without being distracted by noise.">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="x" hide {...chartAxisProps} />
              <YAxis type="number" dataKey="y" name="y" hide {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Data" data={data} fill="var(--chart-primary)" />
              <Line data={goodFit} type="monotone" dataKey="y" stroke="var(--chart-success)" strokeWidth={2} dot={false} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Overfitting (High Variance)" subtitle="Model fits the training noise perfectly but misses the true trend.">
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="x" hide {...chartAxisProps} />
              <YAxis type="number" dataKey="y" name="y" hide {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Data" data={data} fill="var(--chart-primary)" />
              <Line data={overfit} type="monotone" dataKey="y" stroke="var(--chart-danger)" strokeWidth={2} dot={false} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default OverfittingViz;
