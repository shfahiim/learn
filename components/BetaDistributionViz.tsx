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

export function BetaDistributionViz() {
  const [alpha, setAlpha] = useState(2);
  const [beta, setBeta] = useState(2);
  const gradientId = useId();

  const data = useMemo(() => {
    const points = [];
    for (let x = 0; x <= 1; x += 0.01) {
      let safeX = x;
      if (safeX === 0) safeX = 0.001;
      if (safeX === 1) safeX = 0.999;

      points.push({
        Probability: Number(x.toFixed(2)),
        Belief: jStat.beta.pdf(safeX, alpha, beta),
      });
    }
    return points;
  }, [alpha, beta]);

  return (
    <ChartCard
      title="Beta Distribution (Bayesian Prior)"
      subtitle="α acts like prior successes, β like prior failures."
    >
      <ChartControls>
        <ChartControl label="Alpha (α)" value={alpha.toFixed(1)} hint="Prior ‘successes’">
          <input
            type="range"
            className="modern-slider"
            min="0.5"
            max="20"
            step="0.5"
            value={alpha}
            onChange={(e) => setAlpha(parseFloat(e.target.value))}
          />
        </ChartControl>
        <ChartControl label="Beta (β)" value={beta.toFixed(1)} hint="Prior ‘failures’">
          <input
            type="range"
            className="modern-slider"
            min="0.5"
            max="20"
            step="0.5"
            value={beta}
            onChange={(e) => setBeta(parseFloat(e.target.value))}
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
            <XAxis
              dataKey="Probability"
              type="number"
              domain={[0, 1]}
              tickCount={11}
              {...chartAxisProps}
            />
            <YAxis {...chartAxisProps} />
            <Tooltip {...chartTooltipProps} />

            <Area
              type="monotone"
              dataKey="Belief"
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