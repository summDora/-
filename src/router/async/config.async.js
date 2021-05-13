import routerMap from './router.map'
import { parseRoutes } from '@/utils/routerUtil'
// import TabsView from '@/layouts/tabs/TabsView'
// import BlankView from '@/layouts/BlankView'
// import PageView from '@/layouts/PageView'

// 异步路由配置
const routesConfig = [
  'login',
  'root',
  {
    path: '/',
    name: '开发平台',
    component: () => import('@/pages/gen/design'),
    children: []
  },
  {
    router: 'exp404',
    path: '*',
    name: '404',
    component: () => import('@/pages/exception/404'),
  },
  {
    router: 'exp403',
    path: '/403',
    name: '403',
    component: () => import('@/pages/exception/403'),
  }
]

const options = {
  routes: parseRoutes(routesConfig, routerMap)
}

export default options
