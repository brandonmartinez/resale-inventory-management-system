#!/usr/bin/env bash

SCRIPT_FULL_PATH=$(dirname "$0")
cd $SCRIPT_FULL_PATH

# Export Environment Variables to .env
echo "API_URI=$API_URI" | tee .env > /dev/null

# Execute Environment Script
./env.sh

# Start Server
http-server --cors ./ -p 80