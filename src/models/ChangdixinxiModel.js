import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 场地信息
const ChangdixinxiModel = sequelize.define('ChangdixinxiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	changdimingcheng: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '场地名称'
	},
	changdifenlei: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '场地分类'
	},
	changditupian: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '场地图片'
	},
	changdiweizhi: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '场地位置'
	},
	changdizhuangtai: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '场地状态'
	},
	feiyong: {
		type: DataTypes.DOUBLE,
		defaultValue: 0,
		allowNull: true,
		comment: '费用/小时'
	},
	changdisheshi: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '场地设施'
	},
	changdixiangqing: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '场地详情'
	},
	faburiqi: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('faburiqi')).format('YYYY-MM-DD HH:mm:ss')
        },
		defaultValue: DataTypes.NOW,
		comment: '发布日期'
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
	clicktime: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('clicktime')).format('YYYY-MM-DD HH:mm:ss')
        },
		defaultValue: DataTypes.NOW,
		comment: '最近点击时间'
	},
	clicknum: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '点击次数'
	},
	storeupnum: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '收藏数'
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
	tableName: 'changdixinxi'
})

export default ChangdixinxiModel
