import { version } from '../../package.json'
import { Router } from 'express'
import { Sequelize, Op,literal, QueryTypes } from 'sequelize'
import sequelize from '../models/sequelize'
import toRes from '../lib/toRes'
import ChangdixinxiModel from '../models/ChangdixinxiModel'
import util from '../lib/util'
import StoreupModel from '../models/StoreupModel'
import jwt from 'jsonwebtoken'
import moment from 'moment'
import ConfigModel from '../models/ConfigModel'
import https from 'https'
import request from 'request'
import qs from 'querystring'
import path from 'path'
import fs from 'fs'
import config from '../config.json'
const redis = require('redis')




export default ({ config, db }) => {
	let api = Router()


	// 分页接口（后端）
	api.get('/page', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}
			let changdimingcheng = req.query.changdimingcheng
			if (changdimingcheng) {

				if (changdimingcheng.indexOf('%') != -1) {
					where.changdimingcheng = {
						[Op.like]: changdimingcheng
					}
				} else {
					where.changdimingcheng = {
						[Op.eq]: changdimingcheng
					}
				}
			}
			let changdifenlei = req.query.changdifenlei
			if (changdifenlei) {

				if (changdifenlei.indexOf('%') != -1) {
					where.changdifenlei = {
						[Op.like]: changdifenlei
					}
				} else {
					where.changdifenlei = {
						[Op.eq]: changdifenlei
					}
				}
			}
			let changditupian = req.query.changditupian
			if (changditupian) {

				if (changditupian.indexOf('%') != -1) {
					where.changditupian = {
						[Op.like]: changditupian
					}
				} else {
					where.changditupian = {
						[Op.eq]: changditupian
					}
				}
			}
			let changdiweizhi = req.query.changdiweizhi
			if (changdiweizhi) {

				if (changdiweizhi.indexOf('%') != -1) {
					where.changdiweizhi = {
						[Op.like]: changdiweizhi
					}
				} else {
					where.changdiweizhi = {
						[Op.eq]: changdiweizhi
					}
				}
			}
			let changdizhuangtai = req.query.changdizhuangtai
			if (changdizhuangtai) {

				if (changdizhuangtai.indexOf('%') != -1) {
					where.changdizhuangtai = {
						[Op.like]: changdizhuangtai
					}
				} else {
					where.changdizhuangtai = {
						[Op.eq]: changdizhuangtai
					}
				}
			}
			let feiyong = req.query.feiyong
			if (feiyong) {

				if (feiyong.indexOf('%') != -1) {
					where.feiyong = {
						[Op.like]: feiyong
					}
				} else {
					where.feiyong = {
						[Op.eq]: feiyong
					}
				}
			}
			let changdisheshi = req.query.changdisheshi
			if (changdisheshi) {

				if (changdisheshi.indexOf('%') != -1) {
					where.changdisheshi = {
						[Op.like]: changdisheshi
					}
				} else {
					where.changdisheshi = {
						[Op.eq]: changdisheshi
					}
				}
			}
			let changdixiangqing = req.query.changdixiangqing
			if (changdixiangqing) {

				if (changdixiangqing.indexOf('%') != -1) {
					where.changdixiangqing = {
						[Op.like]: changdixiangqing
					}
				} else {
					where.changdixiangqing = {
						[Op.eq]: changdixiangqing
					}
				}
			}
			let faburiqi = req.query.faburiqi
			if (faburiqi) {

				if (faburiqi.indexOf('%') != -1) {
					where.faburiqi = {
						[Op.like]: faburiqi
					}
				} else {
					where.faburiqi = {
						[Op.eq]: faburiqi
					}
				}
			}
			let thumbsupnum = req.query.thumbsupnum
			if (thumbsupnum) {

				if (thumbsupnum.indexOf('%') != -1) {
					where.thumbsupnum = {
						[Op.like]: thumbsupnum
					}
				} else {
					where.thumbsupnum = {
						[Op.eq]: thumbsupnum
					}
				}
			}
			let crazilynum = req.query.crazilynum
			if (crazilynum) {

				if (crazilynum.indexOf('%') != -1) {
					where.crazilynum = {
						[Op.like]: crazilynum
					}
				} else {
					where.crazilynum = {
						[Op.eq]: crazilynum
					}
				}
			}
			let clicktime = req.query.clicktime
			if (clicktime) {

				if (clicktime.indexOf('%') != -1) {
					where.clicktime = {
						[Op.like]: clicktime
					}
				} else {
					where.clicktime = {
						[Op.eq]: clicktime
					}
				}
			}
			let clicknum = req.query.clicknum
			if (clicknum) {

				if (clicknum.indexOf('%') != -1) {
					where.clicknum = {
						[Op.like]: clicknum
					}
				} else {
					where.clicknum = {
						[Op.eq]: clicknum
					}
				}
			}
			let storeupnum = req.query.storeupnum
			if (storeupnum) {

				if (storeupnum.indexOf('%') != -1) {
					where.storeupnum = {
						[Op.like]: storeupnum
					}
				} else {
					where.storeupnum = {
						[Op.eq]: storeupnum
					}
				}
			}

			let orders =[]
			const sortList = sort.split(",")
			const orderList = order.split(",")
			sortList.forEach((item, index) => {
				orders.push([item,orderList[index]])
			  });
			let result = await ChangdixinxiModel.findAndCountAll({
				order: [orders],
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {
			res.status(500).render(err)
			//toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	  // 分页接口（前端）
	api.get('/lists', async (req, res) => {

		try {
			let result = await ChangdixinxiModel.findAll()
			toRes.record(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 401, '您的权限不够！', '', 200)
		}
	})

    // 分页接口（前端）
	api.get('/list', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}
			let changdimingcheng = req.query.changdimingcheng
			if (changdimingcheng) {

				if (changdimingcheng.indexOf('%') != -1) {
					where.changdimingcheng = {
						[Op.like]: changdimingcheng
					}
				} else {
					where.changdimingcheng = {
						[Op.eq]: changdimingcheng
					}
				}
			}
			let changdifenlei = req.query.changdifenlei
			if (changdifenlei) {

				if (changdifenlei.indexOf('%') != -1) {
					where.changdifenlei = {
						[Op.like]: changdifenlei
					}
				} else {
					where.changdifenlei = {
						[Op.eq]: changdifenlei
					}
				}
			}
			let changdiweizhi = req.query.changdiweizhi
			if (changdiweizhi) {

				if (changdiweizhi.indexOf('%') != -1) {
					where.changdiweizhi = {
						[Op.like]: changdiweizhi
					}
				} else {
					where.changdiweizhi = {
						[Op.eq]: changdiweizhi
					}
				}
			}
			let changdizhuangtai = req.query.changdizhuangtai
			if (changdizhuangtai) {

				if (changdizhuangtai.indexOf('%') != -1) {
					where.changdizhuangtai = {
						[Op.like]: changdizhuangtai
					}
				} else {
					where.changdizhuangtai = {
						[Op.eq]: changdizhuangtai
					}
				}
			}


			let orders =[]
			const sortList = sort.split(",")
			const orderList = order.split(",")
			sortList.forEach((item, index) => {
				orders.push([item,orderList[index]])
			  });
			let result = await ChangdixinxiModel.findAndCountAll({
				order: [orders],
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 401, '您的权限不够！', '', 200)
		}
	})


	// 保存接口（后端）
	api.post('/save', async (req, res) => {

		try {

			Object.keys(req.body).forEach(item=>{
				if(req.body[item] == '')  delete req.body[item]
				if(req.body[item] == '' && item == 'sfsh')  req.body[item] = '待审核'
			})
			req.body.clicktime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')



			const userinfo = await ChangdixinxiModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '添加失败！')
			} else {

				toRes.session(res, 0, '添加成功！')
			}
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

    // 保存接口（前端）
	api.post('/add', async (req, res) => {

		try {

			Object.keys(req.body).forEach(item=>{
				if(req.body[item] == '')  delete req.body[item]
				if(req.body[item] == '' && item == 'sfsh')  req.body[item] = '待审核'
			})

			if (jwt.decode(req.headers.token) == null) {
				toRes.session(res, 401, '请登录后再操作', '', 401)
			}



			req.body.clicktime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')


			const userinfo = await ChangdixinxiModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '添加失败！')
			} else {

				toRes.session(res, 0, '添加成功！')
			}
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 更新接口
	api.post('/update', async (req, res) => {

		try {


			await ChangdixinxiModel.update(req.body, {
				where: {
				  id: req.body.id || 0
				}
			})


			toRes.session(res, 0, '编辑成功！')
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 删除接口
	api.post('/delete', async (req, res) => {

		try {

			await ChangdixinxiModel.destroy({
				where: {
				  id: {
					[Op.in]: req.body
				  }
				}
			})

			toRes.session(res, 0, '删除成功！')
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 详情接口（后端）
	api.all('/info/:id', async (req, res) => {

		try {

            await ChangdixinxiModel.update({
				clicktime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
			}, {
				where: {
				  id: req.params.id
				}
			})
			const recordInfo = await ChangdixinxiModel.findOne({ where: { id: req.params.id } })
            await recordInfo.increment('clicknum')

			toRes.record(res, 0, await ChangdixinxiModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})


    // 详情接口（前端）
	api.all('/detail/:id', async (req, res) => {

		try {

            await ChangdixinxiModel.update({
				clicktime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
			}, {
				where: {
				  id: req.params.id
				}
			})
			const recordInfo = await ChangdixinxiModel.findOne({ where: { id: req.params.id } })
            await recordInfo.increment('clicknum')

			toRes.record(res, 0, await ChangdixinxiModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 获取需要提醒的记录数接口
	api.get('/remind/:columnName/:type', async (req, res) => {

        let where = ' 1=1 '

		try {

			let sql = 'SELECT 0 AS count'
			
			if (req.params.type == 1) {
				if (req.query.remindstart) sql = "SELECT COUNT(*) AS count FROM changdixinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + req.query.remindstart + "'"
				if (req.query.remindend) sql = "SELECT COUNT(*) AS count FROM changdixinxi WHERE " + where + " AND " + req.params.columnName + " <= '" + req.query.remindend + "'"

				if (req.query.remindstart && req.query.remindend) {
					sql = "SELECT COUNT(*) AS count FROM changdixinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + req.query.remindstart + "' AND " + req.params.columnName + " <= '" + req.query.remindend + "'"
				}
			}

			if (req.params.type == 2) {
				if (req.query.remindstart) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM changdixinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + remindStart + "'"
				}
				if (req.query.remindend) {
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM changdixinxi WHERE " + where + " AND " + req.params.columnName + " <= '" + remindEnd + "'"
				}

				if (req.query.remindstart && req.query.remindend) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM changdixinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + remindStart + "' AND " + req.params.columnName + " <= '" + remindEnd + "'"
				}
			}

			const results = await sequelize.query(sql, {
				plain: true,
				raw: true,
				type: QueryTypes.SELECT
			})

			toRes.count(res, 0, results.count)
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 赞、踩接口
	api.get('/thumbsup/:id', async (req, res) => {

		try {

			let type = req.query.type

			const recordInfo = await ChangdixinxiModel.findOne({ where: { id: req.params.id } })
			if (type == 1) {
				await recordInfo.increment('thumbsupnum')
			}
			if (type == 2) {
				await recordInfo.increment('crazilynum')
			}

			toRes.session(res, 0, '操作成功！')
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})



	// 智能推荐接口
	api.get('/autoSort', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 5
			let sort = req.query.sort || 'clicktime'
			let order = req.query.order || 'desc'

            sort = "clicknum"

			let where = {}
			const keys = Object.keys(req.query);  
			for (let i = 0; i < keys.length; i++) {  
				const key = keys[i];  
				if(key!="page" && key!="limit"&& key!="sort"&&key!="order"){
					if (req.query[key]) {
						where[key] = {
							[Op.eq]: req.query[key]
						}
					}
				}
			}  

			let orders =[]
			const sortList = sort.split(",")
			const orderList = order.split(",")
			sortList.forEach((item, index) => {
				orders.push([item,orderList[index]])
			  });
			let result = await ChangdixinxiModel.findAndCountAll({
				order: [orders],
				where,
				offset: (page - 1) * limit,
				limit
			})
		
			result.currPage = page
			result.pageSize = limit

			toRes.page(res, 0, result)
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 智能推荐接口
	api.get('/autoSort2', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 5

			let whereStoreup = {}
			whereStoreup.userid = {
				[Op.eq]: jwt.decode(req.headers.token).id
			}
			whereStoreup.tablename = {
				[Op.eq]: 'changdixinxi'
			}
			let storeupList = await StoreupModel.findAndCountAll({
				attributes: ['inteltype'],
				order: [['addtime', 'desc']],
				where: whereStoreup,
				offset: (page - 1) * limit,
				limit
			})
			
			let arr = []
			storeupList.rows.forEach(item => {
				arr.push(item.dataValues.inteltype)
			})
			
			let where = {}
			where.changdifenlei = {
				[Op.in]: arr,
			}

			let result = await ChangdixinxiModel.findAndCountAll({
				where,
				offset: (page - 1) * limit,
				limit
			})
			
			where = {}
			where.changdifenlei = {
				[Op.notIn]: arr,
			}

			let result1 = await ChangdixinxiModel.findAndCountAll({
				where,
				offset: (page - 1) * limit,
				limit: limit - result.count
			})
	
			let changdifenlei = req.query.changdifenlei || ""

			if (changdifenlei !=''){
				let where = {}
				where.changdifenlei = {
					[Op.eq]: changdifenlei,
				}
				let changdifenleiSql = await ChangdixinxiModel.findAndCountAll({
					where,
					offset: (page - 1) * limit,
					limit: limit - result.count
				})
				result.rows = result.rows.concat(result1.rows).filter(item=>changdifenleiSql.rows.filter(item1=>item1.dataValues.changdifenlei==item.dataValues.changdifenlei).length!=0)
				result.total = result.rows.length
			}else{
				result.rows = result.rows.concat(result1.rows)
				result.total = result.count + result1.count
			}
	
			result.currPage = page
			result.pageSize = limit
			result.count = result.total 

			toRes.page(res, 0, result)
		} catch(err) {
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})





	// 分组统计接口
	api.get('/group/:columnName', async (req, res) => {

		try {

			let sql = ""
			let columnName = req.params.columnName
			// let tableName = "changdixinxi"
			let where = " WHERE 1 = 1 "
			sql = "SELECT COUNT(*) AS total, " + columnName + " FROM changdixinxi " + where + " GROUP BY " + columnName 
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 统计指定字段
	api.get('/value/:xColumnName/:yColumnName', async (req, res) => {

		try {

			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			let where = " WHERE 1 = 1 "
			if ("changdixinxi" == "orders") {
				where += " AND status IN ('已支付', '已发货', '已完成') ";
			}

			sql = "SELECT " + xColumnName + ", SUM(" + yColumnName + ") AS total FROM changdixinxi " + where + " GROUP BY " + xColumnName + " DESC"
			
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// (按值统计）时间统计类型(多)
	api.get('/valueMul/:xColumnName', async (req, res) => {

		try {	
			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.query.yColumnNameMul
			let tableName = "changdixinxi"
			let where = " WHERE 1 = 1 "
			const promises = yColumnName.split(',').map(async(item)=>{
				sql = "SELECT " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY " + xColumnName;
				const results = await sequelize.query(sql, {
					plain: false,
					raw: true,
					type: QueryTypes.SELECT
				});
				return results;
			})
            	
			toRes.record(res, 0, await Promise.all(promises))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// (按值统计）时间统计类型(多)
	api.get('/valueMul/:xColumnName/:timeStatType', async (req, res) => {

		try {	
			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.query.yColumnNameMul
			let timeStatType = req.params.timeStatType
			let tableName = "changdixinxi"
			let where = " WHERE 1 = 1 "

			const promises = yColumnName.split(',').map(async(item)=>{
				sql = "SELECT " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY " + xColumnName;
				if (config.dbConnection.dbtype.toLowerCase() == "mysql") {
            	    if (timeStatType == "日")
            	        sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d')";
            	    if (timeStatType == "月")
            	        sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m') " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m')";
            	    if (timeStatType == "年")
            	        sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y') " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y')";
            	} else {
            	    if (timeStatType == "日")
            	        sql = "SELECT DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120) " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120)";
            	    if (timeStatType == "月")
            	        sql = "SELECT DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120) " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120)";
            	    if (timeStatType == "年")
            	        sql = "SELECT DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120) " + xColumnName + ", sum(" + item + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120)";
            	}
				const results = await sequelize.query(sql, {
					plain: false,
					raw: true,
					type: QueryTypes.SELECT
				});
				return results;
			})
            	
			toRes.record(res, 0, await Promise.all(promises))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 按日期统计
	api.get('/value/:xColumnName/:yColumnName/:timeStatType', async (req, res) => {

		try {
			
			let sql = ""
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			let timeStatType = req.params.timeStatType
			let tableName = "changdixinxi"
			let where = " WHERE 1 = 1 "
			if ("changdixinxi" == "orders") {
				where += " AND status IN ('已支付', '已发货', '已完成') ";
			}

            if (config.dbConnection.dbtype.toLowerCase() == "mysql") {
                if (timeStatType == "日")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d')";
                if (timeStatType == "月")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m')";
                if (timeStatType == "年")
                    sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y')";
            } else {
                if (timeStatType == "日")
                    sql = "SELECT DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(10)," + xColumnName + ", 120)";
                if (timeStatType == "月")
                    sql = "SELECT DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(7)," + xColumnName + ", 120)";
                if (timeStatType == "年")
                    sql = "SELECT DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120) " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(VARCHAR(4)," + xColumnName + ", 120)";
            }
			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})


	// 总数接口
	api.get('/count', async (req, res) => {

		try {
			let where = {}
			var changdimingcheng = req.query.changdimingcheng
			if (changdimingcheng) {

				if (changdimingcheng.indexOf('%') != -1) {
					where.changdimingcheng = {
						[Op.like]: changdimingcheng
					}
				} else {
					where.changdimingcheng = {
						[Op.eq]: changdimingcheng
					}
				}
			}
			var changdifenlei = req.query.changdifenlei
			if (changdifenlei) {

				if (changdifenlei.indexOf('%') != -1) {
					where.changdifenlei = {
						[Op.like]: changdifenlei
					}
				} else {
					where.changdifenlei = {
						[Op.eq]: changdifenlei
					}
				}
			}
			var changdiweizhi = req.query.changdiweizhi
			if (changdiweizhi) {

				if (changdiweizhi.indexOf('%') != -1) {
					where.changdiweizhi = {
						[Op.like]: changdiweizhi
					}
				} else {
					where.changdiweizhi = {
						[Op.eq]: changdiweizhi
					}
				}
			}
			var changdizhuangtai = req.query.changdizhuangtai
			if (changdizhuangtai) {

				if (changdizhuangtai.indexOf('%') != -1) {
					where.changdizhuangtai = {
						[Op.like]: changdizhuangtai
					}
				} else {
					where.changdizhuangtai = {
						[Op.eq]: changdizhuangtai
					}
				}
			}

			const count = await ChangdixinxiModel.count({where});

			toRes.record(res, 0, count)
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})












	return api
}
