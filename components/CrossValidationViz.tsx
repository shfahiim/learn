import React from 'react';
import { Layers, CheckCircle2, PlayCircle } from 'lucide-react';

const CrossValidationViz = () => {
  const k = 5;
  const folds = Array.from({ length: k }, (_, i) => i + 1);

  return (
    <div
      className="my-10 p-4 rounded-lg border"
      style={{
        borderColor: 'var(--border-1)',
        background: 'var(--surface-2)',
        boxShadow: 'var(--shadow-1)',
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h4 className="font-bold uppercase tracking-wider text-xs opacity-60 flex items-center gap-2">
          <Layers size={16} color="#3b82f6" /> k-Fold Cross Validation (k=5)
        </h4>
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase">
          <div
            className="flex items-center gap-2 px-2 py-1 rounded-full border"
            style={{ background: 'rgba(59, 130, 246, 0.10)', color: '#2563eb', borderColor: 'rgba(59, 130, 246, 0.28)' }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: '#3b82f6' }} />
            Training
          </div>
          <div
            className="flex items-center gap-2 px-2 py-1 rounded-full border"
            style={{ background: 'rgba(16, 185, 129, 0.10)', color: '#047857', borderColor: 'rgba(16, 185, 129, 0.28)' }}
          >
            <div className="w-2 h-2 rounded-full" style={{ background: '#10b981' }} />
            Validation
          </div>
        </div>
      </div>

      <div className="ml-scroll-x">
        <div className="ml-min-w-kfold">
          <div className="flex items-center gap-2 mb-1" aria-hidden="true">
            <div style={{ width: 72 }} />
            {folds.map((fold) => (
              <div
                key={`fold-head-${fold}`}
                className="text-center text-xs font-bold opacity-60"
                style={{ flex: '1 1 0' }}
              >
                Fold {fold}
              </div>
            ))}
          </div>

          {folds.map((iteration) => (
            <div key={iteration} className="flex items-center gap-2 mb-1">
              <div className="text-xs font-bold opacity-60" style={{ width: 72 }}>
                Iter {iteration}
              </div>
              {folds.map((fold) => {
                const isValid = fold === iteration;
                return (
                  <div
                    key={fold}
                    className="rounded border flex flex-col items-center justify-center text-center"
                    style={{
                      flex: '1 1 0',
                      height: 46,
                      borderColor: isValid ? 'rgba(16, 185, 129, 0.7)' : 'var(--border-1)',
                      background: isValid ? '#10b981' : 'var(--surface-1)',
                      color: isValid ? '#ffffff' : 'var(--chart-muted)',
                    }}
                  >
                    {isValid ? (
                      <>
                        <CheckCircle2 size={14} />
                        <span className="text-[10px] font-bold uppercase">Valid</span>
                      </>
                    ) : (
                      <span className="text-[10px] font-bold uppercase">Train</span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div
        className="mt-4 p-3 rounded-lg border relative overflow-hidden"
        style={{ background: 'var(--surface-1)', borderColor: 'var(--border-1)' }}
      >
        <div className="absolute top-0 right-0 p-2 opacity-60" style={{ opacity: 0.07 }}>
          <PlayCircle size={44} />
        </div>
        <p className="text-sm italic" style={{ lineHeight: 1.6, color: 'var(--chart-text)', position: 'relative', zIndex: 1 }}>
          The dataset is split into <span className="font-bold" style={{ color: '#3b82f6' }}>5 equal folds</span>. In each
          iteration, one fold is used for validation and the other 4 folds are used for training. The final score is the
          average across all 5 iterations.
        </p>
      </div>
    </div>
  );
};

export default CrossValidationViz;
