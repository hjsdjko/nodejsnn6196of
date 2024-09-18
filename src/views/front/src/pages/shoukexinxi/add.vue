<template>
<div :style='{"width":"80%","padding":"20px","margin":"10px auto","position":"relative","background":"#fff"}'>
    <el-form
	  :style='{"width":"100%","position":"relative"}'
      class="add-update-preview"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
    >
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="登记编号" prop="dengjibianhao">
              <el-input v-model="ruleForm.dengjibianhao" placeholder="登记编号" disabled></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="课程名称" prop="kechengmingcheng">
            <el-input v-model="ruleForm.kechengmingcheng" 
                placeholder="课程名称" clearable :disabled=" false  ||ro.kechengmingcheng"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="课程封面" v-if="type!='cross' || (type=='cross' && !ro.kechengfengmian)" prop="kechengfengmian">
            <file-upload
            tip="点击上传课程封面"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.kechengfengmian?ruleForm.kechengfengmian:''"
            @change="kechengfengmianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' class="upload" v-else label="课程封面" prop="kechengfengmian">
                <img v-if="ruleForm.kechengfengmian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.kechengfengmian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.kechengfengmian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="课程分类" prop="kechengfenlei">
            <el-input v-model="ruleForm.kechengfenlei" 
                placeholder="课程分类" clearable :disabled=" false  ||ro.kechengfenlei"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="上课地点" prop="shangkedidian">
            <el-input v-model="ruleForm.shangkedidian" 
                placeholder="上课地点" clearable :disabled=" false  ||ro.shangkedidian"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="教练账号" prop="jiaolianzhanghao">
            <el-input v-model="ruleForm.jiaolianzhanghao" 
                placeholder="教练账号" clearable :disabled=" false  ||ro.jiaolianzhanghao"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="教练姓名" prop="jiaolianxingming">
            <el-input v-model="ruleForm.jiaolianxingming" 
                placeholder="教练姓名" clearable :disabled=" false  ||ro.jiaolianxingming"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="收款课时" prop="keshi">
            <el-input v-model.number="ruleForm.keshi" 
                placeholder="收款课时" clearable :disabled=" false  ||ro.keshi"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="账号" prop="zhanghao">
            <el-input v-model="ruleForm.zhanghao" 
                placeholder="账号" clearable :disabled=" false  ||ro.zhanghao"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="姓名" prop="xingming">
            <el-input v-model="ruleForm.xingming" 
                placeholder="姓名" clearable :disabled=" false  ||ro.xingming"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="授课时间" prop="shoukeshijian">
              <el-date-picker
				  :disabled=" false  ||ro.shoukeshijian"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="ruleForm.shoukeshijian" 
                  type="datetime"
                  placeholder="授课时间">
              </el-date-picker>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="授课内容" prop="shoukeneirong">
            <el-input
              type="textarea"
              :rows="8"
              placeholder="授课内容"
              v-model="ruleForm.shoukeneirong">
            </el-input>
          </el-form-item>

      <el-form-item :style='{"padding":"0","margin":"0"}'>
        <el-button :style='{"border":"0","cursor":"pointer","padding":"0","margin":"0 20px 0 0","outline":"none","color":"rgba(255, 255, 255, 1)","borderRadius":"5px","background":"#57A7A5","width":"128px","lineHeight":"40px","fontSize":"16px","height":"40px"}'  type="primary" @click="onSubmit">提交</el-button>
        <el-button :style='{"border":"none","cursor":"pointer","padding":"0","margin":"0","outline":"none","color":"rgba(64, 158, 255, 1)","borderRadius":"5px","background":"#9E9E9E","width":"128px","lineHeight":"40px","fontSize":"16px","height":"40px"}' @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
  export default {
    data() {
	  let self = this
      return {
        id: '',
        baseUrl: '',
        ro:{
				dengjibianhao : false,
				kechengmingcheng : false,
				kechengfengmian : false,
				kechengfenlei : false,
				shangkedidian : false,
				jiaolianzhanghao : false,
				jiaolianxingming : false,
				keshi : false,
				zhanghao : false,
				xingming : false,
				shoukeshijian : false,
				shoukeneirong : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          dengjibianhao: this.getUUID(),
          kechengmingcheng: '',
          kechengfengmian: '',
          kechengfenlei: '',
          shangkedidian: '',
          jiaolianzhanghao: '',
          jiaolianxingming: '',
          keshi: '',
          zhanghao: '',
          xingming: '',
          shoukeshijian: '',
          shoukeneirong: '',
        },


        rules: {
          dengjibianhao: [
          ],
          kechengmingcheng: [
          ],
          kechengfengmian: [
          ],
          kechengfenlei: [
          ],
          shangkedidian: [
          ],
          jiaolianzhanghao: [
          ],
          jiaolianxingming: [
          ],
          keshi: [
            { required: true, message: '收款课时不能为空', trigger: 'blur' },
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          zhanghao: [
          ],
          xingming: [
          ],
          shoukeshijian: [
          ],
          shoukeneirong: [
          ],
        },
		centerType: false,
      };
    },
    computed: {



    },
    components: {
    },
    created() {
		if(this.$route.query.centerType){
			this.centerType = true
		}
	  //this.bg();
      let type = this.$route.query.type ? this.$route.query.type : '';
      this.init(type);
      this.baseUrl = this.$config.baseUrl;
      this.ruleForm.shoukeshijian = this.getCurDateTime()
    },
    methods: {
      getMakeZero(s) {
          return s < 10 ? '0' + s : s;
      },
      // 下载
      download(file){
        window.open(`${file}`)
      },
      // 初始化
      init(type) {
        this.type = type;
        if(type=='cross'){
          var obj = JSON.parse(localStorage.getItem('crossObj'));
          for (var o in obj){
            if(o=='dengjibianhao'){
              this.ruleForm.dengjibianhao = obj[o];
              this.ro.dengjibianhao = true;
              continue;
            }
            if(o=='kechengmingcheng'){
              this.ruleForm.kechengmingcheng = obj[o];
              this.ro.kechengmingcheng = true;
              continue;
            }
            if(o=='kechengfengmian'){
              this.ruleForm.kechengfengmian = obj[o].split(",")[0];
              this.ro.kechengfengmian = true;
              continue;
            }
            if(o=='kechengfenlei'){
              this.ruleForm.kechengfenlei = obj[o];
              this.ro.kechengfenlei = true;
              continue;
            }
            if(o=='shangkedidian'){
              this.ruleForm.shangkedidian = obj[o];
              this.ro.shangkedidian = true;
              continue;
            }
            if(o=='jiaolianzhanghao'){
              this.ruleForm.jiaolianzhanghao = obj[o];
              this.ro.jiaolianzhanghao = true;
              continue;
            }
            if(o=='jiaolianxingming'){
              this.ruleForm.jiaolianxingming = obj[o];
              this.ro.jiaolianxingming = true;
              continue;
            }
            if(o=='keshi'){
              this.ruleForm.keshi = obj[o];
              this.ro.keshi = true;
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
            if(o=='shoukeshijian'){
              this.ruleForm.shoukeshijian = obj[o];
              this.ro.shoukeshijian = true;
              continue;
            }
            if(o=='shoukeneirong'){
              this.ruleForm.shoukeneirong = obj[o];
              this.ro.shoukeneirong = true;
              continue;
            }
          }
          this.ruleForm.keshi = 0
		  this.ro.keshi = false;
        }else if(type=='edit'){
			this.info()
		}
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
          }
        });

		if (localStorage.getItem('raffleType') && localStorage.getItem('raffleType') != null) {
			localStorage.removeItem('raffleType')
			setTimeout(() => {
				this.onSubmit()
			}, 300)
		}
      },

    // 多级联动参数
      // 多级联动参数
      info() {
        this.$http.get(`shoukexinxi/detail/${this.$route.query.id}`, {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {

			if(this.ruleForm.dengjibianhao){
				this.ruleForm.dengjibianhao = String(this.ruleForm.dengjibianhao)
			}
			if(!this.ruleForm.keshi){
				this.$message.error("收款课时不能为空");
				return
			}
			var obj = JSON.parse(localStorage.getItem('crossObj'));
			var table = localStorage.getItem('crossTable');
			obj.keshi = obj.keshi - this.ruleForm.keshi
			if(obj.keshi<0){
				this.$message.error("收款课时不足");
				return
			}
      
			//this.$http.post(table+`/update`, obj).then(res => {});
			//更新跨表属性
			var crossuserid;
			var crossrefid;
			var crossoptnum;
			this.$refs["ruleForm"].validate(valid => {
				if(valid) {
					if(this.type=='cross'){
						var statusColumnName = localStorage.getItem('statusColumnName');
						var statusColumnValue = localStorage.getItem('statusColumnValue');
						if(statusColumnName && statusColumnName!='') {
							var obj = JSON.parse(localStorage.getItem('crossObj'));
							if(!statusColumnName.startsWith("[")) {
								for (var o in obj){
									if(o==statusColumnName){
										obj[o] = statusColumnValue;
									}
								}
								var table = localStorage.getItem('crossTable');
								this.$http.post(table+'/update', obj).then(res => {});
							} else {
								crossuserid=Number(localStorage.getItem('frontUserid'));
								crossrefid=obj['id'];
								crossoptnum=localStorage.getItem('statusColumnName');
								crossoptnum=crossoptnum.replace(/\[/,"").replace(/\]/,"");
							}
						}
					}
					if(crossrefid && crossuserid) {
						this.ruleForm.crossuserid=crossuserid;
						this.ruleForm.crossrefid=crossrefid;
						var params = {
							page: 1,
							limit: 10,
							crossuserid:crossuserid,
							crossrefid:crossrefid,
						}
						this.$http.get('shoukexinxi/list', {
							params: params
						}).then(res => {
							if(res.data.data.total>=crossoptnum) {
								this.$message({
									message: localStorage.getItem('tips'),
									type: 'error',
									duration: 1500,
								});
								return false;
							} else {
								// 跨表计算
								var obj = JSON.parse(localStorage.getItem('crossObj'));
								var table = localStorage.getItem('crossTable');

								obj.keshi = parseFloat(obj.keshi) - parseFloat(this.ruleForm.keshi)

								this.$http.post(table+`/update`,obj).then(res => {});
								this.$http.post(`shoukexinxi/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
									if (res.data.code == 0) {
										this.$message({
											message: '操作成功',
											type: 'success',
											duration: 1500,
											onClose: () => {
												this.$router.go(-1);
											}
										});
									} else {
										this.$message({
											message: res.data.msg,
											type: 'error',
											duration: 1500
										});
									}
								});
							}
						});
					} else {
						var obj = JSON.parse(localStorage.getItem('crossObj'));
						var table = localStorage.getItem('crossTable');

						obj.keshi = parseFloat(obj.keshi) - parseFloat(this.ruleForm.keshi)

						this.$http.post(table+`/update`,obj).then(res => {});
						this.$http.post(`shoukexinxi/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
							if (res.data.code == 0) {
								this.$message({
									message: '操作成功',
									type: 'success',
									duration: 1500,
									onClose: () => {
										this.$router.go(-1);
									}
								});
							} else {
								this.$message({
									message: res.data.msg,
									type: 'error',
									duration: 1500
								});
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
			this.$router.go(-1);
		},
      kechengfengmianUploadChange(fileUrls) {
          this.ruleForm.kechengfengmian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
      },
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.el-date-editor.el-input {
		width: auto;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__label {
	  padding: 0 10px 0 0;
	  color: #000;
	  font-weight: 500;
	  width: 100px;
	  font-size: 14px;
	  line-height: 40px;
	  text-align: right;
	}
	
	.add-update-preview .el-form-item /deep/ .el-form-item__content {
	  margin-left: 100px;
	}
	
	.add-update-preview .el-input /deep/ .el-input__inner {
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
	.add-update-preview .el-input-number /deep/ .el-input__inner {
		text-align: left;
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
	.add-update-preview .el-input-number /deep/ .el-input-number__decrease {
		display: none;
	}
	.add-update-preview .el-input-number /deep/ .el-input-number__increase {
		display: none;
	}
	
	.add-update-preview .el-select /deep/ .el-input__inner {
	  border: 1px solid #E2E3E5;
	  border-radius: 0;
	  padding: 0 10px;
	  box-shadow: none;
	  outline: none;
	  color: #000;
	  width: 500px;
	  font-size: 14px;
	  height: 40px;
	}
	
	.add-update-preview .el-date-editor /deep/ .el-input__inner {
	  border: 1px solid #E2E3E5;
	  border-radius: 0;
	  padding: 0 10px 0 30px;
	  box-shadow: none;
	  outline: none;
	  color: none;
	  width: 500px;
	  font-size: 14px;
	  height: 40px;
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
	
	.add-update-preview /deep/ .el-upload-list .el-upload-list__item {
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
	
	.add-update-preview /deep/ .el-upload .el-icon-plus {
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
	
	.add-update-preview .el-textarea /deep/ .el-textarea__inner {
	  border: 1px solid #E2E3E5;
	  border-radius: 0;
	  padding: 12px;
	  box-shadow: none;
	  outline: none;
	  color: #000;
	  width: 500px;
	  font-size: 14px;
	  height: 120px;
	}
</style>
