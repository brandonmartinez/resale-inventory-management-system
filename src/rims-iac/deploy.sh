#!/usr/bin/env bash

##################################################
# RIMS Deployment Script
# Requires `az` CLI to be installed and logged in
# with `az login`
##################################################

# Parameters
##################################################
ENVIRONMENT=$1
REGION=$2

# Execute
##################################################
echo "Deploying RIMS $ENVIRONMENT Infrastructure to $REGION"

az deployment sub create -n "RIMS-Infrastructure" --template-file "main.bicep" --location $REGION --parameters environment=$ENVIRONMENT region=$REGION

echo "Completed Deployment of RIMS $ENVIRONMENT Infrastructure to $REGION"
