// Scope
//////////////////////////////////////////////////
targetScope = 'subscription'

// Parameters
//////////////////////////////////////////////////
param location string
param storageResourceGroupName string
param storageFrontEndStorageAccountName string

// Resource Group
//////////////////////////////////////////////////
resource storageResourceGroup 'Microsoft.Resources/resourceGroups@2021-01-01' = {
  name: storageResourceGroupName
  location: location
}

// Storage Account
//////////////////////////////////////////////////
resource nsgFlowLogsStorageAccount 'Microsoft.Storage/storageAccounts@2021-01-01' existing = {
  scope: storageResourceGroup
  name: storageFrontEndStorageAccountName
}
