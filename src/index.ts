import fs from 'fs'
import path from 'path'
import type { PluginOption } from 'vite'
import { transformWithEsbuild } from 'vite'
import { transform } from 'esbuild'
import type { UserOptons } from './typing'
import { generateCode } from './generator'

const virtualModuleId = 'virtual:generated-react-router'
const resolvedVirutalModuleId = `\0${virtualModuleId}`

export default function VitePluginReactRouter(userOptions: UserOptons): PluginOption {
  const { routesFile = './routes.json' } = userOptions || {}

  const routesStr = fs.readFileSync(
    path.resolve(process.cwd(), routesFile),
    'utf-8',
  )

  const routes = JSON.parse(routesStr)

  const codeStr = generateCode(routes)

  let command: string

  return {
    name: 'vite-plugin-react-router',
    configResolved(config) {
      command = config.command
    },
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirutalModuleId
      }
      return null
    },
    load(id: string) {
      if (id === resolvedVirutalModuleId) {
        return codeStr
      }
      return null
    },
    async transform(code: string, id: string) {
      if (id === resolvedVirutalModuleId) {
        const esbuildResult =
          command === 'serve'
            ? await transformWithEsbuild(code, '/vite-plugin-react-router', {
              loader: 'tsx',
            })
            : await transform(code, { loader: 'tsx' })
        return esbuildResult.code
      }
      return null
    },
  } as PluginOption
}
