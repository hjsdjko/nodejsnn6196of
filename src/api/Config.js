import { Router } from 'express'
import { Op } from 'sequelize'
import toRes from '../lib/toRes'
import ConfigModel from '../models/ConfigModel'

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

			let name = req.query.name
			if (name) {
				where.name = {
					[Op.like]: '%' + name + '%'
				}
			}

			let result = await ConfigModel.findAndCountAll({
				order: [[sort, order]],
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

	// 分页接口（前端）
	api.get('/list', async (req, res) => {

		try {

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'

			let where = {}

			let name = req.query.name
			if (name) {
				where.name = {
					[Op.like]: '%' + name + '%'
				}
			}

			let result = await ConfigModel.findAndCountAll({
				order: [[sort, order]],
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

	// 更新接口
	api.post('/update', async (req, res) => {

		try {

			await ConfigModel.update(req.body, {
				where: {
				  id: req.body.id
				}
			})

			toRes.session(res, 0, '编辑成功！')
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 详情接口
	api.get('/info/:id', async (req, res) => {

		try {

			toRes.record(res, 0, await ConfigModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 配置获取接口（后端）
	api.get('/info', async (req, res) => {

		try {

			toRes.record(res, 0, await ConfigModel.findOne({ where: { name: req.query.name } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 配置获取接口（前端）
	api.get('/detail', async (req, res) => {

		try {

			toRes.record(res, 0, await ConfigModel.findOne({ where: { name: req.query.name } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	return api
}
