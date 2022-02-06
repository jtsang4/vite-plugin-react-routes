export default function myPlugin() {
  const virtualModuleId = '@my-virtual-module'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'my-plugin', // 必须的，将会在 warning 和 error 中显示
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
      return null
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return 'export const msg = "from virtual module"'
      }
      return null
    },
  }
}
