#!/bin/bash
set -euo pipefail

echo "Installing root dependencies..."
npm install --legacy-peer-deps

echo "Building frontend to client/dist..."
npm run build
