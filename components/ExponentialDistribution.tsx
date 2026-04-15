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
import { jStat } from 'jstat';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';
import { chartAxisProps, chartGridProps, chartTooltipProps } from './charts/rechartsDefaults';

export function ExponentialDistribution() {
  const [lambda, setLambda] = useState(1);
  const gradientId = useId();

  const data = useMemo(() => {
    const points = [];
    for (let x = 0; x <= 5; x += 0.1) {
      points.push({
        x: Number(x.toFixed(1)),
        Density: jStat.exponential.pdf(x, lambda),
      });
    }
    return points;
  }, [lambda]);

  return (
    <ChartCard
      title="Exponential Distribution"
      subtitle="Adjust λ (rate). Higher λ concentrates probability near 0."
    >
      <ChartControls>
        <ChartControl label="Rate Parameter (λ)" value={lambda.toFixed(1)}>
          <input
            type="range"
            className="modern-slider"
            min="0.1"
            max="5"
            step="0.1"
            value={lambda}
            onChange={(e) => setLambda(parseFloat(e.target.value))}
          />
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 12, left: 8, bottom: 6 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-primary)" stopOpacity={0.35} />
                <stop offset="70%" stopColor="var(--chart-primary)" stopOpacity={0.08} />
                <stop offset="100%" stopColor="var(--chart-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid {...chartGridProps} />
            <XAxis dataKey="x" type="number" domain={[0, 5]} tickCount={6} {...chartAxisProps} />
            <YAxis {...chartAxisProps} />
            <Tooltip {...chartTooltipProps} />

            <Area
              type="monotone"
              dataKey="Density"
              stroke="var(--chart-primary)"
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              fillOpacity={1}
              dot={false}
              activeDot={{ r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}