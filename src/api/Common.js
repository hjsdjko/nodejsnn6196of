import { Router } from 'express'
import { QueryTypes } from 'sequelize'
import toRes from '../lib/toRes'
import sequelize from '../models/sequelize'
import util from '../lib/util'
import ConfigModel from '../models/ConfigModel'
import https from 'https'
import qs from 'querystring'
import path from 'path'
import fs from 'fs'
import request from 'request'
import jwt from 'jsonwebtoken'
const process = require("child_process");

export default ({ config, db }) => {
	let api = Router()

	// 获取某表的某个字段列表接口
	api.get('/option/:tableName/:columnName', async (req, res) => {

		try {

			let where = ' WHERE 1 = 1 '
			if(req.query.conditionColumn != undefined && req.query.conditionValue != undefined) {
				where += ` AND ${req.query.conditionColumn} = '${req.query.conditionValue}'`
			}

			const results = await sequelize.query(`SELECT ${req.params.columnName} FROM ${req.params.tableName} ${where}`, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			})

			let result = []
			if (results.length > 0) {
				results.forEach(item => {
					result.push(item[req.params.columnName])
				})
			}

			toRes.record(res, 0, result)
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 获取某表的单行记录接口
	api.get('/follow/:tableName/:columnName', async (req, res) => {

		try {

			toRes.record(res, 0, await sequelize.query(`SELECT * FROM ${req.params.tableName} WHERE ${req.params.columnName} = '${req.query.columnValue}'`, {
				plain: true,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 修改某表的sfsh状态接口
	api.get('/sh/:tableName', async (req, res) => {

		try {
			
			let sfsh = req.body.sfsh === '是' ? '否' : '是'
			await sequelize.query(`UPDATE ${req.params.tableName} SET sfsh = ${sfsh} WHERE id = ${req.body.id}`)

			toRes.session(res, 0, '编辑成功！')
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 获取需要提醒的记录数接口
	api.get('/remind/:tableName/:columnName/:type', async (req, res) => {

		try {

			let sql = 'SELECT 0 AS count'
			
			if (req.params.type == 1) {
				if (req.query.remindstart) sql = `SELECT COUNT(*) AS count FROM ${req.params.tableName} WHERE ${req.params.columnName} >= ${req.query.remindstart}`
				if (req.query.remindend) sql = `SELECT COUNT(*) AS count FROM ${req.params.tableName} WHERE ${req.params.columnName} <= ${req.query.remindend}`
			}

			if (req.params.type == 2) {
				if (req.query.remindstart) {
					let remindStart = util.getDateTimeFormat(0 - req.query.remindstart, "yyyy-MM-dd")
					sql = `SELECT COUNT(*) AS count FROM ${req.params.tableName} WHERE ${req.params.columnName} >= '${remindStart}'`
				}
				if (req.query.remindend) {
					let remindEnd = util.getDateTimeFormat(req.query.remindend, "yyyy-MM-dd")
					sql = `SELECT COUNT(*) AS count FROM ${req.params.tableName} WHERE ${req.params.columnName} <= '${remindEnd}'`
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

	// 计算规则接口
	api.get('/cal/:tableName/:columnName', async (req, res) => {

		try {
			
			toRes.record(res, 0, await sequelize.query(`SELECT SUM(${req.params.columnName}) AS sum, MAX(${req.params.columnName}) AS max, MIN(${req.params.columnName}) AS min, AVG(${req.params.columnName}) AS avg FROM ${req.params.tableName}`, {
				plain: true,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 类别统计接口
	api.get('/group/:tableName/:columnName', async (req, res) => {

		try {
			
			toRes.record(res, 0, await sequelize.query(`SELECT COUNT(*) AS total, ${req.params.columnName} FROM ${req.params.tableName} GROUP BY ${req.params.columnName}`, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 按值统计接口
	api.get('/value/:tableName/:xColumnName/:yColumnName', async (req, res) => {

		try {

			let columns = await sequelize.query(`select group_concat(column_name) from information_schema.columns where table_name = '${req.params.tableName}'`, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			})
			columns = columns[0]['group_concat(column_name)'].split(',')

			let where = ' where 1=1 '
			let userInfo = jwt.decode(req.headers.token)
			if (userInfo.role != '管理员') {
				columns.forEach(column => {
					if (column == userInfo.loginUserColumn) {
						where += ` and ${column} = '${userInfo.username}' `
					}
				})
			}
			
			toRes.record(res, 0, await sequelize.query(`SELECT ${req.params.xColumnName}, SUM(${req.params.yColumnName}) AS total FROM ${req.params.tableName} ${where} GROUP BY ${req.params.xColumnName}`, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	api.get('/value/:tableName/:xColumnName/:yColumnName/:timeStatType', async (req, res) => {

		try {

			let columns = await sequelize.query(`select group_concat(column_name) from information_schema.columns where table_name = '${req.params.tableName}'`, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			})
			columns = columns[0]['group_concat(column_name)'].split(',')

			let where = ' where 1=1 '
			let userInfo = jwt.decode(req.headers.token)
			if (userInfo.role != '管理员') {
				columns.forEach(column => {
					if (column == userInfo.loginUserColumn) {
						where += ` and ${column} = '${userInfo.username}' `
					}
				})
			}

			let sql = ""
			let tableName = req.params.tableName
			let xColumnName = req.params.xColumnName
			let yColumnName = req.params.yColumnName
			let timeStatType = req.params.timeStatType
			if (timeStatType == "日")
				sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m-%d')";
			if (timeStatType == "月")
				sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y-%m') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y-%m')";
			if (timeStatType == "年")
				sql = "SELECT DATE_FORMAT(" + xColumnName + ", '%Y') " + xColumnName + ", sum(" + yColumnName + ") total FROM " + tableName + where + " GROUP BY DATE_FORMAT(" + xColumnName + ", '%Y')";

			toRes.record(res, 0, await sequelize.query(sql, {
				plain: false,
				raw: true,
				type: QueryTypes.SELECT
			}))
		} catch(err) {

			toRes.session(res, 500, err, '', 500)
		}
	})

	// 人脸对比
	api.get('/matchFace', async (req, res) => {

		try {

			let APIKeyInfo = await ConfigModel.findOne({ where: { name: 'APIKey' } })
			let SecretKeyInfo = await ConfigModel.findOne({ where: { name: 'SecretKey' } })
			let APIKey = APIKeyInfo.dataValues.value
			let SecretKey = SecretKeyInfo.dataValues.value
			
			const param = qs.stringify({
				'grant_type': 'client_credentials',
				'client_id': APIKey,
				'client_secret': SecretKey
			});

			let rawData = '';
			https.get(
				{
					hostname: 'aip.baidubce.com',
					path: '/oauth/2.0/token?' + param,
					agent: false
				},
				function (resc) {
					resc.on('data', (chunk)=>{
						rawData += chunk;
					});

					resc.on('end',()=>{
						let rawDataObj = JSON.parse(rawData);
						let access_token = rawDataObj.access_token;
						let face1 = path.join(__dirname,'..','views','upload', req.query.face1)
						let face2 = path.join(__dirname,'..','views','upload', req.query.face2)
						
						let bitmap = fs.readFileSync(face1);
						let bitmap2 = fs.readFileSync(face2);
						let base64str1 = Buffer.from(bitmap, 'binary').toString('base64');
						let base64str2 = Buffer.from(bitmap2, 'binary').toString('base64');

						let reqParams = [
							{
									"image": base64str1,
									"image_type": "BASE64",
									"face_type": "LIVE",
									"quality_control": "LOW",
									"liveness_control": "NONE"
							},
							{
									"image": base64str2,
									"image_type": "BASE64",
									"face_type": "LIVE",
									"quality_control": "LOW",
									"liveness_control": "NONE"
							}
						];
						request({
							url: 'https://aip.baidubce.com/rest/2.0/face/v3/match?access_token=' + access_token,
							method: "POST",
							json: true,
							headers: {
								"content-type": "application/json",
							},
							body: reqParams
						}, function(error, response, body) {
							if (!error && response.statusCode == 200) {
								res.status(200).json({
									code: 0,
									score: body.result ? body.result.score : 0
								})
							} else {
								res.status(200).json({
									code: -1,
									score: 0
								})
							}
						});
					});
				}
			);
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})



	return api
}
