
// 导出属于员工的路由规则
import Layout from '@/layout'
//  {  path: '', component: '' }
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/node', // 路径
  component: Layout, // 组件
  // 配置二级路的路由表
  name: 'node', // 给路由规则加一个name
  redirect: '/node/region',
  // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
  meta: {
    title: '点位管理', icon: 'chart' // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
  },
  children: [
    { path: 'region', component: () => import('@/views/node/region'), name: 'region', meta: { title: '区域管理' }},
    { path: 'node', component: () => import('@/views/node/node'), name: 'node-node', meta: { title: '点位管理' }},
    { path: 'partner', component: () => import('@/views/node/partner'), name: 'partner', meta: { title: '合作商管理' }}

  ]
}
