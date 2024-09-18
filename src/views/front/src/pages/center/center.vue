<template>
<div class="center-preview" :style='{"width":"80%","margin":"10px auto","position":"relative","background":"none"}'>
	<div class="title" :style='{"border":"2px solid #57A7A5","margin":"0","color":"#57A7A5","textAlign":"center","background":"#fff","fontSize":"20px","lineHeight":"44px"}'>{{ title }}</div>
	
	<div class="info" :style='{"padding":"50px 50px 50px 280px","boxShadow":"none","margin":"0 auto 20px","borderRadius":"0","flexWrap":"wrap","background":"#ffffff","display":"flex","width":"100%","position":"relative","height":"260px"}'>
		<div :style='{"borderColor":"#efefef","color":"#333","borderWidth":"0 0 1px 0","display":"none","width":"100%","lineHeight":"44px","fontSize":"15px","borderStyle":"solid","height":"44px"}'>个人信息</div>
		<div :style='{"borderColor":"#efefef","top":"45px","left":"100px","borderWidth":"0","width":"150px","fontSize":"0","position":"absolute","borderStyle":"solid","height":"150px"}' v-if="userTableName=='xueyuan'">
			<el-image :style='{"margin":"10px auto","borderColor":"#efefef","objectFit":"cover","borderRadius":"10px","borderWidth":"0 0 1px 0","display":"block","width":"100%","borderStyle":"solid","height":"100%"}' :src="sessionForm.touxiang?baseUrl + sessionForm.touxiang:require('@/assets/avator.png')" fit="cover"></el-image>
		</div>
		<div :style='{"borderColor":"#efefef","top":"45px","left":"100px","borderWidth":"0","width":"150px","fontSize":"0","position":"absolute","borderStyle":"solid","height":"150px"}' v-if="userTableName=='jiaolian'">
			<el-image :style='{"margin":"10px auto","borderColor":"#efefef","objectFit":"cover","borderRadius":"10px","borderWidth":"0 0 1px 0","display":"block","width":"100%","borderStyle":"solid","height":"100%"}' :src="sessionForm.touxiang?baseUrl + sessionForm.touxiang:require('@/assets/avator.png')" fit="cover"></el-image>
		</div>
		<div :style='{"padding":"0 0","borderColor":"#efefef","flexWrap":"wrap","borderWidth":"0","flexDirection":"column","display":"flex","width":"calc(100% / 3)","lineHeight":"40px","borderStyle":"solid","height":"50%"}' v-if="userTableName=='xueyuan'">
			<span class="icon iconfont icon-shouye-zhihui" :style='{"padding":"0 5px","color":"#fff","borderRadius":"50%","textAlign":"center","background":"#57A7A5","display":"none","width":"55px","fontSize":"24px","lineHeight":"55px","height":"55px"}'></span>
			<div :style='{"color":"#333","fontSize":"14px","display":"none"}'>账号</div>
			<div :style='{"fontSize":"24px","color":"#000","textAlign":"left","flex":1}'>{{sessionForm.zhanghao}}</div>
		</div>
		<div :style='{"padding":"0 0","borderColor":"#efefef","flexWrap":"wrap","borderWidth":"0","flexDirection":"column","display":"flex","width":"calc(100% / 3)","lineHeight":"40px","borderStyle":"solid","height":"50%"}' v-if="userTableName=='xueyuan'">
			<span class="icon iconfont icon-qita1" :style='{"padding":"0 0","margin":"10px","color":"#fff","borderRadius":"50%","textAlign":"center","background":"#57A7A5","width":"55px","fontSize":"24px","lineHeight":"55px","height":"55px"}'></span>
			<div :style='{"width":"calc(100% - 75px)","fontSize":"16px","color":"#000","height":"50%"}'>姓名</div>
			<div :style='{"width":"calc(100% - 75px)","fontSize":"15px","color":"#333","textAlign":"left","flex":1,"height":"50%"}'>{{sessionForm.xingming}}</div>
		</div>
		<div :style='{"padding":"0 0","borderColor":"#efefef","flexWrap":"wrap","borderWidth":"0","flexDirection":"column","display":"flex","width":"calc(100% / 3)","lineHeight":"40px","borderStyle":"solid","height":"50%"}' v-if="userTableName=='xueyuan'">
			<span class="icon iconfont icon-baohuhaoma" :style='{"padding":"0 0","margin":"10px","color":"#fff","borderRadius":"50%","textAlign":"center","background":"#57A7A5","width":"55px","fontSize":"24px","lineHeight":"55px","height":"55px"}'></span>
			<div :style='{"width":"calc(100% - 75px)","fontSize":"16px","color":"#000","height":"50%"}'>性别</div>
			<div :style='{"width":"calc(100% - 75px)","fontSize":"15px","color":"#333","textAlign":"left","flex":1,"height":"50%"}'>{{sessionForm.xingbie}}</div>
		</div>
		<div :style='{"padding":"0 0","borderColor":"#efefef","borderWidth":"0","display":"flex","width":"calc(100% / 3)","lineHeight":"40px","borderStyle":"solid","height":"75px"}' v-if="userTableName=='xueyuan'">
			<span class="icon iconfont icon-shouye-zhihui" :style='{"padding":"0 5px","fontSize":"14px","color":"#333","display":"none"}'></span>
			<div :style='{"color":"#333","fontSize":"14px","display":"none"}'>邮箱</div>
			<div :style='{"fontSize":"16px","color":"#000","textAlign":"left","flex":1}'>{{sessionForm.youxiang}}</div>
		</div>
		<div :style='{"padding":"0 0","borderColor":"#efefef","flexWrap":"wrap","borderWidth":"0","flexDirection":"column","display":"flex","width":"calc(100% / 3)","lineHeight":"40px","borderStyle":"solid","height":"50%"}' v-if="userTableName=='xueyuan'">
			<span class="icon iconfont icon-kuaijiezhifu" :style='{"padding":"0 0","margin":"10px","color":"#fff","borderRadius":"50%","textAlign":"center","background":"#57A7A5","width":"55px","fontSize":"24px","lineHeight":"55px","height":"55px"}'></span>
			<div :style='{"width":"calc(100% - 75px)","fontSize":"16px","color":"#000","height":"50%"}'>手机号码</div>
			<div :style='{"width":"calc(100% - 75px)","fontSize":"14px","color":"#333","textAlign":"left","height":"50%"}'>{{sessionForm.shoujihaoma}}</div>
		</div>
		<div :style='{"padding":"0 0","borderColor":"#efefef","flexWrap":"wrap","borderWidth":"0","flexDirection":"column","display":"flex","width":"calc(100% / 3)","lineHeight":"40px","borderStyle":"solid","height":"50%"}' v-if="userTableName=='xueyuan'">
			<span class="icon iconfont icon-tongji2" :style='{"padding":"0 5px","margin":"10px","color":"#fff","borderRadius":"50%","textAlign":"center","background":"#57A7A5","width":"55px","fontSize":"24px","lineHeight":"55px","height":"55px"}'></span>
			<div :style='{"width":"calc(100% - 75px)","fontSize":"16px","color":"#000","height":"50%"}'>余额</div>
			<div :style='{"width":"calc(100% - 75px)","fontSize":"15px","color":"#333","textAlign":"left","flex":1,"height":"50%"}'>{{sessionForm.yue}}</div>
		</div>
		<div :style='{"padding":"0 0","borderColor":"#efefef","flexWrap":"wrap","borderWidth":"0","flexDirection":"column","display":"flex","width":"calc(100% / 3)","lineHeight":"40px","borderStyle":"solid","height":"50%"}' v-if="userTableName=='jiaolian'">
			<span class="icon iconfont icon-shouye-zhihui" :style='{"padding":"0 5px","color":"#fff","borderRadius":"50%","textAlign":"center","background":"#57A7A5","display":"none","width":"55px","fontSize":"24px","lineHeight":"55px","height":"55px"}'></span>
			<div :style='{"color":"#333","fontSize":"14px","display":"none"}'>教练账号</div>
			<div :style='{"fontSize":"24px","color":"#000","textAlign":"left","flex":1}'>{{sessionForm.jiaolianzhanghao}}</div>
		</div>
		<div :style='{"padding":"0 0","borderColor":"#efefef","flexWrap":"wrap","borderWidth":"0","flexDirection":"column","display":"flex","width":"calc(100% / 3)","lineHeight":"40px","borderStyle":"solid","height":"50%"}' v-if="userTableName=='jiaolian'">
			<span class="icon iconfont icon-qita1" :style='{"padding":"0 0","margin":"10px","color":"#fff","borderRadius":"50%","textAlign":"center","background":"#57A7A5","width":"55px","fontSize":"24px","lineHeight":"55px","height":"55px"}'></span>
			<div :style='{"width":"calc(100% - 75px)","fontSize":"16px","color":"#000","height":"50%"}'>教练姓名</div>
			<div :style='{"width":"calc(100% - 75px)","fontSize":"15px","color":"#333","textAlign":"left","flex":1,"height":"50%"}'>{{sessionForm.jiaolianxingming}}</div>
		</div>
		<div :style='{"padding":"0 0","borderColor":"#efefef","flexWrap":"wrap","borderWidth":"0","flexDirection":"column","display":"flex","width":"calc(100% / 3)","lineHeight":"40px","borderStyle":"solid","height":"50%"}' v-if="userTableName=='jiaolian'">
			<span class="icon iconfont icon-baohuhaoma" :style='{"padding":"0 0","margin":"10px","color":"#fff","borderRadius":"50%","textAlign":"center","background":"#57A7A5","width":"55px","fontSize":"24px","lineHeight":"55px","height":"55px"}'></span>
			<div :style='{"width":"calc(100% - 75px)","fontSize":"16px","color":"#000","height":"50%"}'>性别</div>
			<div :style='{"width":"calc(100% - 75px)","fontSize":"15px","color":"#333","textAlign":"left","flex":1,"height":"50%"}'>{{sessionForm.xingbie}}</div>
		</div>
		<div :style='{"padding":"0 0","borderColor":"#efefef","borderWidth":"0","display":"flex","width":"calc(100% / 3)","lineHeight":"40px","borderStyle":"solid","height":"75px"}' v-if="userTableName=='jiaolian'">
			<span class="icon iconfont icon-shouye-zhihui" :style='{"padding":"0 5px","fontSize":"14px","color":"#333","display":"none"}'></span>
			<div :style='{"color":"#333","fontSize":"14px","display":"none"}'>执教年数</div>
			<div :style='{"fontSize":"16px","color":"#000","textAlign":"left","flex":1}'>{{sessionForm.zhijiaonianshu}}</div>
		</div>
		<div :style='{"padding":"0 0","borderColor":"#efefef","flexWrap":"wrap","borderWidth":"0","flexDirection":"column","display":"flex","width":"calc(100% / 3)","lineHeight":"40px","borderStyle":"solid","height":"50%"}' v-if="userTableName=='jiaolian'">
			<span class="icon iconfont icon-kuaijiezhifu" :style='{"padding":"0 0","margin":"10px","color":"#fff","borderRadius":"50%","textAlign":"center","background":"#57A7A5","width":"55px","fontSize":"24px","lineHeight":"55px","height":"55px"}'></span>
			<div :style='{"width":"calc(100% - 75px)","fontSize":"16px","color":"#000","height":"50%"}'>擅长领域</div>
			<div :style='{"width":"calc(100% - 75px)","fontSize":"14px","color":"#333","textAlign":"left","height":"50%"}'>{{sessionForm.shanzhanglingyu}}</div>
		</div>
		
	</div>
	
    <el-tabs tab-position="left" :style='{"width":"100%","flexWrap":"wrap","background":"#fff","justifyContent":"center","display":"flex"}' @tab-click="handleClick">
      <el-tab-pane label="个人中心">
        <el-form class="center-preview-pv" ref="sessionForm" :model="sessionForm" :rules="rules" label-width="200px">
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='xueyuan'" label="账号" prop="zhanghao">
            <el-input v-model="sessionForm.zhanghao" placeholder="账号" readonly></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='xueyuan'" label="姓名" prop="xingming">
            <el-input v-model="sessionForm.xingming" placeholder="姓名" ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='xueyuan'" label="性别">
            <el-select v-model="sessionForm.xingbie" placeholder="请选择性别" >
              <el-option v-for="(item, index) in dynamicProp.xingbie" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='xueyuan'" label="邮箱" prop="youxiang">
            <el-input v-model="sessionForm.youxiang" placeholder="邮箱" ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='xueyuan'" label="手机号码" prop="shoujihaoma">
            <el-input v-model="sessionForm.shoujihaoma" placeholder="手机号码" ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='xueyuan'" label="余额" prop="yue">
            <el-input v-model="sessionForm.yue" placeholder="余额" readonly></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='xueyuan'" label="头像">
			<file-upload
			tip="点击上传头像"
			action="file/upload"
			:limit="1"
			:multiple="true"
			:fileUrls="sessionForm.touxiang?sessionForm.touxiang:''"
			@change="xueyuantouxiangHandleAvatarSuccess"
			></file-upload>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='jiaolian'" label="教练账号" prop="jiaolianzhanghao">
            <el-input v-model="sessionForm.jiaolianzhanghao" placeholder="教练账号" readonly></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='jiaolian'" label="教练姓名" prop="jiaolianxingming">
            <el-input v-model="sessionForm.jiaolianxingming" placeholder="教练姓名" ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='jiaolian'" label="性别">
            <el-select v-model="sessionForm.xingbie" placeholder="请选择性别" >
              <el-option v-for="(item, index) in dynamicProp.xingbie" :key="index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='jiaolian'" label="头像">
			<file-upload
			tip="点击上传头像"
			action="file/upload"
			:limit="1"
			:multiple="true"
			:fileUrls="sessionForm.touxiang?sessionForm.touxiang:''"
			@change="jiaoliantouxiangHandleAvatarSuccess"
			></file-upload>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='jiaolian'" label="执教年数" prop="zhijiaonianshu">
            <el-input v-model="sessionForm.zhijiaonianshu" placeholder="执教年数" ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' v-if="userTableName=='jiaolian'" label="擅长领域" prop="shanzhanglingyu">
            <el-input v-model="sessionForm.shanzhanglingyu" placeholder="擅长领域" ></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"0","margin":"0"}'>
            <el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"0","background":"#57A7A5","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="primary" @click="onSubmit('sessionForm')">更新信息</el-button>
            <el-button :style='{"border":"none","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"#fff","borderRadius":"0","background":"#9E9E9E","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="danger" @click="logout">退出登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
	  <el-tab-pane label="修改密码">
		<el-form class="center-preview-pv" ref="passwordForm" :model="passwordForm" :rules="passwordRules" label-width="200px">
			<el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="原密码" prop="password">
			  <el-input type="password" v-model="passwordForm.password" placeholder="原密码"></el-input>
			</el-form-item>
			<el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="新密码" prop="newpassword">
			  <el-input type="password" v-model="passwordForm.newpassword" placeholder="新密码"></el-input>
			</el-form-item>
			<el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="确认密码" prop="repassword">
			  <el-input type="password" v-model="passwordForm.repassword" placeholder="确认密码"></el-input>
			</el-form-item>
			<el-form-item :style='{"padding":"0","margin":"0"}'>
			  <el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"0","background":"#57A7A5","width":"128px","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="primary" @click="updatePassword">修改密码</el-button>
			</el-form-item>
		</el-form>
	  </el-tab-pane>
		<el-tab-pane v-for="(item,index) in menuList" :key="index" v-if="hasBack(item.menu)" :label="item.child[0].menu" :name="item.child[0].tableName"></el-tab-pane>
      <el-tab-pane label="我的收藏"></el-tab-pane>
    </el-tabs>

</div>
</template>

<script>
  import config from '@/config/config'
  import menu from '@/config/menu'
  import Vue from 'vue'
  export default {
    //数据集合
    data() {
      return {
        title: '个人中心',
        baseUrl: config.baseUrl,
        sessionForm: {},
		passwordForm: {},
		passwordRules: {
			password: [
				{
					required: true,
					message: "密码不能为空",
					trigger: "blur"
				}
			],
			newpassword: [
				{
					required: true,
					message: "新密码不能为空",
					trigger: "blur"
				}
			],
			repassword: [
				{
					required: true,
					message: "确认密码不能为空",
					trigger: "blur"
				}
			]
		},
        rules: {},
		menuList: [],
        disabled: false,
        uploadUrl: config.baseUrl + 'file/upload',
        imageUrl: '',
        headers: {Token: localStorage.getItem('frontToken')},
        userTableName: localStorage.getItem('UserTableName'),
        dynamicProp: {},
      }
    },
    created() {
		let menus = menu.list()
		for(let x in menus){
			if(menus[x].tableName == this.userTableName){
				this.menuList = menus[x].backMenu
			}
		}
		if ('xueyuan' == this.userTableName) {
			this.$set(this.sessionForm, 'zhanghao', null);
		}
		if ('xueyuan' == this.userTableName) {
			this.$set(this.sessionForm, 'mima', null);
		}
		if ('xueyuan' == this.userTableName) {
			this.$set(this.sessionForm, 'xingming', null);
		}
		if ('xueyuan' == this.userTableName) {
			this.$set(this.sessionForm, 'xingbie', null);
		}
		if ('xueyuan' == this.userTableName) {
			this.$set(this.sessionForm, 'youxiang', null);
		}
		if ('xueyuan' == this.userTableName) {
			this.$set(this.sessionForm, 'shoujihaoma', null);
		}
		if ('xueyuan' == this.userTableName) {
			this.$set(this.sessionForm, 'yue', null);
		}
		if ('xueyuan' == this.userTableName) {
			this.$set(this.sessionForm, 'touxiang', null);
		}
		if ('jiaolian' == this.userTableName) {
			this.$set(this.sessionForm, 'jiaolianzhanghao', null);
		}
		if ('jiaolian' == this.userTableName) {
			this.$set(this.sessionForm, 'mima', null);
		}
		if ('jiaolian' == this.userTableName) {
			this.$set(this.sessionForm, 'jiaolianxingming', null);
		}
		if ('jiaolian' == this.userTableName) {
			this.$set(this.sessionForm, 'xingbie', null);
		}
		if ('jiaolian' == this.userTableName) {
			this.$set(this.sessionForm, 'touxiang', null);
		}
		if ('jiaolian' == this.userTableName) {
			this.$set(this.sessionForm, 'zhijiaonianshu', null);
		}
		if ('jiaolian' == this.userTableName) {
			this.$set(this.sessionForm, 'shanzhanglingyu', null);
		}

      if ('xueyuan' == this.userTableName) {
        this.$set(this.rules, 'zhanghao', [{ required: true, message: '请输入账号', trigger: 'blur' }]);
      }
      if ('xueyuan' == this.userTableName) {
        this.$set(this.rules, 'mima', [{ required: true, message: '请输入密码', trigger: 'blur' }]);
      }
      if ('xueyuan' == this.userTableName) {
        this.$set(this.rules, 'xingming', [{ required: true, message: '请输入姓名', trigger: 'blur' }]);
      }
			if ('xueyuan' == this.userTableName) {
        this.$set(this.rules, 'youxiang', [{ required: false, validator: this.$validate.isEmail, trigger: 'blur' }]);
      }
			if ('xueyuan' == this.userTableName) {
        this.$set(this.rules, 'shoujihaoma', [{ required: false, validator: this.$validate.isMobile, trigger: 'blur' }]);
      }
			if ('xueyuan' == this.userTableName) {
        this.$set(this.rules, 'yue', [{ required: false, validator: this.$validate.isNumber, trigger: 'blur' }]);
      }
      if ('jiaolian' == this.userTableName) {
        this.$set(this.rules, 'jiaolianzhanghao', [{ required: true, message: '请输入教练账号', trigger: 'blur' }]);
      }
      if ('jiaolian' == this.userTableName) {
        this.$set(this.rules, 'mima', [{ required: true, message: '请输入密码', trigger: 'blur' }]);
      }
      if ('jiaolian' == this.userTableName) {
        this.$set(this.rules, 'jiaolianxingming', [{ required: true, message: '请输入教练姓名', trigger: 'blur' }]);
      }
      if ('jiaolian' == this.userTableName) {
        this.$set(this.rules, 'xingbie', [{ required: true, message: '请输入性别', trigger: 'blur' }]);
      }
      if ('jiaolian' == this.userTableName) {
        this.$set(this.rules, 'zhijiaonianshu', [{ required: true, message: '请输入执教年数', trigger: 'blur' }]);
      }
			if ('jiaolian' == this.userTableName) {
        this.$set(this.rules, 'zhijiaonianshu', [{ required: false, validator: this.$validate.isIntNumer, trigger: 'blur' }]);
      }

      this.init();
      this.sessionForm = JSON.parse(localStorage.getItem('sessionForm'))
    },
    //方法集合
    methods: {
      init() {
        if ('xueyuan' == this.userTableName) {
          this.dynamicProp.xingbie = '男,女'.split(',');
        }
        if ('jiaolian' == this.userTableName) {
          this.dynamicProp.xingbie = '男,女'.split(',');
        }
      },
	  setSession(){
		  localStorage.setItem('sessionForm',JSON.stringify(this.sessionForm))
	  },
      onSubmit(formName) {
		if(`xueyuan` == this.userTableName && this.sessionForm.touxiang!=null){
			this.sessionForm.touxiang = this.sessionForm.touxiang.replace(new RegExp(this.$config.baseUrl,"g"),"");
		}
		if(`jiaolian` == this.userTableName && this.sessionForm.touxiang!=null){
			this.sessionForm.touxiang = this.sessionForm.touxiang.replace(new RegExp(this.$config.baseUrl,"g"),"");
		}
        this.$refs[formName].validate((valid) => {
			if (valid) {
				this.$http.post(this.userTableName + '/update', this.sessionForm).then(res => {
					if (res.data.code == 0) {
						this.setSession()
						this.$message({
							message: '更新成功',
							type: 'success',
							duration: 1500
						});
					}
				});
			} else {
				return false;
			}
        });
      },
      xueyuantouxiangHandleAvatarSuccess(fileUrls) {
        this.sessionForm.touxiang = fileUrls;
      },
      jiaoliantouxiangHandleAvatarSuccess(fileUrls) {
        this.sessionForm.touxiang = fileUrls;
      },
      handleClick(tab, event) {
        switch(event.target.outerText) {
          case '个人中心':
            tab.$router.push('/index/center');
            break;
          case '修改密码':
            this.passwordForm = {
				password: '',
				newpassword: '',
				repassword: '',
			}
			this.$forceUpdate()
            break;
          case '我的收藏':
            localStorage.setItem('storeupType', 1);
            tab.$router.push('/index/storeup');
            break;
		  default:
		  	tab.$router.push(`/index/${tab.name}?centerType=1`);
        }

        this.title = event.target.outerText;
      },
	  async updatePassword(){
			this.$refs["passwordForm"].validate(async valid => {
				if (valid) {
					var password = "";
					if (this.sessionForm.mima) {
						password = this.sessionForm.mima;
					} else if (this.sessionForm.password) {
						password = this.sessionForm.password;
					}
					if (this.passwordForm.password != password) {
						this.$message.error("原密码错误");
						return;
					}
					if (this.passwordForm.newpassword != this.passwordForm.repassword) {
						this.$message.error("两次密码输入不一致");
						return;
					}
					if (this.userTableName == 'xueyuan') {
					}
					this.sessionForm.password = this.passwordForm.newpassword;
					this.sessionForm.mima = this.passwordForm.newpassword;
					this.$http.post(`${this.userTableName}/update`,this.sessionForm).then(({data})=>{
						if (data && data.code === 0) {
							this.$message({
								message: "修改密码成功,下次登录系统生效",
								type: "success",
								duration: 1500,
								onClose: () => {
								}
							});
							this.setSession()
						} else {
							this.$message.error(data.msg);
						}
					});
				}
			})
	  },
      logout() {
        localStorage.clear();
        Vue.http.headers.common['Token'] = "";
        this.$router.push('/index/home');
        this.activeIndex = '0'
        localStorage.setItem('keyPath', this.activeIndex)
        this.$forceUpdate()
        this.$message({
            message: '登出成功',
            type: 'success',
            duration: 1500,
        });
      },
	  hasBack(name){
		  switch(name){
			case '我的收藏管理':
				return false
				break;
			default:
				return true
		  }
	  }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .center-preview {
  
    .el-tabs {
      & /deep/ .el-tabs__header {
		.el-tabs__nav{
			overflow: auto;
		}
		::-webkit-scrollbar {
		  -webkit-appearance: none;
		  width: 6px;
		  height: 6px;
		}
		::-webkit-scrollbar-track {
		  background: rgba(0, 0, 0, 0.1);
		  border-radius: 0;
		}
		::-webkit-scrollbar-thumb {
		  cursor: pointer;
		  border-radius: 5px;
		  background: rgba(0, 0, 0, 0.15);
		  transition: color 0.2s ease;
		}
		::-webkit-scrollbar-thumb:hover {
		  background: rgba(0, 0, 0, 0.3);
		}
        .el-tabs__nav-wrap {
          margin: 0;
  
          &::after {
            content: none;
          }
        }
  
        .el-tabs__active-bar {
          display: none !important;
        }
      }
  
      .center-preview-pv {
        .el-date-editor.el-input {
          width: auto;
        }
  
        .balance {
          .el-input {
            width: auto;
          }
        }
      }
    }
  }
  
  .center-preview .el-tabs /deep/ .el-tabs__header {
	padding: 0;
	margin: 0 auto;
	background: #57A7A5;
	width: 100%;
	border-color: #eee;
	border-width: 0;
	position: relative;
	float: left;
	border-style: solid;
  }
  
  .center-preview .el-tabs /deep/ .el-tabs__header .el-tabs__item {
  	padding: 0 30px;
  	color: #000;
  	background: #57A7A5;
  	font-weight: 500;
  	display: inline-block;
  	font-size: 14px;
  	line-height: 60px;
  	position: relative;
  	text-align: center;
  	height: 60px;
  }
  
  .center-preview .el-tabs /deep/ .el-tabs__header .el-tabs__item:hover {
  	padding: 0 30px;
  	color: #fff;
  	background: #57A7A5;
  	font-weight: 500;
  	display: inline-block;
  	font-size: 14px;
  	line-height: 60px;
  	position: relative;
  	text-align: center;
  	height: 60px;
  }
  
  .center-preview .el-tabs /deep/ .el-tabs__header .el-tabs__item.is-active {
  	padding: 0 30px;
  	color: #fff;
  	background: #57A7A5;
  	font-weight: 500;
  	display: inline-block;
  	font-size: 14px;
  	line-height: 60px;
  	position: relative;
  	text-align: center;
  	height: 60px;
  }
  
  .center-preview .el-tabs /deep/ .el-tabs__content {
  	padding: 10px;
  	background: #fff;
  	width: 100%;
  }
  .center-preview .el-tabs /deep/ .el-tabs__content .el-tab-pane {
  }
  
  .center-preview-pv .el-form-item /deep/ .el-form-item__label {
  	padding: 0 10px 0 0;
  	color: #000;
  	font-weight: 500;
  	width: 200px;
  	font-size: 14px;
  	line-height: 40px;
  	text-align: right;
  }
  
  .center-preview-pv .el-form-item .el-form-item__content {
    margin-left: 200px;
  }
  
  .center-preview-pv .el-input /deep/ .el-input__inner {
  	border: 1px solid #E2E3E5;
  	border-radius: 0;
  	padding: 0 12px;
  	box-shadow: none;
  	outline: none;
  	color: #000;
  	width: 500px;
  	font-size: 14px;
  	height: 40px;
  }
  
  .center-preview-pv .el-select /deep/ .el-input__inner {
  	border: 1px solid #E2E3E5;
  	border-radius: 0;
  	padding: 0 12px;
  	box-shadow: none;
  	outline: none;
  	color: #000;
  	width: 500px;
  	font-size: 14px;
  	height: 40px;
  }
  
  .center-preview-pv .el-date-editor /deep/ .el-input__inner {
  	border: 1px solid #E2E3E5;
  	border-radius: 0;
  	padding: 0 10px 0 30px;
  	box-shadow: none;
  	outline: none;
  	color: #000;
  	width: 500px;
  	font-size: 14px;
  	height: 40px;
  }
  
  .center-preview-pv /deep/ .avatar-uploader-icon {
  	border: 1px solid #E2E3E5;
  	cursor: pointer;
  	border-radius: 0;
  	color: #000;
  	width: 200px;
  	font-size: 32px;
  	line-height: 60px;
  	text-align: center;
  	height: 60px;
  }
  
  .center-preview-pv .el-form-item.balance /deep/ .el-input__inner {
  	border: 1px solid #E2E3E5;
  	border-radius: 0;
  	padding: 0 12px;
  	box-shadow: none;
  	outline: none;
  	color: #000;
  	display: inline-block;
  	width: 390px;
  	font-size: 14px;
  	height: 40px;
  }
</style>
