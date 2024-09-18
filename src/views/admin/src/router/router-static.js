import Vue from 'vue';
//配置路由
import VueRouter from 'vue-router'
Vue.use(VueRouter);
//1.创建组件
import Index from '@/views/index'
import Home from '@/views/home'
import Login from '@/views/login'
import NotFound from '@/views/404'
import UpdatePassword from '@/views/update-password'
import pay from '@/views/pay'
import register from '@/views/register'
import center from '@/views/center'
    import news from '@/views/modules/news/list'
    import aboutus from '@/views/modules/aboutus/list'
    import banjichengyuan from '@/views/modules/banjichengyuan/list'
    import jiaolian from '@/views/modules/jiaolian/list'
    import xueyuan from '@/views/modules/xueyuan/list'
    import changdixinxi from '@/views/modules/changdixinxi/list'
    import kechengxinxi from '@/views/modules/kechengxinxi/list'
    import goumaikeshi from '@/views/modules/goumaikeshi/list'
    import changdifenlei from '@/views/modules/changdifenlei/list'
    import shoukexinxi from '@/views/modules/shoukexinxi/list'
    import systemintro from '@/views/modules/systemintro/list'
    import kechengfenlei from '@/views/modules/kechengfenlei/list'
    import dingyuexinxi from '@/views/modules/dingyuexinxi/list'
    import messages from '@/views/modules/messages/list'
    import banjixinxi from '@/views/modules/banjixinxi/list'
    import config from '@/views/modules/config/list'
    import chongzhixinxi from '@/views/modules/chongzhixinxi/list'
    import newstype from '@/views/modules/newstype/list'


//2.配置路由   注意：名字
export const routes = [{
    path: '/',
    name: '系统首页',
    component: Index,
    children: [{
      // 这里不设置值，是把main作为默认页面
      path: '/',
      name: '系统首页',
      component: Home,
      meta: {icon:'', title:'center', affix: true}
    }, {
      path: '/updatePassword',
      name: '修改密码',
      component: UpdatePassword,
      meta: {icon:'', title:'updatePassword'}
    }, {
      path: '/pay',
      name: '支付',
      component: pay,
      meta: {icon:'', title:'pay'}
    }, {
      path: '/center',
      name: '个人信息',
      component: center,
      meta: {icon:'', title:'center'}
    }
      ,{
	path: '/news',
        name: '公告信息',
        component: news
      }
      ,{
	path: '/aboutus',
        name: '关于我们',
        component: aboutus
      }
      ,{
	path: '/banjichengyuan',
        name: '班级成员',
        component: banjichengyuan
      }
      ,{
	path: '/jiaolian',
        name: '教练',
        component: jiaolian
      }
      ,{
	path: '/xueyuan',
        name: '学员',
        component: xueyuan
      }
      ,{
	path: '/changdixinxi',
        name: '场地信息',
        component: changdixinxi
      }
      ,{
	path: '/kechengxinxi',
        name: '课程信息',
        component: kechengxinxi
      }
      ,{
	path: '/goumaikeshi',
        name: '购买课时',
        component: goumaikeshi
      }
      ,{
	path: '/changdifenlei',
        name: '场地分类',
        component: changdifenlei
      }
      ,{
	path: '/shoukexinxi',
        name: '授课信息',
        component: shoukexinxi
      }
      ,{
	path: '/systemintro',
        name: '系统简介',
        component: systemintro
      }
      ,{
	path: '/kechengfenlei',
        name: '课程分类',
        component: kechengfenlei
      }
      ,{
	path: '/dingyuexinxi',
        name: '订阅信息',
        component: dingyuexinxi
      }
      ,{
	path: '/messages',
        name: '留言板管理',
        component: messages
      }
      ,{
	path: '/banjixinxi',
        name: '班级信息',
        component: banjixinxi
      }
      ,{
	path: '/config',
        name: '轮播图管理',
        component: config
      }
      ,{
	path: '/chongzhixinxi',
        name: '充值信息',
        component: chongzhixinxi
      }
      ,{
	path: '/newstype',
        name: '公告信息分类',
        component: newstype
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {icon:'', title:'login'}
  },
  {
    path: '/register',
    name: 'register',
    component: register,
    meta: {icon:'', title:'register'}
  },
  {
    path: '*',
    component: NotFound
  }
]
//3.实例化VueRouter  注意：名字
const router = new VueRouter({
  mode: 'hash',
  /*hash模式改为history*/
  routes // （缩写）相当于 routes: routes
})
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
export default router;
