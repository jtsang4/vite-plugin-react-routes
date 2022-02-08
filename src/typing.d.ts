export interface UserOptons {
  routesFile?: string
}

export interface RouteConfig {
  path: string
  layout?: string
  component?: string
  children?: RouteConfig[]
}
