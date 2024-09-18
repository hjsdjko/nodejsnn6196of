<template>
  <div>
    <div class="container" :style='{"minHeight":"100vh","border":"30px solid #ffc054","alignItems":"center","background":"url(http://codegen.caihongy.cn/20231107/de423fd8df8f4765b7a00108faf7266e.jpg)","display":"flex","width":"100%","backgroundSize":"100% 100%","backgroundPosition":"center bottom","backgroundRepeat":"no-repeat","justifyContent":"flex-end"}'>
      <el-form :style='{"border":"0px solid #f6f6f6","padding":"20px 60px","margin":"0","alignItems":"center","textAlign":"center","flexDirection":"column","display":"flex","minHeight":"calc(100vh - 60px)","borderRadius":"0px","flexWrap":"wrap","background":"#fff","width":"35vw","fontSize":"14px","height":"auto"}'>
        <div v-if="true" :style='{"padding":"0px","margin":"10vh auto 10px","borderColor":"#ffbb43","color":"#ffbb43","textAlign":"center","display":"inline-block","background":"none","borderWidth":"0 0 2px","width":"auto","lineHeight":"40px","fontSize":"22px","borderStyle":"solid","fontWeight":"500"}' class="title-container">网球场地管理系统登录</div>
        <div v-if="loginType==1" class="list-item" :style='{"width":"100%","margin":"0 auto 10px","position":"relative","alignItems":"center","flexWrap":"wrap","display":"flex"}'>
          <div v-if="true" class="lable" :style='{"width":"100%","lineHeight":"44px","fontSize":"inherit","color":"#666","textAlign":"left"}'>用户名：</div>
          <input :style='{"padding":"0 10px","boxShadow":"0 0 0px rgba(64, 158, 255, .3)","borderColor":"#a4a4a4","color":"#666","outline":"0px solid #eee","outlineOffset":"0px","borderRadius":"0px","background":"#fff","borderWidth":"0 0 2px","width":"100%","fontSize":"inherit","borderStyle":"solid","height":"40px"}' placeholder="请输入用户名" name="username" type="text" v-model="rulesForm.username">
        </div>
        <div v-if="loginType==1" class="list-item" :style='{"width":"100%","margin":"0 auto 10px","position":"relative","alignItems":"center","flexWrap":"wrap","display":"flex"}'>
          <div v-if="true" class="lable" :style='{"width":"100%","lineHeight":"44px","fontSize":"inherit","color":"#666","textAlign":"left"}'>密码：</div>
          <input :style='{"padding":"0 10px","boxShadow":"0 0 0px rgba(64, 158, 255, .3)","borderColor":"#a4a4a4","color":"#666","outline":"0px solid #eee","outlineOffset":"0px","borderRadius":"0px","background":"#fff","borderWidth":"0 0 2px","width":"100%","fontSize":"inherit","borderStyle":"solid","height":"40px"}' placeholder="请输入密码" name="password" type="password" v-model="rulesForm.password">
        </div>

        <div :style='{"width":"100%","margin":"20px auto 0","fontSize":"inherit","textAlign":"left"}' v-if="roles.length>1" prop="loginInRole" class="list-type">
          <el-radio v-for="item in roles" v-bind:key="item.roleName" v-model="rulesForm.role" :label="item.roleName">{{item.roleName}}</el-radio>
        </div>

		
        <div :style='{"margin":"0px auto 0","alignItems":"center","flexWrap":"wrap","display":"flex","width":"100%","fontSize":"16px","position":"relative","justifyContent":"flex-start"}'>
          <el-button v-if="loginType==1" :style='{"border":"0","cursor":"pointer","padding":"0px","margin":"0 auto 20px","color":"#fff","textAlign":"center","outline":"none","borderRadius":"0px","background":"#ffc054","width":"100%","fontSize":"16px","fontWeight":"600","height":"50px","order":"2"}' type="primary" @click="login()" class="loginInBt">登录</el-button>
          <el-button :style='{"border":"0px solid rgba(64, 158, 255, 1)","cursor":"pointer","padding":"2px 10px","margin":"0 0px 10px","borderColor":"#ffc054","color":"#ffc054","outline":"none","borderRadius":"0px","background":"none","borderWidth":"0 1px 1px 0","width":"auto","fontSize":"inherit","borderStyle":"solid","fontWeight":"600","height":"auto","order":"3"}' type="primary" @click="register('jiaolian')" class="register">注册教练</el-button>
        </div>
      </el-form>

    </div>
  </div>
</template>
<script>
import menu from "@/utils/menu";
export default {
  data() {
    return {
		verifyCheck2: false,
		flag: false,
      baseUrl:this.$base.url,
      loginType: 1,
      rulesForm: {
        username: "",
        password: "",
        role: "",
      },
      menus: [],
      roles: [],
      tableName: "",
    };
  },
  mounted() {
    let menus = menu.list();
    this.menus = menus;

    for (let i = 0; i < this.menus.length; i++) {
      if (this.menus[i].hasBackLogin=='是') {
        this.roles.push(this.menus[i])
      }
    }

  },
  created() {

  },
  destroyed() {
	    },
  components: {
  },
  methods: {

    //注册
    register(tableName){
		this.$storage.set("loginTable", tableName);
		this.$router.push({path:'/register',query:{pageFlag:'register'}})
    },
    // 登陆
    login() {

		if (!this.rulesForm.username) {
			this.$message.error("请输入用户名");
			return;
		}
		if (!this.rulesForm.password) {
			this.$message.error("请输入密码");
			return;
		}
		if(this.roles.length>1) {
			if (!this.rulesForm.role) {
				this.$message.error("请选择角色");
				return;
			}

			let menus = this.menus;
			for (let i = 0; i < menus.length; i++) {
				if (menus[i].roleName == this.rulesForm.role) {
					this.tableName = menus[i].tableName;
				}
			}
		} else {
			this.tableName = this.roles[0].tableName;
			this.rulesForm.role = this.roles[0].roleName;
		}
		
		this.loginPost()
    },
	loginPost() {
		this.$http({
			url: `${this.tableName}/login?username=${this.rulesForm.username}&password=${this.rulesForm.password}`,
			method: "post"
		}).then(({ data }) => {
			if (data && data.code === 0) {
				this.$storage.set("Token", data.token);
				this.$storage.set("role", this.rulesForm.role);
				this.$storage.set("sessionTable", this.tableName);
				this.$storage.set("adminName", this.rulesForm.username);
				this.$router.replace({ path: "/" });
			} else {
				this.$message.error(data.msg);
			}
		});
	},
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
      background: url(http://codegen.caihongy.cn/20231107/de423fd8df8f4765b7a00108faf7266e.jpg);
        
  .list-item /deep/ .el-input .el-input__inner {
		padding: 0 10px;
		color: #666;
		font-size: inherit;
		border-color: #a4a4a4;
		outline-offset: 0px;
		border-radius: 0px;
		box-shadow: 0 0 0px rgba(64, 158, 255, .3);
		outline: 0px solid #eee;
		background: #fff;
		width: 100%;
		border-width: 0 0 2px;
		border-style: solid;
		height: 40px;
	  }
  
  .list-item.select /deep/ .el-select .el-input__inner {
		border: 1px solid #eee;
		border-radius: 0px;
		padding: 0 10px;
		color: #666;
		width: 276px;
		font-size: 14px;
		height: 40px;
	  }
  
  .list-code /deep/ .el-input .el-input__inner {
  	  	border-radius: 0px 0 0 0px;
  	  	padding: 0 10px;
  	  	outline: none;
  	  	color: #666;
  	  	background: #fff;
  	  	width: calc(100% - 100px);
  	  	font-size: inherit;
  	  	border-color: #a4a4a4;
  	  	border-width: 0 0 0px;
  	  	border-style: solid;
  	  	height: 50px;
  	  }

  .list-type /deep/ .el-radio__input .el-radio__inner {
		border-radius: 0;
		background: rgba(53, 53, 53, 0);
		border-color: #666666;
	  }
  .list-type /deep/ .el-radio__input.is-checked .el-radio__inner {
        border-radius: 0;
        background: #ffc054;
        border-color: #ffc054;
      }
  .list-type /deep/ .el-radio__label {
		color: #666666;
		font-size: 16px;
	  }
  .list-type /deep/ .el-radio__input.is-checked+.el-radio__label {
        color: #ffc054;
        font-size: 16px;
      }
}

</style>
