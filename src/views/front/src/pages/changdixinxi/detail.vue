<template>
<div>
	<div :style='{"padding":"20px","boxShadow":"0px 4px 10px 0px rgba(0,0,0,0.3)","margin":"30px auto","borderRadius":"0","background":"url(http://codegen.caihongy.cn/20231123/f32f462e47c448c5b9215291b017d947.png)","display":"flex","width":"80%","backgroundSize":"cover","backgroundPosition":"center left","backgroundRepeat":"no-repeat","justifyContent":"flex-end"}' class="breadcrumb-preview">
		<el-breadcrumb :separator="'>'" :style='{"fontSize":"16px","lineHeight":"1"}'>
			<el-breadcrumb-item class="item1" to="/"><a>首页</a></el-breadcrumb-item>
			<el-breadcrumb-item class="item2" v-for="(item, index) in breadcrumbItem" :key="index" to="/index/changdixinxi"><a>{{item.name}}</a></el-breadcrumb-item>
			<el-breadcrumb-item class="item3"><a href="javascript:void(0);">详情</a></el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	<div :style='{"padding":"20px","boxShadow":"0px 4px 10px 0px rgba(0,0,0,0.3)","margin":"30px auto","borderRadius":"0","background":"url(http://codegen.caihongy.cn/20231123/f32f462e47c448c5b9215291b017d947.png)","display":"flex","width":"80%","backgroundSize":"cover","backgroundPosition":"center left","backgroundRepeat":"no-repeat","justifyContent":"flex-end"}'>
		<el-button size="mini" @click="backClick">返回</el-button>
	</div>
	<div class="detail-preview" :style='{"width":"80%","margin":"10px auto","position":"relative","flexWrap":"wrap","display":"flex"}'>
		<div class="attr" :style='{"minHeight":"780px","padding":"0 10px","background":"#fff","display":"flex","width":"30%","position":"relative","order":"2"}'>

			<div class="info" :style='{"padding":"10px 0","margin":"0 0 0 10px","background":"#fff","flex":"1"}'>
				<div class="item" :style='{"padding":"10px","margin":"0 0 10px 0","alignItems":"center","flexWrap":"wrap","background":"none","display":"flex","justifyContent":"flex-end"}'>
					<div :style='{"width":"100%","fontSize":"16px","color":"#000","fontWeight":"bold"}'>
                    {{detail.changdimingcheng}}
                    </div>
					<div @click="storeup(1)" v-show="!isStoreup" :style='{"borderRadius":"5px","padding":"10px","background":"#57A7A5"}'><i v-if="true" :style='{"color":"#fff","fontSize":"14px"}' class="el-icon-star-off"></i><span :style='{"color":"#fff","fontSize":"14px"}'>点我收藏({{detail.storeupnum}})</span></div>
					<div @click="storeup(-1)" v-show="isStoreup" :style='{"borderRadius":"5px","padding":"10px","background":"#57A7A5"}'><i v-if="true" :style='{"color":"#fff","fontSize":"14px"}' class="el-icon-star-on"></i><span :style='{"color":"#fff","fontSize":"14px"}'>取消收藏({{detail.storeupnum}})</span></div>
				</div>
				<div class="item" :style='{"border":"1px solid #D8D8D8","padding":"0 10px","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#818181","textAlign":"right","width":"auto","fontSize":"14px","lineHeight":"40px","minWidth":"100px","height":"40px"}'>场地分类</div>
					<div  :style='{"padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#818181","flex":"1","height":"auto"}'>{{detail.changdifenlei}}</div>
				</div>
				<div class="item" :style='{"border":"1px solid #D8D8D8","padding":"0 10px","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#818181","textAlign":"right","width":"auto","fontSize":"14px","lineHeight":"40px","minWidth":"100px","height":"40px"}'>场地位置</div>
					<div  :style='{"padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#818181","flex":"1","height":"auto"}'>{{detail.changdiweizhi}}</div>
				</div>
				<div class="item" :style='{"border":"1px solid #D8D8D8","padding":"0 10px","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#818181","textAlign":"right","width":"auto","fontSize":"14px","lineHeight":"40px","minWidth":"100px","height":"40px"}'>场地状态</div>
					<div  :style='{"padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#818181","flex":"1","height":"auto"}'>{{detail.changdizhuangtai}}</div>
				</div>
				<div class="item" :style='{"border":"1px solid #D8D8D8","padding":"0 10px","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#818181","textAlign":"right","width":"auto","fontSize":"14px","lineHeight":"40px","minWidth":"100px","height":"40px"}'>费用/小时</div>
					<div  :style='{"padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#818181","flex":"1","height":"auto"}'>{{detail.feiyong}}</div>
				</div>
				<div class="item" :style='{"border":"1px solid #D8D8D8","padding":"0 10px","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#818181","textAlign":"right","width":"auto","fontSize":"14px","lineHeight":"40px","minWidth":"100px","height":"40px"}'>场地设施</div>
					<div  :style='{"padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#818181","flex":"1","height":"auto"}'>{{detail.changdisheshi}}</div>
				</div>
				<div class="item" :style='{"border":"1px solid #D8D8D8","padding":"0 10px","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#818181","textAlign":"right","width":"auto","fontSize":"14px","lineHeight":"40px","minWidth":"100px","height":"40px"}'>发布日期</div>
					<div  :style='{"padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#818181","flex":"1","height":"auto"}'>{{detail.faburiqi}}</div>
				</div>
				<div class="item" :style='{"border":"1px solid #D8D8D8","padding":"0 10px","margin":"0 0 10px 0","background":"none","justifyContent":"spaceBetween","display":"flex"}'>
					<div class="lable" :style='{"padding":"0 10px","color":"#818181","textAlign":"right","width":"auto","fontSize":"14px","lineHeight":"40px","minWidth":"100px","height":"40px"}'>点击次数</div>
					<div  :style='{"padding":"8px 10px 0","fontSize":"14px","lineHeight":"24px","color":"#818181","flex":"1","height":"auto"}'>{{detail.clicknum}}</div>
				</div>
				<div class="btn" :style='{"padding":"10px 0","flexWrap":"wrap","justifyContent":"flex-start","display":"flex"}'>
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"0 5px 0 0","color":"#fff","borderRadius":"0","background":"#57A7A5","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="btnAuth('changdixinxi','修改')" @click="editClick">修改</el-button>
					<el-button :style='{"border":"1px solid #CCCCCC","cursor":"pointer","padding":"0 10px","margin":"0 5px 10px 0","color":"#CCCCCC","borderRadius":"0","background":"none","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="btnAuth('changdixinxi','删除')" @click="delClick">删除</el-button>
					<!-- hasChat 无 -->
					<!-- crossOptButtonStatusColumns changdizhuangtai -->
					<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"0 5px 10px 0","color":"#fff","borderRadius":"0","background":"#57A7A5","width":"auto","lineHeight":"40px","fontSize":"14px","height":"40px"}' v-if="btnAuth('changdixinxi','立即订阅')" @click="onAcross('dingyuexinxi','','','changdizhuangtai','场地已被订阅','已订阅,闲置'.split(',')[0])" type="warning">立即订阅</el-button>
				</div>
			</div>
		</div>
		
			<div class="swiper3" v-if="detailBanner.length" :style='{"width":"70%","padding":"10px 0","background":"#fff","height":"auto","order":"1"}'>
			  <div class="big" :style='{"border":"0","width":"100%","margin":"0 0 20px","position":"relative","background":"#fff","height":"600px"}'>
				<img id="big" :style='{"boxShadow":"none","objectFit":"cover","borderRadius":"10px","display":"block","width":"100%","height":"100%","zIndex":"1"}' :src="swiperBigUrl" class="image">
			  </div>
			  <div class="samll" :style='{"width":"100%","padding":"0 5px","background":"#fff","display":"flex","height":"100px"}'>
			    <div :style='{"margin":"0 5px","position":"relative","flex":"1","background":"#fff","height":"100%"}' v-for="item in detailBanner" :key="item.id">
				  <img :style='{"boxShadow":"none","objectFit":"cover","borderRadius":"10px","display":"block","width":"100%","height":"100%","zIndex":"1"}' v-if="item.substr(0,4)=='http'" :src="item" @click="swiperClick3(item)" class="image">
				  <img :style='{"boxShadow":"none","objectFit":"cover","borderRadius":"10px","display":"block","width":"100%","height":"100%","zIndex":"1"}' v-else :src="baseUrl + item" @click="swiperClick3(baseUrl + item)" class="image">
			    </div>
			  </div>
			</div>

			<div class="zancai" :style='{"padding":"0","margin":"0","top":"740px","left":"0","background":"#fff","display":"flex","width":"69%","position":"absolute"}'>
				<div :style='{"padding":"10px 0","margin":"0","alignItems":"center","background":"#57A7A5","display":"flex","width":"100%","justifyContent":"center"}' v-if="!isThumbsupnum && !isCrazilynum" class="zan" @click="thumbsupOrCrazily(21)">
					<i :style='{"color":"#fff","margin":"0 3px","fontSize":"14px"}' class="iconfont icon-dianzan"></i>
					<span :style='{"color":"#fff","margin":"0 3px","fontSize":"14px"}'>赞一下({{detail.thumbsupnum}})</span>
				</div>
				<div :style='{"padding":"10px 0","margin":"0","alignItems":"center","background":"#57A7A5","display":"flex","width":"100%","justifyContent":"center"}' v-if="!isThumbsupnum && !isCrazilynum" class="cai" @click="thumbsupOrCrazily(22)">
					<i :style='{"color":"#fff","margin":"0 3px","fontSize":"14px"}' class="iconfont icon-iconfontzan"></i>
					<span :style='{"color":"#fff","margin":"0 3px","fontSize":"14px"}'>踩一下({{detail.crazilynum}})</span>
				</div>
				<div :style='{"padding":"10px 0","margin":"0","alignItems":"center","background":"#57A7A5","display":"flex","width":"100%","justifyContent":"center"}' v-if="isThumbsupnum" class="zan" @click="cancelThumbsupOrCrazily(21)">
					<i :style='{"color":"#fff","margin":"0 3px","fontSize":"14px"}' class="iconfont icon-dianzan"></i>
					<span :style='{"color":"#fff","margin":"0 3px","fontSize":"14px"}'>取消赞({{detail.thumbsupnum}})</span>
				</div>
				<div :style='{"padding":"10px 0","margin":"0","alignItems":"center","background":"#57A7A5","display":"flex","width":"100%","justifyContent":"center"}' v-if="isCrazilynum" class="cai" @click="cancelThumbsupOrCrazily(22)">
					<i :style='{"color":"#fff","margin":"0 3px","fontSize":"14px"}' class="iconfont icon-iconfontzan"></i>
					<span :style='{"color":"#fff","margin":"0 3px","fontSize":"14px"}'>取消踩({{detail.crazilynum}})</span>
				</div>
			</div>

			<!-- 热门信息 -->
			<div class="hot" :style='{"boxShadow":"none","padding":"20px 0 0","background":"#fff","flex":"3","width":"30%","height":"auto","order":"4"}'>
			  <div :style='{"margin":"0 auto","color":"#fff","borderRadius":"10px","textAlign":"center","background":"#57A7A5","clipPath":"polygon(30px 00%, 0% 100%, calc(100% - 30px) 100%, 100% 0%)","width":"80%","lineHeight":"44px","fontSize":"14px"}'>热门信息</div>
			  <div :style='{"padding":"0 0 5px 0","margin":"10px auto","flexWrap":"wrap","background":"#fff","display":"flex","width":"80%","justifyContent":"space-between","height":"auto"}'>
			    <div v-for="item in hotList" :key="item.id" :style='{"width":"calc(50% - 10px)","padding":"5px 0","background":"#fff","height":"auto"}' @click="toDetail(item)">
			      <img :style='{"width":"100%","objectFit":"cover","display":"block","height":"75px"}' v-if="item.changditupian && item.changditupian.substr(0,4)=='http'" :src="item.changditupian" alt="">
			      <img :style='{"width":"100%","objectFit":"cover","display":"block","height":"75px"}' v-else :src="baseUrl + (item.changditupian?item.changditupian.split(',')[0]:'')" alt="">
			      <div :style='{"padding":"4px 5px 0","lineHeight":"2","fontSize":"14px","color":"#000","textAlign":"center"}'>{{item.changdimingcheng}}</div>
			      <div :style='{"padding":"4px 5px 0","lineHeight":"2","fontSize":"14px","color":"#000","textAlign":"center"}'>{{item.changdifenlei}}</div>
			      <div :style='{"padding":"4px 5px 0","lineHeight":"2","fontSize":"14px","color":"#000","textAlign":"center"}'>{{item.changdiweizhi}}</div>
			      <!-- <div :style='{"padding":"0 5px","lineHeight":"20px","fontSize":"12px","color":"#818181","textAlign":"center"}'>2022-02-02</div> -->
			    </div>
			  </div>
			</div>
		

		
		<el-tabs class="detail" :style='{"border":"none","width":"100%","boxShadow":"none","background":"#FFF","order":"5"}' v-model="activeName" type="border-card">
																<el-tab-pane label="场地详情" name="first">
				<div v-html="detail.changdixiangqing"></div>
			</el-tab-pane>
														</el-tabs>
	</div>
	<div class="share_view" :style='{"boxShadow":"0 1px 6px rgba(0,0,0,.3)","position":"fixed","right":"0","bottom":"20%","background":"#fff","zIndex":"11"}'>
	</div>
</div>
</template>

<script>
  import CountDown from '@/components/CountDown';
  import axios from 'axios'
  import Swiper from "swiper";
  
  export default {
    //数据集合
    data() {
      return {
        tablename: 'changdixinxi',
        baseUrl: '',
        breadcrumbItem: [
          {
            name: '场地信息'
          }
        ],
        title: '',
        detailBanner: [],
        hotList: [],
		id: 0,
        detail: {},
        activeName: 'first',
        total: 1,
        pageSize: 5,
		pageSizes: [10,20,30,50],
        totalPage: 1,
        storeupParams: {
          name: '',
          picture: '',
          refid: 0,
          tablename: 'changdixinxi',
          userid: localStorage.getItem('frontUserid')
        },
        isStoreup: false,
        storeupInfo: {},
        isCrazilynum: false,
        isThumbsupnum: false,
        thumbsupOrCrazilyInfo: {},
        buynumber: 1,
		centerType: false,
		shareUrl: location.href,
		swiperBigUrl: null,
      }
    },
    created() {
		if(this.$route.query.centerType) {
			this.centerType = true
		}
		
        this.init();
    },
	mounted() {
	},
    //方法集合
    methods: {
		swiperClick3(src) {
			this.swiperBigUrl = src
		},
        init() {
		  this.id = this.$route.query.id
          this.baseUrl = this.$config.baseUrl;
          this.$http.get(this.tablename + '/detail/'  + this.id, {}).then(res => {
            if (res.data.code == 0) {
              this.detail = res.data.data;
              this.title = this.detail.changdimingcheng;
              this.detailBanner = this.detail.changditupian ? this.detail.changditupian.split(",") : [];
              this.$forceUpdate();

				if(localStorage.getItem('frontToken')){
					this.getStoreupStatus();
					this.getThumbsupOrCrazilyStatus();
				}
			  this.getHotList();

            }
			if (this.detailBanner.length) {
				if (this.detailBanner[0].substr(0,4)=='http') {
					this.swiperBigUrl = this.detailBanner[0]
				} else {
					this.swiperBigUrl = this.baseUrl + this.detailBanner[0]
				}
			}
          });
        },
        toDetail(item) {
			let params = {
				id: item.id
			}
			if(this.centerType){
				params.centerType = 1
			}
          this.$router.push({path: '/index/changdixinxiDetail', query: params});
          this.init();
          document.body.scrollTop = 0
          document.documentElement.scrollTop = 0
        },
        getHotList() {
          let autoSortUrl = "";
          autoSortUrl = "changdixinxi/autoSort";
          if(localStorage.getItem('frontToken')) {
              autoSortUrl = "changdixinxi/autoSort2";
          }
            this.$http.get(autoSortUrl, {params: {
                page: 1,
                limit: 4,
            }}).then(res => {
                if (res.data.code == 0) {
                    this.hotList = res.data.data.list;        
                }
            })
        },
      async onAcross(acrossTable,crossOptAudit,crossOptPay,statusColumnName,tips,statusColumnValue,type=1){
        localStorage.setItem('crossTable',`changdixinxi`);
        localStorage.setItem('crossObj', JSON.stringify(this.detail));
        localStorage.setItem('statusColumnName',statusColumnName);
        localStorage.setItem('statusColumnValue',statusColumnValue);
        localStorage.setItem('tips',tips);
        if(statusColumnName!=''&&!statusColumnName.startsWith("[")) {
            var obj = JSON.parse(localStorage.getItem('crossObj'));
            for (var o in obj){
                if(o==statusColumnName && obj[o]==statusColumnValue){
                    this.$message({
                        type: 'error',
                        message: tips,
                        duration: 1500
                    });
                    return
                }
            }
        }
        this.$router.push({path: '/index/' + acrossTable + 'Add', query: {type: 'cross'}});
      },
      storeup(type) {
        if (type == 1 && !this.isStoreup) {
          this.storeupParams.name = this.title;
          this.storeupParams.picture = this.detailBanner[0];
          this.storeupParams.inteltype = this.detail.changdifenlei;
          this.storeupParams.refid = this.detail.id;
          this.storeupParams.type = type;
          this.$http.post('storeup/add', this.storeupParams).then(res => {
            if (res.data.code == 0) {
              this.isStoreup = true;
			  this.detail.storeupnum++
			  this.$http.post('changdixinxi/update', this.detail).then(res => {});
              this.$message({
                type: 'success',
                message: '收藏成功!',
                duration: 1500,
              });
            }
          });
        }
        if (type == -1 && this.isStoreup) {
          this.$http.get('storeup/list', {params: {page: 1, limit: 1, type: 1, refid: this.detail.id, tablename: 'changdixinxi', userid: localStorage.getItem('frontUserid')}}).then(res => {
            if (res.data.code == 0 && res.data.data.list.length > 0) {
              this.isStoreup = true;
              this.storeupInfo = res.data.data.list[0];
              let delIds = new Array();
              delIds.push(this.storeupInfo.id);
              this.$http.post('storeup/delete', delIds).then(res => {
                if (res.data.code == 0) {
                  this.isStoreup = false;
				  this.detail.storeupnum--
				  this.$http.post('changdixinxi/update', this.detail).then(res => {});
                  this.$message({
                    type: 'success',
                    message: '取消成功!',
                    duration: 1500,
                  });
                }
              });
            }
          });
        }
      },
      getStoreupStatus(){
        if(localStorage.getItem("frontToken")) {
            this.$http.get('storeup/list', {params: {page: 1, limit: 1, type: 1, refid: this.detail.id, tablename: 'changdixinxi', userid: localStorage.getItem('frontUserid')}}).then(res => {
              if (res.data.code == 0 && res.data.data.list.length > 0) {
                this.isStoreup = true;
                this.storeupInfo = res.data.data.list[0];
              }
            });
        }
      },
      thumbsupOrCrazily(type) {
        this.storeupParams.name = this.title;
        this.storeupParams.picture = this.detailBanner[0];
        this.storeupParams.refid = this.detail.id;
        this.storeupParams.type = type;
        this.$http.post('storeup/add', this.storeupParams).then(res => {
          if (res.data.code == 0) {
            this.getThumbsupOrCrazilyStatus();
            this.$message({
              type: 'success',
              message: '操作成功!',
              duration: 1500,
            });
          }
        });

        if (type == 21) this.detail.thumbsupnum = Number(this.detail.thumbsupnum) + 1;
        if (type == 22) this.detail.crazilynum = Number(this.detail.crazilynum) + 1;
        this.$http.post('changdixinxi/update', this.detail).then(res => {});
      },
      cancelThumbsupOrCrazily(type) {
        let delIds = new Array();
        delIds.push(this.thumbsupOrCrazilyInfo.id);
        this.$http.post('storeup/delete', delIds).then(res => {
          if (res.data.code == 0) {
            this.isThumbsupnum = false;
            this.isCrazilynum = false;
            this.$message({
              type: 'success',
              message: '取消成功!',
              duration: 1500,
            });
          }
        });

        if (type == 21) this.detail.thumbsupnum -= 1;
        if (type == 22) this.detail.crazilynum -= 1;
        this.$http.post('changdixinxi/update', this.detail).then(res => {});
      },
    getThumbsupOrCrazilyStatus() {
        if(localStorage.getItem("frontToken")) {
            this.$http.get('storeup/list', {params: {page: 1, limit: 1, type: 21, refid: this.detail.id, tablename: 'changdixinxi', userid: localStorage.getItem('frontUserid')}}).then(res => {
              if (res.data.code == 0 && res.data.data.list.length > 0) {
                this.isThumbsupnum = true;
                this.thumbsupOrCrazilyInfo = res.data.data.list[0];
              }
            });

            this.$http.get('storeup/list', {params: {page: 1, limit: 1, type: 22, refid: this.detail.id, tablename: 'changdixinxi', userid: localStorage.getItem('frontUserid')}}).then(res => {
              if (res.data.code == 0 && res.data.data.list.length > 0) {
                this.isCrazilynum = true;
                this.thumbsupOrCrazilyInfo = res.data.data.list[0];
              }
            });
        }
    },
      curChange(page) {
        this.getDiscussList(page);
      },
      prevClick(page) {
        this.getDiscussList(page);
      },
      nextClick(page) {
        this.getDiscussList(page);
      },
		// 返回按钮
		backClick(){
			history.back()
		},
		// 下载
		download(file){
			if(!file) {
				this.$message({
				  type: 'error',
				  message: '文件不存在',
				  duration: 1500,
				});
				return;
			}
		  let arr = file.replace(new RegExp('upload/', "g"), "")
		  axios.get(this.baseUrl + '/file/download?fileName=' + arr, {
		  	headers: {
		  		token: localStorage.getItem("frontToken")
		  	},
		  	responseType: "blob"
		  }).then(({
		  	data
		  }) => {
		  	const binaryData = [];
		  	binaryData.push(data);
		  	const objectUrl = window.URL.createObjectURL(new Blob(binaryData, {
		  		type: 'application/pdf;chartset=UTF-8'
		  	}))
		  	const a = document.createElement('a')
		  	a.href = objectUrl
		  	a.download = arr
		  	// a.click()
		  	// 下面这个写法兼容火狐
		  	a.dispatchEvent(new MouseEvent('click', {
		  		bubbles: true,
		  		cancelable: true,
		  		view: window
		  	}))
		  	window.URL.revokeObjectURL(data)
		  },err=>{
			  axios.get((location.href.split(this.$config.name).length>1 ? location.href.split(this.$config.name)[0] :'') + this.$config.name + '/file/download?fileName=' + arr, {
			  	headers: {
			  		token: localStorage.getItem("frontToken")
			  	},
			  	responseType: "blob"
			  }).then(({
			  	data
			  }) => {
			  	const binaryData = [];
			  	binaryData.push(data);
			  	const objectUrl = window.URL.createObjectURL(new Blob(binaryData, {
			  		type: 'application/pdf;chartset=UTF-8'
			  	}))
			  	const a = document.createElement('a')
			  	a.href = objectUrl
			  	a.download = arr
			  	// a.click()
			  	// 下面这个写法兼容火狐
			  	a.dispatchEvent(new MouseEvent('click', {
			  		bubbles: true,
			  		cancelable: true,
			  		view: window
			  	}))
			  	window.URL.revokeObjectURL(data)
			  })
		  })
      },


		// 权限判断
		btnAuth(tableName,key){
			if(this.centerType){
				return this.isBackAuth(tableName,key)
			}else{
				return this.isAuth(tableName,key)
			}
		},
		// 修改
		editClick(){
			this.$router.push(`/index/changdixinxiAdd?type=edit&&id=${this.detail.id}`);
		},
		// 删除
		delClick(){
			this.$confirm('是否删除此场地信息？')
			  .then(_ => {
			    this.$http.post('changdixinxi/delete', [this.detail.id]).then(res => {
			      if (res.data.code == 0) {
			        this.$message({
			          type: 'success',
			          message: '删除成功!',
			          duration: 1500,
					  onClose: () => {
						  history.back()
					  }
			        });
			      }
			    });
			  }).catch(_ => {});
		},
    },
    components: {
      CountDown
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.editor /deep/ .avatar-uploader {
		height: 0;
		line-height: 0;
	}
	
	.detail-preview {
	
	  .attr {
	    .el-carousel /deep/ .el-carousel__indicator button {
	      width: 0;
	      height: 0;
	      display: none;
	    }
	
	    .el-input-number__decrease:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled), .el-input-number__increase:hover:not(.is-disabled)~.el-input .el-input__inner:not(.is-disabled) {
	      border-color: none;
	    }
	  }
	
	  .detail {
	    & /deep/ .el-tabs__header .el-tabs__nav-wrap {
	      margin-bottom: 0;
	    }
	
	    & .add .el-textarea {
	      width: auto;
	    }
	  }
	}
	
	.attr .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.attr .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--left:hover {
		background: red;
	}
	
	.attr .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right {
		width: 36px;
		font-size: 12px;
		height: 36px;
	}
	
	.attr .el-carousel /deep/ .el-carousel__container .el-carousel__arrow--right:hover {
		background: red;
	}

	.attr .el-carousel /deep/ .el-carousel__indicators {
		padding: 0;
		margin: 0;
		z-index: 2;
		position: absolute;
		list-style: none;
	}
	
	.attr .el-carousel /deep/ .el-carousel__indicators li {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 12px;
		opacity: 0.4;
		transition: 0.3s;
		height: 12px;
	}
	
	.attr .el-carousel /deep/ .el-carousel__indicators li:hover {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 24px;
		opacity: 0.7;
		height: 12px;
	}
	
	.attr .el-carousel /deep/ .el-carousel__indicators li.is-active {
		padding: 0;
		margin: 0 4px;
		background: #fff;
		display: inline-block;
		width: 24px;
		opacity: 1;
		height: 12px;
	}
	
	.attr .el-input-number /deep/ .el-input-number__decrease {
		cursor: pointer;
		z-index: 1;
		display: flex;
		border-color: #DCDFE6;
		border-radius: 4px 0 0 4px;
		top: 1px;
		left: 1px;
		background: #f5f5f5;
		width: 40px;
		justify-content: center;
		border-width: 0 1px 0 0;
		align-items: center;
		position: absolute;
		border-style: solid;
		text-align: center;
		height: 38px;
	}
	
	.attr .el-input-number /deep/ .el-input-number__decrease i {
		color: #666;
		font-size: 14px;
	}

	.attr .el-input-number /deep/ .el-input-number__increase {
		cursor: pointer;
		z-index: 1;
		display: flex;
		border-color: #DCDFE6;
		right: 1px;
		border-radius: 0 4px 4px 0;
		top: 1px;
		background: #f5f5f5;
		width: 40px;
		justify-content: center;
		border-width: 0 0 0 1px;
		align-items: center;
		position: absolute;
		border-style: solid;
		text-align: center;
		height: 38px;
	}
	
	.attr .el-input-number /deep/ .el-input-number__increase i {
		color: #666;
		font-size: 14px;
	}
	
	.attr .el-input-number /deep/ .el-input .el-input__inner {
		border: 1px solid #DCDFE6;
		border-radius: 4px;
		padding: 0 40px;
		outline: none;
		color: #666;
		background: #FFF;
		display: inline-block;
		width: 100%;
		font-size: 14px;
		line-height: 40px;
		text-align: center;
		height: 40px;
	}
	
	.detail-preview .detail.el-tabs /deep/ .el-tabs__header {
		margin: 10px 0;
		background: none;
		border-color: #E4E7ED;
		border-width: 0;
		border-style: solid;
	}
	
	.detail-preview .detail.el-tabs /deep/ .el-tabs__header .el-tabs__item {
		border: 0;
		padding: 0 40px;
		margin: 0;
		color: #000;
		background: transparent;
		font-weight: bold;
		display: inline-block;
		font-size: 20px;
		line-height: 60px;
		position: relative;
		list-style: none;
		height: 60px;
	}
	
	.detail-preview .detail.el-tabs /deep/ .el-tabs__header .el-tabs__item:hover {
		border: 0;
		padding: 0 40px;
		color: #57A7A5;
		background: none;
		font-weight: bold;
		font-size: 20px;
	}
	
	.detail-preview .detail.el-tabs /deep/ .el-tabs__header .el-tabs__item.is-active {
		border: 0;
		padding: 0 40px;
		color: #57A7A5;
		background: none;
		font-weight: bold;
		font-size: 20px;
	}
	
	.detail-preview .detail.el-tabs /deep/ .el-tabs__content {
		padding: 15px;
	}
	
	.detail-preview .detail.el-tabs .add /deep/ .el-form-item__label {
		padding: 0 10px 0 0;
		color: #666;
		display: none;
		width: 80px;
		font-size: 14px;
		line-height: 40px;
		text-align: right;
	}
	
	.detail-preview .detail.el-tabs .add /deep/ .el-textarea__inner {
	}
	
	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__separator {
		margin: 0 19px;
		color: #000;
		font-weight: 500;
	}
	
	.breadcrumb-preview .el-breadcrumb .item1 /deep/ .el-breadcrumb__inner a {
		color: #000;
		display: inline-block;
	}
	
	.breadcrumb-preview .el-breadcrumb .item2 /deep/ .el-breadcrumb__inner a {
		color: #000;
		display: inline-block;
	}
		
	.breadcrumb-preview .el-breadcrumb .item3 /deep/ .el-breadcrumb__inner a {
		color: #000;
		display: inline-block;
	}
	
	#pagination.el-pagination /deep/ .el-pagination__total {
		margin: 0 10px 0 0;
		color: #666;
		font-weight: 400;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	#pagination.el-pagination /deep/ .btn-prev {
		border: none;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #57A7A5;
		background: none;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		min-width: 35px;
		height: 28px;
	}
	
	#pagination.el-pagination /deep/ .btn-next {
		border: none;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #57A7A5;
		background: none;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		min-width: 35px;
		height: 28px;
	}
	
	#pagination.el-pagination /deep/ .btn-prev:disabled {
		border: none;
		cursor: not-allowed;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #57A7A5;
		background: none;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	#pagination.el-pagination /deep/ .btn-next:disabled {
		border: none;
		cursor: not-allowed;
		border-radius: 2px;
		padding: 0;
		margin: 0 5px;
		color: #57A7A5;
		background: none;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	#pagination.el-pagination /deep/ .el-pager {
		padding: 0;
		margin: 0;
		display: inline-block;
		vertical-align: top;
	}
	
	#pagination.el-pagination /deep/ .el-pager .number {
		cursor: pointer;
		border: none;
		padding: 0 4px;
		margin: 0 5px;
		color: #000;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: none;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	#pagination.el-pagination /deep/ .el-pager .number:hover {
		cursor: pointer;
		padding: 0 4px;
		margin: 0 5px;
		color: #57A7A5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: none;
		text-align: center;
		min-width: 30px;
		height: 28px;
}

#pagination.el-pagination /deep/ .el-pager .number.active {
		cursor: default;
		padding: 0 4px;
		margin: 0 5px;
		color: #57A7A5;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		border-radius: 2px;
		background: none;
		text-align: center;
		min-width: 30px;
		height: 28px;
	}
	
	#pagination.el-pagination /deep/ .el-pagination__sizes {
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	#pagination.el-pagination /deep/ .el-pagination__sizes .el-input {
		margin: 0 5px;
		width: 100px;
		position: relative;
	}
	
	#pagination.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
		border: 1px solid #DCDFE6;
		cursor: pointer;
		padding: 0 25px 0 8px;
		color: #606266;
		display: inline-block;
		font-size: 13px;
		line-height: 28px;
		border-radius: 3px;
		outline: 0;
		background: #FFF;
		width: 100%;
		text-align: center;
		height: 28px;
	}
	
	#pagination.el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
		top: 0;
		position: absolute;
		right: 0;
		height: 100%;
	}
	
	#pagination.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
		cursor: pointer;
		color: #C0C4CC;
		width: 25px;
		font-size: 14px;
		line-height: 28px;
		text-align: center;
	}

	#pagination.el-pagination /deep/ .el-pagination__jump {
		margin: 0 0 0 24px;
		color: #606266;
		display: inline-block;
		vertical-align: top;
		font-size: 13px;
		line-height: 28px;
		height: 28px;
	}
	
	#pagination.el-pagination /deep/ .el-pagination__jump .el-input {
		border-radius: 3px;
		padding: 0 2px;
		margin: 0 2px;
		display: inline-block;
		width: 50px;
		font-size: 14px;
		line-height: 18px;
		position: relative;
		text-align: center;
		height: 28px;
	}
	
	#pagination.el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
		border: 1px solid #DCDFE6;
		cursor: pointer;
		padding: 0 3px;
		color: #606266;
		display: inline-block;
		font-size: 14px;
		line-height: 28px;
		border-radius: 3px;
		outline: 0;
		background: #FFF;
		width: 100%;
		text-align: center;
		height: 28px;
	}
	.share_view{
		position: fixed;
		right:0;
		bottom: 20%;
		background: #fff;
		box-shadow: 0 4px 6px rgba(0,0,0,.1);
		.share{
			width: 40px;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-bottom: 1px solid #eee;
			cursor: pointer;
		}
		.share:last-of-type{
			border:none;
		}
	}


	.detail-preview .el-rate /deep/ .el-rate__item {
				cursor: pointer;
				display: inline-block;
				vertical-align: middle;
				font-size: 0;
				position: relative;
			}
	
	.detail-preview .el-rate /deep/ .el-rate__item .el-rate__icon {
				margin: 0 3px;
				display: block;
				font-size: 18px;
				position: relative;
				transition: .3s;
			}
</style>
