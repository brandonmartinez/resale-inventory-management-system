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

// Cosmos
output cosmosDbResourceGroupName string = 'rg-${envreg}-cosmos'
output cosmosDbAccountName string = 'cosmos-${envreg}-db'

// Functions
output functionsResourceGroupName string = 'rg-${envreg}-functions'
