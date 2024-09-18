import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 教练
const JiaolianModel = sequelize.define('JiaolianModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	jiaolianzhanghao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '教练账号'
	},
	mima: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '密码'
	},
	jiaolianxingming: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '教练姓名'
	},
	xingbie: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '性别'
	},
	touxiang: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '头像'
	},
	zhijiaonianshu: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '执教年数'
	},
	shanzhanglingyu: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '擅长领域'
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
	tableName: 'jiaolian'
})

export default JiaolianModel
