// Parameters
//////////////////////////////////////////////////
param storageFrontEndStorageAccountName string
param storageAssetsStorageAccountName string
param storageWebJobsAccountName string

// Storage Accounts
//////////////////////////////////////////////////
resource storageWebJobsAccount 'Microsoft.Storage/storageAccounts@2021-04-01' = {
  kind: 'StorageV2'
  location: resourceGroup().location
  name: storageWebJobsAccountName
  sku: {
    name: 'Standard_LRS'
  }
  properties: {
    allowBlobPublicAccess: false
    accessTier: 'Hot'
  }
}
resource storageFrontEndStorageAccount 'Microsoft.Storage/storageAccounts@2021-04-01' = {
  kind: 'StorageV2'
  location: resourceGroup().location
  name: storageFrontEndStorageAccountName
  sku: {
    name: 'Standard_LRS'
  }
  properties: {
    allowBlobPublicAccess: true
    accessTier: 'Hot'
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
    accessTier: 'Hot'
  }
}

resource storageAssetsInventoryItemImageUploadsContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-04-01' = {
  name: '${storageAssetsStorageAccount.name}/default/inventoryitemimageuploads'
  properties: {
    publicAccess: 'None'
  }
}

resource storageAssetsInventoryItemImageUploadsQueue 'Microsoft.Storage/storageAccounts/queueServices/queues@2021-04-01' = {
  name: '${storageAssetsStorageAccount.name}/default/inventoryitemimageuploads-cleanup'
}

resource storageAssetsInventoryItemImagesContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-04-01' = {
  name: '${storageAssetsStorageAccount.name}/default/inventoryitemimages'
  properties: {
    publicAccess: 'Blob'
  }
}

output storageFrontEndStorageAccountResourceId string = storageFrontEndStorageAccount.id
output storageAssetsStorageAccountResourceId string = storageAssetsStorageAccount.id
