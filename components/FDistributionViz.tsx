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

export function FDistributionViz() {
  const [d1, setD1] = useState(5);
  const [d2, setD2] = useState(10);
  const gradientId = useId();

  const data = useMemo(() => {
    const points = [];
    for (let x = 0.05; x <= 5; x += 0.05) {
      points.push({
        x: Number(x.toFixed(2)),
        Density: jStat.centralF.pdf(x, d1, d2),
      });
    }
    return points;
  }, [d1, d2]);

  return (
    <ChartCard
      title="F-Distribution (ANOVA)"
      subtitle="The shape depends on the ratio of two degrees of freedom (d₁ and d₂)."
    >
      <ChartControls>
        <ChartControl label="Numerator DF (d₁)" value={d1} hint="Between-group variance">
          <input
            type="range"
            className="modern-slider"
            min="1"
            max="50"
            step="1"
            value={d1}
            onChange={(e) => setD1(parseInt(e.target.value))}
          />
        </ChartControl>
        <ChartControl label="Denominator DF (d₂)" value={d2} hint="Within-group variance (error)">
          <input
            type="range"
            className="modern-slider"
            min="1"
            max="50"
            step="1"
            value={d2}
            onChange={(e) => setD2(parseInt(e.target.value))}
          />
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 12, left: 8, bottom: 6 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-primary)" stopOpacity={0.32} />
                <stop offset="100%" stopColor="var(--chart-primary)" stopOpacity={0.02} />
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
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}