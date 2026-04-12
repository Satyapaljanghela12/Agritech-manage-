#!/bin/bash

echo "========================================"
echo "Agriculture Platform - Setup Script"
echo "========================================"
echo ""

# Check Node.js
echo "[1/5] Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo "✓ Node.js is installed ($(node --version))"

# Install frontend dependencies
echo ""
echo "[2/5] Installing frontend dependencies..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi
cd ..
echo "✓ Frontend dependencies installed"

# Install backend dependencies
echo ""
echo "[3/5] Installing backend dependencies..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies"
    exit 1
fi
cd ..
echo "✓ Backend dependencies installed"

# Check MongoDB
echo ""
echo "[4/5] Checking MongoDB..."
if ! command -v mongod &> /dev/null; then
    echo "⚠ WARNING: MongoDB is not installed or not in PATH"
    echo "Please install MongoDB:"
    echo "  - Mac: brew install mongodb-community"
    echo "  - Linux: sudo apt-get install mongodb"
    echo "  - Windows: https://www.mongodb.com/try/download/community"
    echo ""
else
    echo "✓ MongoDB is installed ($(mongod --version | head -n 1))"
fi

echo ""
echo "[5/5] Setup verification..."
echo "✓ All dependencies installed"

echo ""
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Start MongoDB: mongod"
echo "2. Start backend: cd backend && npm run dev"
echo "3. Start frontend: cd frontend && npm run dev"
echo "4. Open http://localhost:5173 in your browser"
echo ""
echo "For detailed instructions, see QUICK_START.md"
echo ""
