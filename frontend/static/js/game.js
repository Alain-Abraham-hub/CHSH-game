// CHSH Quantum Game - Frontend Logic

class CHSHGame {
    constructor() {
        this.currentMode = 'quantum';
        this.isRunning = false;
        this.quantumResults = { wins: 0, total: 0 };
        this.classicalResults = { wins: 0, total: 0 };
        
        this.initializeElements();
        this.attachEventListeners();
        this.log('System initialized. Ready to challenge physics!', 'info');
    }

    initializeElements() {
        // Buttons
        this.startBtn = document.getElementById('startBtn');
        this.stopBtn = document.getElementById('stopBtn');
        this.clearLogBtn = document.getElementById('clearLog');
        this.rulesBtn = document.getElementById('rulesBtn');
        
        // Mode buttons
        this.modeBtns = document.querySelectorAll('.mode-btn');
        
        // Inputs
        this.roundsInput = document.getElementById('rounds');
        
        // Stats elements
        this.totalRoundsEl = document.getElementById('totalRounds');
        this.winRateEl = document.getElementById('winRate');
        this.winsEl = document.getElementById('wins');
        this.lossesEl = document.getElementById('losses');
        this.progressBar = document.getElementById('progressBar');
        
        // Comparison elements
        this.quantumWinRateEl = document.getElementById('quantumWinRate');
        this.classicalWinRateEl = document.getElementById('classicalWinRate');
        this.quantumBadgeEl = document.getElementById('quantumBadge');
        this.classicalBadgeEl = document.getElementById('classicalBadge');
        
        // Log
        this.logContent = document.getElementById('logContent');
        
        // Modal
        this.modal = document.getElementById('rulesModal');
        this.closeModal = document.querySelector('.close');
    }

    attachEventListeners() {
        // Start/Stop buttons
        this.startBtn.addEventListener('click', () => this.startSimulation());
        this.stopBtn.addEventListener('click', () => this.stopSimulation());
        
        // Mode selection
        this.modeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.modeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentMode = btn.dataset.mode;
                this.log(`Switched to ${this.currentMode.toUpperCase()} mode`, 'info');
            });
        });
        
        // Clear log
        this.clearLogBtn.addEventListener('click', () => this.clearLog());
        
        // Modal
        this.rulesBtn.addEventListener('click', () => this.modal.style.display = 'block');
        this.closeModal.addEventListener('click', () => this.modal.style.display = 'none');
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) this.modal.style.display = 'none';
        });
    }

    async startSimulation() {
        if (this.isRunning) return;
        
        const numRounds = parseInt(this.roundsInput.value);
        if (numRounds < 100 || numRounds > 100000) {
            this.log('Please enter a valid number of rounds (100-100000)', 'error');
            return;
        }
        
        this.isRunning = true;
        this.startBtn.style.display = 'none';
        this.stopBtn.style.display = 'block';
        
        this.log(`Starting ${this.currentMode.toUpperCase()} simulation with ${numRounds} rounds...`, 'info');
        
        try {
            const response = await fetch('/api/simulate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mode: this.currentMode,
                    rounds: numRounds
                })
            });
            
            if (!response.ok) {
                throw new Error('Simulation failed');
            }
            
            const data = await response.json();
            
            if (this.isRunning) {
                this.updateResults(data);
            }
        } catch (error) {
            this.log(`Error: ${error.message}`, 'error');
        } finally {
            this.stopSimulation();
        }
    }

    stopSimulation() {
        this.isRunning = false;
        this.startBtn.style.display = 'block';
        this.stopBtn.style.display = 'none';
        this.log('Simulation stopped', 'info');
    }

    updateResults(data) {
        const { mode, wins, total, win_rate } = data;
        
        // Update current mode stats
        if (mode === 'quantum') {
            this.quantumResults = { wins, total };
        } else {
            this.classicalResults = { wins, total };
        }
        
        // Update main stats display
        this.totalRoundsEl.textContent = total.toLocaleString();
        this.winsEl.textContent = wins.toLocaleString();
        this.lossesEl.textContent = (total - wins).toLocaleString();
        this.winRateEl.textContent = (win_rate * 100).toFixed(2) + '%';
        
        // Update progress bar
        this.progressBar.style.width = (win_rate * 100) + '%';
        
        // Change color based on performance
        if (win_rate > 0.80) {
            this.progressBar.style.background = 'linear-gradient(90deg, var(--accent-green), var(--quantum-primary))';
        } else if (win_rate > 0.75) {
            this.progressBar.style.background = 'linear-gradient(90deg, #ffaa00, #ffdd00)';
        } else {
            this.progressBar.style.background = 'linear-gradient(90deg, var(--accent-red), #ff6666)';
        }
        
        // Update comparison panel
        this.updateComparison();
        
        // Log result
        const verdict = this.getVerdict(mode, win_rate);
        this.log(`${mode.toUpperCase()}: ${(win_rate * 100).toFixed(2)}% win rate - ${verdict}`, 'success');
    }

    updateComparison() {
        // Update quantum stats
        if (this.quantumResults.total > 0) {
            const qRate = (this.quantumResults.wins / this.quantumResults.total) * 100;
            this.quantumWinRateEl.textContent = qRate.toFixed(1) + '%';
            
            if (qRate >= 84) {
                this.quantumBadgeEl.textContent = '⚡ OPTIMAL';
                this.quantumBadgeEl.style.background = 'linear-gradient(135deg, var(--accent-green), var(--quantum-primary))';
                this.quantumBadgeEl.style.color = 'var(--bg-darker)';
            } else if (qRate >= 80) {
                this.quantumBadgeEl.textContent = '✓ EXCELLENT';
                this.quantumBadgeEl.style.background = 'linear-gradient(135deg, #00aa88, #00ddaa)';
                this.quantumBadgeEl.style.color = 'var(--bg-darker)';
            } else if (qRate >= 75) {
                this.quantumBadgeEl.textContent = '~ GOOD';
                this.quantumBadgeEl.style.background = 'linear-gradient(135deg, #ffaa00, #ffdd00)';
                this.quantumBadgeEl.style.color = 'var(--bg-darker)';
            } else {
                this.quantumBadgeEl.textContent = '⚠ BELOW CLASSICAL';
                this.quantumBadgeEl.style.background = 'linear-gradient(135deg, var(--accent-red), #ff6666)';
                this.quantumBadgeEl.style.color = 'white';
            }
        }
        
        // Update classical stats
        if (this.classicalResults.total > 0) {
            const cRate = (this.classicalResults.wins / this.classicalResults.total) * 100;
            this.classicalWinRateEl.textContent = cRate.toFixed(1) + '%';
            
            if (cRate >= 74) {
                this.classicalBadgeEl.textContent = '✓ AT LIMIT';
                this.classicalBadgeEl.style.background = 'linear-gradient(135deg, var(--classical-secondary), var(--classical-primary))';
                this.classicalBadgeEl.style.color = 'white';
            } else if (cRate >= 70) {
                this.classicalBadgeEl.textContent = '~ NEAR LIMIT';
                this.classicalBadgeEl.style.background = 'linear-gradient(135deg, #cc0088, #ff00aa)';
                this.classicalBadgeEl.style.color = 'white';
            } else {
                this.classicalBadgeEl.textContent = '⚠ BELOW OPTIMAL';
                this.classicalBadgeEl.style.background = 'linear-gradient(135deg, #880044, #cc0066)';
                this.classicalBadgeEl.style.color = 'white';
            }
        }
    }

    getVerdict(mode, winRate) {
        if (mode === 'quantum') {
            if (winRate >= 0.84) return '🎉 Quantum supremacy achieved!';
            if (winRate >= 0.80) return '⚡ Excellent quantum advantage!';
            if (winRate >= 0.75) return '✓ Beat classical limit!';
            return '⚠️ Below classical threshold';
        } else {
            if (winRate >= 0.74) return '✓ At classical limit!';
            if (winRate >= 0.70) return '~ Near classical limit';
            return '⚠️ Below optimal classical';
        }
    }

    log(message, type = '') {
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        const timestamp = new Date().toLocaleTimeString();
        entry.textContent = `[${timestamp}] ${message}`;
        
        this.logContent.insertBefore(entry, this.logContent.firstChild);
        
        // Keep only last 50 entries
        while (this.logContent.children.length > 50) {
            this.logContent.removeChild(this.logContent.lastChild);
        }
    }

    clearLog() {
        this.logContent.innerHTML = '<div class="log-entry">Log cleared.</div>';
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CHSHGame();
});
