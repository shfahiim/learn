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
import { jStat } from 'jstat';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';
import { chartAxisProps, chartGridProps, chartTooltipProps } from './charts/rechartsDefaults';

export function BinomialDistribution() {
  const [n, setN] = useState(20);
  const [p, setP] = useState(0.5);
  const gradientId = useId();

  const data = useMemo(() => {
    const points = [];
    for (let x = 0; x <= n; x++) {
      points.push({
        x: x.toString(),
        y: jStat.binomial.pdf(x, n, p),
      });
    }
    return points;
  }, [n, p]);

  return (
    <ChartCard
      title="Binomial Distribution"
      subtitle="Number of successes in n independent trials (each success with probability p)."
    >
      <ChartControls>
        <ChartControl label="Number of Trials (n)" value={n}>
          <input
            type="range"
            className="modern-slider"
            min="1"
            max="100"
            step="1"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
          />
        </ChartControl>
        <ChartControl label="Probability of Success (p)" value={p.toFixed(2)}>
          <input
            type="range"
            className="modern-slider"
            min="0"
            max="1"
            step="0.01"
            value={p}
            onChange={(e) => setP(parseFloat(e.target.value))}
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
            <YAxis {...chartAxisProps} />
            <Tooltip {...chartTooltipProps} />
            <Bar dataKey="y" fill={`url(#${gradientId})`} radius={[10, 10, 8, 8]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}