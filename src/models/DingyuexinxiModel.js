import { Sequelize, DataTypes } from 'sequelize'
import moment from 'moment'
import sequelize from './sequelize'

// 订阅信息
const DingyuexinxiModel = sequelize.define('DingyuexinxiModel', {
	id: {
		type: DataTypes.BIGINT,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		comment: '主键id'
	},
	dingyuebianhao: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '订阅编号'
	},
	changdimingcheng: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '场地名称'
	},
	changditupian: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '场地图片'
	},
	changdifenlei: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '场地分类'
	},
	changdiweizhi: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '场地位置'
	},
	dingyueshizhang: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: true,
		comment: '订阅时长'
	},
	feiyong: {
		type: DataTypes.DOUBLE,
		defaultValue: 0,
		allowNull: true,
		comment: '费用'
	},
	yue: {
		type: DataTypes.DOUBLE,
		defaultValue: 0,
		allowNull: true,
		comment: '应付金额'
	},
	dingyueshijian: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('dingyueshijian')).format('YYYY-MM-DD HH:mm:ss')
        },
		defaultValue: DataTypes.NOW,
		comment: '订阅时间'
	},
	guihaishijian: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('guihaishijian')).format('YYYY-MM-DD HH:mm:ss')
        },
		defaultValue: DataTypes.NOW,
		comment: '归还时间'
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
	shoujihaoma: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '手机号码'
	},
	yonghuyue: {
		type: DataTypes.DOUBLE,
		defaultValue: 0,
		allowNull: true,
		comment: '用户余额'
	},
	dingyuebeizhu: {
		type: DataTypes.STRING,
		defaultValue: '',
		allowNull: true,
		comment: '订阅备注'
	},
	xiadanshijian: {
		type: DataTypes.DATE,
		allowNull: true,
		get() {
            return moment(this.getDataValue('xiadanshijian')).format('YYYY-MM-DD HH:mm:ss')
        },
		defaultValue: DataTypes.NOW,
		comment: '下单时间'
	},
	sfsh: {
		type: DataTypes.STRING,
		defaultValue: '待审核',
		allowNull: true,
		comment: '是否审核'
	},
	shhf: {
		type: DataTypes.TEXT,
		defaultValue: '',
		allowNull: true,
		comment: '审核回复'
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
	tableName: 'dingyuexinxi'
})

export default DingyuexinxiModel
