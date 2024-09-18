import { Router } from 'express'
import UsersController from './Users'
import FileController from './File'
import ConfigController from './Config'
import CommonController from './Common'
import XueyuanController from './Xueyuan'
import JiaolianController from './Jiaolian'
import ChangdifenleiController from './Changdifenlei'
import KechengfenleiController from './Kechengfenlei'
import ChangdixinxiController from './Changdixinxi'
import KechengxinxiController from './Kechengxinxi'
import DingyuexinxiController from './Dingyuexinxi'
import GoumaikeshiController from './Goumaikeshi'
import ChongzhixinxiController from './Chongzhixinxi'
import BanjixinxiController from './Banjixinxi'
import BanjichengyuanController from './Banjichengyuan'
import ShoukexinxiController from './Shoukexinxi'
import NewstypeController from './Newstype'
import NewsController from './News'
import StoreupController from './Storeup'
import AboutusController from './Aboutus'
import SystemintroController from './Systemintro'
import MessagesController from './Messages'

export default ({ config, db }) => {
	let api = Router()

	api.use('/users', UsersController({ config, db }))

	api.use('/file', FileController({ config, db }))

	api.use('/config', ConfigController({ config, db }))

	api.use('/', CommonController({ config, db }))

	api.use('/xueyuan', XueyuanController({ config, db }))

	api.use('/jiaolian', JiaolianController({ config, db }))

	api.use('/changdifenlei', ChangdifenleiController({ config, db }))

	api.use('/kechengfenlei', KechengfenleiController({ config, db }))

	api.use('/changdixinxi', ChangdixinxiController({ config, db }))

	api.use('/kechengxinxi', KechengxinxiController({ config, db }))

	api.use('/dingyuexinxi', DingyuexinxiController({ config, db }))

	api.use('/goumaikeshi', GoumaikeshiController({ config, db }))

	api.use('/chongzhixinxi', ChongzhixinxiController({ config, db }))

	api.use('/banjixinxi', BanjixinxiController({ config, db }))

	api.use('/banjichengyuan', BanjichengyuanController({ config, db }))

	api.use('/shoukexinxi', ShoukexinxiController({ config, db }))

	api.use('/newstype', NewstypeController({ config, db }))

	api.use('/news', NewsController({ config, db }))

	api.use('/storeup', StoreupController({ config, db }))

	api.use('/aboutus', AboutusController({ config, db }))

	api.use('/systemintro', SystemintroController({ config, db }))

	api.use('/messages', MessagesController({ config, db }))

	return api
}
