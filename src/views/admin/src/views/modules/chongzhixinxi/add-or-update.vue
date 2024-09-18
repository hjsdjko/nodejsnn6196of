<template>
	<div class="addEdit-block" :style='{"padding":"0px 0px 30px","fontSize":"14px","color":"#000","background":"none"}'>
		<el-form
			:style='{"border":"0px solid rgba(255,255,255,1)","padding":"30px 0 10px","borderRadius":"0 0 8px 8px","alignItems":"flex-start","flexWrap":"wrap","background":"rgba(255,255,255,0)","display":"flex","fontSize":"inherit"}'
			class="add-update-preview"
			ref="ruleForm"
			:model="ruleForm"
			:rules="rules"
			label-width="160px"
		>
			<template >
				<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' class="input" v-if="type!='info'" label="充值编号" prop="chongzhibianhao">
					<el-input v-model="ruleForm.chongzhibianhao" placeholder="充值编号" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' class="input" v-else-if="ruleForm.chongzhibianhao" label="充值编号" prop="chongzhibianhao">
					<el-input v-model="ruleForm.chongzhibianhao" placeholder="充值编号" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' class="input" v-if="type!='info'"  label="账号" prop="zhanghao">
					<el-input v-model="ruleForm.zhanghao" placeholder="账号" clearable  :readonly="ro.zhanghao"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-else class="input" label="账号" prop="zhanghao">
					<el-input v-model="ruleForm.zhanghao" placeholder="账号" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' class="input" v-if="type!='info'"  label="姓名" prop="xingming">
					<el-input v-model="ruleForm.xingming" placeholder="姓名" clearable  :readonly="ro.xingming"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-else class="input" label="姓名" prop="xingming">
					<el-input v-model="ruleForm.xingming" placeholder="姓名" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' class="input" v-if="type!='info'"  label="充值金额" prop="yue">
					<el-input-number v-model="ruleForm.yue" placeholder="充值金额" :readonly="ro.yue"></el-input-number>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-else class="input" label="充值金额" prop="yue">
					<el-input v-model="ruleForm.yue" placeholder="充值金额" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' class="upload" v-if="type!='info' && !ro.touxiang" label="头像" prop="touxiang">
					<file-upload
						tip="点击上传头像"
						action="file/upload"
						:limit="3"
						:multiple="true"
						:fileUrls="ruleForm.touxiang?ruleForm.touxiang:''"
						@change="touxiangUploadChange"
					></file-upload>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' class="upload" v-else-if="ruleForm.touxiang" label="头像" prop="touxiang">
					<img v-if="ruleForm.touxiang.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.touxiang.split(',')[0]" width="100" height="100">
					<img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.touxiang.split(',')" :src="$base.url+item" width="100" height="100">
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' class="date" v-if="type!='info'" label="充值日期" prop="chongzhiriqi">
					<el-date-picker
						format="yyyy 年 MM 月 dd 日"
						value-format="yyyy-MM-dd"
						v-model="ruleForm.chongzhiriqi" 
						type="date"
						:readonly="ro.chongzhiriqi"
						placeholder="充值日期"
					></el-date-picker> 
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' class="input" v-else-if="ruleForm.chongzhiriqi" label="充值日期" prop="chongzhiriqi">
					<el-input v-model="ruleForm.chongzhiriqi" placeholder="充值日期" readonly></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' class="input" v-if="type!='info'"  label="充值备注" prop="chongzhibeizhu">
					<el-input v-model="ruleForm.chongzhibeizhu" placeholder="充值备注" clearable  :readonly="ro.chongzhibeizhu"></el-input>
				</el-form-item>
				<el-form-item :style='{"width":"48%","margin":"0 0 30px 0","fontSize":"inherit","color":"inherit"}' v-else class="input" label="充值备注" prop="chongzhibeizhu">
					<el-input v-model="ruleForm.chongzhibeizhu" placeholder="充值备注" readonly></el-input>
				</el-form-item>
			</template>
			<el-form-item :style='{"padding":"0","margin":"30px 0","alignItems":"center","textAlign":"center","display":"flex","width":"100%","perspective":"320px","-webkitPerspective":"320px","fontSize":"48px","justifyContent":"flex-start"}' class="btn">
				<el-button class="btn3"  v-if="type!='info'" type="success" @click="onSubmit">
					<span class="icon iconfont icon-tijiao16" :style='{"margin":"0 2px","fontSize":"18px","color":"inherit","display":"none"}'></span>
					提交
				</el-button>
				<el-button class="btn4" v-if="type!='info'" type="success" @click="back()">
					<span class="icon iconfont icon-quxiao09" :style='{"margin":"0 2px","fontSize":"18px","color":"inherit","display":"none"}'></span>
					取消
				</el-button>
				<el-button class="btn5" v-if="type=='info'" type="success" @click="back()">
					<span class="icon iconfont icon-fanhui01" :style='{"margin":"0 2px","fontSize":"18px","color":"inherit","display":"none"}'></span>
					返回
				</el-button>
			</el-form-item>
		</el-form>
    

  </div>
</template>
<script>
// 数字，邮件，手机，url，身份证校验
import { isNumber,isIntNumer,isEmail,isPhone, isMobile,isURL,checkIdCard } from "@/utils/validate";
export default {
	data() {
		let self = this
		var validateIdCard = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!checkIdCard(value)) {
				callback(new Error("请输入正确的身份证号码"));
			} else {
				callback();
			}
		};
		var validateUrl = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isURL(value)) {
				callback(new Error("请输入正确的URL地址"));
			} else {
				callback();
			}
		};
		var validateMobile = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isMobile(value)) {
				callback(new Error("请输入正确的手机号码"));
			} else {
				callback();
			}
		};
		var validatePhone = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isPhone(value)) {
				callback(new Error("请输入正确的电话号码"));
			} else {
				callback();
			}
		};
		var validateEmail = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isEmail(value)) {
				callback(new Error("请输入正确的邮箱地址"));
			} else {
				callback();
			}
		};
		var validateNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isNumber(value)) {
				callback(new Error("请输入数字"));
			} else {
				callback();
			}
		};
		var validateIntNumber = (rule, value, callback) => {
			if(!value){
				callback();
			} else if (!isIntNumer(value)) {
				callback(new Error("请输入整数"));
			} else {
				callback();
			}
		};
		return {
			id: '',
            uObject: null,
			type: '',
			
			
			ro:{
				chongzhibianhao : false,
				zhanghao : false,
				xingming : false,
				yue : false,
				touxiang : false,
				chongzhiriqi : false,
				chongzhibeizhu : false,
				ispay : false,
			},
			
			
			ruleForm: {
				chongzhibianhao: this.getUUID(),
				zhanghao: '',
				xingming: '',
				yue: '',
				touxiang: '',
				chongzhiriqi: '',
				chongzhibeizhu: '',
			},
		

			
			rules: {
				chongzhibianhao: [
				],
				zhanghao: [
				],
				xingming: [
				],
				yue: [
					{ required: true, message: '充值金额不能为空', trigger: 'blur' },
					{ validator: validateNumber, trigger: 'blur' },
				],
				touxiang: [
				],
				chongzhiriqi: [
				],
				chongzhibeizhu: [
				],
				ispay: [
				],
			}
		};
	},
	props: ["parent"],
	computed: {



	},
    components: {
    },
	created() {
		this.ruleForm.chongzhiriqi = this.getCurDate()
	},
	methods: {
		
		// 下载
		download(file){
			window.open(`${file}`)
		},
		// 初始化
		init(id,type) {
			if (id) {
				this.id = id;
				this.type = type;
			}
			if(this.type=='info'||this.type=='else'){
				this.info(id);
			}else if(this.type=='logistics'){
				this.logistics=false;
				this.info(id);
			}else if(this.type=='cross'){
				var obj = this.$storage.getObj('crossObj');
				for (var o in obj){
						if(o=='chongzhibianhao'){
							this.ruleForm.chongzhibianhao = obj[o];
							this.ro.chongzhibianhao = true;
							continue;
						}
						if(o=='zhanghao'){
							this.ruleForm.zhanghao = obj[o];
							this.ro.zhanghao = true;
							continue;
						}
						if(o=='xingming'){
							this.ruleForm.xingming = obj[o];
							this.ro.xingming = true;
							continue;
						}
						if(o=='yue'){
							this.ruleForm.yue = obj[o];
							this.ro.yue = true;
							continue;
						}
						if(o=='touxiang'){
							this.ruleForm.touxiang = obj[o];
							this.ro.touxiang = true;
							continue;
						}
						if(o=='chongzhiriqi'){
							this.ruleForm.chongzhiriqi = obj[o];
							this.ro.chongzhiriqi = true;
							continue;
						}
						if(o=='chongzhibeizhu'){
							this.ruleForm.chongzhibeizhu = obj[o];
							this.ro.chongzhibeizhu = true;
							continue;
						}
				}
				








			}
			
			// 获取用户信息
			this.$http({
				url: `${this.$storage.get('sessionTable')}/session`,
				method: "get"
			}).then(({ data }) => {
				if (data && data.code === 0) {
					
					var json = data.data;
                    this.uObject = data.data;
					if(((json.zhanghao!=''&&json.zhanghao) || json.zhanghao==0) && this.$storage.get("role")!="管理员"){
						this.ruleForm.zhanghao = json.zhanghao
						this.ro.zhanghao = true;
					}
					if(((json.xingming!=''&&json.xingming) || json.xingming==0) && this.$storage.get("role")!="管理员"){
						this.ruleForm.xingming = json.xingming
						this.ro.xingming = true;
					}
					if(((json.yue!=''&&json.yue) || json.yue==0) && this.$storage.get("role")!="管理员"){
						this.ruleForm.yue = json.yue
						this.ro.yue = true;
					}
					if(((json.touxiang!=''&&json.touxiang) || json.touxiang==0) && this.$storage.get("role")!="管理员"){
						this.ruleForm.touxiang = json.touxiang
						this.ro.touxiang = true;
					}
				} else {
					this.$message.error(data.msg);
				}
			});
			
			
		},
    // 多级联动参数

    info(id) {
      this.$http({
        url: `chongzhixinxi/info/${id}`,
        method: "get"
      }).then(({ data }) => {
        if (data && data.code === 0) {
        this.ruleForm = data.data;
        //解决前台上传图片后台不显示的问题
        let reg=new RegExp('../../../upload','g')//g代表全部
        } else {
          this.$message.error(data.msg);
        }
      });
    },


    // 提交
    onSubmit() {
		if(this.ruleForm.chongzhibianhao) {
			this.ruleForm.chongzhibianhao = String(this.ruleForm.chongzhibianhao)
		}





	if(this.ruleForm.touxiang!=null) {
		this.ruleForm.touxiang = this.ruleForm.touxiang.replace(new RegExp(this.$base.url,"g"),"");
	}




var objcross = this.$storage.getObj('crossObj');
      //更新跨表属性
       var crossuserid;
       var crossrefid;
       var crossoptnum;
       if(this.type=='cross'){
                var statusColumnName = this.$storage.get('statusColumnName');
                var statusColumnValue = this.$storage.get('statusColumnValue');
                if(statusColumnName!='') {
                        var obj = this.$storage.getObj('crossObj');
                       if(statusColumnName && !statusColumnName.startsWith("[")) {
                               for (var o in obj){
                                 if(o==statusColumnName){
                                   obj[o] = statusColumnValue;
                                 }
                               }
                               var table = this.$storage.get('crossTable');
                             this.$http({
                                 url: `${table}/update`,
                                 method: "post",
                                 data: obj
                               }).then(({ data }) => {});
                       } else {
                               crossuserid=this.$storage.get('userid');
                               crossrefid=obj['id'];
                               crossoptnum=this.$storage.get('statusColumnName');
                               crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
                        }
                }
        }
		this.$refs["ruleForm"].validate(valid => {
			if (valid) {
				if(crossrefid && crossuserid) {
					this.ruleForm.crossuserid = crossuserid;
					this.ruleForm.crossrefid = crossrefid;
					let params = { 
						page: 1, 
						limit: 10, 
						crossuserid:this.ruleForm.crossuserid,
						crossrefid:this.ruleForm.crossrefid,
					} 
				this.$http({ 
					url: "chongzhixinxi/page", 
					method: "get", 
					params: params 
				}).then(({ 
					data 
				}) => { 
					if (data && data.code === 0) { 
						if(data.data.total>=crossoptnum) {
							this.$message.error(this.$storage.get('tips'));
							return false;
						} else {
							this.$http({
								url: `chongzhixinxi/${!this.ruleForm.id ? "save" : "update"}`,
								method: "post",
								data: this.ruleForm
							}).then(({ data }) => {
								if (data && data.code === 0) {
									if(this.uObject.yue>=0){
										this.uObject.yue = parseFloat(this.uObject.yue) + parseFloat(this.ruleForm.yue)
										this.$http({url: `${this.$storage.get('sessionTable')}/update`,method: "post",data: this.uObject}).then(res => {});
									}
									this.$message({
										message: "操作成功",
										type: "success",
										duration: 1500,
										onClose: () => {
											this.parent.showFlag = true;
											this.parent.addOrUpdateFlag = false;
											this.parent.chongzhixinxiCrossAddOrUpdateFlag = false;
											this.parent.search();
											this.parent.contentStyleChange();
										}
									});
								} else {
									this.$message.error(data.msg);
								}
							});

						}
					} else { 
				} 
			});
		} else {
			this.$http({
				url: `chongzhixinxi/${!this.ruleForm.id ? "save" : "update"}`,
				method: "post",
			   data: this.ruleForm
			}).then(({ data }) => {
				if (data && data.code === 0) {
					if(this.uObject.yue>=0){
						this.uObject.yue = parseFloat(this.uObject.yue) + parseFloat(this.ruleForm.yue)
						this.$http({url: `${this.$storage.get('sessionTable')}/update`,method: "post",data: this.uObject}).then(res => {});
					}
					this.$message({
						message: "操作成功",
						type: "success",
						duration: 1500,
						onClose: () => {
							this.parent.showFlag = true;
							this.parent.addOrUpdateFlag = false;
							this.parent.chongzhixinxiCrossAddOrUpdateFlag = false;
							this.parent.search();
							this.parent.contentStyleChange();
						}
					});
				} else {
					this.$message.error(data.msg);
			   }
			});
		 }
         }
       });
    },
    // 获取uuid
    getUUID () {
      return new Date().getTime();
    },
    // 返回
    back() {
      this.parent.showFlag = true;
      this.parent.addOrUpdateFlag = false;
      this.parent.chongzhixinxiCrossAddOrUpdateFlag = false;
      this.parent.contentStyleChange();
    },
    touxiangUploadChange(fileUrls) {
	    this.ruleForm.touxiang = fileUrls;
    },
  }
};
</script>
<style lang="scss" scoped>
	.amap-wrapper {
		width: 100%;
		height: 500px;
	}
	
	.search-box {
		position: absolute;
	}
	
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
	.add-update-preview .el-input-number /deep/ .el-input__inner {
		text-align: left;
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
	.add-update-preview .el-input-number /deep/ .el-input-number__decrease {
		display: none;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__increase {
		display: none;
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
	
	.add-update-preview /deep/ .upload .upload-img {
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
	
	.add-update-preview .btn .btn1 {
				border: 0px solid rgba(126, 96, 16, .2);
				cursor: pointer;
				padding: 0 30px;
				margin: 0px 20px 0 0;
				color: #fff;
				display: inline-block;
				font-size: 14px;
				line-height: 24px;
				border-radius: 4px;
				outline: none;
				background: #ffc054;
				width: auto;
				height: 40px;
			}
	
	.add-update-preview .btn .btn1:hover {
				transform: scale(0.9);
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn2 {
				border: 0px solid rgba(126, 96, 16, .2);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 30px;
				margin: 0px 20px 0 0;
				outline: none;
				color: #fff;
				background: #ffc054;
				width: auto;
				font-size: 14px;
				line-height: 24px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn2:hover {
				transform: scale(0.9);
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn3 {
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
	
	.add-update-preview .btn .btn3:hover {
				transform: scale(0.9);
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn4 {
				border: 0px solid rgba(126, 96, 16, .2);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 30px;
				margin: 0px 20px 0 0;
				color: #fff;
				background: #ffc054;
				width: auto;
				font-size: 16px;
				line-height: 24px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn4:hover {
				transform: scale(0.9);
				opacity: 0.8;
			}
	
	.add-update-preview .btn .btn5 {
				border: 0px solid rgba(126, 96, 16, .2);
				cursor: pointer;
				border-radius: 4px;
				padding: 0 30px;
				margin: 0px 20px 0 0;
				color: #fff;
				background: #ffc054;
				width: auto;
				font-size: 16px;
				line-height: 24px;
				height: 40px;
			}
	
	.add-update-preview .btn .btn5:hover {
				transform: scale(0.9);
				opacity: 0.8;
			}
</style>
