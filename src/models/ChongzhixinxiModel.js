import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 充值信息
const ChongzhixinxiModel = sequelize.define('ChongzhixinxiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	chongzhibianhao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '充值编号'
	},
	zhanghao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '账号'
	},
	xingming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '姓名'
	},
	yue: {
		type: DataTypes.DOUBLE,
		defaultValue: 0,
		allowNull: true,
		comment: '充值金额'
	},
	touxiang: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '头像'
	},
	chongzhiriqi: {
		type: DataTypes.DATEONLY,
		allowNull: true,
		get() {
            return moment(this.getDataValue('chongzhiriqi')).format('YYYY-MM-DD')
        },
		defaultValue: new Date(),
		comment: '充值日期'
	},
	chongzhibeizhu: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '充值备注'
	},
	ispay: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '是否支付'
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
	tableName: 'chongzhixinxi'
})

export default ChongzhixinxiModel
