// Parameters
//////////////////////////////////////////////////
param containerRegistryName string

// Container Registry
//////////////////////////////////////////////////
resource containerRegistry 'Microsoft.ContainerRegistry/registries@2021-06-01-preview' = {
  name: containerRegistryName
  location: resourceGroup().location
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: true
  }
}

output containerRegistryResourceId string = containerRegistry.id
