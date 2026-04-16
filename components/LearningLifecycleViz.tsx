import React from 'react';

const LearningLifecycleViz = () => {
  return (
    <div className="my-10 flex flex-col items-center gap-12">
      {/* Human/Agent Learning Loop */}
      <div className="w-full max-w-2xl p-6 rounded-2xl shadow-sm" style={{ background: 'var(--surface-2)', border: '1px solid var(--border-1)' }}>
        <h4 className="text-center font-bold mb-8 uppercase tracking-wider text-sm" style={{ color: 'var(--chart-muted)' }}>1. The Learning Loop</h4>
        <div className="flex justify-center items-center gap-8 relative">
          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-24 h-24 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center text-blue-700 font-bold shadow-md">
              Knowledge
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-4">
             <div className="text-3xl text-slate-400">⇆</div>
             <div className="text-xs font-mono px-2 py-1 rounded" style={{ color: 'var(--chart-muted)', background: 'var(--surface-1)', border: '1px solid var(--border-1)' }}>Refining</div>
          </div>

          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-24 h-24 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-emerald-700 font-bold shadow-md">
              Learning
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
             <div className="text-3xl text-slate-400">→</div>
          </div>

          <div className="flex flex-col items-center gap-2 z-10">
            <div className="w-24 h-24 rounded-full bg-orange-100 border-2 border-orange-500 flex items-center justify-center text-orange-700 font-bold shadow-md">
              Action
            </div>
          </div>
          
          {/* Subtle connecting curve for feedback */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-12 border-b-2 border-dashed border-slate-300 rounded-full pointer-events-none mt-12"></div>
        </div>
        <p className="mt-10 text-center text-sm text-[var(--chart-text)] italic">
          Learning builds knowledge, and knowledge enables action. The results of actions refine future learning.
        </p>
      </div>

      {/* Training vs Testing Lifecycle */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Training Phase */}
        <div className="p-6 rounded-xl border-2 border-dashed border-blue-200 flex flex-col items-center text-center" style={{ background: 'var(--surface-1)' }}>
          <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full mb-4 uppercase">Phase A: Training</span>
          <div className="space-y-4 w-full">
            <div className="p-3 rounded border text-sm font-medium" style={{ background: 'var(--surface-2)' }}>Input Dataset (Labeled)</div>
            <div className="text-blue-400 text-xl">↓</div>
            <div className="p-3 bg-blue-50 rounded border-2 border-blue-200 text-sm font-bold text-blue-800">Learning Algorithm</div>
            <div className="text-blue-400 text-xl">↓</div>
            <div className="p-4 bg-blue-600 text-white rounded-lg shadow-lg font-bold">
              LEARNED MODEL
              <div className="text-[10px] font-normal mt-1 opacity-80">(Weights, Parameters, Rules)</div>
            </div>
          </div>
        </div>

        {/* Testing Phase */}
        <div className="p-6 rounded-xl border-2 border-dashed border-emerald-200 flex flex-col items-center text-center" style={{ background: 'var(--surface-1)' }}>
          <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full mb-4 uppercase">Phase B: Testing</span>
          <div className="space-y-4 w-full">
            <div className="p-3 rounded border text-sm font-medium" style={{ background: 'var(--surface-2)' }}>New / Unseen Data</div>
            <div className="text-emerald-400 text-xl">↓</div>
            <div className="p-4 bg-blue-600 text-white rounded-lg shadow-md font-bold opacity-60">
              LEARNED MODEL
            </div>
            <div className="text-emerald-400 text-xl">↓</div>
            <div className="p-4 bg-emerald-600 text-white rounded-lg shadow-lg font-bold">
              PREDICTIONS
              <div className="text-[10px] font-normal mt-1 opacity-80">(Labels, Values, Decisions)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningLifecycleViz;
