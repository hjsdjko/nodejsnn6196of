import { Sequelize } from 'sequelize'
import config from '../config.json'

const sequelize = new Sequelize(config.dbConnection.database, config.dbConnection.username, config.dbConnection.password, {
	host: 'localhost',
	dialect: config.dbConnection.dbtype,
	logging: false
})

export default sequelize