import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StrategyCard from './components/StrategyCard';
import WinRateChart from './components/WinRateChart';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [showStrategyModal, setShowStrategyModal] = useState(false);
  const [strategies, setStrategies] = useState([]);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [simulationResult, setSimulationResult] = useState(null);
  const [quantumResult, setQuantumResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch available strategies when component mounts
  useEffect(() => {
    fetch('http://localhost:5001/api/strategies')
      .then(res => res.json())
      .then(data => setStrategies(data.strategies))
      .catch(err => console.error('Error fetching strategies:', err));
  }, []);

  const handleStrategySelect = async (strategy) => {
    setSelectedStrategy(strategy);
    setIsLoading(true);
    setShowStrategyModal(false);

    try {
      const response = await fetch('http://localhost:5001/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'classical',
          strategy: strategy.name,
          rounds: 1000
        })
      });
      
      const result = await response.json();
      setSimulationResult(result);
    } catch (err) {
      console.error('Error running simulation:', err);
      alert('Failed to run simulation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const openStrategyModal = () => {
    setShowStrategyModal(true);
    setSimulationResult(null);
  };

  const runQuantumSimulation = async () => {
    setIsLoading(true);
    setQuantumResult(null);

    try {
      const response = await fetch('http://localhost:5001/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'quantum',
          rounds: 1000
        })
      });
      
      const result = await response.json();
      setQuantumResult(result);
    } catch (err) {
      console.error('Error running quantum simulation:', err);
      alert('Failed to run simulation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Content */}
      <main className="ml-64 p-8 pb-20">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent mb-4">
            CHSH Game Simulator
          </h1>
          <p className="text-xl text-gray-600">
            Classical vs Quantum Strategies
          </p>
          <div className="mt-4 flex items-center gap-2">
            <div className="h-1 w-20 bg-gradient-to-r from-blue-400 via-teal-500 to-emerald-400 rounded"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-400 to-blue-500 rounded"></div>
            <div className="h-1 w-8 bg-teal-500 rounded"></div>
          </div>
        </header>

        {/* Conditional Content Based on Active Section */}
        {activeSection === 'classical' ? (
          <div className="space-y-8">
            {/* Classical Simulation Section - Hide after simulation */}
            {!simulationResult && (
              <div className="glass rounded-2xl p-8 border-l-4 border-blue-500">
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-5xl">🎲</span>
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">Classical Strategy Simulation</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Experience the best classical approach to the CHSH game. Using pre-agreed deterministic strategies,
                      Alice and Bob can achieve up to 75% win rate - the theoretical maximum for classical physics.
                    </p>
                  </div>
                </div>

                {/* Strategy Description */}
                <div className="bg-gradient-to-r from-blue-50 to-gray-50 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">How It Works</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Alice and Bob use a predetermined lookup table</p>
                    <p>• No quantum entanglement or communication during the game</p>
                    <p>• Each player outputs based solely on their input bit</p>
                    <p>• Achieves 75% success rate over many rounds</p>
                  </div>
                </div>

                {/* Start Button */}
                <div className="text-center">
                  <button 
                    onClick={openStrategyModal}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold text-lg rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="relative z-10">🎮 Start Classical Simulation</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  <p className="text-sm text-gray-600 mt-4">Click to choose a strategy and run 1000 rounds</p>
                </div>

                {/* Expected Results Preview */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">75%</div>
                    <p className="text-sm text-gray-700">Expected Win Rate</p>
                  </div>
                  <div className="glass rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-gray-800 mb-2">1000</div>
                    <p className="text-sm text-gray-700">Rounds Per Simulation</p>
                  </div>
                  <div className="glass rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                    <p className="text-sm text-gray-700">Deterministic</p>
                  </div>
                </div>
              </div>
            )}
              {/* Simulation Result Display */}
              {simulationResult && (
                <div className="glass rounded-2xl p-8 border-l-4 border-green-500 animate-fade-in">
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-5xl">📊</span>
                    <div className="flex-1">
                      <h2 className="text-4xl font-bold text-gray-900 mb-3">Simulation Results</h2>
                      <p className="text-lg text-gray-700 leading-relaxed">
                        Results from running 1000 rounds with the {strategies.find(s => s.name === simulationResult.strategy)?.display_name} strategy.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Strategy Used</p>
                      <p className="text-lg font-bold text-blue-600">
                        {strategies.find(s => s.name === simulationResult.strategy)?.display_name}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Total Rounds</p>
                      <p className="text-2xl font-bold text-gray-800">{simulationResult.total}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Wins</p>
                      <p className="text-2xl font-bold text-green-600">{simulationResult.wins}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-sm text-gray-600 mb-1">Win Rate</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {(simulationResult.win_rate * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  
                  {/* Run Another Button */}
                  <div className="text-center">
                    <button 
                      onClick={openStrategyModal}
                      className="group relative px-8 py-3 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <span className="relative z-10">🔄 Run Another Simulation</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>
              )}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="glass rounded-2xl p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                  <p className="mt-4 text-gray-600 font-semibold">Running simulation...</p>
                </div>
              )}
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6">
                <div className="text-3xl mb-3">📊</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Classical Limit</h4>
                <p className="text-sm text-gray-700">
                  Bell's theorem proves that no classical strategy can exceed 75% win rate in the CHSH game.
                  This is a fundamental limit of local hidden variable theories.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Optimal Strategy</h4>
                <p className="text-sm text-gray-700">
                  The best classical approach uses a lookup table where both players always output 0,
                  winning in 3 out of 4 possible input combinations.
                </p>
              </div>
            </div>
          </div>
        ) : activeSection === 'quantum' ? (
          <div className="space-y-8">
            {/* Quantum Simulation Section - Hide after simulation */}
            {!quantumResult && (
              <div className="glass rounded-2xl p-8 border-l-4 border-emerald-500">
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-5xl">⚛️</span>
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">Quantum Strategy Simulation</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Explore the power of quantum entanglement in the CHSH game. Using Bell pairs and optimal measurement angles,
                      Alice and Bob can achieve approximately 85.4% win rate - surpassing the classical limit of 75%.
                    </p>
                  </div>
                </div>

                {/* How Quantum Works */}
                <div className="bg-gradient-to-r from-emerald-50 to-gray-50 p-6 rounded-xl mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Quantum Advantage</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Players share an entangled Bell pair (|Φ+⟩ state)</p>
                    <p>• Each player measures their qubit at optimal angles based on their input</p>
                    <p>• Measurement outcomes are correlated through quantum entanglement</p>
                    <p>• Achieves ~85.4% success rate - violates Bell's inequality</p>
                  </div>
                </div>

                {/* Measurement Angles Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 border border-emerald-200">
                    <p className="text-sm font-semibold text-emerald-600 mb-2">Alice's Angles</p>
                    <p className="text-sm text-gray-700">
                      x=0 → 0°<br/>
                      x=1 → 90°
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border border-teal-200">
                    <p className="text-sm font-semibold text-teal-600 mb-2">Bob's Angles</p>
                    <p className="text-sm text-gray-700">
                      y=0 → 45°<br/>
                      y=1 → -45°
                    </p>
                  </div>
                </div>

                {/* Start Button */}
                <div className="text-center">
                  <button 
                    onClick={runQuantumSimulation}
                    className="group relative px-8 py-4 bg-gradient-to-r from-emerald-400 to-teal-600 text-white font-bold text-lg rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="relative z-10">🚀 Start Quantum Simulation</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  <p className="text-sm text-gray-600 mt-4">Click to run 1000 rounds of the quantum strategy</p>
                </div>

                {/* Expected Results Preview */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">~85.4%</div>
                    <p className="text-sm text-gray-700">Expected Win Rate</p>
                  </div>
                  <div className="glass rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-gray-800 mb-2">1000</div>
                    <p className="text-sm text-gray-700">Rounds Per Simulation</p>
                  </div>
                  <div className="glass rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">+10.4%</div>
                    <p className="text-sm text-gray-700">Advantage over Classical</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quantum Result Display */}
            {quantumResult && (
              <div className="glass rounded-2xl p-8 border-l-4 border-emerald-500 animate-fade-in">
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-5xl">📊</span>
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold text-gray-900 mb-3">Quantum Simulation Results</h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Results from running 1000 rounds using quantum entanglement with optimal measurement angles.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Strategy</p>
                    <p className="text-lg font-bold text-emerald-600">Bell Pair</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Total Rounds</p>
                    <p className="text-2xl font-bold text-gray-800">{quantumResult.total}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Wins</p>
                    <p className="text-2xl font-bold text-emerald-600">{quantumResult.wins}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-sm text-gray-600 mb-1">Win Rate</p>
                    <p className="text-3xl font-bold text-emerald-600">
                      {(quantumResult.win_rate * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                {/* Run Another Button */}
                <div className="text-center">
                  <button 
                    onClick={runQuantumSimulation}
                    className="group relative px-8 py-3 bg-gradient-to-r from-emerald-400 to-teal-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <span className="relative z-10">🔄 Run Another Simulation</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="glass rounded-2xl p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 font-semibold">Running quantum simulation...</p>
              </div>
            )}

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6">
                <div className="text-3xl mb-3">🔬</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Bell Pairs (Entanglement)</h4>
                <p className="text-sm text-gray-700">
                  Maximally entangled Bell pairs create quantum correlations impossible in classical physics. The |Φ+⟩ state is used for optimal CHSH performance.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <div className="text-3xl mb-3">📐</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Measurement Angles</h4>
                <p className="text-sm text-gray-700">
                  Alice measures at 0° and 90°, Bob at 45° and -45°. These specific angles maximize the correlation and achieve the CHSH bound of 2√2 ≈ 2.828.
                </p>
              </div>
            </div>
          </div>
        ) : activeSection === 'probability' ? (
          <div className="space-y-8">
            {/* Probability Tables Header */}
            <div className="glass rounded-2xl p-8 border-l-4 border-purple-500">
              <div className="flex items-start gap-4 mb-6">
                <span className="text-5xl">📊</span>
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-gray-900 mb-3">Probability Statistics</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Comparison of your recent simulation results. Run simulations to see real data here.
                  </p>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Classical Results */}
                <div className="glass rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">🎲</span>
                    <h3 className="text-2xl font-bold text-gray-900">Classical Results</h3>
                  </div>
                  
                  {simulationResult ? (
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Strategy Used</p>
                        <p className="text-lg font-bold text-blue-600">
                          {strategies.find(s => s.name === simulationResult.strategy)?.display_name}
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Total</p>
                          <p className="text-xl font-bold text-gray-800">{simulationResult.total}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Wins</p>
                          <p className="text-xl font-bold text-green-600">{simulationResult.wins}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Win Rate</p>
                          <p className="text-xl font-bold text-blue-600">{(simulationResult.win_rate * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>📌 No classical simulation run yet</p>
                      <p className="text-sm mt-2">Run a classical simulation to see data</p>
                    </div>
                  )}
                </div>

                {/* Quantum Results */}
                <div className="glass rounded-xl p-6 border border-emerald-200">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">⚛️</span>
                    <h3 className="text-2xl font-bold text-gray-900">Quantum Results</h3>
                  </div>
                  
                  {quantumResult ? (
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm text-gray-600 mb-1">Strategy Used</p>
                        <p className="text-lg font-bold text-emerald-600">Bell Pair (Entangled)</p>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Total</p>
                          <p className="text-xl font-bold text-gray-800">{quantumResult.total}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Wins</p>
                          <p className="text-xl font-bold text-emerald-600">{quantumResult.wins}</p>
                        </div>
                        <div className="bg-white rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-600 mb-1">Win Rate</p>
                          <p className="text-xl font-bold text-emerald-600">{(quantumResult.win_rate * 100).toFixed(1)}%</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>📌 No quantum simulation run yet</p>
                      <p className="text-sm mt-2">Run a quantum simulation to see data</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Comparison Section */}
              {simulationResult && quantumResult && (
                <div className="glass rounded-xl p-6 border-l-4 border-purple-500 mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">📈 Comparison</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 mb-2">Classical Win Rate</p>
                      <p className="text-3xl font-bold text-blue-600">{(simulationResult.win_rate * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 mb-2">Quantum Win Rate</p>
                      <p className="text-3xl font-bold text-emerald-600">{(quantumResult.win_rate * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 text-center">
                      <p className="text-sm text-gray-600 mb-2">Quantum Advantage</p>
                      <p className="text-3xl font-bold text-purple-600">
                        +{((quantumResult.win_rate - simulationResult.win_rate) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Bars */}
              {(simulationResult || quantumResult) && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Visual Comparison</h3>
                  
                  {simulationResult && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Classical</span>
                        <span className="text-sm font-bold text-blue-600">{(simulationResult.win_rate * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000"
                          style={{ width: `${simulationResult.win_rate * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {quantumResult && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Quantum</span>
                        <span className="text-sm font-bold text-emerald-600">{(quantumResult.win_rate * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-1000"
                          style={{ width: `${quantumResult.win_rate * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Chart Section */}
            <WinRateChart />

            {/* Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-6">
                <div className="text-3xl mb-3">🎯</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Classical Limit</h4>
                <p className="text-sm text-gray-700">
                  Classical strategies are theoretically limited to a maximum win rate of 75% in the CHSH game. This is proven by Bell's theorem and cannot be exceeded without quantum effects.
                </p>
              </div>
              <div className="glass rounded-xl p-6">
                <div className="text-3xl mb-3">⚡</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Quantum Advantage</h4>
                <p className="text-sm text-gray-700">
                  Quantum strategies exploit entanglement and measurement correlations to achieve approximately 85.4% win rate. This breaks the classical limit and proves quantum mechanics provides a genuine advantage.
                </p>
              </div>
            </div>
          </div>
        ) : activeSection === 'about' ? (
          <div className="space-y-8">
            {/* Game Rules Section */}
            <div className="glass rounded-2xl p-8 border-l-4 border-blue-500">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">📖</span>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Game Rules</h2>
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Setup</h3>
                      <p className="leading-relaxed">
                        The CHSH game involves two players, Alice and Bob, who are spatially separated and cannot communicate with each other during the game.
                        Each player receives a random input bit (0 or 1) and must output a bit (0 or 1) based on their strategy.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Game Flow</h3>
                      <ol className="list-decimal list-inside space-y-2 leading-relaxed ml-4">
                        <li>Alice receives a random input bit <strong>x</strong> ∈ {'{0, 1}'}</li>
                        <li>Bob receives a random input bit <strong>y</strong> ∈ {'{0, 1}'}</li>
                        <li>Without communicating, Alice outputs bit <strong>a</strong></li>
                        <li>Without communicating, Bob outputs bit <strong>b</strong></li>
                        <li>The referee checks if the winning condition is satisfied</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Player Strategies</h3>
                      <p className="leading-relaxed mb-2">
                        <strong>Classical Strategy:</strong> Players can pre-agree on a deterministic strategy before the game, 
                        but cannot use quantum entanglement. The best classical strategies achieve a maximum win rate of 75%.
                      </p>
                      <p className="leading-relaxed">
                        <strong>Quantum Strategy:</strong> Players share an entangled Bell pair before the game. 
                        They perform measurements on their qubits based on their input bits, using optimal measurement angles.
                        This quantum correlation allows them to achieve approximately 85.4% win rate.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Winning Condition Section */}
            <div className="glass rounded-2xl p-8 border-l-4 border-emerald-500">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl">🏆</span>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Winning Condition</h2>
                  <div className="space-y-4 text-gray-700">
                    <div>
                      <p className="leading-relaxed mb-4">
                        Alice and Bob <strong>win</strong> the game if and only if:
                      </p>
                      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-6 rounded-xl border-2 border-emerald-200">
                        <p className="text-2xl font-bold text-center text-gray-900 mb-2">
                          a ⊕ b = x · y
                        </p>
                        <p className="text-center text-sm text-gray-600">
                          (a XOR b equals x AND y)
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Breaking It Down</h3>
                      <ul className="space-y-2 leading-relaxed ml-4">
                        <li>
                          <strong>a ⊕ b</strong> is the XOR (exclusive OR) of Alice's and Bob's outputs
                        </li>
                        <li>
                          <strong>x · y</strong> is the AND of their input bits
                        </li>
                        <li>
                          When x = 0 or y = 0: x·y = 0, so they win if a ⊕ b = 0 (outputs should match)
                        </li>
                        <li>
                          When x = 1 and y = 1: x·y = 1, so they win if a ⊕ b = 1 (outputs should differ)
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Example Scenarios</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <p className="font-semibold text-green-800 mb-2">✓ Win Example</p>
                          <p className="text-sm text-gray-700">
                            Input: x=0, y=1<br/>
                            Output: a=0, b=0<br/>
                            a⊕b = 0, x·y = 0 → 0 = 0 → They Win!
                          </p>
                        </div>
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                          <p className="font-semibold text-red-800 mb-2">✗ Loss Example</p>
                          <p className="text-sm text-gray-700">
                            Input: x=1, y=1<br/>
                            Output: a=0, b=0<br/>
                            a⊕b = 0, x·y = 1 → 0 ≠ 1 → They Lose
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-emerald-50 p-6 rounded-xl mt-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Why Quantum Wins</h3>
                      <p className="leading-relaxed">
                        The quantum advantage comes from the non-local correlations in entangled Bell pairs. 
                        When Alice and Bob measure their entangled qubits at specific angles (0°, 90° for Alice and ±45° for Bob),
                        they produce correlations that violate Bell's inequality, allowing them to win more often than any classical strategy could achieve.
                        This demonstrates that quantum mechanics is fundamentally different from classical physics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Info Banner */}
        <div className="glass rounded-2xl p-6 mb-8 border-l-4 border-emerald-400">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🎯</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Demonstrating Quantum Advantage
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                The CHSH game proves that quantum mechanics provides genuine advantages over classical physics. 
                Using entangled Bell pairs, quantum strategies can achieve approximately 85.4% win rate, 
                breaking the classical theoretical limit of 75%.
              </p>
            </div>
          </div>
        </div>

        {/* Strategy Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Classical Strategy Card */}
          <StrategyCard
            title="Classical Strategy"
            description="Best deterministic approach"
            winRate="75.0"
            gradient="bg-gradient-classical"
            icon="🎲"
            stats={[
              { label: 'Max Win Rate', value: '75%' },
              { label: 'Theoretical', value: 'Proven' },
              { label: 'Type', value: 'Deterministic' },
            ]}
          />

          {/* Quantum Strategy Card */}
          <StrategyCard
            title="Quantum Strategy"
            description="Bell state entanglement"
            winRate="85.4"
            gradient="bg-gradient-quantum"
            icon="⚛️"
            stats={[
              { label: 'Win Rate', value: '~85%' },
              { label: 'Advantage', value: '+10.4%' },
              { label: 'Type', value: 'Entangled' },
            ]}
          />
        </div>

        {/* Comparison Section */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-sm text-gray-600 mb-2">Classical Limit</p>
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                75%
              </div>
              <div className="mt-3 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 w-3/4"></div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-gray-800">VS</span>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 blur-xl opacity-50 animate-pulse"></div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Quantum Achieves</p>
              <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent">
                85.4%
              </div>
              <div className="mt-3 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-600" style={{ width: '85.4%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <WinRateChart />

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="text-3xl mb-3">🔬</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Bell Pairs</h4>
            <p className="text-sm text-gray-700">
              Quantum entanglement creates correlations impossible in classical physics
            </p>
          </div>

          <div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="text-3xl mb-3">📐</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Measurement Angles</h4>
            <p className="text-sm text-gray-700">
              Optimal angles: Alice (0°, 90°), Bob (±45°) maximize correlation
            </p>
          </div>

          <div className="glass rounded-xl p-6 hover:scale-105 transition-transform">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">CHSH Inequality</h4>
            <p className="text-sm text-gray-700">
              S ≤ 2 (classical), S = 2√2 ≈ 2.828 (quantum) - violation proves quantum advantage
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm text-gray-600">
            Built with React, Tailwind CSS, and Qiskit • 
            <span className="ml-2">Demonstrating the power of quantum computing</span>
          </p>
        </footer>
        </>
        )}
      </main>

      {/* Strategy Selection Modal */}
      {showStrategyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style={{zIndex: 9999}}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Choose a Classical Strategy</h2>
                <button
                  onClick={() => setShowStrategyModal(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="mt-2 text-blue-100">Select a strategy to run 1000 rounds of simulation</p>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {strategies.map((strategy, index) => (
                <div
                  key={strategy.name}
                  className="glass rounded-xl p-6 hover:scale-105 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-400"
                  onClick={() => handleStrategySelect(strategy)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <span className="text-3xl">🎯</span>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {strategy.display_name}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {strategy.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-blue-600">Alice:</span>
                      <span className="text-sm text-gray-700">{strategy.alice_strategy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-teal-600">Bob:</span>
                      <span className="text-sm text-gray-700">{strategy.bob_strategy}</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 py-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200">
                    Select & Run
                  </button>
                </div>
              ))}
            </div>

            <div className="bg-gray-50 p-4 rounded-b-2xl text-center">
              <p className="text-sm text-gray-600">
                💡 All classical strategies achieve approximately 75% win rate - the classical limit
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
