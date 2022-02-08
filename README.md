# vite-plugin-react-routes

[![NPM version](https://img.shields.io/npm/v/vite-plugin-react-routes?color=a1b858&label=)](https://www.npmjs.com/package/vite-plugin-react-routes)


> Inspired by [vite-plugin-react-router](https://github.com/morelearn1990/vite-plugin-react-router)

A vite plugin support setup React Router by JSON config file.

## Install

```bash
pnpm add vite-plugin-react-routes

// or
npm install vite-plugin-react-routes --save

// or
yarn add vite-plugin-react-routes
```

## Usage

**1. Config in vite config file and config type reference**


```ts
// vitee.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import routes from 'vite-plugin-react-routes'

export default defineConfig({
    plugins: [react(), routes()],
})
```

```ts
// vite-env.d.ts
/// <reference types="vite-plugin-react-routes/client" />
```

**2. Add `routes.json` file**

Add `routes.json` file in your workspace root.

```json
[
  {
    "path": "/",
    "layout": "layout", // will use 'src/layout' component as wrapper
    "children": [
      {
        "path": "/",
        "component": "pages/a" // will use 'src/pages/a' as comopnent corresponding to path '/'
      },
      {
        "path": "a",
        "component": "pages/a" // will use 'src/pages/a' as comopnent corresponding to path '/a'
      },
      {
        "path": "b",
        "component": "pages/b" // will use 'src/pages/b' as comopnent corresponding to path '/b'
      }
    ]
  }
]
```

**3. Import in App root**

```tsx
import ReactDOM from 'react-dom'
import Router from 'virtual:generated-react-router'

ReactDOM.render(<Router mode="hash" />, document.getElementById('root'))
```

## API

This is API for `virtual:generated-react-router`:

### mode

* type: `'browser' | 'hash'`

use `<BrowserRouter>` or `<HashRouter>`

## License

[MIT](./LICENSE) License © 2022 [James Tsang](https://github.com/jtsang4)
