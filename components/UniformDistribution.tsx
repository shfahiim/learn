import React, { useId, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';
import { chartAxisProps, chartGridProps, chartTooltipProps } from './charts/rechartsDefaults';

export function UniformDistribution() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(5);
  const gradientId = useId();

  const data = useMemo(() => {
    const points = [];
    const minVal = a;
    const maxVal = b;

    for (let x = 0; x < minVal; x += 0.5) {
      points.push({ x: Number(x.toFixed(1)), Density: 0 });
    }

    const height = 1 / (maxVal - minVal);
    points.push({ x: minVal, Density: height });
    for (let x = minVal + 0.5; x < maxVal; x += 0.5) {
      points.push({ x: Number(x.toFixed(1)), Density: height });
    }
    points.push({ x: maxVal, Density: height });

    for (let x = maxVal + 0.5; x <= 10; x += 0.5) {
      points.push({ x: Number(x.toFixed(1)), Density: 0 });
    }

    return points;
  }, [a, b]);

  return (
    <ChartCard
      title="Continuous Uniform Distribution"
      subtitle="A flat density on [a, b] (all values equally likely)."
    >
      <ChartControls>
        <ChartControl label="Minimum (a)" value={a}>
          <input
            type="range"
            className="modern-slider"
            min="0"
            max="9"
            step="1"
            value={a}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setA(Math.min(val, b - 1));
            }}
          />
        </ChartControl>
        <ChartControl label="Maximum (b)" value={b}>
          <input
            type="range"
            className="modern-slider"
            min="1"
            max="10"
            step="1"
            value={b}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setB(Math.max(val, a + 1));
            }}
          />
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 12, left: 8, bottom: 6 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-primary)" stopOpacity={0.28} />
                <stop offset="100%" stopColor="var(--chart-primary)" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid {...chartGridProps} />
            <XAxis dataKey="x" type="number" domain={[0, 10]} tickCount={11} {...chartAxisProps} />
            <YAxis domain={[0, 1]} {...chartAxisProps} />
            <Tooltip {...chartTooltipProps} />

            <Area
              type="stepAfter"
              dataKey="Density"
              stroke="var(--chart-primary)"
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              fillOpacity={1}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}