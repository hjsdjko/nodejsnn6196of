import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 班级成员
const BanjichengyuanModel = sequelize.define('BanjichengyuanModel', {
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
	jiarushijian: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('jiarushijian')).format('YYYY-MM-DD HH:mm:ss')
        },
		defaultValue: DataTypes.NOW,
		comment: '加入时间'
	},
	beizhu: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '备注'
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
	tableName: 'banjichengyuan'
})

export default BanjichengyuanModel
