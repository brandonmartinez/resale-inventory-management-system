#!/usr/bin/env bash

##################################################
# RIMS Deployment Script
# Requires `az` CLI to be installed and logged in
# with `az login`
# Also requires `jq` to be installed:
# apt-get install jq
# or
# brew install jq
##################################################

# Parameters
##################################################
ENVIRONMENT=$1
REGION=$2

# Execute
##################################################
echo "Retrieving the Tenant Name"
AZURE_TOKEN_ID=$(az account get-access-token --resource-type ms-graph --query accessToken --output tsv)
TENANT_NAME=$(curl --header "Authorization: Bearer ${AZURE_TOKEN_ID}" --request GET 'https://graph.microsoft.com/v1.0/domains' | jq -r '.value[] | select(.isDefault == true) | {id}[]')

echo "Deploying RIMS $ENVIRONMENT Infrastructure to $REGION in $TENANT_NAME tenant"

az deployment sub create -n "RIMS-Infrastructure" --template-file "main.bicep" --location $REGION --parameters environment="$ENVIRONMENT" region="$REGION" directoryName="$TENANT_NAME"

echo "Completed Deployment of RIMS $ENVIRONMENT Infrastructure to $REGION"
