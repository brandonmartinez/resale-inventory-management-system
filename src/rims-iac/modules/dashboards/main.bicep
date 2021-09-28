// Scope
//////////////////////////////////////////////////
targetScope = 'subscription'

// Parameters
//////////////////////////////////////////////////
param location string
param directoryName string
param dashboardsResourceGroupName string
param dashboardsProductionResourcesName string
param dashboardsProductionResourcesFriendlyName string
param cosmosDbResourceId string

// Resource Group
//////////////////////////////////////////////////
resource dashboardsResourceGroup 'Microsoft.Resources/resourceGroups@2021-01-01' = {
  name: dashboardsResourceGroupName
  location: location
}

// Primary Module
//////////////////////////////////////////////////
module resources 'resources.bicep' = {
  name: 'resources'
  scope: dashboardsResourceGroup
  params: {
    directoryName: directoryName
    dashboardsProductionResourcesName: dashboardsProductionResourcesName
    dashboardsProductionResourcesFriendlyName: dashboardsProductionResourcesFriendlyName
    cosmosDbResourceId: cosmosDbResourceId
  }
}
