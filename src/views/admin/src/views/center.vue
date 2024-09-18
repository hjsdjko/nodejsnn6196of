<template>
  <div :style='{"padding":"0px 30px 30px","fontSize":"14px","color":"#666","background":"none"}'>
    <el-form
	  :style='{"border":"0px solid rgba(255,255,255,1)","padding":"30px 0 10px","borderRadius":"0 0 8px 8px","alignItems":"flex-start","flexWrap":"wrap","background":"rgba(255,255,255,0)","display":"flex","fontSize":"inherit"}'
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      label-width="160px"
    >  
     <el-row>
        <el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='xueyuan'"  label="账号" prop="zhanghao">
          <el-input v-model="ruleForm.zhanghao" readonly              placeholder="账号" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='xueyuan'"  label="姓名" prop="xingming">
          <el-input v-model="ruleForm.xingming"               placeholder="姓名" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-if="flag=='xueyuan'"  label="性别" prop="xingbie">
          <el-select v-model="ruleForm.xingbie"  placeholder="请选择性别">
            <el-option
                v-for="(item,index) in xueyuanxingbieOptions"
                v-bind:key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='xueyuan'"  label="邮箱" prop="youxiang">
          <el-input v-model="ruleForm.youxiang"               placeholder="邮箱" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='xueyuan'"  label="手机号码" prop="shoujihaoma">
          <el-input v-model="ruleForm.shoujihaoma"               placeholder="手机号码" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='xueyuan'"  label="余额" prop="yue">
          <el-input v-model="ruleForm.yue" readonly              placeholder="余额" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-if="flag=='xueyuan'" label="头像" prop="touxiang">
          <file-upload
          tip="点击上传头像"
          action="file/upload"
          :limit="3"
          :multiple="true"
          :fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
          @change="xueyuantouxiangUploadChange"
          ></file-upload>
        </el-form-item>
        <el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='jiaolian'"  label="教练账号" prop="jiaolianzhanghao">
          <el-input v-model="ruleForm.jiaolianzhanghao" readonly              placeholder="教练账号" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='jiaolian'"  label="教练姓名" prop="jiaolianxingming">
          <el-input v-model="ruleForm.jiaolianxingming"               placeholder="教练姓名" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-if="flag=='jiaolian'"  label="性别" prop="xingbie">
          <el-select v-model="ruleForm.xingbie"  placeholder="请选择性别">
            <el-option
                v-for="(item,index) in jiaolianxingbieOptions"
                v-bind:key="index"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-if="flag=='jiaolian'" label="头像" prop="touxiang">
          <file-upload
          tip="点击上传头像"
          action="file/upload"
          :limit="3"
          :multiple="true"
          :fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
          @change="jiaoliantouxiangUploadChange"
          ></file-upload>
        </el-form-item>
        <el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='jiaolian'"  label="执教年数" prop="zhijiaonianshu">
          <el-input v-model="ruleForm.zhijiaonianshu"               placeholder="执教年数" clearable></el-input>
        </el-form-item>
        <el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}'   v-if="flag=='jiaolian'"  label="擅长领域" prop="shanzhanglingyu">
          <el-input v-model="ruleForm.shanzhanglingyu"               placeholder="擅长领域" clearable></el-input>
        </el-form-item>
		<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-if="flag=='users'" label="用户名" prop="username">
			<el-input v-model="ruleForm.username" placeholder="用户名"></el-input>
		</el-form-item>
		<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-if="flag=='users'" label="头像" prop="image">
		  <file-upload
		  tip="点击上传头像"
		  action="file/upload"
		  :limit="1"
		  :multiple="false"
		  :fileUrls="ruleForm.image?ruleForm.image:''"
		  @change="usersimageUploadChange"
		  ></file-upload>
		</el-form-item>
		<el-form-item :style='{"padding":"0","margin":"30px 0","alignItems":"center","textAlign":"center","display":"flex","width":"100%","perspective":"320px","-webkitPerspective":"320px","fontSize":"48px","justifyContent":"flex-start"}'>
			<el-button class="btn3" :style='{"border":"0px solid rgba(126, 96, 16, .2)","cursor":"pointer","padding":"0 30px","margin":"0px 20px 0 0","outline":"none","color":"#fff","borderRadius":"4px","background":"#ffc054","width":"auto","fontSize":"16px","lineHeight":"24px","height":"40px"}' type="primary" @click="onUpdateHandler">
				<span class="icon iconfont icon-tijiao16" :style='{"margin":"0 2px","fontSize":"18px","color":"inherit","display":"none"}'></span>
				提交
			</el-button>
		</el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isMobile,isPhone,isURL,checkIdCard } from "@/utils/validate";

export default {
  data() {
    return {
      ruleForm: {},
      flag: '',
      usersFlag: false,
      xueyuanxingbieOptions: [],
      jiaolianxingbieOptions: [],
    };
  },
  mounted() {
    var table = this.$storage.get("sessionTable");
    this.flag = table;
    this.$http({
      url: `${this.$storage.get("sessionTable")}/session`,
      method: "get"
    }).then(({ data }) => {
      if (data && data.code === 0) {
        this.ruleForm = data.data;
      } else {
        this.$message.error(data.msg);
      }
    });
    this.xueyuanxingbieOptions = "男,女".split(',')
    this.jiaolianxingbieOptions = "男,女".split(',')
  },
  methods: {
    xueyuantouxiangUploadChange(fileUrls) {
        this.ruleForm.touxiang = fileUrls;
    },
    jiaoliantouxiangUploadChange(fileUrls) {
        this.ruleForm.touxiang = fileUrls;
    },
	usersimageUploadChange(fileUrls) {
		this.ruleForm.image = fileUrls;
	},
    onUpdateHandler() {
      if((!this.ruleForm.zhanghao)&& 'xueyuan'==this.flag){
        this.$message.error('账号不能为空');
        return
      }


      if((!this.ruleForm.mima)&& 'xueyuan'==this.flag){
        this.$message.error('密码不能为空');
        return
      }


      if((!this.ruleForm.xingming)&& 'xueyuan'==this.flag){
        this.$message.error('姓名不能为空');
        return
      }






      if( 'xueyuan' ==this.flag && this.ruleForm.youxiang&&(!isEmail(this.ruleForm.youxiang))){
        this.$message.error(`邮箱应输入邮箱格式`);
        return
      }


      if( 'xueyuan' ==this.flag && this.ruleForm.shoujihaoma&&(!isMobile(this.ruleForm.shoujihaoma))){
        this.$message.error(`手机号码应输入手机格式`);
        return
      }


      if( 'xueyuan' ==this.flag && this.ruleForm.yue&&(!isNumber(this.ruleForm.yue))){
        this.$message.error(`余额应输入数字`);
        return
      }


        if(this.ruleForm.touxiang!=null) {
                this.ruleForm.touxiang = this.ruleForm.touxiang.replace(new RegExp(this.$base.url,"g"),"");
        }
      if((!this.ruleForm.jiaolianzhanghao)&& 'jiaolian'==this.flag){
        this.$message.error('教练账号不能为空');
        return
      }


      if((!this.ruleForm.mima)&& 'jiaolian'==this.flag){
        this.$message.error('密码不能为空');
        return
      }


      if((!this.ruleForm.jiaolianxingming)&& 'jiaolian'==this.flag){
        this.$message.error('教练姓名不能为空');
        return
      }


      if((!this.ruleForm.xingbie)&& 'jiaolian'==this.flag){
        this.$message.error('性别不能为空');
        return
      }




        if(this.ruleForm.touxiang!=null) {
                this.ruleForm.touxiang = this.ruleForm.touxiang.replace(new RegExp(this.$base.url,"g"),"");
        }
      if((!this.ruleForm.zhijiaonianshu)&& 'jiaolian'==this.flag){
        this.$message.error('执教年数不能为空');
        return
      }


      if( 'jiaolian' ==this.flag && this.ruleForm.zhijiaonianshu&&(!isIntNumer(this.ruleForm.zhijiaonianshu))){
       this.$message.error(`执教年数应输入整数`);
        return
      }


      if('users'==this.flag && this.ruleForm.username.trim().length<1) {
	this.$message.error(`用户名不能为空`);
        return	
      }
	  if(this.flag=='users'){
	  	this.ruleForm.image = this.ruleForm.image.replace(new RegExp(this.$base.url,"g"),"")
	  }
      this.$http({
        url: `${this.$storage.get("sessionTable")}/update`,
        method: "post",
        data: this.ruleForm
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.$message({
            message: "修改信息成功",
            type: "success",
            duration: 1500,
            onClose: () => {
				if(this.flag=='users'){
					this.$storage.set('headportrait',this.ruleForm.image)
				}
            }
          });
        } else {
          this.$message.error(data.msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  	  padding: 0 10px 0 0;
	  	  color: #999;
	  	  font-weight: 500;
	  	  display: inline-block;
	  	  width: 160px;
	  	  font-size: inherit;
	  	  line-height: 40px;
	  	  text-align: right;
	  	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 160px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
	  	  border: 2px solid #c8c8c8;
	  	  border-radius: 0px;
	  	  padding: 0 12px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  color: inherit;
	  	  background: none;
	  	  width: auto;
	  	  font-size: 14px;
	  	  min-width: 350px;
	  	  height: 36px;
	  	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  	  border: 2px solid #c8c8c8;
	  	  border-radius: 0px;
	  	  padding: 0 10px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  color: inherit;
	  	  background: none;
	  	  width: auto;
	  	  font-size: 14px;
	  	  min-width: 350px;
	  	  height: 36px;
	  	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  	  border: 2px solid #c8c8c8;
	  	  border-radius: 0px;
	  	  padding: 0 10px 0 30px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  color: inherit;
	  	  background: none;
	  	  width: auto;
	  	  font-size: 14px;
	  	  min-width: 350px;
	  	  height: 36px;
	  	}
	
	.add-update-preview /deep/ .el-upload--picture-card {
		background: transparent;
		border: 0;
		border-radius: 0;
		width: auto;
		height: auto;
		line-height: initial;
		vertical-align: middle;
	}
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
	  	  border: 2px solid #c8c8c8;
	  	  cursor: pointer;
	  	  border-radius: 0px;
	  	  color: inherit;
	  	  background: none;
	  	  font-weight: 600;
	  	  object-fit: cover;
	  	  width: 150px;
	  	  font-size: 32px;
	  	  line-height: 80px;
	  	  text-align: center;
	  	  height: 80px;
	  	}
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
	  	  border: 2px solid #c8c8c8;
	  	  cursor: pointer;
	  	  border-radius: 0px;
	  	  color: inherit;
	  	  background: none;
	  	  font-weight: 600;
	  	  object-fit: cover;
	  	  width: 150px;
	  	  font-size: 32px;
	  	  line-height: 80px;
	  	  text-align: center;
	  	  height: 80px;
	  	}
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  	  border: 2px solid #c8c8c8;
	  	  border-radius: 0px;
	  	  padding: 12px;
	  	  box-shadow: 0 0 0px rgba(64, 158, 255, .5);
	  	  outline: none;
	  	  color: inherit;
	  	  background: none;
	  	  width: auto;
	  	  font-size: 14px;
	  	  min-width: 350px;
	  	  height: 120px;
	  	}
	
	.add-update-preview .btn3 {
				border: 0px solid rgba(126, 96, 16, .2);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 30px;
				margin: 0px 20px 0 0;
				outline: none;
				color: #fff;
				background: #ffc054;
				width: auto;
				font-size: 16px;
				line-height: 24px;
				height: 40px;
			}
	
	.add-update-preview .btn3:hover {
				transform: scale(0.9);
				opacity: 0.8;
			}
	
	.editor>.avatar-uploader {
		line-height: 0;
		height: 0;
	}
</style>
