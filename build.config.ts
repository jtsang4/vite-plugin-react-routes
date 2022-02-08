import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  externals: ['jiti', 'vite'],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
