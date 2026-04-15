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

export function MathDescriptionsViz() {
  const [view, setView] = useState<'PDF' | 'CDF'>('PDF');
  const [bound, setBound] = useState(0);
  const gradId = useId();

  const data = useMemo(() => {
    const points: { x: number; Value: number }[] = [];
    for (let x = -4; x <= 4; x += 0.1) {
      points.push({
        x: Number(x.toFixed(1)),
        Value: view === 'PDF' ? jStat.normal.pdf(x, 0, 1) : jStat.normal.cdf(x, 0, 1),
      });
    }
    return points;
  }, [view]);

  const probability = useMemo(() => jStat.normal.cdf(bound, 0, 1), [bound]);

  const subtitle =
    view === 'PDF'
      ? 'PDF: probability is area under the curve.'
      : 'CDF: probability is the y-value at x.';

  return (
    <ChartCard title="Normal distribution: PDF vs CDF" subtitle={subtitle}>
      <div className="chart-button-row">
        <button
          type="button"
          className="chart-button chart-button-primary"
          data-active={view === 'PDF'}
          onClick={() => setView('PDF')}
        >
          Show PDF
        </button>
        <button
          type="button"
          className="chart-button chart-button-primary"
          data-active={view === 'CDF'}
          onClick={() => setView('CDF')}
        >
          Show CDF
        </button>
      </div>

      <div className="chart-kpi">
        <div>
          Probability <span style={{ fontWeight: 750 }}>P(X ≤ {bound.toFixed(1)})</span>
        </div>
        <div className="chart-kpi-value" style={{ color: 'var(--chart-primary)' }}>
          {(probability * 100).toFixed(2)}%
        </div>
        <div className="chart-kpi-muted">
          {view === 'PDF'
            ? 'In a PDF, this is the shaded area up to x.'
            : 'In a CDF, this is the curve’s height at x.'}
        </div>
      </div>

      <ChartControls>
        <ChartControl label="Upper bound (x)" value={bound.toFixed(1)} hint="Drag to move the cutoff.">
          <input
            type="range"
            className="modern-slider"
            min={-4}
            max={4}
            step={0.1}
            value={bound}
            onChange={(e) => setBound(parseFloat(e.target.value))}
          />
        </ChartControl>
      </ChartControls>

      <div className="chart-canvas">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 12, right: 16, left: 8, bottom: 8 }}>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--chart-primary)" stopOpacity={0.26} />
                <stop offset="80%" stopColor="var(--chart-primary)" stopOpacity={0.04} />
                <stop offset="100%" stopColor="var(--chart-primary)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid {...chartGridProps} />
            <XAxis {...chartAxisProps} dataKey="x" type="number" domain={[-4, 4]} tickCount={9} />
            <YAxis {...chartAxisProps} domain={[0, view === 'PDF' ? 0.45 : 1.1]} tickCount={6} />
            <Tooltip {...chartTooltipProps} />

            {view === 'PDF' ? (
              <ReferenceArea x1={-4} x2={bound} fill="var(--chart-primary)" fillOpacity={0.14} />
            ) : null}

            <Area
              type="monotone"
              dataKey="Value"
              stroke="var(--chart-primary)"
              fill={`url(#${gradId})`}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
}
