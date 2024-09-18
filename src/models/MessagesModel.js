import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 留言板
const MessagesModel = sequelize.define('MessagesModel', {
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
		comment: '留言人id'
	},
	username: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '用户名'
	},
	avatarurl: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '头像'
	},
	content: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '留言内容'
	},
	cpicture: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '留言图片'
	},
	reply: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '回复内容'
	},
	rpicture: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '回复图片'
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
	tableName: 'messages'
})

export default MessagesModel
