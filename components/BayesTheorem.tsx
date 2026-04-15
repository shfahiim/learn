import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export function BayesTheorem() {
  const [priorPos, setPriorPos] = useState(1); // True Positive base rate (1%)
  const [tpr, setTpr] = useState(90); // True Positive Rate (Sensitivity)
  const [fpr, setFpr] = useState(9);  // False Positive Rate

  const data = useMemo(() => {
    // Math for Bayes Rule:
    const P_A = priorPos / 100; // Probability of having disease
    const P_notA = 1 - P_A; // Probability of not having disease
    
    const P_B_given_A = tpr / 100; // Probability of testing positive given disease
    const P_B_given_notA = fpr / 100; // Probability of testing positive given NO disease
    
    const P_B = (P_B_given_A * P_A) + (P_B_given_notA * P_notA); // Total probability of a positive test
    
    const posterior = (P_B_given_A * P_A) / P_B; // P(A|B)
    
    return {
      posterior: posterior * 100,
      falsePositives: (1 - posterior) * 100,
      chartData: [
        { name: 'Actually Has Disease (True Positives)', value: P_B_given_A * P_A },
        { name: 'Healthy but Tested Positive (False Positives)', value: P_B_given_notA * P_notA }
      ]
    };
  }, [priorPos, tpr, fpr]);

  const COLORS = ['#10b981', '#ef4444'];

  return (
    <div className="chart-wrapper" style={{ border: '1px solid var(--chart-border)', borderRadius: '0.75rem', margin: '2rem 0', backgroundColor: 'var(--chart-bg)' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem', color: 'inherit' }}>Interactive Bayes' Theorem: Medical Testing</h3>
      <p style={{ textAlign: 'center', fontSize: '0.95rem', marginBottom: '1.5rem', color: 'inherit' }}>
        If you test positive, what is the <strong>actual</strong> probability you have the disease?
        <br/>
        <strong style={{ fontSize: '1.2rem', color: '#10b981' }}>{data.posterior.toFixed(1)}%</strong>
      </p>
      
      <div className="chart-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <div className="chart-wrapper" style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'inherit' }}>Disease Rarity (Base Rate): {priorPos}%</label>
          <input 
            type="range" className="modern-slider" min="0.1" max="10" step="0.1" 
            value={priorPos} onChange={(e) => setPriorPos(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          <small style={{ color: 'inherit' }}>How common is the disease in the population?</small>
        </div>
        <div className="chart-wrapper" style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'inherit' }}>Test Accuracy (Sensitivity): {tpr}%</label>
          <input 
            type="range" className="modern-slider" min="50" max="100" step="1" 
            value={tpr} onChange={(e) => setTpr(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <small style={{ color: 'inherit' }}>If sick, chance of testing positive.</small>
        </div>
        <div className="chart-wrapper" style={{ flex: '1 1 200px' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: 'inherit' }}>False Positive Rate: {fpr}%</label>
          <input 
            type="range" className="modern-slider" min="0" max="20" step="1" 
            value={fpr} onChange={(e) => setFpr(parseInt(e.target.value))}
            style={{ width: '100%' }}
          />
          <small style={{ color: 'inherit' }}>If healthy, chance of incorrectly testing positive.</small>
        </div>
      </div>
      
      <div className="chart-wrapper" style={{ height: '300px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(val: any) => `${(Number(val) * 100).toFixed(4)}% of population`} />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}