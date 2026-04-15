import React from 'react';
import { ChartCard } from './charts/ChartCard';

const MarkovChainViz = () => {
  return (
    <div className="my-8 flex justify-center">
      <ChartCard title="Markov Chain State Transitions" subtitle="In a Markov model, the probability of transitioning to the next state (S_t+1) depends only on the current state (S_t), not the entire history.">
        <div className="flex items-center justify-center p-8 space-x-12">
          {/* Simple SVG diagram of 2 states */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border-4 border-[#8884d8] flex items-center justify-center font-bold text-xl text-[#8884d8]">SUN</div>
            <div className="mt-4 text-sm font-medium">State 1</div>
          </div>
          
          <div className="flex flex-col items-center relative">
            {/* Arrows */}
            <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
              <path d="M10 20 H90" stroke="#888" strokeWidth="2" markerEnd="url(#arrow)" />
              <path d="M90 40 H10" stroke="#888" strokeWidth="2" markerEnd="url(#arrow)" />
              <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L9,3 z" fill="#888" />
                </marker>
              </defs>
            </svg>
            <div className="absolute top-0 text-xs font-bold text-[#666]">0.2</div>
            <div className="absolute bottom-0 text-xs font-bold text-[#666]">0.8</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border-4 border-[#82ca9d] flex items-center justify-center font-bold text-xl text-[#82ca9d]">RAIN</div>
            <div className="mt-4 text-sm font-medium">State 2</div>
          </div>
        </div>
      </ChartCard>
    </div>
  );
};

export default MarkovChainViz;
