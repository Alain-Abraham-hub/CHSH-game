"""
Flask API server for the CHSH Quantum Game.
Provides endpoints to run quantum and classical simulations.
"""

from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import sys
import os

# Add backend directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'backend'))

app = Flask(__name__, static_folder='frontend/static', template_folder='frontend')
CORS(app)

@app.route('/')
def index():
    """Serve the main game interface"""
    return send_from_directory('frontend', 'index.html')

@app.route('/api/strategies', methods=['GET'])
def get_strategies():
    """
    Get available classical strategies.
    
    Returns:
    {
        "strategies": [
            {
                "name": str,
                "display_name": str,
                "description": str,
                "alice_strategy": str,
                "bob_strategy": str
            }
        ]
    }
    """
    strategies = [
        {
            "name": "always_zero",
            "display_name": "Always Output 0",
            "description": "Both Alice and Bob always output 0, regardless of input. This is the optimal classical strategy achieving 75% win rate.",
            "alice_strategy": "Always outputs 0",
            "bob_strategy": "Always outputs 0"
        },
        {
            "name": "always_one",
            "display_name": "Always Output 1",
            "description": "Both Alice and Bob always output 1, regardless of input. Achieves 75% win rate.",
            "alice_strategy": "Always outputs 1",
            "bob_strategy": "Always outputs 1"
        },
        {
            "name": "copy_input",
            "display_name": "Copy Input Strategy",
            "description": "Alice copies her input bit, Bob always outputs 0. This strategy achieves 75% win rate.",
            "alice_strategy": "Outputs her input bit",
            "bob_strategy": "Always outputs 0"
        },
        {
            "name": "inverted_input",
            "display_name": "Inverted Input Strategy",
            "description": "Alice outputs the opposite of her input, Bob always outputs 0. Also achieves 75% win rate.",
            "alice_strategy": "Outputs NOT(input)",
            "bob_strategy": "Always outputs 0"
        }
    ]
    return jsonify({'strategies': strategies})

@app.route('/api/simulate', methods=['POST'])
def simulate():
    """
    Run a simulation based on the requested mode.
    
    Expected JSON payload:
    {
        "mode": "quantum" | "classical",
        "rounds": int,
        "strategy": str (optional, for classical mode)
    }
    
    Returns:
    {
        "mode": str,
        "wins": int,
        "total": int,
        "win_rate": float,
        "strategy": str (if classical)
    }
    """
    try:
        data = request.json
        mode = data.get('mode', 'quantum')
        num_rounds = int(data.get('rounds', 1000))
        strategy = data.get('strategy', 'always_zero')
        
        # Validate input
        if num_rounds < 100 or num_rounds > 100000:
            return jsonify({'error': 'Number of rounds must be between 100 and 100000'}), 400
        
        if mode not in ['quantum', 'classical']:
            return jsonify({'error': 'Mode must be "quantum" or "classical"'}), 400
        
        # Run simulation
        if mode == 'quantum':
            from backend.Quantum.Quantum_simulation import simulate as quantum_simulate
            win_rate = quantum_simulate(num_rounds)
            wins = int(win_rate * num_rounds)
            return jsonify({
                'mode': mode,
                'wins': wins,
                'total': num_rounds,
                'win_rate': win_rate
            })
        else:
            # Use specified classical strategy
            from backend.classical.classical_simulation import simulate as classical_simulate
            win_rate = classical_simulate(strategy, num_rounds)
            wins = int(win_rate * num_rounds)
            return jsonify({
                'mode': mode,
                'strategy': strategy,
                'wins': wins,
                'total': num_rounds,
                'win_rate': win_rate
            })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/compare', methods=['POST'])
def compare():
    """
    Run both quantum and classical simulations for comparison.
    
    Expected JSON payload:
    {
        "rounds": int
    }
    
    Returns:
    {
        "quantum": {...},
        "classical": {...}
    }
    """
    try:
        data = request.json
        num_rounds = int(data.get('rounds', 1000))
        
        # Validate input
        if num_rounds < 100 or num_rounds > 100000:
            return jsonify({'error': 'Number of rounds must be between 100 and 100000'}), 400
        
        # Run both simulations
        from backend.Quantum.Quantum_simulation import simulate as quantum_simulate
        from backend.classical.classical_simulation import simulate as classical_simulate
        
        quantum_win_rate = quantum_simulate(num_rounds)
        classical_win_rate = classical_simulate('best', num_rounds)
        
        quantum_wins = int(quantum_win_rate * num_rounds)
        classical_wins = int(classical_win_rate * num_rounds)
        
        return jsonify({
            'quantum': {
                'mode': 'quantum',
                'wins': quantum_wins,
                'total': num_rounds,
                'win_rate': quantum_win_rate
            },
            'classical': {
                'mode': 'classical',
                'wins': classical_wins,
                'total': num_rounds,
                'win_rate': classical_win_rate
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'message': 'CHSH Game API is running'})

if __name__ == '__main__':
    print("🎮 Starting CHSH Quantum Game Server...")
    print("🌐 Open http://localhost:5001 in your browser")
    print("⚛️  Quantum vs Classical - Let the battle begin!")
    app.run(debug=True, host='0.0.0.0', port=5001)
