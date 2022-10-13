// Parameters
//////////////////////////////////////////////////
param kubernetesClusterName string
param kubernetesClusterDNSName string
param location string = resourceGroup().location

// AKS Cluster
//////////////////////////////////////////////////
resource kubernetesCluster 'Microsoft.ContainerService/managedClusters@2021-03-01' = {
  name: kubernetesClusterName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    kubernetesVersion: '1.19.7'
    dnsPrefix: kubernetesClusterDNSName
    enableRBAC: true
    agentPoolProfiles: [
      {
        name: 'agentpool'
        count: 3
        vmSize: 'Standard_B2s'
        osType: 'Linux'
        mode: 'System'
      }
    ]
    linuxProfile: {
      adminUsername: 'adminUserName'
      ssh: {
        publicKeys: [
          {
            keyData: 'REQUIRED'
          }
        ]
      }
    }
  }
}
