import { Router } from 'express'
import toRes from '../lib/toRes'
import multer from 'multer'
import path  from 'path'


export default ({ config, db }) => {
	let api = Router()
	let storage = multer.diskStorage({
		destination: function (req, file, cb) {

			cb(null, path.join(__dirname, '../views/upload'))
		},
		filename: function (req, file, cb) {
			
			// cb(null, path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname))
			
			let newfilename = path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname)

			if(req.query.type && req.query.type.includes('_template')) {
				newfilename = req.query.type + path.extname(file.originalname)
			}
			
			cb(null, newfilename)
		}
	})
	let upload = multer({ storage })

	// 文件上传接口
	api.post('/upload', upload.any(), (req, res) => {

		try {

			toRes.file(res, 0, req.files[0].filename)
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	// 文件下载接口
	api.get('/download', (req, res) => {

		try {

			res.download(path.join(__dirname, '../views/upload/' + req.query.fileName))
		} catch(err) {

			toRes.session(res, 500, '服务器错误！', '', 500)
		}
	})

	return api
}
