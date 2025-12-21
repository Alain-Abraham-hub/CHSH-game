# 🎮 CHSH Quantum Game

An interactive web-based game demonstrating quantum advantage through the CHSH (Clauser-Horne-Shimony-Holt) inequality. Watch quantum mechanics beat classical physics in real-time!

![Game Theme: Quantum vs Classical](https://img.shields.io/badge/Theme-Quantum_vs_Classical-00ffff?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-Python_+_Flask_+_Qiskit-ff00ff?style=for-the-badge)

## 🌟 Features

- **⚛️ Quantum Strategy**: Uses Bell pair entanglement to achieve ~85% win rate
- **🎲 Classical Strategy**: Best classical approach limited to 75% wins
- **🎨 Cyberpunk UI**: Beautiful game-themed interface with animated backgrounds
- **📊 Real-time Stats**: Live visualization of win rates and performance
- **📈 Comparison Dashboard**: Side-by-side quantum vs classical results
- **🎯 Interactive Controls**: Adjust simulation parameters on the fly

## 🎯 What is CHSH?

The CHSH game is a test of quantum mechanics where:
- Two players (Alice & Bob) receive random inputs (x, y) from a referee
- They must output bits (a, b) without communicating
- **Win condition**: `a ⊕ b = x · y`

### The Quantum Advantage

- **Classical limit**: Maximum 75% win rate (proven mathematical bound)
- **Quantum strategy**: ~85.4% win rate using entangled particles
- **This proves**: Quantum mechanics genuinely differs from classical physics!

## 🚀 Quick Start

### Option 1: Use the run script (Easiest)

```bash
./run.sh
```

### Option 2: Manual setup

```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python app.py
```

### Option 3: Direct Python execution

```bash
# Install dependencies
pip install flask flask-cors qiskit qiskit-aer

# Run the server
python app.py
```

## 🎮 How to Play

1. **Open your browser** to `http://localhost:5000`
2. **Choose a mode**: Quantum (⚛️) or Classical (🎲)
3. **Set rounds**: Enter number of simulation rounds (100-100,000)
4. **Start simulation**: Watch the quantum advantage in action!
5. **Compare results**: Run both modes to see the difference

## 📁 Project Structure

```
CHSH-game/
├── app.py                          # Flask web server
├── requirements.txt                # Python dependencies
├── run.sh                          # Quick start script
├── backend/
│   ├── classical/
│   │   ├── classical_simulation.py # Classical strategy simulation
│   │   └── classical_strategy.py   # Strategy implementations
│   └── Quantum/
│       ├── bell_pair.py            # Bell state creation
│       ├── measurements.py         # Quantum measurements
│       └── Quantum_simulation.py   # Quantum strategy simulation
└── frontend/
    ├── index.html                  # Main game interface
    └── static/
        ├── css/
        │   └── styles.css          # Game-themed styling
        └── js/
            └── game.js             # Frontend game logic
```

## 🔬 The Science Behind It

### Quantum Strategy
- Creates a **Bell pair**: `|Φ+⟩ = (|00⟩ + |11⟩) / √2`
- **Alice's measurements**: 0° or 90° rotations based on input x
- **Bob's measurements**: +45° or -45° rotations based on input y
- **Result**: Exploits quantum entanglement to beat classical bounds!

### Classical Strategy
- Uses deterministic lookup tables
- Best strategy: outputs follow `a = x`, `b = 0`
- **Theoretical maximum**: 75% (3/4 of all input combinations)

## 🎨 Frontend Features

- **Animated starfield background** for space/quantum theme
- **Real-time statistics** with progress bars
- **Glowing neon effects** inspired by cyberpunk aesthetics
- **Responsive design** works on desktop and mobile
- **Interactive modal** explaining game rules
- **Live log system** tracking all simulation events

## 🧪 API Endpoints

### `POST /api/simulate`
Run a single simulation
```json
{
  "mode": "quantum",  // or "classical"
  "rounds": 1000
}
```

### `POST /api/compare`
Run both simulations for comparison
```json
{
  "rounds": 1000
}
```

### `GET /api/health`
Health check endpoint

## 📊 Expected Results

| Mode | Win Rate | Status |
|------|----------|--------|
| Quantum | ~85.4% | ⚡ Beats classical limit |
| Classical | ~75% | 🎲 At theoretical maximum |

## 🛠️ Technologies Used

- **Backend**: Python, Flask, Qiskit, Qiskit Aer
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Quantum Computing**: IBM Qiskit framework
- **Styling**: Custom CSS with cyberpunk/quantum theme

## 📝 License

See LICENSE file for details.

## 🎓 Learn More

- [CHSH Inequality (Wikipedia)](https://en.wikipedia.org/wiki/CHSH_inequality)
- [Bell's Theorem](https://en.wikipedia.org/wiki/Bell%27s_theorem)
- [Qiskit Documentation](https://qiskit.org/documentation/)

## 🤝 Contributing

Feel free to open issues or submit pull requests to improve the game!

---

**Made with ⚛️ and quantum entanglement**