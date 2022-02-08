import type { RouteConfig } from '../typing'
import {
  transformAbsPathToComponentName,
  transformRelativePathToAbsPath,
} from '../util/path-util'

function transformAbsPathComponentPairsToImportCode(
  absPathComponentPairs: [string, string][],
): string {
  return absPathComponentPairs
    .map((item) => {
      const [absPath, componentName] = item
      return `import ${componentName} from '${absPath}';`
    })
    .join('\n')
}

function trasnformRouteConfigItemToCode(
  routesConfig: RouteConfig[],
  pathComponentNameMap: Record<string, string>,
): string {
  const resultCodeItems: string[] = []
  routesConfig.forEach((routeConfig) => {
    if (!routeConfig.path) {
      throw new Error('"path" must be defined in route')
    }
    if (
      routeConfig.layout &&
      routeConfig.children &&
      routeConfig.children.length
    ) {
      const codeItem = `
      {
        path: '${routeConfig.path}',
        children: ${trasnformRouteConfigItemToCode(
    routeConfig.children.map(item => ({
      layout: routeConfig.layout,
      ...item,
    })),
    pathComponentNameMap,
  )},
      }
      `
      resultCodeItems.push(codeItem)
    }
    else if (routeConfig.component) {
      const ComponentName = pathComponentNameMap[routeConfig.component]
      if (routeConfig.layout) {
        const LayoutComponentName = pathComponentNameMap[routeConfig.layout]
        const codeItem = `
        {
          path: '${routeConfig.path}',
          element: (
            <${LayoutComponentName}>
              <${ComponentName} />
            </${LayoutComponentName}>
          ),
        }
        `
        resultCodeItems.push(codeItem)
      }
      else {
        const codeItem = `
        {
          path: '${routeConfig.path}',
          element: <${ComponentName} />,
        }
        `
        resultCodeItems.push(codeItem)
      }
    }
  })
  return `[${resultCodeItems.join(',\n')}]`
}

function flatAllRelativePath(routesConfig: RouteConfig[]): string[] {
  const pathResult: string[] = []
  routesConfig.forEach((routeConfig) => {
    if (
      routeConfig.layout &&
      routeConfig.children &&
      routeConfig.children.length
    ) {
      const childrenResult = flatAllRelativePath(routeConfig.children)
      pathResult.push(routeConfig.layout)
      pathResult.push(...childrenResult)
    }
    else if (routeConfig.component && routeConfig.path) {
      pathResult.push(routeConfig.component)
    }
  })
  return Array.from(new Set([...pathResult]))
}

export function transformRouteConfigToCode(routesConfig: RouteConfig[]): {
  importCode: string
  routesCode: string
} {
  const allRelativePaths = flatAllRelativePath(routesConfig)
  const pathComponentNamePairs = allRelativePaths.map((relativePath) => {
    const absPath = transformRelativePathToAbsPath(relativePath)
    return [relativePath, absPath, transformAbsPathToComponentName(absPath)]
  })
  const relPathComponentNameMap = Object.fromEntries(
    pathComponentNamePairs.map(item => [item[0], item[2]]),
  )
  const routesCode = trasnformRouteConfigItemToCode(
    routesConfig,
    relPathComponentNameMap,
  )
  const absPathComponentPairs: [string, string][] = pathComponentNamePairs.map(
    item => [item[1], item[2]],
  )
  const importCode = transformAbsPathComponentPairsToImportCode(
    absPathComponentPairs,
  )

  return { routesCode, importCode }
}
