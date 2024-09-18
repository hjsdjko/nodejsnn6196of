import { version } from '../../package.json'
import { Router } from 'express'
import { Sequelize, Op,literal, QueryTypes } from 'sequelize'
import sequelize from '../models/sequelize'
import toRes from '../lib/toRes'
import KechengxinxiModel from '../models/KechengxinxiModel'
import util from '../lib/util'
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
			let kechengmingcheng = req.query.kechengmingcheng
			if (kechengmingcheng) {

				if (kechengmingcheng.indexOf('%') != -1) {
					where.kechengmingcheng = {
						[Op.like]: kechengmingcheng
					}
				} else {
					where.kechengmingcheng = {
						[Op.eq]: kechengmingcheng
					}
				}
			}
			let kechengfengmian = req.query.kechengfengmian
			if (kechengfengmian) {

				if (kechengfengmian.indexOf('%') != -1) {
					where.kechengfengmian = {
						[Op.like]: kechengfengmian
					}
				} else {
					where.kechengfengmian = {
						[Op.eq]: kechengfengmian
					}
				}
			}
			let kechengfenlei = req.query.kechengfenlei
			if (kechengfenlei) {

				if (kechengfenlei.indexOf('%') != -1) {
					where.kechengfenlei = {
						[Op.like]: kechengfenlei
					}
				} else {
					where.kechengfenlei = {
						[Op.eq]: kechengfenlei
					}
				}
			}
			let kechengshijian = req.query.kechengshijian
			if (kechengshijian) {

				if (kechengshijian.indexOf('%') != -1) {
					where.kechengshijian = {
						[Op.like]: kechengshijian
					}
				} else {
					where.kechengshijian = {
						[Op.eq]: kechengshijian
					}
				}
			}
			let jiaolianzhanghao = req.query.jiaolianzhanghao
			if (jiaolianzhanghao) {

				if (jiaolianzhanghao.indexOf('%') != -1) {
					where.jiaolianzhanghao = {
						[Op.like]: jiaolianzhanghao
					}
				} else {
					where.jiaolianzhanghao = {
						[Op.eq]: jiaolianzhanghao
					}
				}
			}
			let jiaolianxingming = req.query.jiaolianxingming
			if (jiaolianxingming) {

				if (jiaolianxingming.indexOf('%') != -1) {
					where.jiaolianxingming = {
						[Op.like]: jiaolianxingming
					}
				} else {
					where.jiaolianxingming = {
						[Op.eq]: jiaolianxingming
					}
				}
			}
			let shangkedidian = req.query.shangkedidian
			if (shangkedidian) {

				if (shangkedidian.indexOf('%') != -1) {
					where.shangkedidian = {
						[Op.like]: shangkedidian
					}
				} else {
					where.shangkedidian = {
						[Op.eq]: shangkedidian
					}
				}
			}
			let yue = req.query.yue
			if (yue) {

				if (yue.indexOf('%') != -1) {
					where.yue = {
						[Op.like]: yue
					}
				} else {
					where.yue = {
						[Op.eq]: yue
					}
				}
			}
			let keshi = req.query.keshi
			if (keshi) {

				if (keshi.indexOf('%') != -1) {
					where.keshi = {
						[Op.like]: keshi
					}
				} else {
					where.keshi = {
						[Op.eq]: keshi
					}
				}
			}
			let kechengjianjie = req.query.kechengjianjie
			if (kechengjianjie) {

				if (kechengjianjie.indexOf('%') != -1) {
					where.kechengjianjie = {
						[Op.like]: kechengjianjie
					}
				} else {
					where.kechengjianjie = {
						[Op.eq]: kechengjianjie
					}
				}
			}
			let kechengxiangqing = req.query.kechengxiangqing
			if (kechengxiangqing) {

				if (kechengxiangqing.indexOf('%') != -1) {
					where.kechengxiangqing = {
						[Op.like]: kechengxiangqing
					}
				} else {
					where.kechengxiangqing = {
						[Op.eq]: kechengxiangqing
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
			let tableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName
			if(tableName == 'jiaolian') {
				where.jiaolianzhanghao = {
					[Op.eq]: req.session.userinfo === undefined ? jwt.decode(req.headers.token).username : req.session.userinfo.jiaolianzhanghao
				}
				if (where['userid'] != undefined) {
					delete where.userid
				}
			}

			let orders =[]
			const sortList = sort.split(",")
			const orderList = order.split(",")
			sortList.forEach((item, index) => {
				orders.push([item,orderList[index]])
			  });
			let result = await KechengxinxiModel.findAndCountAll({
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
			let result = await KechengxinxiModel.findAll()
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
			let kechengmingcheng = req.query.kechengmingcheng
			if (kechengmingcheng) {

				if (kechengmingcheng.indexOf('%') != -1) {
					where.kechengmingcheng = {
						[Op.like]: kechengmingcheng
					}
				} else {
					where.kechengmingcheng = {
						[Op.eq]: kechengmingcheng
					}
				}
			}
			let kechengfenlei = req.query.kechengfenlei
			if (kechengfenlei) {

				if (kechengfenlei.indexOf('%') != -1) {
					where.kechengfenlei = {
						[Op.like]: kechengfenlei
					}
				} else {
					where.kechengfenlei = {
						[Op.eq]: kechengfenlei
					}
				}
			}
			let jiaolianxingming = req.query.jiaolianxingming
			if (jiaolianxingming) {

				if (jiaolianxingming.indexOf('%') != -1) {
					where.jiaolianxingming = {
						[Op.like]: jiaolianxingming
					}
				} else {
					where.jiaolianxingming = {
						[Op.eq]: jiaolianxingming
					}
				}
			}
			let shangkedidian = req.query.shangkedidian
			if (shangkedidian) {

				if (shangkedidian.indexOf('%') != -1) {
					where.shangkedidian = {
						[Op.like]: shangkedidian
					}
				} else {
					where.shangkedidian = {
						[Op.eq]: shangkedidian
					}
				}
			}


			let orders =[]
			const sortList = sort.split(",")
			const orderList = order.split(",")
			sortList.forEach((item, index) => {
				orders.push([item,orderList[index]])
			  });
			let result = await KechengxinxiModel.findAndCountAll({
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



			const userinfo = await KechengxinxiModel.create(req.body)

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





			const userinfo = await KechengxinxiModel.create(req.body)

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


			await KechengxinxiModel.update(req.body, {
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

			await KechengxinxiModel.destroy({
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


			toRes.record(res, 0, await KechengxinxiModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})


    // 详情接口（前端）
	api.all('/detail/:id', async (req, res) => {

		try {


			toRes.record(res, 0, await KechengxinxiModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 获取需要提醒的记录数接口
	api.get('/remind/:columnName/:type', async (req, res) => {

        let where = ' 1=1 '
		let tableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName
        if(tableName == 'jiaolian') {
            where += " AND jiaolianzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
        }

		try {

			let sql = 'SELECT 0 AS count'
			
			if (req.params.type == 1) {
				if (req.query.remindstart) sql = "SELECT COUNT(*) AS count FROM kechengxinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + req.query.remindstart + "'"
				if (req.query.remindend) sql = "SELECT COUNT(*) AS count FROM kechengxinxi WHERE " + where + " AND " + req.params.columnName + " <= '" + req.query.remindend + "'"

				if (req.query.remindstart && req.query.remindend) {
					sql = "SELECT COUNT(*) AS count FROM kechengxinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + req.query.remindstart + "' AND " + req.params.columnName + " <= '" + req.query.remindend + "'"
				}
			}

			if (req.params.type == 2) {
				if (req.query.remindstart) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM kechengxinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + remindStart + "'"
				}
				if (req.query.remindend) {
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM kechengxinxi WHERE " + where + " AND " + req.params.columnName + " <= '" + remindEnd + "'"
				}

				if (req.query.remindstart && req.query.remindend) {
					let remindStart = util.getDateTimeFormat(0 + Number(req.query.remindstart), "yyyy-MM-dd")
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = "SELECT COUNT(*) AS count FROM kechengxinxi WHERE " + where + " AND " + req.params.columnName + " >= '" + remindStart + "' AND " + req.params.columnName + " <= '" + remindEnd + "'"
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










	// 分组统计接口
	api.get('/group/:columnName', async (req, res) => {

		try {

			let sql = ""
			let columnName = req.params.columnName
			// let tableName = "kechengxinxi"
			let where = " WHERE 1 = 1 "
			let tableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName
			if(tableName == 'jiaolian') {
				where += " AND jiaolianzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			sql = "SELECT COUNT(*) AS total, " + columnName + " FROM kechengxinxi " + where + " GROUP BY " + columnName 
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
			let tableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName;
			if(tableName == 'jiaolian') {
				where += " AND jiaolianzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			if ("kechengxinxi" == "orders") {
				where += " AND status IN ('已支付', '已发货', '已完成') ";
			}

			sql = "SELECT " + xColumnName + ", SUM(" + yColumnName + ") AS total FROM kechengxinxi " + where + " GROUP BY " + xColumnName + " DESC"
			
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
			let tableName = "kechengxinxi"
			let where = " WHERE 1 = 1 "
			let userTableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName;
			if(userTableName == 'jiaolian') {
				where += " AND jiaolianzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
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
			let tableName = "kechengxinxi"
			let where = " WHERE 1 = 1 "
			let userTableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName;
			if(userTableName == 'jiaolian') {
				where += " AND jiaolianzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}

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
			let tableName = "kechengxinxi"
			let where = " WHERE 1 = 1 "
			let userTableName = req.session.userinfo === undefined ? jwt.decode(req.headers.token).tableName : req.session.userinfo.tableName;
			if(userTableName == 'jiaolian') {
				where += " AND jiaolianzhanghao = '" + jwt.decode(req.headers.token).username + "' ";
			}
			if ("kechengxinxi" == "orders") {
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














	return api
}
