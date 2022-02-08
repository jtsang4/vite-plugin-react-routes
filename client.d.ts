declare module 'virtual:generated-react-router' {
  import type { FC } from 'react'

  type RouteProps = {
    mode?: 'hash' | 'browser'
  }

  const Router: FC<RouteProps>
  export default Router
}
