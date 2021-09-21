//////////////////////////////////////////////////
// Names for RIMS Resources
// Reference: https://bmtn.us/3hK1Tj5
//////////////////////////////////////////////////

// Scope
//////////////////////////////////////////////////
targetScope = 'subscription'

// Parameters
//////////////////////////////////////////////////
param environment string
param region string

// Variables
//////////////////////////////////////////////////
var environmentShortCodeMap = {
  production: 'prod'
}
var regionShortCodeMap = {
  eastus: 'eus'
  westus: 'wus'
  southcentralus: 'scus'
}
var environmentShortCode = environmentShortCodeMap[toLower(environment)]
var regionShortCode = regionShortCodeMap[toLower(region)]
var envreg = 'rims-${environmentShortCode}-${regionShortCode}'

// Outputs
//////////////////////////////////////////////////

// Basics
output envreg string = envreg
output environmentShortCode string = environmentShortCode
output regionShortCode string = regionShortCode

// Storage
output storageResourceGroupName string = 'rg-${envreg}-storage'
output storageFrontEndStorageAccountName string = replace('sa-${envreg}-frontend', '-', '')
output storageAssetsStorageAccountName string = replace('sa-${envreg}-assets', '-', '')

// Cosmos
output cosmosDbResourceGroupName string = 'rg-${envreg}-cosmos'
output cosmosDbAccountName string = 'cosmos-${envreg}-db'
output cosmosDbDatabaseName string = 'rims'

// Functions
output functionsResourceGroupName string = 'rg-${envreg}-functions'
