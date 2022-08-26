
// 导出属于员工的路由规则
import Layout from '@/layout'
//  {  path: '', component: '' }
// 每个子模块 其实 都是外层是layout  组件位于layout的二级路由里面
export default {
  path: '/sku', // 路径
  component: Layout, // 组件
  // 配置二级路的路由表
  name: 'sku', // 给路由规则加一个name
  redirect: '/sku/sku-class',
  // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
  meta: {
    title: '商品管理', icon: 'documentation' // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
  },
  children: [
    { path: 'sku-class', component: () => import('@/views/sku/sku-class'), name: 'sku-class', meta: { title: '商品类型' }},
    { path: 'sku', component: () => import('@/views/sku/sku'), name: 'sku-sku', meta: { title: '商品管理' }}
  ]
}
