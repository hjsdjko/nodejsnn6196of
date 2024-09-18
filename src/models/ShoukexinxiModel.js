import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 授课信息
const ShoukexinxiModel = sequelize.define('ShoukexinxiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	dengjibianhao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '登记编号'
	},
	kechengmingcheng: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '课程名称'
	},
	kechengfengmian: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '课程封面'
	},
	kechengfenlei: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '课程分类'
	},
	shangkedidian: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '上课地点'
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
	keshi: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '收款课时'
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
	shoukeshijian: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('shoukeshijian')).format('YYYY-MM-DD HH:mm:ss')
        },
		defaultValue: DataTypes.NOW,
		comment: '授课时间'
	},
	shoukeneirong: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '授课内容'
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
	tableName: 'shoukexinxi'
})

export default ShoukexinxiModel
