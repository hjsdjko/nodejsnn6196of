import { version } from '../../package.json'
import { Router } from 'express'
import { Op } from 'sequelize'
import toRes from '../lib/toRes'
import UsersModel from '../models/UsersModel'
import jwt from 'jsonwebtoken'

export default ({ config, db }) => {
	let api = Router()

	// 用户登录接口
	api.post('/login', async (req, res) => {

		try {

			let userinfo = await UsersModel.findOne({ where: { username: req.query.username, password: req.query.password } })
			if (userinfo === null) {
				toRes.session(res, -1, '用户名或密码错误！')
				return;
			}

			const token = jwt.sign(
				{
					id: userinfo.dataValues.id,
					username: userinfo.dataValues.username,
					role: userinfo.dataValues.role
				},
				config.jwtSecret,
				{
					expiresIn: 60 * 60 * 24 * 1
				}
			)

			userinfo.dataValues.token = token
			delete userinfo.dataValues.password
			req.session.userinfo = userinfo

			toRes.session(res, 0, '登录成功！', token)
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 用户退出接口
	api.all('/logout', (req, res) => {

		if (!toRes.auth(req, res, '管理员')) return
		
		req.session.destroy(err => {
			toRes.session(res, 0, '退出成功！')
		})
	})

	// 注册接口
	api.post('/register', async (req, res) => {

		try {

			const userinfo = await UsersModel.create(req.body)

			if (userinfo === null) {

				toRes.session(res, -1, '注册失败！')
			} else {

				toRes.session(res, 0, '注册成功！')
			}
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 获取session的接口
	api.all('/session', async (req, res) => {

		try {

			if (!toRes.auth(req, res, '管理员')) return
			
			toRes.record(res, 0, await UsersModel.findOne({ where: { id: req.session.userinfo.id } }))
		} catch(err) {
			
			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 分页接口（后端）
	api.get('/page', async (req, res) => {

		try {

			if (!toRes.auth(req, res, '管理员')) return

			let page = parseInt(req.query.page) || 1
			let limit = parseInt(req.query.limit) || 10
			let sort = req.query.sort || 'id'
			let order = req.query.order || 'asc'
			let username = req.query.username

			let where = {}

			if (username) {
				where.username = {
					[Op.like]: username
				}
			}

			let result = await UsersModel.findAndCountAll({
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

	// 保存接口
	api.post('/save', async (req, res) => {

		try {

			if (!toRes.auth(req, res, '管理员')) return

			const userinfo = await UsersModel.create(req.body)

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

			if (!toRes.auth(req, res, '管理员')) return

			await UsersModel.update(req.body, {
				where: {
				  id: req.body.id
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

			if (!toRes.auth(req, res, '管理员')) return

			await UsersModel.destroy({
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

	// 详情接口
	api.get('/info/:id', async (req, res) => {

		try {

			if (!toRes.auth(req, res, '管理员')) return

			toRes.record(res, 0, await UsersModel.findOne({ where: { id: req.params.id } }))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	return api
}
