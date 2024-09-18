import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 课程分类
const KechengfenleiModel = sequelize.define('KechengfenleiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	kechengfenlei: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '课程分类'
	},
	image: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '图片'
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
	tableName: 'kechengfenlei'
})

export default KechengfenleiModel
