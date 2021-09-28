// Parameters
//////////////////////////////////////////////////
param directoryName string
param dashboardsProductionResourcesName string
param dashboardsProductionResourcesFriendlyName string
param cosmosDbResourceId string

// Dashboards
//////////////////////////////////////////////////
resource productionDashboard 'Microsoft.Portal/dashboards@2019-01-01-preview' = {
  name: dashboardsProductionResourcesName
  location: resourceGroup().location
  tags: {
    'hidden-title': dashboardsProductionResourcesFriendlyName
  }
  properties: {
    lenses: {
      '0': {
        order: 0
        parts: {
          '0': {
            position: {
              x: 0
              y: 0
              colSpan: 6
              rowSpan: 2
            }
            metadata: {
              type: 'Extension/HubsExtension/PartType/MarkdownPart'
              inputs: []
              settings: {
                content: {
                  settings: {
                    content: 'This dashbaord contains a quick look into all of the primary resources behind the RIMS production instance.\n\nTo access RIMS, visit http://localhost:3000/ (TODO: update to production URL).'
                    title: 'Resale Inventory Management System'
                    subtitle: 'Production Dashboard'
                    markdownSource: 1
                    markdownUri: null
                  }
                }
              }
            }
          }
          '1': {
            position: {
              x: 0
              y: 3
              colSpan: 6
              rowSpan: 1
            }
            metadata: {
              type: 'Extension/HubsExtension/PartType/MarkdownPart'
              inputs: []
              settings: {
                content: {
                  settings: {
                    content: ''
                    title: 'RIMS Data'
                    subtitle: 'Production Data Services and Metrics'
                    markdownSource: 1
                    markdownUri: null
                  }
                }
              }
            }
          }
          '2': {
            position: {
              x: 0
              y: 4
              colSpan: 1
              rowSpan: 1
            }
            metadata: {
              inputs: [
                {
                  name: 'assetInput'
                  value: cosmosDbResourceId
                }
              ]
              type: 'Extension/Microsoft_Azure_DocumentDB/PartType/GlobalDbAccountPart'
              asset: {
                idInputName: 'assetInput'
                type: 'DocumentDBDatabaseAccount'
              }
              deepLink: '#@${directoryName}/resource${cosmosDbResourceId}/overview'
            }
          }
        }
      }
    }
    metadata: {
      model: {
        timeRange: {
          value: {
            relative: {
              duration: 24
              timeUnit: 1
            }
          }
          type: 'MsPortalFx.Composition.Configuration.ValueTypes.TimeRange'
        }
      }
    }
  }
}
