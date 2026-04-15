import React, { useMemo, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, Cell } from 'recharts';
import { chartGridProps, chartAxisProps, chartTooltipProps } from './charts/rechartsDefaults';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';

const MLELeastSquares = () => {
  const [noise, setNoise] = useState(2.0);
  const [slope, setSlope] = useState(1.5);

  // Generate data with adjustable noise
  const data = useMemo(() => {
    const points = [];
    // Fixed seed-like randomness for smoother transitions
    const randomOffsets = [0.1, -0.5, 0.8, -0.2, 0.4, -0.9, 0.3, -0.1, 0.6, -0.4];
    for (let x = 1; x <= 10; x++) {
      const y = slope * x + 5 + randomOffsets[x-1] * noise;
      points.push({ x, y });
    }
    return points;
  }, [noise, slope]);

  // Calculate OLS fit
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

  const residuals = data.map(p => ({
    x: p.x,
    y: p.y,
    yExpected: m * p.x + c,
  }));

  return (
    <div className="my-8">
      <ChartCard 
        title="Interactive Least Squares Fit" 
        subtitle="Ordinary Least Squares (OLS) minimizes the squared sum of residuals (red dashed lines). Adjust the noise to see how it affects the fit's confidence."
      >
        <ChartControls>
          <ChartControl label="True Slope" value={slope.toFixed(1)} hint="The underlying pattern">
            <input
              type="range"
              className="modern-slider"
              min="0"
              max="4"
              step="0.1"
              value={slope}
              onChange={(e) => setSlope(parseFloat(e.target.value))}
            />
          </ChartControl>
          <ChartControl label="Gaussian Noise Level" value={noise.toFixed(1)} hint="Randomness in the data">
            <input
              type="range"
              className="modern-slider"
              min="0"
              max="10"
              step="0.5"
              value={noise}
              onChange={(e) => setNoise(parseFloat(e.target.value))}
            />
          </ChartControl>
        </ChartControls>

        <div className="h-[400px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
              <CartesianGrid {...chartGridProps} />
              <XAxis type="number" dataKey="x" name="x" domain={[0, 11]} {...chartAxisProps} />
              <YAxis type="number" dataKey="y" name="y" domain={[0, 25]} {...chartAxisProps} />
              <Tooltip {...chartTooltipProps} />
              <Scatter name="Data Points" data={data} fill="var(--chart-primary)" />
              
              <Line 
                data={lineData} 
                type="monotone" 
                dataKey="y" 
                stroke="var(--chart-success)" 
                strokeWidth={4} 
                dot={false}
                animationDuration={200}
              />
              
              {residuals.map((r, i) => (
                <Line
                  key={`res-${i}`}
                  data={[{ x: r.x, y: r.y }, { x: r.x, y: r.yExpected }]}
                  type="linear"
                  dataKey="y"
                  stroke="var(--chart-error)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              ))}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="p-3 bg-green-50 rounded border border-green-100 text-xs text-green-800">
            <strong>MLE Fit Result:</strong> y = {m.toFixed(2)}x + {c.toFixed(2)}
          </div>
          <div className="p-3 bg-red-50 rounded border border-red-100 text-xs text-red-800">
             <strong>Residuals:</strong> Minimizing the total sum of the {residuals.length} red lines.
          </div>
        </div>
      </ChartCard>
    </div>
  );
};

export default MLELeastSquares;
