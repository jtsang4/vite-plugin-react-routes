import type { RouteConfig } from '../typing'
import { transformRouteConfigToCode } from './dynamic-generator'
import { generateCodeByImportAndRouteCode } from './temaplte-generator'

export function generateCode(routesConfig: RouteConfig[]): string {
  const { importCode, routesCode } = transformRouteConfigToCode(routesConfig)
  return generateCodeByImportAndRouteCode(importCode, routesCode)
}
