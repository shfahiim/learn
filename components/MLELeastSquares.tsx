import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Cell } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard } from './charts/ChartCard';

const MLELeastSquares = () => {
  const data = useMemo(() => {
    const points = [];
    for (let x = 1; x <= 10; x++) {
      const y = 2 * x + 5 + (Math.random() - 0.5) * 4;
      points.push({ x, y });
    }
    return points;
  }, []);

  const { m, c, lineData } = useMemo(() => {
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    data.forEach(p => {
      sumX += p.x; sumY += p.y; sumXY += p.x * p.y; sumXX += p.x * p.x;
    });
    const m = (data.length * sumXY - sumX * sumY) / (data.length * sumXX - sumX * sumX);
    const c = (sumY - m * sumX) / data.length;
    const lineData = Array.from({ length: 11 }, (_, i) => ({ x: i, y: m * i + c }));
    return { m, c, lineData };
  }, [data]);

  // Residuals
  const residuals = data.map(p => ({
    x: p.x,
    y: p.y,
    yExpected: m * p.x + c,
    residual: p.y - (m * p.x + c)
  }));

  return (
    <div className="my-8">
      <ChartCard title="Ordinary Least Squares (OLS) Fit" subtitle="The line is chosen to minimize the sum of squared distances (vertical lines) between the data points and the line.">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="x" {...chartAxisProps} />
              <YAxis type="number" dataKey="y" name="y" {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Data" data={data} fill="#8884d8" />
              <Line data={lineData} type="monotone" dataKey="y" stroke="#82ca9d" strokeWidth={3} dot={false} />
              {/* Vertical lines for residuals */}
              {residuals.map((r, i) => (
                <Line
                  key={`res-${i}`}
                  data={[{ x: r.x, y: r.y }, { x: r.x, y: r.yExpected }]}
                  type="linear"
                  dataKey="y"
                  stroke="#ff4d4f"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={false}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
};

export default MLELeastSquares;
