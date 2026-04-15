import React, { useId, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { jStat } from 'jstat';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';
import { chartAxisProps, chartGridProps, chartTooltipProps } from './charts/rechartsDefaults';

export function ZScoreViz() {
  const [zScore, setZScore] = useState(1);
  const [direction, setDirection] = useState<'less' | 'greater'>('less');
  const gradientId = useId();

  const data = useMemo(() => {
    const points = [];
    for (let x = -4; x <= 4; x += 0.1) {
      points.push({
        x: Number(x.toFixed(1)),
        Density: jStat.normal.pdf(x, 0, 1),
      });
    }
    return points;
  }, []);

  const probability = useMemo(() => {
    const p = jStat.normal.cdf(zScore, 0, 1);
    return direction === 'less' ? p : 1 - p;
  }, [zScore, direction]);

  return (
    <ChartCard
      title="Z-Score Probability"
      subtitle={`P(Z ${direction === 'less' ? '<' : '>'} ${zScore.toFixed(1)}) = ${(probability * 100).toFixed(2)}%`}
    >
      <ChartControls>
        <ChartControl label="Z-Score (z)" value={zScore.toFixed(1)}>
          <input
            type="range"
            className="modern-slider"
            min="-3.5"
            max="3.5"
            step="0.1"
            value={zScore}
            onChange={(e) => setZScore(parseFloat(e.target.value))}
          />
        </ChartControl>

        <ChartControl label="Direction" value={direction === 'less' ? 'Left tail' : 'Right tail'}>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as 'less' | 'greater')}
            className="chart-select"
          >
            <option value="less">Area to the Left (Less Than)</option>
            <option value="greater">Area to the Right (Greater Than)</option>
          </select>
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 12, left: 8, bottom: 6 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-primary)" stopOpacity={0.38} />
                <stop offset="100%" stopColor="var(--chart-primary)" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid {...chartGridProps} />
            <XAxis dataKey="x" type="number" domain={[-4, 4]} tickCount={9} {...chartAxisProps} />
            <YAxis {...chartAxisProps} />
            <Tooltip {...chartTooltipProps} />

            <ReferenceArea
              x1={direction === 'less' ? -4 : zScore}
              x2={direction === 'less' ? zScore : 4}
              fill={`url(#${gradientId})`}
            />
            <Area
              type="monotone"
              dataKey="Density"
              stroke="var(--chart-primary)"
              fill="none"
              strokeWidth={2.75}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}