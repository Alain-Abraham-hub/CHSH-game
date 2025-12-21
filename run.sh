#!/bin/bash

# CHSH Quantum Game - Quick Start Script

echo "🎮 CHSH Quantum Game - Setup & Launch"
echo "========================================"
echo ""

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

echo "🔧 Activating virtual environment..."
source venv/bin/activate

echo "📥 Installing dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 Starting CHSH Quantum Game Server..."
echo ""
python app.py
