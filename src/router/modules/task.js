// 导出属于员工的路由规则
import Layout from '@/layout'
//  {  path: '', component: '' }
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/task', // 路径
  component: Layout, // 组件
  // 配置二级路的路由表
  name: 'task', // 给路由规则加一个name
  redirect: '/task/business',
  // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
  meta: {
    title: '工单管理', icon: 'guide' // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
  },
  children: [
    { path: 'business', component: () => import('@/views/task/business'), name: 'business', meta: { title: '运营工单' }},
    { path: 'operation', component: () => import('@/views/task/operation'), name: 'operation', meta: { title: '运维工单' }}
  ]

}

// 当你的访问地址 是 /employees的时候 layout组件会显示 此时 你的二级路由的默认组件  也会显示

// import layout from '@/layout'

// export default {
//   path: '/task', // 路径
//   component: layout, // 组件
//   name: 'task',
//   meta: {
//     title: '工单管理', icon: 'gd'
//   },
//   children: [{ // 配置二级路由
//     path: 'business', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
//     component: () => import('@/views/task/business'),
//     meta: {
//       title: '运营管理'
//     }
//   },
//   {
//     path: 'operation', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
//     component: () => import('@/views/task/operation'),
//     meta: {
//       title: '运维管理'
//     }
//   }]

// }
