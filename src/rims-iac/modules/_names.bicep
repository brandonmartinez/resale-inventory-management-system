// Scope
//////////////////////////////////////////////////
targetScope = 'subscription'

// Parameters
//////////////////////////////////////////////////
param environment string
param region string

// Variables
//////////////////////////////////////////////////
var regionShortCodeMap = {
  eastus: 'eus'
}
var regionShortCode = regionShortCodeMap[toLower(region)]
var envreg = 'rims-${environment}-${regionShortCode}'

// Outputs
//////////////////////////////////////////////////

// Basics
output envreg string = envreg
output regionShortCode string = regionShortCode

// Storage
output storageResourceGroupName string = 'rg-${envreg}-storage'
output storageFrontEndStorageAccountName string = replace('sa-${envreg}-frontend', '-', '')

// Cosmos
output cosmosDbResourceGroupName string = 'rg-${envreg}-cosmos'

// Functions
output functionsResourceGroupName string = 'rg-${envreg}-functions'
