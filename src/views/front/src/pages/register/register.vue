<template>
	<div>

	<div class="container" :style='{"minHeight":"100vh","alignItems":"center","background":"url(http://codegen.caihongy.cn/20231121/4577495c378443ad95aab1ad5fe253e2.png)","display":"flex","width":"100%","backgroundSize":"100% 100%","backgroundPosition":"center center","backgroundRepeat":"no-repeat","justifyContent":"flex-end"}'>
		<el-form class='rgs-form' v-if="pageFlag=='register'" :style='{"padding":"20px","boxShadow":"0px 4px 10px 0px rgba(0,0,0,0.3)","margin":"0 100px","borderRadius":"0","background":"#fff","width":"40%","height":"auto"}' ref="registerForm" :model="registerForm" :rules="rules">
			<div v-if="false" :style='{"margin":"0 0 10px 0","color":"rgba(64, 158, 255, 1)","textAlign":"center","width":"100%","lineHeight":"44px","fontSize":"20px","textShadow":"4px 4px 2px rgba(64, 158, 255, .5)"}'>USER / REGISTER</div>
			<div v-if="true" :style='{"margin":"0 auto 20px","color":"#000","textAlign":"center","width":"100%","lineHeight":"44px","fontSize":"22px","textShadow":"none","fontWeight":"500"}'>网球场地管理系统注册</p></div>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xueyuan'" prop="zhanghao">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('zhanghao')?'required':''">账号：</div>
				<el-input v-model="registerForm.zhanghao"  placeholder="请输入账号" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xueyuan'" prop="mima">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('mima')?'required':''">密码：</div>
				<el-input v-model="registerForm.mima" type="password" placeholder="请输入密码" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xueyuan'" prop="mima2">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('mima')?'required':''">确认密码：</div>
				<el-input v-model="registerForm.mima2" type="password" placeholder="请再次输入密码" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xueyuan'" prop="xingming">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('xingming')?'required':''">姓名：</div>
				<el-input v-model="registerForm.xingming"  placeholder="请输入姓名" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xueyuan'" prop="xingbie">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('xingbie')?'required':''">性别：</div>
                <el-select v-model="registerForm.xingbie" placeholder="请选择性别" >
                  <el-option
                      v-for="(item,index) in xueyuanxingbieOptions"
                      :key="index"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xueyuan'" prop="youxiang">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('youxiang')?'required':''">邮箱：</div>
				<el-input v-model="registerForm.youxiang"  placeholder="请输入邮箱" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xueyuan'" prop="shoujihaoma">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('shoujihaoma')?'required':''">手机号码：</div>
				<el-input v-model="registerForm.shoujihaoma"  placeholder="请输入手机号码" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='xueyuan'" prop="touxiang">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('touxiang')?'required':''">头像：</div>
                <file-upload
					tip="点击上传头像"
					action="file/upload"
					:limit="1"
					:multiple="true"
					:fileUrls="registerForm.touxiang?registerForm.touxiang:''"
					@change="xueyuantouxiangUploadChange"
				></file-upload>
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaolian'" prop="jiaolianzhanghao">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('jiaolianzhanghao')?'required':''">教练账号：</div>
				<el-input v-model="registerForm.jiaolianzhanghao"  placeholder="请输入教练账号" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaolian'" prop="mima">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('mima')?'required':''">密码：</div>
				<el-input v-model="registerForm.mima" type="password" placeholder="请输入密码" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaolian'" prop="mima2">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('mima')?'required':''">确认密码：</div>
				<el-input v-model="registerForm.mima2" type="password" placeholder="请再次输入密码" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaolian'" prop="jiaolianxingming">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('jiaolianxingming')?'required':''">教练姓名：</div>
				<el-input v-model="registerForm.jiaolianxingming"  placeholder="请输入教练姓名" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaolian'" prop="xingbie">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('xingbie')?'required':''">性别：</div>
                <el-select v-model="registerForm.xingbie" placeholder="请选择性别" >
                  <el-option
                      v-for="(item,index) in jiaolianxingbieOptions"
                      :key="index"
                      :label="item"
                      :value="item">
                  </el-option>
                </el-select>
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaolian'" prop="touxiang">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('touxiang')?'required':''">头像：</div>
                <file-upload
					tip="点击上传头像"
					action="file/upload"
					:limit="1"
					:multiple="true"
					:fileUrls="registerForm.touxiang?registerForm.touxiang:''"
					@change="jiaoliantouxiangUploadChange"
				></file-upload>
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaolian'" prop="zhijiaonianshu">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('zhijiaonianshu')?'required':''">执教年数：</div>
				<el-input v-model.number="registerForm.zhijiaonianshu"  placeholder="请输入执教年数" />
			</el-form-item>
			<el-form-item :style='{"width":"80%","padding":"0","margin":"0 auto 15px","height":"auto"}' v-if="tableName=='jiaolian'" prop="shanzhanglingyu">
				<div v-if="true" :style='{"width":"80px","lineHeight":"44px","fontSize":"14px","color":"#000","textAlign":"center"}' :class="changeRules('shanzhanglingyu')?'required':''">擅长领域：</div>
				<el-input v-model="registerForm.shanzhanglingyu"  placeholder="请输入擅长领域" />
			</el-form-item>
			<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","boxShadow":"none","margin":"20px auto 5px","color":"#fff","display":"block","outline":"none","borderRadius":"5px","background":"#000","width":"80%","fontSize":"16px","height":"40px"}' type="primary" @click="submitForm('registerForm')">注册</el-button>
			<el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","boxShadow":"none","margin":"20px auto 5px","color":"#fff","display":"block","outline":"none","borderRadius":"5px","background":"#000","width":"80%","fontSize":"16px","height":"40px"}' @click="resetForm('registerForm')">重置</el-button>
			<router-link :style='{"cursor":"pointer","padding":"0 10%","margin":"0 auto","color":"#9e9e9e","textAlign":"center","display":"block","width":"80%","lineHeight":"2","fontSize":"12px","textDecoration":"none"}' to="/login">已有账户登录</router-link>
			<div class="idea1" :style='{"width":"100%","background":"red","display":"none","height":"40px"}'></div>
			<div class="idea2" :style='{"width":"100%","background":"blue","display":"none","height":"40px"}'></div>
		</el-form>
    </div>
  </div>
</div>
</template>

<script>

export default {
    //数据集合
    data() {
		return {
            pageFlag : '',
			tableName: '',
			registerForm: {},
			forgetForm: {},
			rules: {},
			requiredRules: {},
            xueyuanxingbieOptions: [],
            jiaolianxingbieOptions: [],
		}
    },
	mounted() {
		if(this.$route.query.pageFlag=='register'){
			
			this.tableName = this.$route.query.role;
			if(this.tableName=='xueyuan'){
				this.registerForm = {
					zhanghao: '',
					mima: '',
					mima2: '',
					xingming: '',
					xingbie: '',
					youxiang: '',
					shoujihaoma: '',
					yue: '0',
					touxiang: '',
				}
			}
			if(this.tableName=='jiaolian'){
				this.registerForm = {
					jiaolianzhanghao: '',
					mima: '',
					mima2: '',
					jiaolianxingming: '',
					xingbie: '',
					touxiang: '',
					zhijiaonianshu: '',
					shanzhanglingyu: '',
				}
			}
			if ('xueyuan' == this.tableName) {
				this.requiredRules.zhanghao = [{ required: true, message: '请输入账号', trigger: 'blur' }]
			}
			if ('xueyuan' == this.tableName) {
				this.requiredRules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
			if ('xueyuan' == this.tableName) {
				this.requiredRules.xingming = [{ required: true, message: '请输入姓名', trigger: 'blur' }]
			}
			if ('jiaolian' == this.tableName) {
				this.requiredRules.jiaolianzhanghao = [{ required: true, message: '请输入教练账号', trigger: 'blur' }]
			}
			if ('jiaolian' == this.tableName) {
				this.requiredRules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }]
			}
			if ('jiaolian' == this.tableName) {
				this.requiredRules.jiaolianxingming = [{ required: true, message: '请输入教练姓名', trigger: 'blur' }]
			}
			if ('jiaolian' == this.tableName) {
				this.requiredRules.xingbie = [{ required: true, message: '请输入性别', trigger: 'blur' }]
			}
			if ('jiaolian' == this.tableName) {
				this.requiredRules.zhijiaonianshu = [{ required: true, message: '请输入执教年数', trigger: 'blur' }]
			}
		}
	},
    created() {
		this.pageFlag = this.$route.query.pageFlag;
		if(this.$route.query.pageFlag=='register'){
		  if ('xueyuan' == this.tableName) {
			this.rules.zhanghao = [{ required: true, message: '请输入账号', trigger: 'blur' }];
		  }
		  if ('xueyuan' == this.tableName) {
			this.rules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }];
		  }
		  if ('xueyuan' == this.tableName) {
			this.rules.xingming = [{ required: true, message: '请输入姓名', trigger: 'blur' }];
		  }
			this.xueyuanxingbieOptions = "男,女".split(',');
		  if ('xueyuan' == this.tableName) {
			this.rules.youxiang = [{ required: true, validator: this.$validate.isEmail, trigger: 'blur' }];
		  }
		  if ('xueyuan' == this.tableName) {
			this.rules.shoujihaoma = [{ required: true, validator: this.$validate.isMobile, trigger: 'blur' }];
		  }
		  if ('jiaolian' == this.tableName) {
			this.rules.jiaolianzhanghao = [{ required: true, message: '请输入教练账号', trigger: 'blur' }];
		  }
		  if ('jiaolian' == this.tableName) {
			this.rules.mima = [{ required: true, message: '请输入密码', trigger: 'blur' }];
		  }
		  if ('jiaolian' == this.tableName) {
			this.rules.jiaolianxingming = [{ required: true, message: '请输入教练姓名', trigger: 'blur' }];
		  }
			this.jiaolianxingbieOptions = "男,女".split(',');
		  if ('jiaolian' == this.tableName) {
			this.rules.xingbie = [{ required: true, message: '请输入性别', trigger: 'blur' }];
		  }
		  if ('jiaolian' == this.tableName) {
			this.rules.zhijiaonianshu = [{ required: true, validator: this.$validate.isIntNumerNotNull, trigger: 'blur' }];
		  }
		}
    },
    //方法集合
    methods: {
		changeRules(name){
			if(this.requiredRules[name]){
				return true
			}
			return false
		},
      // 获取uuid
      getUUID () {
        return new Date().getTime();
      },
        // 下二随
      xueyuantouxiangUploadChange(fileUrls) {
          this.registerForm.touxiang = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
      },
      jiaoliantouxiangUploadChange(fileUrls) {
          this.registerForm.touxiang = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");
      },

        // 多级联动参数


      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var url=this.tableName+"/register";
				if((!this.registerForm.zhanghao) && `xueyuan` == this.tableName){
					this.$message.error(`账号不能为空`);
					return
				}
               if(`xueyuan` == this.tableName && this.registerForm.mima!=this.registerForm.mima2) {
                this.$message.error(`两次密码输入不一致`);
                return
               }
				if((!this.registerForm.mima) && `xueyuan` == this.tableName){
					this.$message.error(`密码不能为空`);
					return
				}
				if((!this.registerForm.xingming) && `xueyuan` == this.tableName){
					this.$message.error(`姓名不能为空`);
					return
				}
					if(`xueyuan` == this.tableName && this.registerForm.youxiang &&(!this.$validate.isEmail2(this.registerForm.youxiang))){
						this.$message.error(`邮箱应输入邮件格式`);
						return
					}
					if(`xueyuan` == this.tableName && this.registerForm.shoujihaoma &&(!this.$validate.isMobile2(this.registerForm.shoujihaoma))){
						this.$message.error(`手机号码应输入手机格式`);
						return
					}
				if((!this.registerForm.jiaolianzhanghao) && `jiaolian` == this.tableName){
					this.$message.error(`教练账号不能为空`);
					return
				}
               if(`jiaolian` == this.tableName && this.registerForm.mima!=this.registerForm.mima2) {
                this.$message.error(`两次密码输入不一致`);
                return
               }
				if((!this.registerForm.mima) && `jiaolian` == this.tableName){
					this.$message.error(`密码不能为空`);
					return
				}
				if((!this.registerForm.jiaolianxingming) && `jiaolian` == this.tableName){
					this.$message.error(`教练姓名不能为空`);
					return
				}
				if((!this.registerForm.xingbie) && `jiaolian` == this.tableName){
					this.$message.error(`性别不能为空`);
					return
				}
				if((!this.registerForm.zhijiaonianshu) && `jiaolian` == this.tableName){
					this.$message.error(`执教年数不能为空`);
					return
				}
				if(`jiaolian` == this.tableName && this.registerForm.zhijiaonianshu &&(!this.$validate.isIntNumer2(this.registerForm.zhijiaonianshu))){
					this.$message.error(`执教年数应输入整数`);
					return
				}
            this.$http.post(url, this.registerForm).then(res => {
              if (res.data.code === 0) {
                this.$message({
                  message: '注册成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$router.push('/login');
                  }
                });
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.container {
		position: relative;
		background: url(http://codegen.caihongy.cn/20231121/4577495c378443ad95aab1ad5fe253e2.png);
		
		.el-input {
		  width: auto;
		}
		
		.el-date-editor.el-input {
			width: auto;
		}
		
		.el-form-item /deep/ .el-form-item__content {
						display: flex;
					}
		
		.rgs-form .el-input /deep/ .el-input__inner {
						border: 1px solid #D7D7D7;
						border-radius: 0;
						padding: 0 10px;
						box-shadow: none;
						outline: none;
						color: #000;
						width: 350px;
						font-size: 14px;
						border-width: 0 0 2px;
						height: 44px;
					}
		
		.rgs-form .el-select /deep/ .el-input__inner {
						border: 1px solid #D7D7D7;
						border-radius: 0;
						padding: 0 10px;
						box-shadow: none;
						outline: none;
						color: #000;
						width: 350px;
						font-size: 14px;
						border-width: 0 0 2px;
						height: 44px;
					}
		
		.rgs-form .el-date-editor /deep/ .el-input__inner {
						border: 1px solid #D7D7D7;
						border-radius: 0;
						padding: 0 10px 0 30px;
						box-shadow: none;
						outline: none;
						color: #000;
						width: 350px;
						font-size: 14px;
						border-width: 0 0 2px;
						height: 44px;
					}
		
		.rgs-form .el-date-editor /deep/ .el-input__inner {
						border: 1px solid #D7D7D7;
						border-radius: 0;
						padding: 0 10px 0 30px;
						box-shadow: none;
						outline: none;
						color: #000;
						width: 350px;
						font-size: 14px;
						border-width: 0 0 2px;
						height: 44px;
					}
		
		.rgs-form /deep/ .el-upload--picture-card {
			background: transparent;
			border: 0;
			border-radius: 0;
			width: auto;
			height: auto;
			line-height: initial;
			vertical-align: middle;
		}
		
		.rgs-form /deep/ .upload .upload-img {
		  		  border: 1px solid #D7D7D7;
		  		  cursor: pointer;
		  		  border-radius: 0;
		  		  color: #000;
		  		  width: 200px;
		  		  font-size: 32px;
		  		  line-height: 60px;
		  		  text-align: center;
		  		  height: 60px;
		  		}
		
		.rgs-form /deep/ .el-upload-list .el-upload-list__item {
		  		  border: 1px solid #D7D7D7;
		  		  cursor: pointer;
		  		  border-radius: 0;
		  		  color: #000;
		  		  width: 200px;
		  		  font-size: 32px;
		  		  line-height: 60px;
		  		  text-align: center;
		  		  height: 60px;
		  		}
		
		.rgs-form /deep/ .el-upload .el-icon-plus {
		  		  border: 1px solid #D7D7D7;
		  		  cursor: pointer;
		  		  border-radius: 0;
		  		  color: #000;
		  		  width: 200px;
		  		  font-size: 32px;
		  		  line-height: 60px;
		  		  text-align: center;
		  		  height: 60px;
		  		}
	}
	.required {
		position: relative;
	}
	.required::after{
				color: red;
				left: -14px;
				position: absolute;
				content: "*";
			}
</style>
