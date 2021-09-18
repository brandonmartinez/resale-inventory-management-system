// Parameters
//////////////////////////////////////////////////
param cosmosDbAccountName string
param cosmosDbDatabaseName string

// Variables
//////////////////////////////////////////////////
var cosmosDbDatabaseContainerNames = [
  'Inventory'
  'Spaces'
  'Assets'
  'Labels'
  'Users'
]

// Cosmos DB
//////////////////////////////////////////////////
resource cosmosDbAccount 'Microsoft.DocumentDB/databaseAccounts@2021-06-15' = {
  name: cosmosDbAccountName
  location: resourceGroup().location
  kind: 'GlobalDocumentDB'
  properties: {
    enableFreeTier: true
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
    }
    locations: [
      {
        locationName: resourceGroup().location
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

resource cosmosDbDatabase 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases@2021-06-15' = {
  parent: cosmosDbAccount
  name: cosmosDbDatabaseName
  properties: {
    resource: {
      id: cosmosDbDatabaseName
    }
    options: {
      throughput: 400
    }
  }
}

resource cosmosDbDatabaseContainers 'Microsoft.DocumentDB/databaseAccounts/sqlDatabases/containers@2021-06-15' = [for cosmosDbDatabaseContainerName in cosmosDbDatabaseContainerNames: {
  parent: cosmosDbDatabase
  name: cosmosDbDatabaseContainerName
  properties: {
    resource: {
      id: cosmosDbDatabaseContainerName
      partitionKey: {
        paths: [
          '/id'
        ]
        kind: 'Hash'
      }
      indexingPolicy: {
        indexingMode: 'consistent'
        includedPaths: [
          {
            path: '/*'
          }
        ]
      }
    }
    options: {
      throughput: 400
    }
  }
}]
