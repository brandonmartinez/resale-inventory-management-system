#!/bin/bash

SCRIPT_FULL_PATH=$(dirname "$0")
cd $SCRIPT_FULL_PATH

# Start Server
http-server --cors ./ -p 80