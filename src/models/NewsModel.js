import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 公告信息
const NewsModel = sequelize.define('NewsModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	title: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '标题'
	},
	introduction: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '简介'
	},
	typename: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '分类名称'
	},
	name: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '发布人'
	},
	headportrait: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '头像'
	},
	clicknum: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '点击次数'
	},
	clicktime: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('clicktime')).format('YYYY-MM-DD HH:mm:ss')
        },
		defaultValue: DataTypes.NOW,
		comment: '最近点击时间'
	},
	thumbsupnum: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '赞'
	},
	crazilynum: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '踩'
	},
	storeupnum: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '收藏数'
	},
	picture: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '图片'
	},
	content: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '内容'
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
	tableName: 'news'
})

export default NewsModel
