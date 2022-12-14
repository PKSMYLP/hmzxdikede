
// 导出属于员工的路由规则
import Layout from '@/layout'
//  {  path: '', component: '' }
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/user', // 路径
  component: Layout, // 组件
  // 配置二级路的路由表
  name: 'user', // 给路由规则加一个name
  redirect: '/user/index',
  // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
  meta: {
    title: '人员管理', icon: 'education' // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
  },
  children: [
    { path: 'index', component: () => import('@/views/user/index'), name: 'userindex', meta: { title: '人员列表' }},
    { path: 'user-task-stats', component: () => import('@/views/user/user-task-stats'), name: 'user-task-stats', meta: { title: '人效统计' }},
    { path: 'user-work', component: () => import('@/views/user/user-work'), name: 'user-work', meta: { title: '工作量列表' }}

  ]
}
