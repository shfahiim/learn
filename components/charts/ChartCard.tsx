import React from 'react';

export function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="chart-card">
      <div className="chart-card-inner">
        <h3 className="chart-title">{title}</h3>
        {subtitle ? <p className="chart-subtitle">{subtitle}</p> : null}
        {children}
      </div>
    </section>
  );
}

export function ChartControls({ children }: { children: React.ReactNode }) {
  return <div className="chart-controls">{children}</div>;
}

export function ChartControl({
  label,
  value,
  hint,
  children,
}: {
  label: string;
  value?: React.ReactNode;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="chart-control">
      <div className="chart-control-header">
        <div className="chart-control-label">{label}</div>
        {value !== undefined ? <div className="chart-control-value">{value}</div> : null}
      </div>
      {hint ? <div className="chart-control-hint">{hint}</div> : null}
      {children}
    </div>
  );
}
