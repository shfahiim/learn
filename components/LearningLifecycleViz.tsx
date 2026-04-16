import React from 'react';
import { RefreshCw, ArrowDown, Database, Cpu, Target } from 'lucide-react';

const LearningLifecycleViz = () => {
  return (
    <div className="my-10 flex flex-col items-center gap-4">
      <div
        className="w-full ml-max-w-lifecycle p-4 rounded-lg border"
        style={{ borderColor: 'var(--border-1)', background: 'var(--surface-2)', boxShadow: 'var(--shadow-1)' }}
      >
        <h4 className="text-center font-bold mb-4 uppercase tracking-wider text-xs opacity-60 flex items-center justify-center gap-2">
          <RefreshCw size={16} /> 1. The Learning Loop
        </h4>

        <div className="flex flex-col items-center gap-2">
          <div
            className="w-full ml-max-w-lifecycle-node p-3 rounded-lg border text-center"
            style={{ borderColor: 'rgba(59, 130, 246, 0.35)', background: 'rgba(59, 130, 246, 0.10)' }}
          >
            <div className="flex items-center justify-center gap-2">
              <Database size={18} color="#2563eb" />
              <span className="text-sm font-bold" style={{ color: '#2563eb' }}>Knowledge</span>
            </div>
            <div className="text-xs opacity-60 mt-2">What the model currently knows</div>
          </div>

          <div className="flex flex-col items-center gap-1 text-xs opacity-60">
            <ArrowDown size={16} />
            <span>Refining</span>
          </div>

          <div
            className="w-full ml-max-w-lifecycle-node p-3 rounded-lg border text-center"
            style={{ borderColor: 'rgba(16, 185, 129, 0.35)', background: 'rgba(16, 185, 129, 0.10)' }}
          >
            <div className="flex items-center justify-center gap-2">
              <Cpu size={18} color="#059669" />
              <span className="text-sm font-bold" style={{ color: '#059669' }}>Learning</span>
            </div>
            <div className="text-xs opacity-60 mt-2">Updates parameters from data</div>
          </div>

          <div className="flex flex-col items-center gap-1 text-xs opacity-60">
            <ArrowDown size={16} />
            <span>Acting</span>
          </div>

          <div
            className="w-full ml-max-w-lifecycle-node p-3 rounded-lg border text-center"
            style={{ borderColor: 'rgba(249, 115, 22, 0.35)', background: 'rgba(249, 115, 22, 0.10)' }}
          >
            <div className="flex items-center justify-center gap-2">
              <Target size={18} color="#ea580c" />
              <span className="text-sm font-bold" style={{ color: '#ea580c' }}>Action</span>
            </div>
            <div className="text-xs opacity-60 mt-2">Makes predictions and decisions</div>
          </div>

          <div
            className="mt-2 ml-max-w-lifecycle-feedback p-2 rounded border text-xs text-center"
            style={{ borderColor: 'var(--border-1)', background: 'var(--surface-1)' }}
          >
            <span className="font-bold">Feedback Loop:</span> Outcomes from actions refine future knowledge.
          </div>
        </div>

        <p className="mt-4 text-center text-sm italic" style={{ color: 'var(--chart-text)', lineHeight: 1.6 }}>
          "Learning builds knowledge, and knowledge enables action. The results of actions refine future learning."
        </p>
      </div>

      <div className="w-full ml-max-w-lifecycle grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          className="p-4 rounded-lg border flex flex-col items-center text-center"
          style={{ borderColor: 'rgba(59, 130, 246, 0.25)', background: 'var(--surface-1)' }}
        >
          <span
            className="px-2 py-1 rounded-full mb-4 text-xs font-bold uppercase"
            style={{ background: '#3b82f6', color: '#ffffff' }}
          >
              Phase A: Training
          </span>
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="w-full p-3 rounded border" style={{ borderColor: 'var(--border-1)', background: 'var(--surface-2)' }}>
              Input Dataset (Labeled)
            </div>
            <ArrowDown size={16} color="#60a5fa" />
            <div className="w-full p-3 rounded border font-bold" style={{ borderColor: 'rgba(59, 130, 246, 0.35)', background: 'rgba(59, 130, 246, 0.08)', color: '#2563eb' }}>
              Learning Algorithm
            </div>
            <ArrowDown size={16} color="#60a5fa" />
            <div className="w-full p-4 rounded-lg font-bold" style={{ background: '#2563eb', color: '#ffffff' }}>
              LEARNED MODEL
              <div className="text-xs mt-2" style={{ opacity: 0.85 }}>
                Weights, Parameters, Rules
              </div>
            </div>
          </div>
        </div>

        <div
          className="p-4 rounded-lg border flex flex-col items-center text-center"
          style={{ borderColor: 'rgba(16, 185, 129, 0.25)', background: 'var(--surface-1)' }}
        >
          <span
            className="px-2 py-1 rounded-full mb-4 text-xs font-bold uppercase"
            style={{ background: '#10b981', color: '#ffffff' }}
          >
              Phase B: Testing
          </span>
          <div className="flex flex-col items-center gap-2 w-full">
            <div className="w-full p-3 rounded border" style={{ borderColor: 'var(--border-1)', background: 'var(--surface-2)' }}>
              New / Unseen Data
            </div>
            <ArrowDown size={16} color="#34d399" />
            <div className="w-full p-3 rounded border font-bold" style={{ borderColor: 'var(--border-1)', background: 'var(--surface-2)', color: 'var(--chart-muted)' }}>
              LEARNED MODEL
            </div>
            <ArrowDown size={16} color="#34d399" />
            <div className="w-full p-4 rounded-lg font-bold" style={{ background: '#059669', color: '#ffffff' }}>
              PREDICTIONS
              <div className="text-xs mt-2" style={{ opacity: 0.85 }}>
                Labels, Values, Decisions
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningLifecycleViz;
