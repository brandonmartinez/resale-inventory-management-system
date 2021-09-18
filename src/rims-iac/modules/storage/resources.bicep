// Parameters
//////////////////////////////////////////////////
param storageFrontEndStorageAccountName string
param storageAssetsStorageAccountName string

// Storage Accounts
//////////////////////////////////////////////////
resource storageFrontEndStorageAccount 'Microsoft.Storage/storageAccounts@2021-04-01' = {
  kind: 'StorageV2'
  location: resourceGroup().location
  name: storageFrontEndStorageAccountName
  sku: {
    name: 'Standard_LRS'
  }
  properties: {
    allowBlobPublicAccess: true
  }
}

resource storageAssetsStorageAccount 'Microsoft.Storage/storageAccounts@2021-04-01' = {
  kind: 'StorageV2'
  location: resourceGroup().location
  name: storageAssetsStorageAccountName
  sku: {
    name: 'Standard_LRS'
  }
  properties: {
    allowBlobPublicAccess: true
  }
}
