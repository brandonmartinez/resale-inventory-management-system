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

// Primary Module
//////////////////////////////////////////////////
module resources 'resources.bicep' = {
  name: 'resources'
  scope: storageResourceGroup
  params: {
    storageFrontEndStorageAccountName: storageFrontEndStorageAccountName
  }
}