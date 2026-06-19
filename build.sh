#!/bin/bash
if [ -d "client" ]; then
  echo "Standing in root directory. Moving to client..."
  cd client && npm install --legacy-peer-deps && npm run build
else
  echo "Already standing inside client directory. Building directly..."
  npm install --legacy-peer-deps && npm run build
fi
