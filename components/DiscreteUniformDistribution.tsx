import React, { useId, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';
import { chartAxisProps, chartGridProps, chartTooltipProps } from './charts/rechartsDefaults';

export function DiscreteUniformDistribution() {
  const [minVal, setMinVal] = useState(1);
  const [maxVal, setMaxVal] = useState(6);
  const gradientId = useId();

  const data = useMemo(() => {
    const points = [];
    const a = minVal;
    const b = maxVal;
    const n = b - a + 1;
    const prob = 1 / n;

    for (let x = a; x <= b; x++) {
      points.push({
        x: x.toString(),
        Probability: prob,
      });
    }
    return points;
  }, [minVal, maxVal]);

  return (
    <ChartCard
      title="Discrete Uniform Distribution"
      subtitle="Each integer outcome in [a, b] has the same probability."
    >
      <ChartControls>
        <ChartControl label="Minimum (a)" value={minVal}>
          <input
            type="range"
            className="modern-slider"
            min="0"
            max="19"
            step="1"
            value={minVal}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setMinVal(Math.min(val, maxVal));
            }}
          />
        </ChartControl>
        <ChartControl label="Maximum (b)" value={maxVal}>
          <input
            type="range"
            className="modern-slider"
            min="1"
            max="20"
            step="1"
            value={maxVal}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setMaxVal(Math.max(val, minVal));
            }}
          />
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 12, left: 8, bottom: 6 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-primary)" stopOpacity={0.95} />
                <stop offset="100%" stopColor="var(--chart-primary)" stopOpacity={0.55} />
              </linearGradient>
            </defs>

            <CartesianGrid {...chartGridProps} />
            <XAxis dataKey="x" {...chartAxisProps} />
            <YAxis domain={[0, 1]} {...chartAxisProps} />
            <Tooltip {...chartTooltipProps} />
            <Bar dataKey="Probability" fill={`url(#${gradientId})`} radius={[10, 10, 8, 8]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}