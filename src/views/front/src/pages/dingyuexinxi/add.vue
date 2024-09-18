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
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="订阅编号" prop="dingyuebianhao">
              <el-input v-model="ruleForm.dingyuebianhao" placeholder="订阅编号" disabled></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="场地名称" prop="changdimingcheng">
            <el-input v-model="ruleForm.changdimingcheng" 
                placeholder="场地名称" clearable :disabled=" false  ||ro.changdimingcheng"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="场地图片" v-if="type!='cross' || (type=='cross' && !ro.changditupian)" prop="changditupian">
            <file-upload
            tip="点击上传场地图片"
            action="file/upload"
            :limit="3"
            :multiple="true"
            :fileUrls="ruleForm.changditupian?ruleForm.changditupian:''"
            @change="changditupianUploadChange"
            ></file-upload>
          </el-form-item>
            <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' class="upload" v-else label="场地图片" prop="changditupian">
                <img v-if="ruleForm.changditupian.substring(0,4)=='http'" class="upload-img" style="margin-right:20px;" v-bind:key="index" :src="ruleForm.changditupian.split(',')[0]" width="100" height="100">
                <img v-else class="upload-img" style="margin-right:20px;" v-bind:key="index" v-for="(item,index) in ruleForm.changditupian.split(',')" :src="baseUrl+item" width="100" height="100">
            </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="场地分类" prop="changdifenlei">
            <el-input v-model="ruleForm.changdifenlei" 
                placeholder="场地分类" clearable :disabled=" false  ||ro.changdifenlei"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="场地位置" prop="changdiweizhi">
            <el-input v-model="ruleForm.changdiweizhi" 
                placeholder="场地位置" clearable :disabled=" false  ||ro.changdiweizhi"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="订阅时长" prop="dingyueshizhang">
              <el-input v-model="dingyueshizhang" placeholder="订阅时长" disabled></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="费用" prop="feiyong">
			<el-input-number v-model="ruleForm.feiyong" placeholder="费用" :readonly="ro.feiyong"></el-input-number>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="应付金额" prop="yue">
              <el-input v-model="yue" placeholder="应付金额" disabled></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="订阅时间" prop="dingyueshijian">
              <el-date-picker
				  :disabled=" false  ||ro.dingyueshijian"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="ruleForm.dingyueshijian" 
                  type="datetime"
                  :picker-options="dingyueshijianPickerOptions"
                  placeholder="订阅时间">
              </el-date-picker>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="归还时间" prop="guihaishijian">
              <el-date-picker
				  :disabled=" false  ||ro.guihaishijian"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="ruleForm.guihaishijian" 
                  type="datetime"
                  :picker-options="guihaishijianPickerOptions"
                  placeholder="归还时间">
              </el-date-picker>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="账号" prop="zhanghao">
            <el-input v-model="ruleForm.zhanghao" 
                placeholder="账号" clearable :disabled=" false  ||ro.zhanghao"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="姓名" prop="xingming">
            <el-input v-model="ruleForm.xingming" 
                placeholder="姓名" clearable :disabled=" false  ||ro.xingming"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="手机号码" prop="shoujihaoma">
            <el-input v-model="ruleForm.shoujihaoma" 
                placeholder="手机号码" clearable :disabled=" false  ||ro.shoujihaoma"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="用户余额" prop="yonghuyue">
			<el-input-number v-model="ruleForm.yonghuyue" placeholder="用户余额" :readonly="ro.yonghuyue"></el-input-number>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="订阅备注" prop="dingyuebeizhu">
            <el-input v-model="ruleForm.dingyuebeizhu" 
                placeholder="订阅备注" clearable :disabled=" false  ||ro.dingyuebeizhu"></el-input>
          </el-form-item>
          <el-form-item :style='{"padding":"10px","margin":"0 0 10px","background":"none"}' label="下单时间" prop="xiadanshijian">
              <el-date-picker
				  :disabled=" false  ||ro.xiadanshijian"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  v-model="ruleForm.xiadanshijian" 
                  type="datetime"
                  placeholder="下单时间">
              </el-date-picker>
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
        uObject: null,
        baseUrl: '',
        ro:{
				dingyuebianhao : false,
				changdimingcheng : false,
				changditupian : false,
				changdifenlei : false,
				changdiweizhi : false,
				dingyueshizhang : false,
				feiyong : false,
				yue : false,
				dingyueshijian : false,
				guihaishijian : false,
				zhanghao : false,
				xingming : false,
				shoujihaoma : false,
				yonghuyue : false,
				dingyuebeizhu : false,
				xiadanshijian : false,
				sfsh : false,
				shhf : false,
        },
        type: '',
        userTableName: localStorage.getItem('UserTableName'),
        ruleForm: {
          dingyuebianhao: this.getUUID(),
          changdimingcheng: '',
          changditupian: '',
          changdifenlei: '',
          changdiweizhi: '',
          dingyueshizhang: '',
          feiyong: '',
          yue: '',
          dingyueshijian: '',
          guihaishijian: '',
          zhanghao: '',
          xingming: '',
          shoujihaoma: '',
          yonghuyue: '',
          dingyuebeizhu: '',
          xiadanshijian: '',
        },

            dingyueshijianPickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            guihaishijianPickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },

        rules: {
          dingyuebianhao: [
            { required: true, message: '订阅编号不能为空', trigger: 'blur' },
          ],
          changdimingcheng: [
          ],
          changditupian: [
          ],
          changdifenlei: [
          ],
          changdiweizhi: [
          ],
          dingyueshizhang: [
            { validator: this.$validate.isIntNumer, trigger: 'blur' },
          ],
          feiyong: [
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          yue: [
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          dingyueshijian: [
            { required: true, message: '订阅时间不能为空', trigger: 'blur' },
          ],
          guihaishijian: [
            { required: true, message: '归还时间不能为空', trigger: 'blur' },
          ],
          zhanghao: [
          ],
          xingming: [
          ],
          shoujihaoma: [
          ],
          yonghuyue: [
            { validator: this.$validate.isNumber, trigger: 'blur' },
          ],
          dingyuebeizhu: [
          ],
          xiadanshijian: [
          ],
          sfsh: [
          ],
          shhf: [
          ],
        },
		centerType: false,
      };
    },
    computed: {
		dingyueshizhang : {
			get: function () {
				let h = this.ruleForm
				let a = 'h.dingyueshijian-h.guihaishijian'
				let n = a.split('-')
				let hour = this.getHour(h[n[0].split('h.')[1]], h[n[1].split('h.')[1]])
				this.ruleForm.dingyueshizhang = hour?hour:0
				return hour?hour:0
			}
			
		},


        yue:{
            get: function () {
                return 1*this.ruleForm.dingyueshizhang*this.ruleForm.feiyong
            }
        },

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
      this.ruleForm.xiadanshijian = this.getCurDateTime()
    },
    methods: {
		// 获取时间间隔 单位小时
		getHour(first, last){
			let date1 = new Date(first)
			let date2 = new Date(last)
			let a = date1.getTime();
			let b = date2.getTime();
			var count = 0;
			for (var i = a; i < b; i += 3600 * 1000) {
				count++;
			}
			return count;
		},
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
            if(o=='dingyuebianhao'){
              this.ruleForm.dingyuebianhao = obj[o];
              this.ro.dingyuebianhao = true;
              continue;
            }
            if(o=='changdimingcheng'){
              this.ruleForm.changdimingcheng = obj[o];
              this.ro.changdimingcheng = true;
              continue;
            }
            if(o=='changditupian'){
              this.ruleForm.changditupian = obj[o].split(",")[0];
              this.ro.changditupian = true;
              continue;
            }
            if(o=='changdifenlei'){
              this.ruleForm.changdifenlei = obj[o];
              this.ro.changdifenlei = true;
              continue;
            }
            if(o=='changdiweizhi'){
              this.ruleForm.changdiweizhi = obj[o];
              this.ro.changdiweizhi = true;
              continue;
            }
            if(o=='dingyueshizhang'){
              this.ruleForm.dingyueshizhang = obj[o];
              this.ro.dingyueshizhang = true;
              continue;
            }
            if(o=='feiyong'){
              this.ruleForm.feiyong = obj[o];
              this.ro.feiyong = true;
              continue;
            }
            if(o=='yue'){
              this.ruleForm.yue = obj[o];
              this.ro.yue = true;
              continue;
            }
            if(o=='dingyueshijian'){
              this.ruleForm.dingyueshijian = obj[o];
              this.ro.dingyueshijian = true;
              continue;
            }
            if(o=='guihaishijian'){
              this.ruleForm.guihaishijian = obj[o];
              this.ro.guihaishijian = true;
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
            if(o=='shoujihaoma'){
              this.ruleForm.shoujihaoma = obj[o];
              this.ro.shoujihaoma = true;
              continue;
            }
            if(o=='yonghuyue'){
              this.ruleForm.yonghuyue = obj[o];
              this.ro.yonghuyue = true;
              continue;
            }
            if(o=='dingyuebeizhu'){
              this.ruleForm.dingyuebeizhu = obj[o];
              this.ro.dingyuebeizhu = true;
              continue;
            }
            if(o=='xiadanshijian'){
              this.ruleForm.xiadanshijian = obj[o];
              this.ro.xiadanshijian = true;
              continue;
            }
          }
        }else if(type=='edit'){
			this.info()
		}
        // 获取用户信息
        this.$http.get(this.userTableName + '/session', {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            var json = res.data.data;
            this.uObject = res.data.data;
            if((json.zhanghao!=''&&json.zhanghao) || json.zhanghao==0){
                this.ruleForm.zhanghao = json.zhanghao
            }
            if((json.xingming!=''&&json.xingming) || json.xingming==0){
                this.ruleForm.xingming = json.xingming
            }
            if((json.shoujihaoma!=''&&json.shoujihaoma) || json.shoujihaoma==0){
                this.ruleForm.shoujihaoma = json.shoujihaoma
            }
            if((json.yue!=''&&json.yue) || json.yue==0){
                this.ruleForm.yonghuyue = json.yue
            }
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
        this.$http.get(`dingyuexinxi/detail/${this.$route.query.id}`, {emulateJSON: true}).then(res => {
          if (res.data.code == 0) {
            this.ruleForm = res.data.data;
          }
        });
      },
      // 提交
      onSubmit() {

			if(this.ruleForm.dingyueshizhang==0){
				this.$message.error('订阅时长不能为空')
				return false
			}
			if(this.ruleForm.dingyuebianhao){
				this.ruleForm.dingyuebianhao = String(this.ruleForm.dingyuebianhao)
			}
			this.ruleForm.yue = this.yue
			if(this.ruleForm.yue>this.ruleForm.yonghuyue){
				this.$message.error("应付金额不能超过用户余额");
				return
			}
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
						this.$http.get('dingyuexinxi/list', {
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


								this.$http.post(`dingyuexinxi/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
									if (res.data.code == 0) {
										if(this.uObject.yue>=0){
											this.uObject.yue = parseFloat(this.uObject.yue) - parseFloat(this.ruleForm.yue)
											this.$http.post(this.userTableName+'/update', this.uObject).then(res => {});
											localStorage.setItem('sessionForm',JSON.stringify(this.uObject))
										}
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


						this.$http.post(`dingyuexinxi/${this.ruleForm.id?'update':this.centerType?'save':'add'}`, this.ruleForm).then(res => {
							if (res.data.code == 0) {
								if(this.uObject.yue>=0){
									this.uObject.yue = parseFloat(this.uObject.yue) - parseFloat(this.ruleForm.yue)
									this.$http.post(this.userTableName+'/update', this.uObject).then(res => {});
									localStorage.setItem('sessionForm',JSON.stringify(this.uObject))
								}
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
      changditupianUploadChange(fileUrls) {
          this.ruleForm.changditupian = fileUrls.replace(new RegExp(this.$config.baseUrl,"g"),"");;
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
