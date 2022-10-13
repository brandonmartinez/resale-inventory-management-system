// Scope
//////////////////////////////////////////////////
targetScope = 'subscription'

// Parameters
//////////////////////////////////////////////////
param location string
param containerRegistryResourceGroupName string
param containerRegistryName string

// Resource Group
//////////////////////////////////////////////////
resource containerRegistryResourceGroup 'Microsoft.Resources/resourceGroups@2021-01-01' = {
  name: containerRegistryResourceGroupName
  location: location
}

// Primary Module
//////////////////////////////////////////////////
module resources 'resources.bicep' = {
  name: 'resources'
  scope: containerRegistryResourceGroup
  params: {
    containerRegistryName: containerRegistryName
    location: location
  }
}

output containerRegistryResourceId string = resources.outputs.containerRegistryResourceId
