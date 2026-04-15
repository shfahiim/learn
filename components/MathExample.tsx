import React from 'react';

export function MathExample({ title = "Exam Question", children }: { title?: string, children: React.ReactNode }) {
  return (
    <div className="math-example-container" style={{
      border: '1px solid var(--chart-border)',
      borderRadius: '0.5rem',
      margin: '2rem 0',
      backgroundColor: 'var(--chart-panel-bg)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    }}>
      <div style={{ padding: '1.25rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: 'var(--chart-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          {title}
        </h4>
        {children}
      </div>
    </div>
  );
}

export function MathQuestion({ children }: { children: React.ReactNode }) {
  return <div style={{ marginBottom: '1rem', fontSize: '1rem', lineHeight: '1.6' }}>{children}</div>;
}

export function MathSolution({ children }: { children: React.ReactNode }) {
  return (
    <details style={{
      marginTop: '1rem',
      padding: '0.75rem',
      border: '1px solid var(--chart-border)',
      borderRadius: '0.375rem',
      backgroundColor: 'var(--chart-bg)',
      transition: 'all 0.2s ease'
    }}>
      <summary style={{ 
        cursor: 'pointer', 
        fontWeight: 'bold', 
        color: 'var(--chart-success)',
        outline: 'none',
        userSelect: 'none'
      }}>
        View Step-by-Step Solution
      </summary>
      <div style={{ 
        marginTop: '1rem', 
        paddingTop: '1rem', 
        borderTop: '1px dashed var(--chart-border)',
        fontSize: '0.95rem',
        lineHeight: '1.6'
      }}>
        {children}
      </div>
    </details>
  );
}
