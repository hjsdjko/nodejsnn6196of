import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 关于我们
const AboutusModel = sequelize.define('AboutusModel', {
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
	subtitle: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '副标题'
	},
	content: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '内容'
	},
	picture1: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '图片1'
	},
	picture2: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '图片2'
	},
	picture3: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '图片3'
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
	tableName: 'aboutus'
})

export default AboutusModel
