import React, { useId, useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ReferenceArea,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartCard, ChartControl, ChartControls } from './charts/ChartCard';
import { chartAxisProps, chartGridProps, chartTooltipProps } from './charts/rechartsDefaults';

export function ChebyshevTheorem() {
  const [k, setK] = useState(2);
  const gradId = useId();

  const minPercent = useMemo(() => (1 - 1 / (k * k)) * 100, [k]);

  // Mock bimodal (non-normal) distribution to demonstrate the guarantee.
  const data = useMemo(() => {
    const points: { x: string; Density: number }[] = [];
    for (let i = -5; i <= 5; i += 0.5) {
      let height = 10;
      if (i < -3 || i > 3) height = 2;
      if (i === -2 || i === 2) height = 40;
      if (i > -1 && i < 1) height = 5;
      points.push({ x: i.toFixed(1), Density: height });
    }
    return points;
  }, []);

  return (
    <ChartCard title="Chebyshev’s inequality" subtitle="A distribution-free bound: a guaranteed minimum fraction lies within k standard deviations.">
      <div className="chart-kpi">
        <div className="chart-kpi-muted">Guaranteed minimum within ±{k.toFixed(1)}σ</div>
        <div className="chart-kpi-value" style={{ color: 'var(--chart-secondary)' }}>
          {minPercent.toFixed(1)}%
        </div>
        <div className="chart-kpi-muted">The shaded band shows the ±kσ region.</div>
      </div>

      <ChartControls>
        <ChartControl label="Standard deviations (k)" value={k.toFixed(1)} hint="Chebyshev: ≥ 1 - 1/k²">
          <input
            type="range"
            className="modern-slider"
            min={1.1}
            max={5}
            step={0.1}
            value={k}
            onChange={(e) => setK(parseFloat(e.target.value))}
            style={{ ['--slider-accent' as any]: 'var(--chart-secondary)' } as React.CSSProperties}
          />
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 16, left: 8, bottom: 8 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-primary)" stopOpacity={0.9} />
                <stop offset="100%" stopColor="var(--chart-primary)" stopOpacity={0.45} />
              </linearGradient>
            </defs>

            <CartesianGrid {...chartGridProps} />
            <XAxis {...chartAxisProps} dataKey="x" />
            <YAxis {...chartAxisProps} />
            <Tooltip {...chartTooltipProps} />

            <ReferenceArea x1={(-k).toFixed(1)} x2={k.toFixed(1)} fill="var(--chart-secondary)" fillOpacity={0.14} />
            <Bar dataKey="Density" fill={`url(#${gradId})`} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
