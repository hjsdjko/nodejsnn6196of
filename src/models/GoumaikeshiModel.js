import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 购买课时
const GoumaikeshiModel = sequelize.define('GoumaikeshiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	goumaibianhao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '购买编号'
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
		comment: '课时'
	},
	yue: {
		type: DataTypes.DOUBLE,
		defaultValue: 0,
		allowNull: true,
		comment: '课程费用'
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
	shoujihaoma: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '手机号码'
	},
	yonghuyue: {
		type: DataTypes.DOUBLE,
		defaultValue: 0,
		allowNull: true,
		comment: '用户余额'
	},
	xiadanshijian: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('xiadanshijian')).format('YYYY-MM-DD HH:mm:ss')
        },
		defaultValue: DataTypes.NOW,
		comment: '下单时间'
	},
	beizhu: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '备注'
	},
	sfsh: {
		type: DataTypes.STRING,
		defaultValue: '待审核',
		allowNull: true,
		comment: '是否审核'
	},
	shhf: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '审核回复'
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
	tableName: 'goumaikeshi'
})

export default GoumaikeshiModel
