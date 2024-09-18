import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 学员
const XueyuanModel = sequelize.define('XueyuanModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	zhanghao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '账号'
	},
	mima: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '密码'
	},
	xingming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '姓名'
	},
	xingbie: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '性别'
	},
	youxiang: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '邮箱'
	},
	shoujihaoma: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '手机号码'
	},
	yue: {
		type: DataTypes.DOUBLE,
		defaultValue: 0,
		allowNull: true,
		comment: '余额'
	},
	touxiang: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '头像'
	},
	addtime: {
  		type: DataTypes.DATE,
  		defaultValue: DataTypes.NOW,
    	allowNull: false,
    	get() {
            return moment(this.getDataValue('addtime')).format('YYYY-MM-DD HH:mm:ss')
        },
		comment: '添加时间'
	}
}, {
	timestamps: false,
	freezeTableName: true,
	tableName: 'xueyuan'
})

export default XueyuanModel
