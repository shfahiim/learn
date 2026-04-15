import React, { useId, useMemo, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { jStat } from 'jstat';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';
import { chartAxisProps, chartGridProps, chartTooltipProps } from './charts/rechartsDefaults';

export function SkewnessViz() {
  const [shape, setShape] = useState(2);
  const gradId = useId();

  const data = useMemo(() => {
    const points: { x: number; Density: number }[] = [];
    const alpha = shape;
    const betaParam = 10 - shape;

    for (let x = 0; x <= 1; x += 0.01) {
      let safeX = x;
      if (safeX === 0) safeX = 0.001;
      if (safeX === 1) safeX = 0.999;

      points.push({ x: Number(x.toFixed(2)), Density: jStat.beta.pdf(safeX, alpha, betaParam) });
    }

    const mean = alpha / (alpha + betaParam);
    const median = (alpha - 1 / 3) / (alpha + betaParam - 2 / 3);

    return { points, mean, median, alpha, beta: betaParam };
  }, [shape]);

  const skewType =
    data.alpha > data.beta
      ? 'Negative (left) skew'
      : data.alpha < data.beta
        ? 'Positive (right) skew'
        : 'Symmetric (zero) skew';

  const color =
    data.alpha > data.beta
      ? 'var(--chart-secondary)'
      : data.alpha < data.beta
        ? 'var(--chart-success)'
        : 'var(--chart-primary)';

  return (
    <ChartCard title="Skewness: mean vs median" subtitle="Drag the slider to skew a Beta distribution and compare mean vs median.">
      <div className="chart-kpi">
        <div style={{ fontWeight: 750, color }}>{skewType}</div>
        <div className="chart-kpi-muted">
          Mean <span style={{ color: 'var(--chart-danger)', fontWeight: 750 }}>{data.mean.toFixed(2)}</span> • Median{' '}
          <span style={{ color: 'var(--chart-primary)', fontWeight: 750 }}>{data.median.toFixed(2)}</span>
        </div>
      </div>

      <ChartControls>
        <ChartControl label="Skew control" value={shape.toFixed(1)} hint="Right-skew → symmetric → left-skew">
          <input
            type="range"
            className="modern-slider"
            min={1.5}
            max={8.5}
            step={0.1}
            value={shape}
            onChange={(e) => setShape(parseFloat(e.target.value))}
            style={{ ['--slider-accent' as any]: color } as React.CSSProperties}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.8rem',
              color: 'var(--chart-muted)',
              marginTop: '0.5rem',
            }}
          >
            <span>Right</span>
            <span>Symmetric</span>
            <span>Left</span>
          </div>
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.points} margin={{ top: 12, right: 16, left: 8, bottom: 8 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.22} />
                <stop offset="85%" stopColor={color} stopOpacity={0.04} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid {...chartGridProps} />
            <XAxis {...chartAxisProps} dataKey="x" type="number" domain={[0, 1]} tickCount={11} />
            <YAxis {...chartAxisProps} />
            <Tooltip {...chartTooltipProps} />

            <Area type="monotone" dataKey="Density" stroke={color} fill={`url(#${gradId})`} strokeWidth={2.5} dot={false} />

            <ReferenceLine
              x={data.mean}
              stroke="var(--chart-danger)"
              strokeWidth={2}
              label={{ value: 'Mean', position: 'top', fill: 'var(--chart-danger)', fontSize: 12 }}
            />
            <ReferenceLine
              x={data.median}
              stroke="var(--chart-primary)"
              strokeDasharray="4 4"
              strokeWidth={2}
              label={{ value: 'Median', position: 'insideTopLeft', fill: 'var(--chart-primary)', fontSize: 12 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
