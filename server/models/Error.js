import mysql from '@/utils/server/mysql'
import Sequelize from 'sequelize'

const Error = mysql.define('error', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: Sequelize.STRING(1000),
    allowNull: true
  },
  error_url: {
    type: Sequelize.STRING(1000),
    allowNull: true
  },
  line_no: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  col_no: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  message: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  stack: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  visit_time: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'error'
})

Error.sync()
export default Error
