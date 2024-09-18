import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 场地分类
const ChangdifenleiModel = sequelize.define('ChangdifenleiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	changdifenlei: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '场地分类'
	},
	image: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: 'image'
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
	tableName: 'changdifenlei'
})

export default ChangdifenleiModel
