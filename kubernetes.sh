#!/usr/bin/env bash

set -e

set -o allexport
source .env
set +o allexport

# Base64 Encode Secrets
AZUREWEBJOBSSTORAGE=$(echo $AZUREWEBJOBSSTORAGE | base64 -)
COSMOSDBCONNECTIONSTRING=$(echo $COSMOSDBCONNECTIONSTRING | base64 -)
ASSETSSTORAGECONNECTIONSTRING=$(echo $ASSETSSTORAGECONNECTIONSTRING | base64 -)

echo "Applying Nginx Ingress Controller"
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.4/deploy/static/provider/baremetal/deploy.yaml

echo "Applying RIMS Service Stack"
envsubst < kubernetes.yml | kubectl apply -f -
