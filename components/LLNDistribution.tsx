import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export function LLNDistribution() {
  const [flips, setFlips] = useState(0);
  const [runningAvg, setRunningAvg] = useState(0);
  const [history, setHistory] = useState<{x: number, Average: number}[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const expectedValue = 0.5; // Fair coin

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isPlaying && flips < 1000) {
      interval = setInterval(() => {
        const newFlip = Math.random() < 0.5 ? 1 : 0;
        setFlips(prev => {
            const nextFlips = prev + 1;
            setRunningAvg(prevAvg => {
                const nextAvg = ((prevAvg * prev) + newFlip) / nextFlips;
                setHistory(h => [...h, { x: nextFlips, Average: nextAvg }]);
                return nextAvg;
            });
            return nextFlips;
        });
      }, 50); // fast updates
    } else if (flips >= 1000) {
        setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, flips]);

  const reset = () => {
    setFlips(0);
    setRunningAvg(0);
    setHistory([]);
    setIsPlaying(false);
  };

  return (
    <div className="chart-wrapper" style={{ border: '1px solid var(--chart-border)', borderRadius: '0.5rem', margin: '1rem 0' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Law of Large Numbers (Coin Flip Simulation)</h3>
      <p style={{ textAlign: 'center', fontSize: '0.9rem', marginBottom: '1rem', color: 'inherit' }}>
        Expected Value (True Mean): 0.5. Current Running Average: {runningAvg.toFixed(4)}
      </p>
      <div className="chart-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            style={{ padding: '0.5rem 1rem', background: 'var(--chart-bg)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            {isPlaying ? 'Pause' : 'Start Flipping Coin'}
          </button>
          <button 
            onClick={reset}
            style={{ padding: '0.5rem 1rem', background: 'var(--chart-bg)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Reset
          </button>
      </div>
      <div className="chart-wrapper" style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="x" type="number" domain={[0, 1000]} label={{ value: 'Number of Flips', position: 'insideBottomRight', offset: -5 }} />
            <YAxis domain={[0, 1]} label={{ value: 'Running Average', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Line type="stepAfter" dataKey="Average" stroke="var(--chart-primary)" dot={false} />
            <ReferenceLine y={expectedValue} stroke="var(--chart-danger)" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}