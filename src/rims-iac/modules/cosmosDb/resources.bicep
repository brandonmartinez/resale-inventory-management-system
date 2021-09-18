// Parameters
//////////////////////////////////////////////////
param cosmosDbAccountName string

// Cosmos DB
//////////////////////////////////////////////////
resource cosmosDbAccount 'Microsoft.DocumentDB/databaseAccounts@2021-03-15' = {
  name: cosmosDbAccountName
  location: resourceGroup().location
  kind: 'GlobalDocumentDB'
  properties: {
    consistencyPolicy: {
      defaultConsistencyLevel: 'Eventual'
      maxStalenessPrefix: 1
      maxIntervalInSeconds: 5
    }
    locations: [
      {
        locationName: resourceGroup().location
        failoverPriority: 0
      }
    ]
    databaseAccountOfferType: 'Standard'
    enableAutomaticFailover: true
    capabilities: [
      {
        name: 'EnableTable'
      }
    ]
  }
}
