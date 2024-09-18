import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

const UsersModel = sequelize.define('UsersModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	username: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: '用户名'
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		comment: '用户密码'
	},
	role: {
		type: DataTypes.STRING,
		allowNull: true,
		comment: '用户角色'
	},
	image: {
		type: DataTypes.STRING,
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
	tableName: 'users'
})

export default UsersModel
