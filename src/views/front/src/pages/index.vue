<template>
	<div class="main-containers">
		<div class="body-containers" :style='{"minHeight":"100vh","padding":"140px 0 0","margin":"0","background":"url(http://codegen.caihongy.cn/20231123/c647362c50df494286737bc0f3632cf0.png)","backgroundSize":"cover","position":"relative","backgroundPosition":"center center","backgroundRepeat":"no-repeat"}'>
		<div class="top-container" :style='{"border":"1px solid #fff","boxShadow":"none","padding":"0 20px","alignItems":"center","display":"flex","justifyContent":"flex-end","top":"0","left":"0","background":"#BFD0CA","borderWidth":"0 0 90px","width":"100%","position":"absolute","height":"140px","zIndex":"1002"}'>
			<!-- info -->
			<div :style='{"position":"absolute","top":"70px","left":"40px","display":"block","zIndex":"999"}'>
			  <span :style='{"padding":"0 0 0 12px","lineHeight":"44px","fontSize":"40px","color":"#000","float":"left","fontWeight":"bold"}'>网球场地管理系统</span>
			</div>
			
			<div v-if="false" :style='{"color":"#666","margin":"0 10px","fontSize":"14px"}'>0753-1234567</div>
			
			<img v-if="headportrait&&Token" :style='{"width":"40px","margin":"0 12px","borderRadius":"50%","display":"none","height":"40px"}' :src="headportrait?baseUrl + headportrait:require('@/assets/avator.png')">
			<div v-if="Token" :style='{"padding":"0 12px","fontSize":"14px","lineHeight":"32px","color":"#000","height":"32px"}'>{{username}}</div>
			<div v-if="Token && notAdmin" :style='{"cursor":"pointer","padding":"0 12px","fontSize":"14px","lineHeight":"32px","color":"#000","height":"32px"}' @click="goMenu('/index/center')">个人中心</div>
			<el-button v-if="!Token" @click="toLogin()" :style='{"border":"none","padding":"0 12px","margin":"0 10px","color":"#000","borderRadius":"0","background":"none","display":"inline-block","fontSize":"14px","lineHeight":"32px","height":"32px"}'>登录/注册</el-button>
			<el-button v-if="Token" @click="logout" :style='{"border":"none","padding":"0 12px","margin":"0 10px","color":"#000","borderRadius":"0","background":"none","display":"inline-block","fontSize":"14px","lineHeight":"32px","height":"32px"}'>退出</el-button>
		</div>


			<div class="menu-preview" :style='{"padding":"0 40px","borderColor":"#efefef","margin":"0 auto","background":"#57A7A5","borderWidth":"0","clipPath":"polygon(30px 00%, 0% 100%, calc(100% - 30px) 100%, 100% 0%)","width":"80%","borderStyle":"solid","height":"auto"}'>
			<el-scrollbar wrap-class="scrollbar-wrapper-horizontal">
				<el-menu class="el-menu-horizontal-demo" :style='{"border":0,"padding":"0","listStyle":"none","margin":"0","background":"none","display":"flex","position":"relative"}' :default-active="activeMenu" :unique-opened="true" mode="horizontal" :router="true" @select="handleSelect">
					<div class="userinfo" :style='{"width":"84px","padding":"6px 10px 0","display":"none","height":"auto"}'>
					  <el-image :style='{"width":"100%","objectFit":"cover","borderRadius":"20px","display":"block","height":"32px"}' src="http://codegen.caihongy.cn/20201114/7856ba26477849ea828f481fa2773a95.jpg" fit="cover"></el-image>
					  <div :style='{"fontSize":"12px","lineHeight":"1.5","color":"#333","textAlign":"center"}'>nickname</div>
					</div>
					<el-menu-item class="home" index="/index/home" @click.native="goMenu('/index/home')">
						<span :style='{"padding":"0 10px","margin":"0","color":"inherit","display":"none","width":"14px","lineHeight":"56px","fontSize":"14px","height":"56px"}' class="icon iconfont icon-shouye-zhihui"></span>
						<span :style='{"padding":"0 10px","lineHeight":"56px","fontSize":"14px","color":"inherit","height":"56px"}'>系统首页</span>
					</el-menu-item>
					<el-menu-item class="item" v-for="(menu, index) in menuList" :index="menu.url" :key="index" @click.native="goMenu(menu.url)">
						<i :style='{"padding":"0 10px","margin":"0","color":"inherit","display":"none","width":"14px","lineHeight":"56px","fontSize":"14px","height":"56px"}' :class="iconArr[index]"></i>
						<span :style='{"padding":"0 10px","lineHeight":"56px","fontSize":"14px","color":"inherit","height":"56px"}'>{{menu.name}}</span>
					</el-menu-item>
					<el-menu-item class="user" index="/index/center" v-if="Token && notAdmin" @click.native="goMenu('/index/center')">
						<span :style='{"padding":"0 10px","margin":"0","color":"inherit","width":"14px","lineHeight":"56px","fontSize":"14px","height":"56px"}' class="icon iconfont icon-shouye-zhihui"></span>
						<span :style='{"padding":"0 10px","lineHeight":"56px","fontSize":"14px","color":"inherit","height":"56px"}'>个人中心</span>
					</el-menu-item>
				</el-menu>
			</el-scrollbar>
			</div>


			<div class="banner-preview" :style='{"width":"100%","height":"auto"}'>
				<el-carousel :style='{"width":"100%","margin":"0 auto"}' trigger="click" indicator-position="inside" arrow="always" type="default" direction="horizontal" height="600px" :autoplay="true" :interval="3000" :loop="true">
					<el-carousel-item :style='{"borderRadius":"0","width":"100%","height":"100%"}' v-for="item in carouselList" :key="item.id">
						<el-image @click="carouselClick(item.url)" :style='{"objectFit":"cover","width":"100%","height":"100%"}' :src="baseUrl + item.value" fit="cover"></el-image>
					</el-carousel-item>
				</el-carousel>
			</div>


			<router-view id="scrollView"></router-view>
			
			<div class="bottom-preview" :style='{"width":"100%","height":"auto"}'>
				<div :style='{"width":"100%","padding":"20px","overflow":"hidden","background":"#000","height":"auto"}'><div v-html="bottomContent"></div></div>
			</div>
		</div>
		
	</div>
</template>

<script>
import Vue from 'vue'
import Swiper from "swiper";
import axios from 'axios'

export default {
    data() {
		return {
            activeIndex: '0',
			roleMenus: [{"backMenu":[{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-newshot","buttons":["新增","查看","修改","删除"],"menu":"学员","menuJump":"列表","tableName":"xueyuan"}],"menu":"学员管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-paint","buttons":["新增","查看","修改","删除"],"menu":"教练","menuJump":"列表","tableName":"jiaolian"}],"menu":"教练管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-circle","buttons":["新增","查看","修改","删除"],"menu":"场地分类","menuJump":"列表","tableName":"changdifenlei"}],"menu":"场地分类管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-similar","buttons":["新增","查看","修改","删除"],"menu":"课程分类","menuJump":"列表","tableName":"kechengfenlei"}],"menu":"课程分类管理"},{"child":[{"allButtons":["新增","查看","修改","删除","场地类型统计","场地状态统计","首页总数","首页统计","立即订阅"],"appFrontIcon":"cuIcon-pay","buttons":["新增","查看","修改","删除","首页总数","首页统计","场地类型统计"],"menu":"场地信息","menuJump":"列表","tableName":"changdixinxi"}],"menu":"场地信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除","立即购买"],"appFrontIcon":"cuIcon-newshot","buttons":["查看","删除","修改"],"menu":"课程信息","menuJump":"列表","tableName":"kechengxinxi"}],"menu":"课程信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除","审核","时长统计","首页总数","首页统计"],"appFrontIcon":"cuIcon-paint","buttons":["查看","删除","审核","时长统计","首页总数","首页统计"],"menu":"订阅信息","menuJump":"列表","tableName":"dingyuexinxi"}],"menu":"订阅信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除","审核","课时统计","首页总数","首页统计","授课登记"],"appFrontIcon":"cuIcon-time","buttons":["查看","删除","课时统计","首页总数","首页统计"],"menu":"购买课时","menuJump":"列表","tableName":"goumaikeshi"}],"menu":"购买课时管理"},{"child":[{"allButtons":["新增","查看","修改","删除","支付"],"appFrontIcon":"cuIcon-list","buttons":["查看","删除"],"menu":"充值信息","menuJump":"列表","tableName":"chongzhixinxi"}],"menu":"充值信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除","成员登记"],"appFrontIcon":"cuIcon-goods","buttons":["新增","查看","修改","删除"],"menu":"班级信息","menuJump":"列表","tableName":"banjixinxi"}],"menu":"班级信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-keyboard","buttons":["查看","修改","删除"],"menu":"班级成员","menuJump":"列表","tableName":"banjichengyuan"}],"menu":"班级成员管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-vip","buttons":["查看","删除"],"menu":"授课信息","menuJump":"列表","tableName":"shoukexinxi"}],"menu":"授课信息管理"},{"child":[{"allButtons":["查看","修改","回复","删除"],"appFrontIcon":"cuIcon-phone","buttons":["查看","回复","删除"],"menu":"留言板管理","tableName":"messages"}],"menu":"留言板管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"公告信息","tableName":"news"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"公告信息分类","tableName":"newstype"},{"allButtons":["查看","修改"],"appFrontIcon":"cuIcon-explore","buttons":["查看","修改"],"menu":"关于我们","tableName":"aboutus"},{"allButtons":["查看","修改"],"appFrontIcon":"cuIcon-paint","buttons":["查看","修改"],"menu":"系统简介","tableName":"systemintro"},{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-goods","buttons":["查看","修改"],"menu":"轮播图管理","tableName":"config"}],"menu":"系统管理"}],"frontMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","场地类型统计","场地状态统计","首页总数","首页统计","立即订阅"],"appFrontIcon":"cuIcon-medal","buttons":["查看","立即订阅"],"menu":"场地信息列表","menuJump":"列表","tableName":"changdixinxi"}],"menu":"场地信息模块"},{"child":[{"allButtons":["新增","查看","修改","删除","立即购买"],"appFrontIcon":"cuIcon-link","buttons":["查看","立即购买"],"menu":"课程信息列表","menuJump":"列表","tableName":"kechengxinxi"}],"menu":"课程信息模块"},{"child":[{"allButtons":["新增","查看","修改","删除","成员登记"],"appFrontIcon":"cuIcon-goods","buttons":["查看"],"menu":"班级信息列表","menuJump":"列表","tableName":"banjixinxi"}],"menu":"班级信息模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","审核","时长统计","首页总数","首页统计"],"appFrontIcon":"cuIcon-paint","buttons":["查看","删除"],"menu":"订阅信息","menuJump":"列表","tableName":"dingyuexinxi"}],"menu":"订阅信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除","审核","课时统计","首页总数","首页统计","授课登记"],"appFrontIcon":"cuIcon-time","buttons":["查看","删除"],"menu":"购买课时","menuJump":"列表","tableName":"goumaikeshi"}],"menu":"购买课时管理"},{"child":[{"allButtons":["新增","查看","修改","删除","支付"],"appFrontIcon":"cuIcon-list","buttons":["新增","查看","删除","支付"],"menu":"充值信息","menuJump":"列表","tableName":"chongzhixinxi"}],"menu":"充值信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-keyboard","buttons":["查看"],"menu":"班级成员","menuJump":"列表","tableName":"banjichengyuan"}],"menu":"班级成员管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-vip","buttons":["查看"],"menu":"授课信息","menuJump":"列表","tableName":"shoukexinxi"}],"menu":"授课信息管理"}],"frontMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","场地类型统计","场地状态统计","首页总数","首页统计","立即订阅"],"appFrontIcon":"cuIcon-medal","buttons":["查看","立即订阅"],"menu":"场地信息列表","menuJump":"列表","tableName":"changdixinxi"}],"menu":"场地信息模块"},{"child":[{"allButtons":["新增","查看","修改","删除","立即购买"],"appFrontIcon":"cuIcon-link","buttons":["查看","立即购买"],"menu":"课程信息列表","menuJump":"列表","tableName":"kechengxinxi"}],"menu":"课程信息模块"},{"child":[{"allButtons":["新增","查看","修改","删除","成员登记"],"appFrontIcon":"cuIcon-goods","buttons":["查看"],"menu":"班级信息列表","menuJump":"列表","tableName":"banjixinxi"}],"menu":"班级信息模块"}],"hasBackLogin":"否","hasBackRegister":"否","hasFrontLogin":"是","hasFrontRegister":"是","roleName":"学员","tableName":"xueyuan"},{"backMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","立即购买"],"appFrontIcon":"cuIcon-newshot","buttons":["新增","查看","修改","删除"],"menu":"课程信息","menuJump":"列表","tableName":"kechengxinxi"}],"menu":"课程信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除","审核","课时统计","首页总数","首页统计","授课登记"],"appFrontIcon":"cuIcon-time","buttons":["查看","审核","授课登记","课时统计"],"menu":"购买课时","menuJump":"列表","tableName":"goumaikeshi"}],"menu":"购买课时管理"},{"child":[{"allButtons":["新增","查看","修改","删除","成员登记"],"appFrontIcon":"cuIcon-goods","buttons":["查看","成员登记"],"menu":"班级信息","menuJump":"列表","tableName":"banjixinxi"}],"menu":"班级信息管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-keyboard","buttons":["查看","修改","删除"],"menu":"班级成员","menuJump":"列表","tableName":"banjichengyuan"}],"menu":"班级成员管理"},{"child":[{"allButtons":["新增","查看","修改","删除"],"appFrontIcon":"cuIcon-vip","buttons":["查看","修改","删除"],"menu":"授课信息","menuJump":"列表","tableName":"shoukexinxi"}],"menu":"授课信息管理"}],"frontMenu":[{"child":[{"allButtons":["新增","查看","修改","删除","场地类型统计","场地状态统计","首页总数","首页统计","立即订阅"],"appFrontIcon":"cuIcon-medal","buttons":["查看","立即订阅"],"menu":"场地信息列表","menuJump":"列表","tableName":"changdixinxi"}],"menu":"场地信息模块"},{"child":[{"allButtons":["新增","查看","修改","删除","立即购买"],"appFrontIcon":"cuIcon-link","buttons":["查看","立即购买"],"menu":"课程信息列表","menuJump":"列表","tableName":"kechengxinxi"}],"menu":"课程信息模块"},{"child":[{"allButtons":["新增","查看","修改","删除","成员登记"],"appFrontIcon":"cuIcon-goods","buttons":["查看"],"menu":"班级信息列表","menuJump":"列表","tableName":"banjixinxi"}],"menu":"班级信息模块"}],"hasBackLogin":"是","hasBackRegister":"是","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"教练","tableName":"jiaolian"}],
			baseUrl: '',
			carouselList: [],
			menuList: [],
			form: {
				ask: '',
				userid: localStorage.getItem('frontUserid')
			},
			headportrait: localStorage.getItem('frontHeadportrait')?localStorage.getItem('frontHeadportrait'):'',
			Token: localStorage.getItem('frontToken'),
            username: localStorage.getItem('username'),
            notAdmin: localStorage.getItem('frontSessionTable')!='"users"',
			timer: '',
			iconArr: [
				'el-icon-star-off',
				'el-icon-goods',
				'el-icon-warning',
				'el-icon-question',
				'el-icon-info',
				'el-icon-help',
				'el-icon-picture-outline-round',
				'el-icon-camera-solid',
				'el-icon-video-camera-solid',
				'el-icon-video-camera',
				'el-icon-bell',
				'el-icon-s-cooperation',
				'el-icon-s-order',
				'el-icon-s-platform',
				'el-icon-s-operation',
				'el-icon-s-promotion',
				'el-icon-s-release',
				'el-icon-s-ticket',
				'el-icon-s-management',
				'el-icon-s-open',
				'el-icon-s-shop',
				'el-icon-s-marketing',
				'el-icon-s-flag',
				'el-icon-s-comment',
				'el-icon-s-finance',
				'el-icon-s-claim',
				'el-icon-s-opportunity',
				'el-icon-s-data',
				'el-icon-s-check'
			],
			bottomContent: '',
		}
    },
    created() {
		this.baseUrl = this.$config.baseUrl;
		this.menuList = this.$config.indexNav;
		this.getCarousel();
        if(localStorage.getItem('frontToken') && localStorage.getItem('frontToken')!=null) {
			this.getSession()
        }
    },
    mounted() {
        this.activeIndex = localStorage.getItem('keyPath') || '0';



    },
    computed: {
		activeMenu() {
			const route = this.$route
			const {
				meta,
				path
			} = route
			// if st path, the sidebar will highlight the path you sete
			if (meta.activeMenu) {
				return meta.activeMenu
			}
			return path
		},
    },
    watch: {
        $route(newValue) {
            let that = this
            let url = window.location.href
            let arr = url.split('#')
            for (let x in this.menuList) {
                if (newValue.path == this.menuList[x].url) {
                    this.activeIndex = x
                }
            }
            this.Token = localStorage.getItem('frontToken')
            if(arr[1]!='/index/home'){
            	var element = document.getElementById('scrollView');
            	var distance = element.offsetTop;
            	window.scrollTo( 0, distance )
            }else{
            	window.scrollTo( 0, 0 )
            }
        },
		headportrait(){
			this.$forceUpdate()
		},
    },
    methods: {

		async getSession() {
			await this.$http.get(`${localStorage.getItem('UserTableName')}/session`, {emulateJSON: true}).then(async res => {
				if (res.data.code == 0) {
					localStorage.setItem('sessionForm',JSON.stringify(res.data.data))
					localStorage.setItem('frontUserid', res.data.data.id);
					if(res.data.data.vip) {
						localStorage.setItem('vip', res.data.data.vip);
					}
					if(res.data.data.touxiang) {
						this.headportrait = res.data.data.touxiang
						localStorage.setItem('frontHeadportrait', res.data.data.touxiang);
					} else if(res.data.data.headportrait) {
						this.headportrait = res.data.data.headportrait
						localStorage.setItem('frontHeadportrait', res.data.data.headportrait);
					}
				}
			});
		},
        handleSelect(keyPath) {
            if (keyPath) {
                localStorage.setItem('keyPath', keyPath)
            }
        },
		toLogin() {
		  this.$router.push('/login');
		},
        logout() {
            localStorage.clear();
            Vue.http.headers.common['Token'] = "";
            this.$router.push('/index/home');
            this.activeIndex = '0'
            localStorage.setItem('keyPath', this.activeIndex)
            this.Token = ''
            this.$forceUpdate()
            this.$message({
                message: '登出成功',
                type: 'success',
                duration: 1000,
            });
        },
		getCarousel() {
			this.$http.get('config/list', {params: { page: 1, limit: 3 }}).then(res => {
				if (res.data.code == 0) {
					this.carouselList = res.data.data.list;
				}
			});
		},
		// 轮播图跳转
		carouselClick(url) {
			if (url) {
				if (url.indexOf('https') != -1) {
					window.open(url)
				} else {
					this.$router.push(url)
				}
			}
		},
		goBackend() {
			localStorage.setItem('Token', localStorage.getItem('frontToken'));
			localStorage.setItem('role', localStorage.getItem('frontRole'));
			localStorage.setItem('sessionTable', localStorage.getItem('frontSessionTable'));
			localStorage.setItem('headportrait', localStorage.getItem('frontHeadportrait'));
			localStorage.setItem('userid', localStorage.getItem('frontUserid'));
			window.open(`${this.$config.baseUrl}admin/dist/index.html`, "_blank");
		},
		goMenu(path) {
            this.$router.push(path);
		},
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.menu-preview {
	  .el-scrollbar {
	    height: 100%;
	  
	    & /deep/ .scrollbar-wrapper-vertical {
	      overflow-x: hidden;
	    }
	  
	    & /deep/ .scrollbar-wrapper-horizontal {
	      overflow-y: hidden;
	  
	      .el-scrollbar__view {
	        white-space: nowrap;
	      }
	    }
	  }
	}
	
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #333;
				white-space: nowrap;
				display: flex;
				font-size: 14px;
				line-height: 56px;
				background: none;
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home:hover {
				clip-path: polygon(30px 00%, 0% 100%, calc(100% - 30px) 100%, 100% 0%);
				color: #000;
				background: #81FFFC;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.home.is-active {
				clip-path: polygon(30px 00%, 0% 100%, calc(100% - 30px) 100%, 100% 0%);
				color: #000;
				background: #81FFFC;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #333;
				white-space: nowrap;
				display: none;
				font-size: 14px;
				line-height: 56px;
				background: #fff;
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user:hover {
				color: #fff;
				background: red;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.user.is-active {
				color: #fff;
				background: blue;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #333;
				white-space: nowrap;
				display: none;
				font-size: 14px;
				line-height: 56px;
				background: #fff;
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service:hover {
				color: #fff;
				background: red;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.service.is-active {
				color: #fff;
				background: blue;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #333;
				white-space: nowrap;
				display: none;
				font-size: 14px;
				line-height: 56px;
				background: #fff;
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop:hover {
				color: #fff;
				background: red;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.shop.is-active {
				color: #fff;
				background: blue;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back {
				cursor: pointer;
				border: 0;
				padding: 0 20px;
				color: #333;
				white-space: nowrap;
				display: none;
				font-size: 14px;
				line-height: 56px;
				background: #fff;
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back:hover {
				color: #fff;
				background: red;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.back.is-active {
				color: #fff;
				background: blue;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item {
				cursor: pointer;
				border: 0;
				padding: 0 40px;
				color: #000;
				white-space: nowrap;
				display: flex;
				font-size: 14px;
				line-height: 56px;
				background: none;
				align-items: center;
				position: relative;
				list-style: none;
				height: 56px;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item:hover {
				clip-path: polygon(30px 00%, 0% 100%, calc(100% - 30px) 100%, 100% 0%);
				color: #000;
				background: #81FFFC;
			}
	
	.menu-preview .el-menu-horizontal-demo .el-menu-item.item.is-active {
				clip-path: polygon(30px 00%, 0% 100%, calc(100% - 30px) 100%, 100% 0%);
				color: #000;
				background: #81FFFC;
			}
	
	.banner-preview {
	  .el-carousel /deep/ .el-carousel__indicator button {
	    width: 0;
	    height: 0;
	    display: none;
	  }
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left:hover {
		background: #57A7A5;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right:hover {
		background: #57A7A5;
	}

	.banner-preview .el-carousel /deep/ .el-carousel__indicators {
		padding: 0;
		margin: 0;
		z-index: 2;
		position: absolute;
		list-style: none;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 12px;
		opacity: 0.4;
		transition: 0.3s;
		height: 12px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li:hover {
		padding: 0;
		margin: 0 4px;
		background: #57A7A5;
		display: inline-block;
		width: 24px;
		opacity: 0.7;
		height: 12px;
	}
	
	.banner-preview .el-carousel /deep/ .el-carousel__indicators li.is-active {
		padding: 0;
		margin: 0 4px;
		background: #57A7A5;
		display: inline-block;
		width: 24px;
		opacity: 1;
		height: 12px;
	}

    .chat-content {
        padding-bottom: 20px;
        width: 100%;
        margin-bottom: 10px;
        max-height: 300px;
        height: 300px;
        overflow-y: scroll;
        border: 1px solid #eeeeee;
        background: #fff;

        .left-content {
            float: left;
            margin-bottom: 10px;
            padding: 10px;
            max-width: 80%;
        }

        .right-content {
            float: right;
            margin-bottom: 10px;
            padding: 10px;
            max-width: 80%;
        }
    }

    .clear-float {
        clear: both;
    }


	
	// -------- search --------
	.main-containers .search .select /deep/ .el-input__inner {
				border: 0;
				border-radius: 4px;
				padding: 0 30px 0 10px;
				box-shadow: 0 0 6px rgba(64, 158, 255, .3);
				outline: none;
				color: rgba(64, 158, 255, 1);
				width: 180px;
				font-size: 14px;
				height: 44px;
			}
	
	.main-containers .search .input /deep/ .el-input__inner {
				border: 0;
				border-radius: 4px;
				padding: 0 10px;
				box-shadow: 0 0 6px rgba(64, 158, 255, .3);
				outline: none;
				color: rgba(64, 158, 255, 1);
				width: 180px;
				font-size: 14px;
				height: 44px;
			}
	// -------- search --------
	
	.main-containers .btn-service {
				border: 0;
				padding: 0 8px;
				margin: 0 10px;
				color: #000;
				background: none;
				width: auto;
				font-size: 14px;
				line-height: 32px;
				height: 32px;
			}
	
	.main-containers .btn-service:hover {
				opacity: 0.5;
			}
	
	.main-containers .btn-shop {
				border: 0;
				padding: 0 8px;
				margin: 0 10px;
				color: #000;
				background: none;
				width: auto;
				font-size: 14px;
				line-height: 32px;
				height: 32px;
			}
	
	.main-containers .btn-shop:hover {
				opacity: 0.5;
			}
</style>
