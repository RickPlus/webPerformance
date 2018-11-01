import mysql from '../utils/mysql'
import Sequelize from 'sequelize'

const Url = mysql.define('url', {
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
  load_time: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  },
  white_time: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  },
  dns_time: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  },
  tls_time: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  },
  dom_time: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  },
  redirect_time: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  },
  resource_time: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  },
  dom_ready_time: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  },
  browser: {
    type: Sequelize.STRING(20),
    allowNull: true,
    field: 'browser'
  },
  system: {
    type: Sequelize.STRING(20),
    allowNull: true,
    field: 'system'
  },
  position: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  ip: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  visit_time: {
    type: Sequelize.DATE,
    allowNull: true
  }
}, {
  tableName: 'url'
})

Url.sync()
export default Url
