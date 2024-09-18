<template>
	<div class="main-content" :style='{"padding":"0px 30px 30px","fontSize":"14px","color":"#666","background":"none"}'>
		<!-- 列表页 -->
		<template v-if="showFlag">
			<el-form class="center-form-pv" :style='{"padding":"0px 0px 0","margin":"0px","overflow":"hidden","flexWrap":"wrap","background":"none","display":"flex","fontSize":"inherit","justifyContent":"flex-end"}' :inline="true" :model="searchForm">
				<el-row :style='{"padding":"0px","margin":"0 10px 20px","borderRadius":"0 0 8px 8px","textAlign":"right","background":"none","display":"block","width":"auto","fontSize":"inherit","order":"1"}' >
					<div :style='{"margin":"0 10px 0 0","fontSize":"inherit","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"inherit","display":"inline-block","lineHeight":"40px","fontSize":"inherit","fontWeight":"500","height":"40px"}' class="item-label">场地名称</label>
						<el-input v-model="searchForm.changdimingcheng" placeholder="场地名称" @keydown.enter.native="search()" clearable></el-input>
					</div>
					<div :style='{"margin":"0 10px 0 0","fontSize":"inherit","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"inherit","display":"inline-block","lineHeight":"40px","fontSize":"inherit","fontWeight":"500","height":"40px"}' class="item-label">场地分类</label>
						<el-input v-model="searchForm.changdifenlei" placeholder="场地分类" @keydown.enter.native="search()" clearable></el-input>
					</div>
					<div :style='{"margin":"0 10px 0 0","fontSize":"inherit","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"inherit","display":"inline-block","lineHeight":"40px","fontSize":"inherit","fontWeight":"500","height":"40px"}' class="item-label">场地位置</label>
						<el-input v-model="searchForm.changdiweizhi" placeholder="场地位置" @keydown.enter.native="search()" clearable></el-input>
					</div>
					<div :style='{"margin":"0 10px 0 0","fontSize":"inherit","display":"inline-block"}'>
						<label :style='{"margin":"0 10px 0 0","color":"inherit","display":"inline-block","lineHeight":"40px","fontSize":"inherit","fontWeight":"500","height":"40px"}' class="item-label">姓名</label>
						<el-input v-model="searchForm.xingming" placeholder="姓名" @keydown.enter.native="search()" clearable></el-input>
					</div>
					<div :style='{"margin":"0 10px 0 0","fontSize":"inherit","display":"inline-block"}' class="select">
						<label :style='{"margin":"0 10px 0 0","color":"inherit","display":"inline-block","lineHeight":"40px","fontSize":"inherit","fontWeight":"500","height":"40px"}' class="item-label">是否通过</label>
						<el-select clearable v-model="searchForm.sfsh" placeholder="是否通过">
							<el-option v-for="(item,index) in sfshOptions" v-bind:key="index" :label="item" :value="item"></el-option>
						</el-select>
					</div>
					<el-button class="search" type="success" @click="search()">
						<span class="icon iconfont icon-chakan14" :style='{"margin":"0 2px","fontSize":"inherit","color":"inherit","display":"none","height":"40px"}'></span>
						查找
					</el-button>
				</el-row>

				<el-row class="actions" :style='{"margin":"0px 0 20px","color":"#fff","flexWrap":"wrap","textAlign":"right","flexDirection":"row","display":"flex","width":"auto","fontSize":"inherit","justifyContent":"flex-end","order":"2"}'>
					<el-button class="add" v-if="isAuth('dingyuexinxi','新增')" type="success" @click="addOrUpdateHandler()">
						<span class="icon iconfont icon-tianjia17" :style='{"color":"inherit","margin":"0 2px","fontSize":"inherit"}'></span>
						添加
					</el-button>
					<el-button class="del" v-if="isAuth('dingyuexinxi','删除')" :disabled="dataListSelections.length?false:true" type="danger" @click="deleteHandler()">
						<span class="icon iconfont icon-shanchu8" :style='{"margin":"0 2px","fontSize":"inherit","color":"inherit","height":"40px"}'></span>
						删除
					</el-button>


					<el-button class="btn18" v-if="isAuth('dingyuexinxi','审核')" :disabled="dataListSelections.length?false:true" type="success" @click="shBatchDialog()">
						<span class="icon iconfont icon-shenhe2" :style='{"color":"inherit","margin":"0 2px","fontSize":"inherit"}'></span>
						审核
					</el-button>

					<el-button class="btn18" v-if="isAuth('dingyuexinxi','时长统计')" type="success" @click="chartDialog1()">
						<span class="icon iconfont icon-a-fenxiang2" :style='{"color":"inherit","margin":"0 2px","fontSize":"inherit"}'></span>
						时长统计
					</el-button>
				</el-row>
			</el-form>
			<div :style='{"border":"0px solid #eee","width":"100%","padding":"0","margin":"0px 0 0","borderRadius":"20px","background":"rgba(255,255,255,1)"}'>
				<el-table class="tables"
					:stripe='false'
					:style='{"padding":"0","borderColor":"#edf7ff","color":"inherit","borderRadius":"20px","borderWidth":"0px 0px 0 0px","background":"none","width":"100%","fontSize":"inherit","borderStyle":"solid"}' 
					:border='true'
					v-if="isAuth('dingyuexinxi','查看')"
					:data="dataList"
					v-loading="dataListLoading"
				@selection-change="selectionChangeHandler">
					<el-table-column :resizable='true' type="selection" align="center" width="50"></el-table-column>
					<el-table-column :resizable='true' :sortable='true' label="序号" type="index" width="50" />
					<el-table-column :resizable='true' :sortable='true'  
						prop="dingyuebianhao"
						label="订阅编号">
						<template slot-scope="scope">
							{{scope.row.dingyuebianhao}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="changdimingcheng"
						label="场地名称">
						<template slot-scope="scope">
							{{scope.row.changdimingcheng}}
						</template>
					</el-table-column>
					<!-- 无 -->
					<el-table-column :resizable='true' :sortable='true' prop="changditupian" width="200" label="场地图片">
						<template slot-scope="scope">
							<div v-if="scope.row.changditupian">
								<img v-if="scope.row.changditupian.substring(0,4)=='http'" :src="scope.row.changditupian.split(',')[0]" width="100" height="100">
								<img v-else :src="$base.url+scope.row.changditupian.split(',')[0]" width="100" height="100">
							</div>
							<div v-else>无图片</div>
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="changdifenlei"
						label="场地分类">
						<template slot-scope="scope">
							{{scope.row.changdifenlei}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="changdiweizhi"
						label="场地位置">
						<template slot-scope="scope">
							{{scope.row.changdiweizhi}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="dingyueshizhang"
						label="订阅时长">
						<template slot-scope="scope">
							{{scope.row.dingyueshizhang}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="feiyong"
						label="费用">
						<template slot-scope="scope">
							{{scope.row.feiyong}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="yue"
						label="应付金额">
						<template slot-scope="scope">
							{{scope.row.yue}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="dingyueshijian"
						label="订阅时间">
						<template slot-scope="scope">
							{{scope.row.dingyueshijian}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="guihaishijian"
						label="归还时间">
						<template slot-scope="scope">
							{{scope.row.guihaishijian}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="zhanghao"
						label="账号">
						<template slot-scope="scope">
							{{scope.row.zhanghao}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="xingming"
						label="姓名">
						<template slot-scope="scope">
							{{scope.row.xingming}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="shoujihaoma"
						label="手机号码">
						<template slot-scope="scope">
							{{scope.row.shoujihaoma}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="yonghuyue"
						label="用户余额">
						<template slot-scope="scope">
							{{scope.row.yonghuyue}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="dingyuebeizhu"
						label="订阅备注">
						<template slot-scope="scope">
							{{scope.row.dingyuebeizhu}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true'  
						prop="xiadanshijian"
						label="下单时间">
						<template slot-scope="scope">
							{{scope.row.xiadanshijian}}
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true' prop="shhf" label="审核回复" show-overflow-tooltip>
						<template slot-scope="scope">
							<div style="white-space: nowrap;">{{scope.row.shhf}}</div>
						</template>
					</el-table-column>
					<el-table-column :resizable='true' :sortable='true' prop="sfsh" label="审核状态">
						<template slot-scope="scope">
							<el-tag v-if="scope.row.sfsh=='否'" type="danger">未通过</el-tag>
							<el-tag v-if="scope.row.sfsh=='待审核'" type="warning">待审核</el-tag>
							<el-tag v-if="scope.row.sfsh=='是'" type="success">通过</el-tag>
						</template>
					</el-table-column>
					
					<el-table-column width="300" label="操作">
						<template slot-scope="scope">
							<el-button class="view" v-if=" isAuth('dingyuexinxi','查看')" type="success" @click="addOrUpdateHandler(scope.row.id,'info')">
								<span class="icon iconfont icon-chakan2" :style='{"margin":"0 2px","fontSize":"inherit","color":"inherit","display":"none","height":"40px"}'></span>
								查看
							</el-button>
							<el-button class="edit" v-if=" isAuth('dingyuexinxi','修改')  && scope.row.sfsh=='待审核' " type="success" @click="addOrUpdateHandler(scope.row.id)">
								<span class="icon iconfont icon-xiugai10" :style='{"margin":"0 2px","fontSize":"inherit","color":"inherit","display":"none","height":"40px"}'></span>
								修改
							</el-button>




							<el-button class="del" v-if="isAuth('dingyuexinxi','删除') " type="primary" @click="deleteHandler(scope.row.id )">
								<span class="icon iconfont icon-guanbi1" :style='{"margin":"0 2px","fontSize":"inherit","color":"inherit","display":"none","height":"40px"}'></span>
								删除
							</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<el-pagination
				@size-change="sizeChangeHandle"
				@current-change="currentChangeHandle"
				:current-page="pageIndex"
				background
				:page-sizes="[10, 20, 30, 50]"
				:page-size="pageSize"
				:layout="layouts.join()"
				:total="totalPage"
				prev-text="上一页 "
				next-text="下一页 "
				:hide-on-single-page="false"
				:style='{"padding":"0","margin":"20px 0 0","whiteSpace":"nowrap","color":"inherit","textAlign":"left","width":"100%","fontSize":"inherit","fontWeight":"500"}'
			></el-pagination>
		</template>
		
		<!-- 添加/修改页面  将父组件的search方法传递给子组件-->
		<add-or-update v-if="addOrUpdateFlag" :parent="this" ref="addOrUpdate"></add-or-update>


		
		<el-dialog :title="this.batchIds.length>1?'批量审核':'审核'" :visible.sync="sfshBatchVisiable" width="50%">
			<el-form ref="form" :model="form" label-width="80px">
				<el-form-item label="审核状态">
					<el-select v-model="shBatchForm.sfsh" placeholder="审核状态">
						<el-option label="通过" value="是"></el-option>
						<el-option label="不通过" value="否"></el-option>
						<el-option label="待审核" value="待审核"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="内容">
					<el-input type="textarea" :rows="8" v-model="shBatchForm.shhf"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="sfshBatchVisiable=false">取 消</el-button>
				<el-button type="primary" @click="shBatchHandler">确 定</el-button>
			</span>
		</el-dialog>



		<el-dialog
		  :visible.sync="chartVisiable1"
		  width="800">
			<div id="dingyueshizhangChart1" style="width:100%;height:600px;"></div>
		  <span slot="footer" class="dialog-footer">
			<el-button @click="chartDialog1">返回</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
import * as echarts from 'echarts'
import chinaJson from "@/components/echarts/china.json";
import axios from 'axios'
import AddOrUpdate from "./add-or-update";
	export default {
		data() {
			return {
				searchForm: {
					key: ""
				},
				form:{},
				sfshOptions: [],
				dataList: [],
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
				dataListSelections: [],
				showFlag: true,
				sfshVisiable: false,
				shForm: {},
				sfshBatchVisiable: false,
				shBatchForm: {
					sfsh:'',
					shhf:''
				},
				batchIds:[], 
				chartVisiable: false,
				chartVisiable1: false,
				chartVisiable2: false,
				chartVisiable3: false,
				chartVisiable4: false,
				chartVisiable5: false,
				addOrUpdateFlag:false,
				layouts: ["prev","pager","next","jumper"],
			};
		},
		created() {
			this.init();
			this.getDataList();
			this.contentStyleChange()
		},
		mounted() {
		},
		filters: {
			htmlfilter: function (val) {
				return val.replace(/<[^>]*>/g).replace(/undefined/g,'');
			}
		},
		computed: {
			tablename(){
				return this.$storage.get('sessionTable')
			},
		},
		components: {
			AddOrUpdate,
		},
		methods: {
			contentStyleChange() {
				this.contentPageStyleChange()
			},
			// 分页
			contentPageStyleChange(){
				let arr = []

				// if(this.contents.pageTotal) arr.push('total')
				// if(this.contents.pageSizes) arr.push('sizes')
				// if(this.contents.pagePrevNext){
				//   arr.push('prev')
				//   if(this.contents.pagePager) arr.push('pager')
				//   arr.push('next')
				// }
				// if(this.contents.pageJumper) arr.push('jumper')
				// this.layouts = arr.join()
				// this.contents.pageEachNum = 10
			},


//统计接口
    chartDialog1() {
      this.chartVisiable1 = !this.chartVisiable1;
      this.$nextTick(()=>{
        var dingyueshizhangChart1 = echarts.init(document.getElementById("dingyueshizhangChart1"),'fresh-cut');
        this.$http({
            url: `dingyuexinxi/value/changdimingcheng/dingyueshizhang`,
            method: "get",
        }).then(({ data }) => {
            if (data && data.code === 0) {
                let res = data.data;
                let xAxis = [];
                let yAxis = [];
                let pArray = []
                for(let i=0;i<res.length;i++){
                    xAxis.push(res[i].changdimingcheng);
                    yAxis.push(parseFloat((res[i].total)));
                    pArray.push({
                        value: parseFloat((res[i].total)),
                        name: res[i].changdimingcheng
                    })
                }
                var option = {};
                option = {
                    title: {
                        text: '时长统计',
                        left: 'center'
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: '{b} : {c}'
                    },
                    xAxis: {
                        type: 'category',
                        data: xAxis,
                        axisLabel : {
                            rotate:40
                        }
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: yAxis,
                        type: 'bar'
                    }]
                };
                // 使用刚指定的配置项和数据显示图表。
                dingyueshizhangChart1.setOption(option);
                  //根据窗口的大小变动图表
                window.onresize = function() {
                    dingyueshizhangChart1.resize();
                };
            }
        });
      })
    },




    init () {
        this.sfshOptions = "是,否,待审核".split(',');
    },
    search() {
      this.pageIndex = 1;
      this.getDataList();
    },

    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      let params = {
        page: this.pageIndex,
        limit: this.pageSize,
        sort: 'id',
        order: 'desc',
      }
           if(this.searchForm.changdimingcheng!='' && this.searchForm.changdimingcheng!=undefined){
            params['changdimingcheng'] = '%' + this.searchForm.changdimingcheng + '%'
          }
           if(this.searchForm.changdifenlei!='' && this.searchForm.changdifenlei!=undefined){
            params['changdifenlei'] = '%' + this.searchForm.changdifenlei + '%'
          }
           if(this.searchForm.changdiweizhi!='' && this.searchForm.changdiweizhi!=undefined){
            params['changdiweizhi'] = '%' + this.searchForm.changdiweizhi + '%'
          }
           if(this.searchForm.xingming!='' && this.searchForm.xingming!=undefined){
            params['xingming'] = '%' + this.searchForm.xingming + '%'
          }
			if(this.searchForm.sfsh!='' && this.searchForm.sfsh!=undefined){
				params['sfsh'] = this.searchForm.sfsh
			}
			this.$http({
				url: "dingyuexinxi/page",
				method: "get",
				params: params
			}).then(({ data }) => {
				if (data && data.code === 0) {
					this.dataList = data.data.list;
					this.totalPage = data.data.total;
				} else {
					this.dataList = [];
					this.totalPage = 0;
				}
				this.dataListLoading = false;
			});
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    // 多选
    selectionChangeHandler(val) {
      this.dataListSelections = val;
    },
    // 添加/修改
    addOrUpdateHandler(id,type) {
      this.showFlag = false;
      this.addOrUpdateFlag = true;
      this.crossAddOrUpdateFlag = false;
      if(type!='info'){
        type = 'else';
      }
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id,type);
      });
    },
    //批量审核窗口
    shBatchDialog(){
		for(let x in this.dataListSelections){
			if(this.dataListSelections[x].sfsh&&this.dataListSelections[x].sfsh!='待审核'){
				this.$message.error('存在已审核数据，不能批量审核');
				this.batchIds = []
				return false
			}
			this.batchIds.push(this.dataListSelections[x].id)
		}
		this.sfshBatchVisiable = true
      
    },
    //批量审核
    shBatchHandler(){
      this.$confirm(`是否${this.batchIds.length>1?'一键审核':'审核'}选中数据?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "dingyuexinxi/shBatch?sfsh="+this.shBatchForm.sfsh+"&shhf="+this.shBatchForm.shhf,
          method: "post",
          data: this.batchIds
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.getDataList();
                this.sfshBatchVisiable = false
				this.batchIds = []
              }
            });
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },
    // 下载
    download(file){
      let arr = file.replace(new RegExp('upload/', "g"), "")
      axios.get(this.$base.url + 'file/download?fileName=' + arr, {
      	headers: {
      		token: this.$storage.get('Token')
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
		  axios.get((location.href.split(this.$base.name).length>1 ? location.href.split(this.$base.name)[0] :'') + this.$base.name + '/file/download?fileName=' + arr, {
		  	headers: {
		  		token: this.$storage.get('Token')
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
	// 预览
	preClick(file){
		if(!file){
			return false
		}
		window.open((location.href.split(this.$base.name).length>1 ? location.href.split(this.$base.name)[0] :'') + this.$base.name + '/' + file)
	},
	dingyuexinxistatusChange(e,row){
		if(row.status==0){
			row.passwordwrongnum = 0
		}
		this.$http({
			url:'dingyuexinxi/update',
			method:'post',
			data:row
		}).then(res=>{
			if(row.status==1){
				this.$message.error('该用户已锁定')
			}else{
				this.$message.success('该用户已解除锁定')
			}
		})
	},
    // 删除
    deleteHandler(id ) {
      var ids = id
        ? [Number(id)]
        : this.dataListSelections.map(item => {
            return Number(item.id);
          });
      this.$confirm(`确定进行[${id ? "删除" : "批量删除"}]操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: "dingyuexinxi/delete",
          method: "post",
          data: ids
        }).then(({ data }) => {
          if (data && data.code === 0) {
			this.$message({
			  message: "操作成功",
			  type: "success",
			  duration: 1500,
			  onClose: () => {
			    this.search();
			  }
			});
            
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },


  }

};
</script>
<style lang="scss" scoped>
	
	.center-form-pv {
	  .el-date-editor.el-input {
	    width: auto;
	  }
	}
	
	.el-input {
	  width: auto;
	}
	
	// form
	.center-form-pv .el-input /deep/ .el-input__inner {
				border: 1px solid #d8d8d8;
				border-radius: 30px;
				padding: 0 12px;
				color: inherit;
				background: #fff;
				width: 170px;
				font-size: inherit;
				height: 38px;
			}
	
	.center-form-pv .el-select /deep/ .el-input__inner {
				border: 1px solid #d8d8d8;
				border-radius: 30px;
				padding: 0 10px;
				color: inherit;
				background: #fff;
				width: 170px;
				font-size: inherit;
				height: 38px;
			}
	
	.center-form-pv .el-date-editor /deep/ .el-input__inner {
				border: 1px solid #d8d8d8;
				border-radius: 30px;
				padding: 0 10px 0 30px;
				color: inherit;
				background: #fff;
				width: 170px;
				font-size: inherit;
				height: 38px;
			}
	
	.center-form-pv .search {
				border: 0;
				cursor: pointer;
				border-radius: 30px;
				padding: 0 20px;
				outline: none;
				color: #fff;
				background: #ffc054;
				width: auto;
				font-size: inherit;
				transition: all 0.3s;
				height: 38px;
			}
	
	.center-form-pv .search:hover {
				transform: scale(0.9);
				opacity: 1;
			}
	
	.center-form-pv .actions .add {
				border: 0px solid rgba(126, 96, 16, .2);
				cursor: pointer;
				border-radius: 30px;
				padding: 0 16px 0 10px;
				margin: 4px 4px 5px 0;
				outline: none;
				color: inherit;
				background: #ffce6b;
				width: auto;
				font-size: inherit;
				height: 32px;
			}
	
	.center-form-pv .actions .add:hover {
				transform: scale(0.9);
				opacity: 1;
			}
	
	.center-form-pv .actions .del {
				border: 0px solid rgba(126, 96, 16, .2);
				cursor: pointer;
				border-radius: 30px;
				padding: 0 16px 0 10px;
				margin: 4px 4px 5px;
				outline: none;
				color: inherit;
				background: #ff6b6b;
				width: auto;
				font-size: inherit;
				height: 32px;
			}
	
	.center-form-pv .actions .del:hover {
				transform: scale(0.9);
				opacity: 1;
			}
	
	.center-form-pv .actions .statis {
				border: 0px solid rgba(126, 96, 16, .2);
				cursor: pointer;
				border-radius: 30px;
				padding: 0 16px 0 10px;
				margin: 4px 4px 5px;
				outline: none;
				color: inherit;
				background: #9c6bff;
				width: auto;
				font-size: inherit;
				height: 32px;
			}
	
	.center-form-pv .actions .statis:hover {
				transform: scale(0.9);
				opacity: 1;
			}
	
	.center-form-pv .actions .btn18 {
				border: 0px solid rgba(126, 96, 16, .2);
				cursor: pointer;
				border-radius: 30px;
				padding: 0 16px 0 10px;
				margin: 4px 4px 5px;
				outline: none;
				color: #333;
				background: #fff;
				width: auto;
				font-size: inherit;
				height: 32px;
			}
	
	.center-form-pv .actions .btn18:hover {
				transform: scale(0.9);
				opacity: 1;
			}
	
	// table
	.el-table /deep/ .el-table__header-wrapper thead {
				color: inherit;
				background: #fff;
				width: 100%;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr {
				background: none;
			}
	
	.el-table /deep/ .el-table__header-wrapper thead tr th {
				padding: 12px 0;
				background: none;
				border-color: #f0f1f5;
				border-width: 0 0px 2px 0;
				border-style: solid;
				text-align: left;
			}

	.el-table /deep/ .el-table__header-wrapper thead tr th .cell {
				padding: 0 10px;
				word-wrap: normal;
				word-break: break-all;
				white-space: normal;
				font-weight: 600;
				display: inline-block;
				vertical-align: middle;
				width: 100%;
				line-height: 24px;
				position: relative;
				text-overflow: ellipsis;
			}

	
	.el-table /deep/ .el-table__body-wrapper tbody {
				padding: 0;
				width: 100%;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr {
				background: none;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 2px 0;
				color: inherit;
				background: #f9f9f9;
				font-size: inherit;
				border-color: #f0f1f5;
				border-width: 0 0px 2px 0px;
				border-style: solid;
				text-align: left;
			}
	
		
	.el-table /deep/ .el-table__body-wrapper tbody tr:hover td {
				padding: 2px 0;
				color: #000;
				background: #f9f9f9;
				border-color: #f0f1f5;
				border-width: 0 0px 2px 0px;
				border-style: solid;
				text-align: left;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td {
				padding: 2px 0;
				color: inherit;
				background: #f9f9f9;
				font-size: inherit;
				border-color: #f0f1f5;
				border-width: 0 0px 2px 0px;
				border-style: solid;
				text-align: left;
			}

	.el-table /deep/ .el-table__body-wrapper tbody tr td .cell {
				padding: 0 10px;
				overflow: hidden;
				color: inherit;
				word-break: break-all;
				white-space: normal;
				line-height: 24px;
				text-overflow: ellipsis;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .view {
				border: 0px solid rgba(126, 96, 16, .2);
				cursor: pointer;
				border-radius: 0px;
				padding: 0 12px 0 6px;
				margin: 0 10px 5px 0;
				outline: none;
				color: #ffc054;
				background: none;
				width: auto;
				font-size: 14px;
				height: 32px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .view:hover {
				transform: scale(1.3);
				opacity: 0.8;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .add {
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .add:hover {
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .edit {
				border: 0px solid #36ab80;
				cursor: pointer;
				border-radius: 0px;
				padding: 0 12px 0 6px;
				margin: 0 10px 5px 0;
				outline: none;
				color: #4bd054;
				background: none;
				width: auto;
				font-size: 14px;
				height: 32px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .edit:hover {
				transform: scale(1.3);
				opacity: 0.8;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .del {
				border: 0px solid #ab3636;
				cursor: pointer;
				border-radius: 0px;
				padding: 0 12px 0 6px;
				margin: 0 10px 5px 0;
				outline: none;
				color: #5606f1;
				background: none;
				width: auto;
				font-size: 14px;
				height: 32px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .del:hover {
				transform: scale(1.3);
				opacity: 0.8;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .btn8 {
				border: 0px solid #3696ab;
				cursor: pointer;
				border-radius: 0px;
				padding: 0 12px 0 6px;
				margin: 0 10px 5px 0;
				outline: none;
				color: #333;
				background: none;
				width: auto;
				font-size: 14px;
				height: 32px;
			}
	
	.el-table /deep/ .el-table__body-wrapper tbody tr td .btn8:hover {
				transform: scale(1.3);
				opacity: 0.8;
			}
	
	// pagination
	.main-content .el-pagination /deep/ .el-pagination__total {
				margin: 0 10px 0 0;
				color: inherit;
				font-weight: 400;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev {
				border: none;
				border-radius: 20px;
				padding: 0 5px;
				margin: 0 5px;
				color: inherit;
				background: #fff;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 24px;
				min-width: 35px;
				height: 24px;
			}
	
	.main-content .el-pagination /deep/ .btn-next {
				border: none;
				border-radius: 20px;
				padding: 0 5px;
				margin: 0 5px;
				color: inherit;
				background: #fff;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 24px;
				min-width: 35px;
				height: 24px;
			}
	
	.main-content .el-pagination /deep/ .btn-prev:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 20px;
				padding: 0 5px;
				margin: 0 5px;
				color: #999;
				background: #fff;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 24px;
				height: 24px;
			}
	
	.main-content .el-pagination /deep/ .btn-next:disabled {
				border: none;
				cursor: not-allowed;
				border-radius: 20px;
				padding: 0 5px;
				margin: 0 5px;
				color: #999;
				background: #fff;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 24px;
				height: 24px;
			}

	.main-content .el-pagination /deep/ .el-pager {
				padding: 0;
				margin: 0;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
			}

	.main-content .el-pagination /deep/ .el-pager .number {
				cursor: pointer;
				border-radius: 20px;
				padding: 0 4px;
				margin: 0 5px;
				color: inherit;
				background: #fff;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 24px;
				text-align: center;
				height: 24px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number:hover {
				cursor: pointer;
				padding: 0 4px;
				margin: 0 5px;
				color: #fff;
				background: #ffc054;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 24px;
				text-align: center;
				height: 24px;
			}
	
	.main-content .el-pagination /deep/ .el-pager .number.active {
				cursor: default;
				border-radius: 20px;
				padding: 0 4px;
				margin: 0 5px;
				color: #fff;
				background: #ffc054;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 24px;
				text-align: center;
				height: 24px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes {
				color: inherit;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input {
				margin: 0 5px;
				color: inherit;
				width: 100px;
				font-size: inherit;
				position: relative;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
				border: 0px solid #ddd;
				cursor: pointer;
				padding: 0 25px 0 8px;
				color: inherit;
				display: inline-block;
				font-size: inherit;
				line-height: 28px;
				border-radius: 3px;
				outline: 0;
				background: none;
				width: 100%;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
				top: 0;
				position: absolute;
				right: 0;
				height: 100%;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
				cursor: pointer;
				color: #C0C4CC;
				width: 25px;
				font-size: 14px;
				line-height: 28px;
				text-align: center;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump {
				margin: 0 0 0 24px;
				color: inherit;
				display: inline-block;
				vertical-align: top;
				font-size: inherit;
				line-height: 28px;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input {
				border-radius: 3px;
				padding: 0 2px;
				margin: 0 2px;
				color: inherit;
				display: inline-block;
				width: 50px;
				font-size: inherit;
				line-height: 18px;
				position: relative;
				text-align: center;
				height: 28px;
			}
	
	.main-content .el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
				border: 1px solid #eee;
				cursor: pointer;
				padding: 0 0px;
				color: inherit;
				display: inline-block;
				font-size: inherit;
				line-height: 24px;
				border-radius: 20px;
				outline: 0;
				background: #fff;
				width: auto;
				text-align: center;
				height: 24px;
			}
	
	// list one
	.one .list1-view {
				border: 0px solid rgba(126, 96, 16, .2);
				cursor: pointer;
				border-radius: 0px;
				padding: 0 6px 0 4px;
				margin: 0px 5px 5px 0;
				outline: none;
				color: #ffc144;
				background: none;
				width: auto;
				font-size: inherit;
				height: 32px;
			}
	
	.one .list1-view:hover {
				transform: scale(1.3);
				opacity: 0.8;
			}
	
	.one .list1-edit {
				border: 0px solid rgba(254, 148, 34, .2);
				cursor: pointer;
				border-radius: 0px;
				padding: 0 6px 0 4px;
				margin: 0px 5px 5px 0;
				outline: none;
				color: #50d159;
				background: none;
				width: auto;
				font-size: inherit;
				height: 32px;
			}
	
	.one .list1-edit:hover {
				transform: scale(1.3);
				opacity: 0.8;
			}
	
	.one .list1-del {
				border: 0px solid rgba(180, 52, 31, .2);
				cursor: pointer;
				border-radius: 0px;
				padding: 0 6px 0 4px;
				margin: 0px 5px 5px 0;
				outline: none;
				color: #7c3ef3;
				background: none;
				width: auto;
				font-size: inherit;
				height: 32px;
			}
	
	.one .list1-del:hover {
				transform: scale(1.3);
				opacity: 0.8;
			}
	
	.one .list1-btn8 {
				border: 0px solid rgba(31, 160, 180, .2);
				cursor: pointer;
				border-radius: 0px;
				padding: 0 6px 0 4px;
				margin: 0px 5px 5px 0;
				outline: none;
				color: #333;
				background: none;
				width: auto;
				font-size: inherit;
				height: 32px;
			}
	
	.one .list1-btn8:hover {
				transform: scale(1.3);
				opacity: 0.8;
			}
	
	.main-content .el-table .el-switch {
				display: inline-flex;
				vertical-align: middle;
				line-height: 30px;
				position: relative;
				align-items: center;
				height: 30px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__label--left {
				cursor: pointer;
				margin: 0 10px 0 0;
				color: #333;
				font-weight: 500;
				display: inline-block;
				vertical-align: middle;
				font-size: 16px;
				transition: .2s;
				height: 30px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__label--right {
				cursor: pointer;
				margin: 0 0 0 10px;
				color: #333;
				font-weight: 500;
				display: inline-block;
				vertical-align: middle;
				font-size: 16px;
				transition: .2s;
				height: 30px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__core {
				border: 1px solid #8a8a8a;
				cursor: pointer;
				border-radius: 15px;
				margin: 0;
				outline: 0;
				background: #8a8a8a;
				display: inline-block;
				width: 40px;
				box-sizing: border-box;
				transition: border-color .3s,background-color .3s;
				height: 20px;
			}
	.main-content .el-table .el-switch /deep/ .el-switch__core::after {
				border-radius: 100%;
				top: 1px;
				left: 1px;
				background: #FFF;
				width: 16px;
				position: absolute;
				transition: all .3s;
				height: 16px;
			}
	.main-content .el-table .el-switch.is-checked /deep/ .el-switch__core::after {
				margin: 0 0 0 -17px;
				left: 100%;
			}
	
	.main-content .el-table .el-rate /deep/ .el-rate__item {
				cursor: pointer;
				display: inline-block;
				vertical-align: middle;
				font-size: 0;
				position: relative;
			}
	.main-content .el-table .el-rate /deep/ .el-rate__item .el-rate__icon {
				margin: 0 3px;
				color: #666;
				display: inline-block;
				font-size: 18px;
				position: relative;
				transition: .3s;
			}
</style>
