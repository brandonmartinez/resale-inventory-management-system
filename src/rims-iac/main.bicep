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
module storageAccounts 'modules/storage/main.bicep' = {
  name: 'storageAccounts'
  params: {
    location: region
    storageResourceGroupName: names.outputs.storageResourceGroupName
    storageFrontEndStorageAccountName: names.outputs.storageFrontEndStorageAccountName
  }
}


module cosmosDb 'modules/cosmosDb/main.bicep' = {
  name: 'cosmosDb'
  params: {
    location: region
    cosmosDbResourceGroupName: names.outputs.cosmosDbResourceGroupName
    cosmosDbAccountName: names.outputs.cosmosDbAccountName
  }
}