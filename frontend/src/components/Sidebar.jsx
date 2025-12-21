import React, { useState, useEffect } from 'react';

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [backendStatus, setBackendStatus] = useState('checking');
  
  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/health', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
          setBackendStatus('connected');
        } else {
          setBackendStatus('error');
        }
      } catch (err) {
        setBackendStatus('disconnected');
      }
    };

    // Check immediately
    checkBackendStatus();
    
    // Check every 5 seconds
    const interval = setInterval(checkBackendStatus, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch(backendStatus) {
      case 'connected':
        return 'text-green-600';
      case 'disconnected':
        return 'text-red-600';
      case 'error':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = () => {
    switch(backendStatus) {
      case 'connected':
        return '🟢';
      case 'disconnected':
        return '🔴';
      case 'error':
        return '🟡';
      default:
        return '⚪';
    }
  };

  const getStatusText = () => {
    switch(backendStatus) {
      case 'connected':
        return 'Connected';
      case 'disconnected':
        return 'Disconnected';
      case 'error':
        return 'Error';
      default:
        return 'Checking...';
    }
  };

  const menuItems = [
    { id: 'about', icon: 'ℹ️', label: 'About CHSH' },
    { id: 'classical', icon: '🎲', label: 'Classical Simulation' },
    { id: 'quantum', icon: '⚛️', label: 'Quantum Simulation' },
    { id: 'probability', icon: '📊', label: 'Probability Tables' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-50 p-6 flex flex-col z-50 shadow-lg border-r border-gray-200">
      {/* Backend Status */}
      <div className="mb-8 p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{getStatusIcon()}</span>
          <h3 className="text-sm font-semibold text-gray-900">Backend Status</h3>
        </div>
        <p className={`text-xs font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          {backendStatus === 'connected' ? 'http://localhost:5001' : 'Attempting to connect...'}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
              activeSection === item.id
                ? 'bg-emerald-100 text-emerald-800'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom Info */}
      <div className="mt-auto pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          Demonstrating quantum advantage through Bell inequality violation
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
