import jiti from 'jiti'

const filename = jiti(process.cwd(), {
  extensions: ['.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx'],
}).resolve('./layout')

console.log('name:', filename)
