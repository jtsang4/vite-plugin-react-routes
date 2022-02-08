import path from 'path'
import jiti from 'jiti'
import upperCamelcase from 'uppercamelcase'

function winPath(path: string) {
  const isExtendedLengthPath = /^\\\\\?\\/.test(path)
  if (isExtendedLengthPath) {
    return path
  }

  return path.replace(/\\/g, '/')
}

export function transformRelativePathToAbsPath(rPath: string, basePath = './src'): string {
  const joinedPath = path.join(basePath, rPath)
  const targetPath = joinedPath.startsWith('/') ? joinedPath : `./${joinedPath}`
  const absPath = jiti(process.cwd(), {
    extensions: ['.js', '.mjs', '.cjs', '.ts', '.jsx', '.tsx'],
  }).resolve(`${targetPath}`)
  return winPath(absPath)
}

export function transformAbsPathToComponentName(absPath: string): string {
  return upperCamelcase(
    absPath.replace(/^.*?:/, '').slice(1).replace(/\//g, '-'),
  )
}
