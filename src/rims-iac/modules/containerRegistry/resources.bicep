// Parameters
//////////////////////////////////////////////////
param containerRegistryName string
param location string = resourceGroup().location

// Container Registry
//////////////////////////////////////////////////
resource containerRegistry 'Microsoft.ContainerRegistry/registries@2021-06-01-preview' = {
  name: containerRegistryName
  location: location
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: true
  }
}

output containerRegistryResourceId string = containerRegistry.id
