export const chartGridProps = {
  stroke: 'var(--chart-grid)',
  strokeDasharray: '4 4',
  strokeOpacity: 1,
} as const;

export const chartAxisProps = {
  tick: { fill: 'var(--chart-tick)', fontSize: 12 },
  axisLine: { stroke: 'var(--chart-axis)', strokeOpacity: 1 },
  tickLine: { stroke: 'var(--chart-axis)', strokeOpacity: 0.6 },
} as const;

export const chartTooltipProps = {
  cursor: { stroke: 'var(--chart-axis)', strokeDasharray: '4 4', strokeOpacity: 0.4 },
  contentStyle: {
    background: 'var(--chart-tooltip-bg)',
    border: '1px solid var(--chart-border)',
    borderRadius: '12px',
    boxShadow: 'var(--shadow-1)',
    padding: '10px 12px',
  },
  labelStyle: { color: 'var(--chart-muted)', fontWeight: 650 },
  itemStyle: { color: 'var(--chart-text)' },
} as const;
