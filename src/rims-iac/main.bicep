// Scope
//////////////////////////////////////////////////
targetScope = 'subscription'

// Parameters
//////////////////////////////////////////////////
param environment string
param region string

// Name Module Import
//////////////////////////////////////////////////
module names 'modules/_names.bicep' = {
  name: 'names'
  params: {
    environment: environment
    region: region
  }
}

// Modules
//////////////////////////////////////////////////

module storageAccounts 'modules/storage.bicep' = {
  name: 'storage'
  params: {
    location: region
    storageResourceGroupName: names.outputs.storageResourceGroupName
    storageFrontEndStorageAccountName: names.outputs.storageFrontEndStorageAccountName
  }
}
