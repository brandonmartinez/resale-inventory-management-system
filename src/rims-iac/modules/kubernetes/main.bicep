// Scope
//////////////////////////////////////////////////
targetScope = 'subscription'

// Parameters
//////////////////////////////////////////////////
param location string
param kubernetesClusterResourceGroupName string
param kubernetesClusterName string
param kubernetesClusterDNSName string
param kubernetesNodeResourceGroupName string

// Resource Group
//////////////////////////////////////////////////
resource kubernetesClusterResourceGroup 'Microsoft.Resources/resourceGroups@2021-01-01' = {
  name: kubernetesClusterResourceGroupName
  location: location
}

// Primary Module
//////////////////////////////////////////////////
module resources 'resources.bicep' = {
  name: 'resources'
  scope: kubernetesClusterResourceGroup
  params: {
    kubernetesClusterName: kubernetesClusterName
    kubernetesClusterDNSName: kubernetesClusterDNSName
    location: location
  }
}

// output cosmosDbResourceId string = resources.outputs.cosmosDbResourceId
