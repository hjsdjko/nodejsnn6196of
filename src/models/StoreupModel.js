import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 收藏表
const StoreupModel = sequelize.define('StoreupModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	userid: {
		type: DataTypes.BIGINT,
		defaultValue: 0,
		allowNull: true,
		comment: '用户id'
	},
	refid: {
		type: DataTypes.BIGINT,
		defaultValue: 0,
		allowNull: true,
		comment: '商品id'
	},
	tablename: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '表名'
	},
	name: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '名称'
	},
	picture: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '图片'
	},
	type: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '类型'
	},
	inteltype: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '推荐类型'
	},
	remark: {
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
	tableName: 'storeup'
})

export default StoreupModel
