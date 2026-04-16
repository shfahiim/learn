import React, { useMemo } from 'react';
import { ChartCard } from './charts/ChartCard';

const NDCGViz = () => {
  const documents = [
    { id: 'd1', relevance: 3, label: 'Perfect Match' },
    { id: 'd2', relevance: 2, label: 'Relevant' },
    { id: 'd3', relevance: 3, label: 'Perfect Match' },
    { id: 'd4', relevance: 0, label: 'Irrelevant' },
    { id: 'd5', relevance: 1, label: 'Slightly Relevant' },
  ];

  const dcg = documents.reduce((acc, doc, i) => {
    const rank = i + 1;
    const score = (Math.pow(2, doc.relevance) - 1) / Math.log2(rank + 1);
    return acc + score;
  }, 0);

  const idealDocs = [...documents].sort((a, b) => b.relevance - a.relevance);
  const idcg = idealDocs.reduce((acc, doc, i) => {
    const rank = i + 1;
    const score = (Math.pow(2, doc.relevance) - 1) / Math.log2(rank + 1);
    return acc + score;
  }, 0);

  const ndcg = dcg / idcg;

  return (
    <div className="my-10">
      <ChartCard 
        title="NDCG (Normalized Discounted Cumulative Gain)" 
        subtitle="Evaluating ranked results by rewarding relevance and penalizing poor positioning."
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
          {/* Current Ranking */}
          <div className="space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400">Current Ranking</h5>
            <div className="space-y-2">
              {documents.map((doc, i) => (
                <div key={doc.id} className="flex items-center gap-3 p-3 bg-white border rounded-lg shadow-sm">
                  <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">{i + 1}</span>
                  <div className="flex-1">
                    <div className="text-sm font-bold">{doc.id}</div>
                    <div className="text-[10px] text-slate-500">{doc.label}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-[10px] font-bold ${
                    doc.relevance === 3 ? 'bg-emerald-100 text-emerald-700' :
                    doc.relevance === 2 ? 'bg-blue-100 text-blue-700' :
                    doc.relevance === 1 ? 'bg-orange-100 text-orange-700' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    Rel: {doc.relevance}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Metrics Breakdown */}
          <div className="flex flex-col justify-center gap-6 bg-slate-50 p-6 rounded-xl border border-slate-200">
             <div className="space-y-1">
                <div className="text-xs text-slate-500 font-medium">DCG (Discounted Gain)</div>
                <div className="text-2xl font-mono font-bold text-slate-800">{dcg.toFixed(2)}</div>
             </div>
             <div className="space-y-1">
                <div className="text-xs text-slate-500 font-medium">IDCG (Ideal Gain)</div>
                <div className="text-2xl font-mono font-bold text-slate-800">{idcg.toFixed(2)}</div>
             </div>
             <div className="pt-6 border-t border-slate-200">
                <div className="text-xs text-blue-500 font-bold uppercase tracking-wider mb-2">Final Score</div>
                <div className="flex items-baseline gap-2">
                  <div className="text-5xl font-black text-blue-600">{(ndcg * 100).toFixed(1)}%</div>
                  <div className="text-slate-400 font-bold">NDCG</div>
                </div>
             </div>
             <p className="text-[11px] text-slate-500 leading-relaxed italic mt-4">
                NDCG is 1.0 (100%) if the documents are perfectly ordered by relevance. Notice how d3 (Rel: 3) being at Rank 3 instead of Rank 1/2 reduces the score.
             </p>
          </div>
        </div>
      </ChartCard>
    </div>
  );
};

export default NDCGViz;
