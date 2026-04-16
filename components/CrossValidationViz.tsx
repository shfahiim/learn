import React from 'react';

const CrossValidationViz = () => {
  const k = 5;
  const folds = Array.from({ length: k }, (_, i) => i + 1);

  return (
    <div className="my-10 p-6 rounded-2xl" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-1)' }}>
      <h4 className="text-center font-bold mb-8 uppercase tracking-wider text-sm" style={{ color: 'var(--chart-muted)' }}>
        k-Fold Cross Validation (k=5)
      </h4>
      
      <div className="space-y-4">
        {folds.map((iteration) => (
          <div key={iteration} className="flex items-center gap-4">
            <div className="w-24 text-xs font-mono" style={{ color: 'var(--chart-muted)' }}>Iter {iteration}:</div>
            <div className="flex-1 flex gap-1 h-8">
              {folds.map((fold) => (
                <div 
                  key={fold}
                  className={`flex-1 rounded-sm border transition-all duration-300 flex items-center justify-center text-[10px] font-bold ${
                    fold === iteration 
                      ? 'bg-emerald-500 border-emerald-600 text-white shadow-md transform scale-y-110' 
                      : 'bg-blue-100 border-blue-200 text-blue-700 opacity-60'
                  }`}
                >
                  {fold === iteration ? 'VALID' : 'TRAIN'}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center items-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded-sm"></div>
          <span className="text-[var(--chart-text)]">Training Folds</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-emerald-500 border border-emerald-600 rounded-sm"></div>
          <span style={{ color: 'var(--chart-text)' }}>Validation Fold</span>
        </div>
      </div>

      <p className="mt-6 text-center text-sm italic px-4" style={{ color: 'var(--chart-muted)' }}>
        The dataset is split into 5 equal folds. In each iteration, a different fold acts as the validation set, while the remaining 4 are used for training. The final performance is the average of all 5 iterations.
      </p>
    </div>
  );
};

export default CrossValidationViz;
