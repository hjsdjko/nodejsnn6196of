import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Messages from '../pages/messages/list'
import Storeup from '../pages/storeup/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import payList from '../pages/pay'

import xueyuanList from '../pages/xueyuan/list'
import xueyuanDetail from '../pages/xueyuan/detail'
import xueyuanAdd from '../pages/xueyuan/add'
import jiaolianList from '../pages/jiaolian/list'
import jiaolianDetail from '../pages/jiaolian/detail'
import jiaolianAdd from '../pages/jiaolian/add'
import changdifenleiList from '../pages/changdifenlei/list'
import changdifenleiDetail from '../pages/changdifenlei/detail'
import changdifenleiAdd from '../pages/changdifenlei/add'
import kechengfenleiList from '../pages/kechengfenlei/list'
import kechengfenleiDetail from '../pages/kechengfenlei/detail'
import kechengfenleiAdd from '../pages/kechengfenlei/add'
import changdixinxiList from '../pages/changdixinxi/list'
import changdixinxiDetail from '../pages/changdixinxi/detail'
import changdixinxiAdd from '../pages/changdixinxi/add'
import kechengxinxiList from '../pages/kechengxinxi/list'
import kechengxinxiDetail from '../pages/kechengxinxi/detail'
import kechengxinxiAdd from '../pages/kechengxinxi/add'
import dingyuexinxiList from '../pages/dingyuexinxi/list'
import dingyuexinxiDetail from '../pages/dingyuexinxi/detail'
import dingyuexinxiAdd from '../pages/dingyuexinxi/add'
import goumaikeshiList from '../pages/goumaikeshi/list'
import goumaikeshiDetail from '../pages/goumaikeshi/detail'
import goumaikeshiAdd from '../pages/goumaikeshi/add'
import chongzhixinxiList from '../pages/chongzhixinxi/list'
import chongzhixinxiDetail from '../pages/chongzhixinxi/detail'
import chongzhixinxiAdd from '../pages/chongzhixinxi/add'
import banjixinxiList from '../pages/banjixinxi/list'
import banjixinxiDetail from '../pages/banjixinxi/detail'
import banjixinxiAdd from '../pages/banjixinxi/add'
import banjichengyuanList from '../pages/banjichengyuan/list'
import banjichengyuanDetail from '../pages/banjichengyuan/detail'
import banjichengyuanAdd from '../pages/banjichengyuan/add'
import shoukexinxiList from '../pages/shoukexinxi/list'
import shoukexinxiDetail from '../pages/shoukexinxi/detail'
import shoukexinxiAdd from '../pages/shoukexinxi/add'
import newstypeList from '../pages/newstype/list'
import newstypeDetail from '../pages/newstype/detail'
import newstypeAdd from '../pages/newstype/add'
import aboutusList from '../pages/aboutus/list'
import aboutusDetail from '../pages/aboutus/detail'
import aboutusAdd from '../pages/aboutus/add'
import systemintroList from '../pages/systemintro/list'
import systemintroDetail from '../pages/systemintro/detail'
import systemintroAdd from '../pages/systemintro/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'pay',
					component: payList,
				},
				{
					path: 'messages',
					component: Messages
				},
				{
					path: 'storeup',
					component: Storeup
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'xueyuan',
					component: xueyuanList
				},
				{
					path: 'xueyuanDetail',
					component: xueyuanDetail
				},
				{
					path: 'xueyuanAdd',
					component: xueyuanAdd
				},
				{
					path: 'jiaolian',
					component: jiaolianList
				},
				{
					path: 'jiaolianDetail',
					component: jiaolianDetail
				},
				{
					path: 'jiaolianAdd',
					component: jiaolianAdd
				},
				{
					path: 'changdifenlei',
					component: changdifenleiList
				},
				{
					path: 'changdifenleiDetail',
					component: changdifenleiDetail
				},
				{
					path: 'changdifenleiAdd',
					component: changdifenleiAdd
				},
				{
					path: 'kechengfenlei',
					component: kechengfenleiList
				},
				{
					path: 'kechengfenleiDetail',
					component: kechengfenleiDetail
				},
				{
					path: 'kechengfenleiAdd',
					component: kechengfenleiAdd
				},
				{
					path: 'changdixinxi',
					component: changdixinxiList
				},
				{
					path: 'changdixinxiDetail',
					component: changdixinxiDetail
				},
				{
					path: 'changdixinxiAdd',
					component: changdixinxiAdd
				},
				{
					path: 'kechengxinxi',
					component: kechengxinxiList
				},
				{
					path: 'kechengxinxiDetail',
					component: kechengxinxiDetail
				},
				{
					path: 'kechengxinxiAdd',
					component: kechengxinxiAdd
				},
				{
					path: 'dingyuexinxi',
					component: dingyuexinxiList
				},
				{
					path: 'dingyuexinxiDetail',
					component: dingyuexinxiDetail
				},
				{
					path: 'dingyuexinxiAdd',
					component: dingyuexinxiAdd
				},
				{
					path: 'goumaikeshi',
					component: goumaikeshiList
				},
				{
					path: 'goumaikeshiDetail',
					component: goumaikeshiDetail
				},
				{
					path: 'goumaikeshiAdd',
					component: goumaikeshiAdd
				},
				{
					path: 'chongzhixinxi',
					component: chongzhixinxiList
				},
				{
					path: 'chongzhixinxiDetail',
					component: chongzhixinxiDetail
				},
				{
					path: 'chongzhixinxiAdd',
					component: chongzhixinxiAdd
				},
				{
					path: 'banjixinxi',
					component: banjixinxiList
				},
				{
					path: 'banjixinxiDetail',
					component: banjixinxiDetail
				},
				{
					path: 'banjixinxiAdd',
					component: banjixinxiAdd
				},
				{
					path: 'banjichengyuan',
					component: banjichengyuanList
				},
				{
					path: 'banjichengyuanDetail',
					component: banjichengyuanDetail
				},
				{
					path: 'banjichengyuanAdd',
					component: banjichengyuanAdd
				},
				{
					path: 'shoukexinxi',
					component: shoukexinxiList
				},
				{
					path: 'shoukexinxiDetail',
					component: shoukexinxiDetail
				},
				{
					path: 'shoukexinxiAdd',
					component: shoukexinxiAdd
				},
				{
					path: 'newstype',
					component: newstypeList
				},
				{
					path: 'newstypeDetail',
					component: newstypeDetail
				},
				{
					path: 'newstypeAdd',
					component: newstypeAdd
				},
				{
					path: 'aboutus',
					component: aboutusList
				},
				{
					path: 'aboutusDetail',
					component: aboutusDetail
				},
				{
					path: 'aboutusAdd',
					component: aboutusAdd
				},
				{
					path: 'systemintro',
					component: systemintroList
				},
				{
					path: 'systemintroDetail',
					component: systemintroDetail
				},
				{
					path: 'systemintroAdd',
					component: systemintroAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
