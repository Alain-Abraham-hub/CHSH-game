import React from 'react';

const StrategyCard = ({ title, description, winRate, gradient, icon, stats }) => {
  // Determine gradient colors based on type
  const isQuantum = gradient === 'bg-gradient-quantum';
  const gradientStyle = isQuantum 
    ? 'from-emerald-400 to-teal-600' 
    : 'from-blue-400 to-blue-600';
  
  return (
    <div className="relative glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl group overflow-hidden">
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientStyle} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
      
      <div className="relative z-10">
        {/* Icon & Title */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{icon}</span>
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>

        {/* Win Rate Display */}
        <div className="mt-6 mb-4">
          <div className="flex items-baseline gap-2">
            <span className={`text-6xl font-bold bg-gradient-to-r ${gradientStyle} bg-clip-text text-transparent`}>
              {winRate}
            </span>
            <span className="text-2xl text-gray-600">%</span>
          </div>
          <p className="text-sm text-gray-600 mt-1">Win Rate</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${gradientStyle} transition-all duration-1000 ease-out`}
            style={{ width: `${winRate}%` }}
          ></div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-lg font-semibold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Button */}
        <button className={`w-full mt-6 py-3 rounded-full bg-gradient-to-r ${gradientStyle} text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200`}>
          Run Simulation
        </button>
      </div>
    </div>
  );
};

export default StrategyCard;
