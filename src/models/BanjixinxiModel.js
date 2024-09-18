import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 班级信息
const BanjixinxiModel = sequelize.define('BanjixinxiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	banjimingcheng: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '班级名称'
	},
	banjitupian: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '班级图片'
	},
	banjidizhi: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '班级地址'
	},
	banjirenshu: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '班级人数'
	},
	jiaolianzhanghao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '教练账号'
	},
	jiaolianxingming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '教练姓名'
	},
	banjijianjie: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '班级简介'
	},
	storeupnum: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '收藏数'
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
	tableName: 'banjixinxi'
})

export default BanjixinxiModel
