@echo off
echo ========================================
echo Agriculture Platform - Windows Setup
echo ========================================
echo.

echo [1/5] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed

echo.
echo [2/5] Installing frontend dependencies...
cd frontend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo [3/5] Installing backend dependencies...
cd backend
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
cd ..

echo.
echo [4/5] Checking MongoDB...
mongod --version >nul 2>&1
if errorlevel 1 (
    echo WARNING: MongoDB is not installed or not in PATH
    echo Please install MongoDB from https://www.mongodb.com/try/download/community
    echo.
) else (
    echo MongoDB is installed
)

echo.
echo [5/5] Setup verification...
echo All dependencies installed

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Make sure MongoDB is running
echo 2. Open a terminal and run: cd backend ^&^& npm run dev
echo 3. Open another terminal and run: cd frontend ^&^& npm run dev
echo 4. Open http://localhost:5173 in your browser
echo.
pause
