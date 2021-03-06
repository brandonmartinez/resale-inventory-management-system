// Scope
//////////////////////////////////////////////////
targetScope = 'subscription'

// Parameters
//////////////////////////////////////////////////
param location string
param cosmosDbResourceGroupName string
param cosmosDbAccountName string
param cosmosDbDatabaseName string

// Resource Group
//////////////////////////////////////////////////
resource cosmosDbResourceGroup 'Microsoft.Resources/resourceGroups@2021-01-01' = {
  name: cosmosDbResourceGroupName
  location: location
}

// Primary Module
//////////////////////////////////////////////////
module resources 'resources.bicep' = {
  name: 'resources'
  scope: cosmosDbResourceGroup
  params: {
    cosmosDbAccountName: cosmosDbAccountName
    cosmosDbDatabaseName: cosmosDbDatabaseName
  }
}

output cosmosDbResourceId string = resources.outputs.cosmosDbResourceId
