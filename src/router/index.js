import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path:'/userManage',
    component: Layout,
    redirect: '/userManage/userList',
    name: 'userManage',
    meta: { title: '用户管理', icon: 'user' },
    children: [{
      path: 'userList',
      name: 'userList',
      component: () => import('@/views/userManage/userList'),
      meta: { title: '用户列表', icon: 'user' },
    }]
  },
  {
    path:'/blogManage',
    component: Layout,
    redirect: '/blogManage/notes',
    name: 'blogManage',
    meta: { title: '博客管理', icon: 'nested' },
    children: [{
      path: 'notes',
      name: 'notesList',
      component: () => import('@/views/blogManage/notes/list'),
      meta: { title: '学习笔记', icon: 'nested' },
    },{
      path: 'notes/add',
      name: 'notesAdd',
      component: () => import('@/views/blogManage/notes/add'),
      meta: { title: '添加学习笔记', icon: 'nested' },
      hidden: true
    },{
      path: 'notes/add/:id',
      name: 'notesEdit',
      component: () => import('@/views/blogManage/notes/add'),
      meta: { title: '编辑学习笔记', icon: 'nested' },
      hidden: true
    },{
      path: 'talk',
      name: 'talkList',
      component: () => import('@/views/blogManage/talk/list'),
      meta: { title: '说说', icon: 'nested' },
    },{
      path: 'talk/add',
      name: 'talkAdd',
      component: () => import('@/views/blogManage/talk/add'),
      meta: { title: '添加说说', icon: 'nested' },
      hidden: true
    },{
      path: 'talk/add/:id',
      name: 'talkEdit',
      component: () => import('@/views/blogManage/talk/add'),
      meta: { title: '编辑说说', icon: 'nested' },
      hidden: true
    }]
  },
  
  
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
