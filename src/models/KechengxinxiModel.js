import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 课程信息
const KechengxinxiModel = sequelize.define('KechengxinxiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
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
	kechengshijian: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('kechengshijian')).format('YYYY-MM-DD HH:mm:ss')
        },
		defaultValue: DataTypes.NOW,
		comment: '课程时间'
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
	shangkedidian: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '上课地点'
	},
	yue: {
		type: DataTypes.DOUBLE,
		defaultValue: 0,
		allowNull: true,
		comment: '课程费用'
	},
	keshi: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '课时'
	},
	kechengjianjie: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '课程简介'
	},
	kechengxiangqing: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '课程详情'
	},
	faburiqi: {
		type: DataTypes.DATEONLY,
		allowNull: true,
		get() {
            return moment(this.getDataValue('faburiqi')).format('YYYY-MM-DD')
        },
		defaultValue: new Date(),
		comment: '发布日期'
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
	tableName: 'kechengxinxi'
})

export default KechengxinxiModel
