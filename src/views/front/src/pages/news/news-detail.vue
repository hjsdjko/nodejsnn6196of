<template>
	<div :style='{"width":"100%","padding":"0 15%","margin":"0 auto","position":"relative","background":"none"}'>
	<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"0 5px 10px 0","color":"#fff","borderRadius":"0","background":"#57A7A5","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="warning" size="mini" @click="backClick" class="el-icon-back">返回</el-button>
	<div :style='{"width":"100%","padding":"10px 20px","background":"#fff"}'>
		<div :style='{"border":"2px solid #57A7A5","width":"100%","height":"auto"}'>
			<div :style='{"margin":"10px 0","fontSize":"20px","lineHeight":"34px","color":"#57A7A5","textAlign":"center","background":"none"}'>公告信息</div>
		</div>
		<div :style='{"width":"100%","padding":"20px","position":"relative"}'>
			<div  :style='{"lineHeight":"40px","fontSize":"18px","color":"#000","textAlign":"center","fontWeight":"bold"}'>{{detail.title}}</div>
			
			<div :style='{"width":"100%","alignItems":"center","justifyContent":"center","display":"flex"}'>
			  <div :style='{"padding":"0 10px"}'>
			    <span class="icon iconfont icon-shijian21" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"12px","color":"#555"}'></span>
			    <span :style='{"color":"#555","lineHeight":"1.5","fontSize":"12px"}'>发布时间：{{detail.addtime}}</span>
			  </div>
			  <div :style='{"padding":"0 10px"}'>
			    <span class="icon iconfont icon-geren16" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"12px","color":"#555"}'></span>
			    <span :style='{"color":"#555","lineHeight":"1.5","fontSize":"12px"}'>{{detail.name}}</span>
			  </div>
			  <div :style='{"padding":"0 10px"}'>
			    <span class="icon iconfont icon-zan10" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"12px","color":"#555"}'></span>
			    <span :style='{"color":"#555","lineHeight":"1.5","fontSize":"12px"}'>{{detail.thumbsupnum}}</span>
			  </div>
			  <div :style='{"padding":"0 10px"}'>
			    <span class="icon iconfont icon-shoucang10" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"12px","color":"#555"}'></span>
			    <span :style='{"color":"#555","lineHeight":"1.5","fontSize":"12px"}'>{{detail.storeupnum}}</span>
			  </div>
			  <div :style='{"padding":"0 10px"}'>
			    <span class="icon iconfont icon-chakan9" :style='{"margin":"0 2px 0 0","lineHeight":"1.5","fontSize":"12px","color":"#555"}'></span>
			    <span :style='{"color":"#555","lineHeight":"1.5","fontSize":"12px"}'>{{detail.clicknum}}</span>
			  </div>
			</div>
			<div class="operate" :style='{"width":"100%","padding":"10px 20px","alignItems":"center","justifyContent":"space-between","display":"flex"}'>
				<div @click="zanClick" :style='{"border":"1px solid #57A7A5","padding":"0 15px","alignItems":"center","borderRadius":"30px","justifyContent":"center","display":"flex"}'>
					<span class="icon iconfont icon-guanzhu-zhihui" :style='{"margin":"0 2px 0 0","lineHeight":"30px","fontSize":"14px","color":"#57A7A5"}'></span>
					<span :style='{"color":"#57A7A5","lineHeight":"30px","fontSize":"14px"}'>{{zanType?'取消赞':'点赞'}}</span>
				</div>
				<div @click="collectClick" :style='{"border":"1px solid #57A7A5","padding":"0 15px","alignItems":"center","borderRadius":"30px","justifyContent":"center","display":"flex"}'>
					<span class="icon iconfont icon-shoucang10" :style='{"margin":"0 2px 0 0","lineHeight":"30px","fontSize":"14px","color":"#57A7A5"}'></span>
					<span :style='{"color":"#57A7A5","lineHeight":"30px","fontSize":"14px"}'>{{collectType?'取消收藏':'收藏'}}</span>
				</div>
			</div>
			
			<div :style='{"width":"100%","height":"auto"}' class="content-detail" v-html="detail.content"></div>
		</div>
		<!-- option -->
		<div :style='{"width":"100%","padding":"0 20px 20px","justifyContent":"space-between","display":"flex","height":"auto"}'>
		  <div :style='{"cursor":"pointer","padding":"0 10px","color":"#fff","borderRadius":"30px","background":"#9e9e9e","lineHeight":"30px","fontSize":"14px"}' @click="prepDetailClick">上一篇：prev</div>
		  <div :style='{"cursor":"pointer","padding":"0 10px","color":"#fff","borderRadius":"30px","background":"#57A7A5","lineHeight":"30px","fontSize":"14px"}' @click="nextDetailClick">下一篇：next</div>
		</div>

		<!-- 热门文章 -->
		<div class="hot" :style='{"boxShadow":"0 1px 6px rgb(0 0 0 / 10%)","top":"0","left":"0","background":"#fff","width":"13%","position":"absolute","height":"auto"}'>
		  <div :style='{"width":"100%","lineHeight":"50px","fontSize":"16px","color":"#fff","textAlign":"center","background":"#57A7A5"}'>热门文章</div>
		  <div :style='{"width":"100%","padding":"0 40px","background":"#fff","height":"auto"}'>
		    <div v-for="item in hotList" :key="item.id" :style='{"width":"100%","padding":"10px 0","background":"#fff","height":"auto"}' @click="toDetail(item.id)">
		      <img :style='{"width":"100%","objectFit":"cover","borderRadius":"10px","display":"block","height":"75px"}' :src="baseUrl + item.picture" alt="">
		      <div :style='{"padding":"4px 5px 0","lineHeight":"1.5","fontSize":"16px","color":"#000","textAlign":"center","fontWeight":"bold"}'>{{ item.title }}</div>
		      <div :style='{"padding":"0 5px","lineHeight":"22px","fontSize":"13px","color":"#999","textAlign":"center"}'>{{item.addtime}}</div>
		    </div>
		  </div>
		</div>
		<!-- 推荐文章 -->
		<div class="news" :style='{"width":"100%","background":"#fff","height":"auto"}'>
		  <div :style='{"border":"2px solid #57A7A5","padding":"0 20px","color":"#57A7A5","textAlign":"center","background":"none","width":"100%","lineHeight":"44px","fontSize":"24px"}'>推荐文章</div>
		  <div :style='{"width":"100%","padding":"20px 0","background":"#fff","justifyContent":"space-between","display":"flex","height":"auto"}'>
		    <div v-for="item in recommendList" :key="item.id" :style='{"width":"calc(20% - 20px)","boxShadow":"0px 4px 10px 0px rgba(0,0,0,0.3)","padding":"10px","borderRadius":"10px","background":"#fff","height":"auto"}' @click="toDetail(item.id)">
		      <img :style='{"width":"100%","objectFit":"cover","borderRadius":"10px","display":"block","height":"150px"}' :src="baseUrl + item.picture" alt="">
		      <div :style='{"padding":"0 10px","lineHeight":"36px","fontSize":"16px","color":"#000","textAlign":"center"}'>{{ item.title }}</div>
		      <div :style='{"padding":"0 10px","lineHeight":"12px","fontSize":"14px","color":"#9e9e9e","textAlign":"center"}'>{{item.addtime}}</div>
		    </div>
		  </div>
		</div>
	</div>
	</div>
</template>

<script>
	export default {
		//数据集合
		data() {
			return {
				id: 0,
				detail: {},
				zanType: false,
				zanForm: {},
				collectType:false,
				collectForm: {},
				baseUrl:'',
				hotList: [],
				recommendList: [],
				categoryList: [],
				currentIndex: 0,
				allList: []
			}
		},
		created() {
			this.id = this.$route.query.id
			this.baseUrl = this.$config.baseUrl;
			this.getCategoryList()
			this.getDetail()
			this.getNewsList()
			this.getHotList()
			this.getRecommendList()
		},
		watch:{
			$route(newValue) {
				this.id = this.$route.query.id
			    this.getDetail()
			}
		},
		methods: {
			  backClick() {
				  history.back()
			  },
			getNewsList() {
				let params = {page:1, limit: 100,sort:'addtime',order:'desc'};
				this.$http.get('news/list', {params: params}).then(res => {
					if (res.data.code == 0) {
						for(let x in res.data.data.list){
							if(res.data.data.list[x].id == this.id){
								this.currentIndex = Number(x)
								break
							}
						}
						this.allList = res.data.data.list
					}
				});
			},
			// 上一篇
			prepDetailClick(){
				if(this.currentIndex == 0){
					this.$message.error('已经是第一篇了')
					return false
				}
				this.currentIndex--
				this.$router.push({path: '/index/newsDetail', query: {id: this.allList[this.currentIndex].id}});
			},
			// 下一篇
			nextDetailClick(){
				if(this.currentIndex == this.allList.length - 1){
					this.$message.error('已经是最后一篇了')
					return false
				}
				this.currentIndex++
				this.$router.push({path: '/index/newsDetail', query: {id: this.allList[this.currentIndex].id}});
			},
			getCategoryList(){
				this.$http.get('newstype/list', {}).then(res => {
					if (res.data.code == 0) {
						this.categoryList = res.data.data;
					}
				});
			},
			// 获取热门列表
			getHotList(){
				let params = {page:1, limit: 4,sort:'addtime',order:'desc'};
				this.$http.get('news/autoSort', {params: params}).then(res => {
					if (res.data.code == 0) {
						this.hotList = res.data.data.list;
					}
				});
			},
			// 获取推荐列表
			getRecommendList(){
				let url = 'news/autoSort'
				if(localStorage.getItem('frontToken')){
					url = 'news/autoSort2'
				}
				let params = {page:1, limit: 4,sort:'addtime',order:'desc'};
				this.$http.get(url, {params: params}).then(res => {
					if (res.data.code == 0) {
						this.recommendList = res.data.data.list;
					}
				});
			},
			// 跳转详情
			toDetail(id){
				this.$router.push({path: '/index/newsDetail', query: {id: id}});
			},
			getDetail(){
				this.$http.get(`news/detail/${this.id}`,{}).then(res=>{
					if(res.data&&res.data.code==0){
						this.detail = res.data.data
						window.scrollTo(0, 100)
						this.getZan()
						this.getCollect()
					}
				})
			},
			getZan() {
				this.$http.get('storeup/list', {
					params: {
						page: 1,
						limit: 1,
						type: 21,
						userid: localStorage.getItem('frontUserid'),
						tablename: 'news',
						refid: this.id
					}
				}).then(res=>{
					if(res.data&&res.data.code==0){
						if(res.data.data.list.length){
							this.zanType = true
							this.zanForm = res.data.data.list[0]
						}else{
							this.zanType = false
						}
					}
				})
			},
			getCollect(){
				this.$http.get('storeup/list', {
					params: {
						page: 1,
						limit: 1,
						type: 1,
						userid: localStorage.getItem('frontUserid'),
						tablename: 'news',
						refid: this.id
					}
				}).then(res=>{
					if(res.data&&res.data.code==0){
						if(res.data.data.list.length){
							this.collectType = true
							this.collectForm = res.data.data.list[0]
						}else{
							this.collectType = false
						}
					}
				})
			},
			zanClick() {
				if(this.zanType){
					this.$http.post('storeup/delete', [this.zanForm.id]).then(res => {
						if (res.data && res.data.code == 0) {
							this.$message.success('取消成功')
							this.detail.thumbsupnum--
							this.$http.post('news/update',this.detail).then(obj=>{})
							this.getZan()
						}
					})
				}else{
					let data = {
						name: this.detail.title,
						picture: this.detail.picture,
						refid: this.detail.id,
						type: 21,
						tablename: 'news',
						userid: localStorage.getItem('frontUserid')
					}
					this.$http.post('storeup/add', data).then(res => {
						if (res.data && res.data.code == 0) {
							this.$message.success('点赞成功')
							this.detail.thumbsupnum++
							this.$http.post('news/update',this.detail).then(obj=>{})
							this.getZan()
						}
					})
				}
			},
			collectClick(){
				if(this.collectType){
					this.$http.post('storeup/delete', [this.collectForm.id]).then(res => {
						if (res.data && res.data.code == 0) {
							this.$message.success('取消成功')
							this.detail.storeupnum--
							this.$http.post('news/update',this.detail).then(obj=>{})
							this.getCollect()
						}
					})
				}else{
					let data = {
						name: this.detail.title,
						picture: this.detail.picture,
						refid: this.detail.id,
						type: 1,
						tablename: 'news',
						userid: localStorage.getItem('frontUserid')
					}
					this.$http.post('storeup/add', data).then(res => {
						if (res.data && res.data.code == 0) {
							this.detail.storeupnum++
							this.$http.post('news/update',this.detail).then(obj=>{})
							this.$message.success('收藏成功')
							this.getCollect()
						}
					})
				}
			},
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.section {
		width: 900px;
		margin: 0 auto;
	}
	.editor /deep/ .avatar-uploader {
		height: 0;
		line-height: 0;
	}
	.section-content {
		margin-top: 30px;
	}
	.content-title {
		text-align: center;
		font-size: 22px;
		font-weight: bold;
	}
	.content-sub-title {
		text-align: center;
		margin-top: 20px;
		color: #888888;
		font-size: 14px;
	}
	.operate{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 40px;
	}
</style>