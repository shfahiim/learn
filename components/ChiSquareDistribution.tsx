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

export function ChiSquareDistribution() {
  const [k, setK] = useState(3);
  const gradientId = useId();

  const data = useMemo(() => {
    const points = [];
    for (let x = 0.1; x <= 20; x += 0.2) {
      points.push({
        x: Number(x.toFixed(1)),
        Density: jStat.chisquare.pdf(x, k),
      });
    }
    return points;
  }, [k]);

  return (
    <ChartCard
      title="Chi-Square Distribution"
      subtitle="Common in variance and goodness-of-fit tests. Adjust k (degrees of freedom)."
    >
      <ChartControls>
        <ChartControl label="Degrees of Freedom (k)" value={k}>
          <input
            type="range"
            className="modern-slider"
            min="1"
            max="15"
            step="1"
            value={k}
            onChange={(e) => setK(parseInt(e.target.value))}
          />
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 12, left: 8, bottom: 6 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-secondary)" stopOpacity={0.35} />
                <stop offset="70%" stopColor="var(--chart-secondary)" stopOpacity={0.08} />
                <stop offset="100%" stopColor="var(--chart-secondary)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid {...chartGridProps} />
            <XAxis dataKey="x" type="number" domain={[0, 20]} tickCount={11} {...chartAxisProps} />
            <YAxis {...chartAxisProps} />
            <Tooltip {...chartTooltipProps} />

            <Area
              type="monotone"
              dataKey="Density"
              stroke="var(--chart-secondary)"
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