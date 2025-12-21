import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WinRateChart = () => {
  // Placeholder data
  const data = [
    { rounds: 100, quantum: 84, classical: 76 },
    { rounds: 500, quantum: 85, classical: 75 },
    { rounds: 1000, quantum: 85.2, classical: 74.8 },
    { rounds: 2000, quantum: 85.4, classical: 75.1 },
    { rounds: 5000, quantum: 85.3, classical: 75 },
    { rounds: 10000, quantum: 85.4, classical: 75.2 },
  ];

  return (
    <div className="glass rounded-2xl p-6 mt-8">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Win Probability vs Number of Rounds
        </h3>
        <p className="text-sm text-gray-600">
          Observe how quantum strategy consistently outperforms classical limits
        </p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="quantumGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="classicalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis 
            dataKey="rounds" 
            stroke="#B3B3B3" 
            label={{ value: 'Number of Rounds', position: 'insideBottom', offset: -5, fill: '#B3B3B3' }}
          />
          <YAxis 
            stroke="#B3B3B3" 
            domain={[70, 90]}
            label={{ value: 'Win Rate (%)', angle: -90, position: 'insideLeft', fill: '#B3B3B3' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#ffffff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}
            labelStyle={{ color: '#111827' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="quantum" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 5 }}
            name="Quantum Strategy"
            activeDot={{ r: 8 }}
          />
          <Line 
            type="monotone" 
            dataKey="classical" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 5 }}
            name="Classical Strategy"
            activeDot={{ r: 8 }}
          />
          {/* Horizontal line at 75% to show classical limit */}
          <Line 
            type="monotone" 
            dataKey={() => 75} 
            stroke="#60a5fa" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
            name="Classical Limit (75%)"
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="glass rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-600"></div>
            <span className="text-sm font-semibold text-gray-900">Quantum Advantage</span>
          </div>
          <p className="text-xs text-gray-600">
            ~10.4% higher than classical limit
          </p>
        </div>
        <div className="glass rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <span className="text-sm font-semibold text-gray-900">Classical Bound</span>
          </div>
          <p className="text-xs text-gray-600">
            Cannot exceed 75% (proven limit)
          </p>
        </div>
      </div>
    </div>
  );
};

export default WinRateChart;
