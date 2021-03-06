// Scope
//////////////////////////////////////////////////
targetScope = 'subscription'

// Parameters
//////////////////////////////////////////////////
param environment string
param region string
param directoryName string

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
module storage 'modules/storage/main.bicep' = {
  name: 'storage'
  params: {
    location: region
    storageResourceGroupName: names.outputs.storageResourceGroupName
    storageFrontEndStorageAccountName: names.outputs.storageFrontEndStorageAccountName
    storageAssetsStorageAccountName: names.outputs.storageAssetsStorageAccountName
    storageWebJobsAccountName: names.outputs.storageWebJobsAccountName
  }
}

module cosmosDb 'modules/cosmosDb/main.bicep' = {
  name: 'cosmosDb'
  params: {
    location: region
    cosmosDbResourceGroupName: names.outputs.cosmosDbResourceGroupName
    cosmosDbAccountName: names.outputs.cosmosDbAccountName
    cosmosDbDatabaseName: names.outputs.cosmosDbDatabaseName
  }
}

module dashboards 'modules/dashboards/main.bicep' = {
  name: 'dashboards'
  params: {
    location: region
    directoryName: directoryName
    dashboardsResourceGroupName: names.outputs.dashboardsResourceGroupName
    dashboardsProductionResourcesName: names.outputs.dashboardsProductionResourcesName
    dashboardsProductionResourcesFriendlyName: names.outputs.dashboardsProductionResourcesFriendlyName
    cosmosDbResourceId: cosmosDb.outputs.cosmosDbResourceId
    storageFrontEndStorageAccountResourceId: storage.outputs.storageFrontEndStorageAccountResourceId
    storageAssetsStorageAccountResourceId: storage.outputs.storageAssetsStorageAccountResourceId
  }
}
