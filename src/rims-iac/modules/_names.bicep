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
output storageAssetsStorageAccountName string = replace('sa-${envreg}-assets', '-', '')
output storageFrontEndStorageAccountName string = replace('sa-${envreg}-frontend', '-', '')
output storageWebJobsAccountName string = replace('sa-${envreg}-webjobs', '-', '')

// Cosmos
output cosmosDbResourceGroupName string = 'rg-${envreg}-cosmos'
output cosmosDbAccountName string = 'cosmos-${envreg}-db'
output cosmosDbDatabaseName string = 'rims'

// Kubernetes
output kubernetesClusterResourceGroupName string = 'rg-${envreg}-aks'
output kubernetesClusterName string = 'aks-${envreg}-cluster'
output kubernetesClusterDNSName string = 'aks-${envreg}-cluster-dns'
output kubernetesNodeResourceGroupName string = 'rg-${envreg}-aks-nodes'

// Dashboard
output dashboardsResourceGroupName string = 'rg-${envreg}-dashboards'
output dashboardsProductionResourcesName string = 'dshbd-${envreg}-production'
output dashboardsProductionResourcesFriendlyName string = 'RIMS Production Dashboard'
