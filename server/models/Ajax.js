import mysql from '@/utils/server/mysql'
import Sequelize from 'sequelize'

const Ajax = mysql.define('ajax', {
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
  request_url: {
    type: Sequelize.STRING(1000),
    allowNull: true
  },
  params: {
    type: Sequelize.STRING(10000),
    allowNull: true
  },
  method: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  status: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  size: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  },
  duration: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  },
  visit_time: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'ajax'
})

Ajax.sync()
export default Ajax
