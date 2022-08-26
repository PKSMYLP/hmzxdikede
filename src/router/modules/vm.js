
// 导出属于员工的路由规则
import Layout from '@/layout'
//  {  path: '', component: '' }
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/vm', // 路径
  component: Layout, // 组件
  // 配置二级路的路由表
  name: 'vm', // 给路由规则加一个name
  redirect: '/vm/index',
  // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
  meta: {
    title: '设备管理', icon: 'table' // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
  },
  children: [
    { path: 'index', component: () => import('@/views/vm/index'), name: 'vm-index', meta: { title: '设备管理' }},
    { path: 'status', component: () => import('@/views/vm/status'), name: 'status', meta: { title: '设备状态' }},
    { path: 'type', component: () => import('@/views/vm/type'), name: 'type', meta: { title: '设备类型管理' }}

  ]
}
