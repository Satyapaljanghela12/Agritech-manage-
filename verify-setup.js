#!/usr/bin/env node

/**
 * Setup Verification Script
 * Run this to verify your installation is correct
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

const checks = {
  passed: [],
  failed: [],
  warnings: []
};

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    error: '\x1b[31m',
    warning: '\x1b[33m',
    reset: '\x1b[0m'
  };
  console.log(`${colors[type]}${message}${colors.reset}`);
}

async function checkNodeVersion() {
  try {
    const { stdout } = await execAsync('node --version');
    const version = parseInt(stdout.trim().slice(1).split('.')[0]);
    if (version >= 18) {
      checks.passed.push('Node.js version >= 18');
      log('✓ Node.js version is compatible', 'success');
    } else {
      checks.failed.push('Node.js version < 18');
      log('✗ Node.js version should be 18 or higher', 'error');
    }
  } catch (error) {
    checks.failed.push('Node.js not found');
    log('✗ Node.js is not installed', 'error');
  }
}

async function checkMongoDB() {
  try {
    await execAsync('mongod --version');
    checks.passed.push('MongoDB installed');
    log('✓ MongoDB is installed', 'success');
  } catch (error) {
    checks.failed.push('MongoDB not found');
    log('✗ MongoDB is not installed', 'error');
  }
}

function checkBackendFiles() {
  const requiredFiles = [
    'backend/package.json',
    'backend/.env',
    'backend/src/server.js',
    'backend/src/config/database.js',
    'backend/src/config/passport.js'
  ];

  let allPresent = true;
  for (const file of requiredFiles) {
    if (fs.existsSync(file)) {
      log(`✓ ${file} exists`, 'success');
    } else {
      log(`✗ ${file} is missing`, 'error');
      checks.failed.push(`Missing: ${file}`);
      allPresent = false;
    }
  }

  if (allPresent) {
    checks.passed.push('All backend files present');
  }
}

function checkFrontendFiles() {
  const requiredFiles = [
    'frontend/package.json',
    'frontend/src/lib/api.ts',
    'frontend/src/contexts/AuthContext.tsx',
    'frontend/src/components/GoogleAuthButton.tsx',
    'frontend/src/pages/AuthCallback.tsx'
  ];

  let allPresent = true;
  for (const file of requiredFiles) {
    if (fs.existsSync(file)) {
      log(`✓ ${file} exists`, 'success');
    } else {
      log(`✗ ${file} is missing`, 'error');
      checks.failed.push(`Missing: ${file}`);
      allPresent = false;
    }
  }

  if (allPresent) {
    checks.passed.push('All frontend files present');
  }
}

function checkEnvFile() {
  const envPath = 'backend/.env';
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const requiredVars = [
      'PORT',
      'MONGODB_URI',
      'JWT_SECRET',
      'GOOGLE_CLIENT_ID',
      'GOOGLE_CLIENT_SECRET'
    ];

    let allPresent = true;
    for (const varName of requiredVars) {
      if (envContent.includes(varName)) {
        log(`✓ ${varName} is configured`, 'success');
      } else {
        log(`✗ ${varName} is missing from .env`, 'error');
        checks.failed.push(`Missing env var: ${varName}`);
        allPresent = false;
      }
    }

    if (allPresent) {
      checks.passed.push('All environment variables configured');
    }
  } else {
    checks.failed.push('backend/.env file not found');
    log('✗ backend/.env file is missing', 'error');
  }
}

function checkDependencies() {
  if (fs.existsSync('frontend/node_modules')) {
    checks.passed.push('Frontend dependencies installed');
    log('✓ Frontend dependencies installed', 'success');
  } else {
    checks.warnings.push('Frontend dependencies not installed');
    log('⚠ Run "npm install" in frontend directory', 'warning');
  }

  if (fs.existsSync('backend/node_modules')) {
    checks.passed.push('Backend dependencies installed');
    log('✓ Backend dependencies installed', 'success');
  } else {
    checks.warnings.push('Backend dependencies not installed');
    log('⚠ Run "npm install" in backend directory', 'warning');
  }
}

async function main() {
  log('\n🔍 Verifying Agriculture Platform Setup...\n', 'info');

  log('Checking Node.js...', 'info');
  await checkNodeVersion();

  log('\nChecking MongoDB...', 'info');
  await checkMongoDB();

  log('\nChecking backend files...', 'info');
  checkBackendFiles();

  log('\nChecking frontend files...', 'info');
  checkFrontendFiles();

  log('\nChecking environment variables...', 'info');
  checkEnvFile();

  log('\nChecking dependencies...', 'info');
  checkDependencies();

  log('\n' + '='.repeat(50), 'info');
  log('SUMMARY', 'info');
  log('='.repeat(50), 'info');

  log(`\n✓ Passed: ${checks.passed.length}`, 'success');
  if (checks.warnings.length > 0) {
    log(`⚠ Warnings: ${checks.warnings.length}`, 'warning');
  }
  if (checks.failed.length > 0) {
    log(`✗ Failed: ${checks.failed.length}`, 'error');
  }

  if (checks.failed.length === 0 && checks.warnings.length === 0) {
    log('\n🎉 All checks passed! You\'re ready to start the application.', 'success');
    log('\nNext steps:', 'info');
    log('1. Start MongoDB: mongod', 'info');
    log('2. Start backend: cd backend && npm run dev', 'info');
    log('3. Start frontend: cd frontend && npm run dev', 'info');
  } else if (checks.failed.length === 0) {
    log('\n⚠ Setup is mostly complete, but there are some warnings.', 'warning');
    log('Please address the warnings above before starting.', 'warning');
  } else {
    log('\n✗ Setup is incomplete. Please fix the errors above.', 'error');
  }

  log('');
}

main().catch(console.error);




