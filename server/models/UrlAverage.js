import mysql from '@utils/server/mysql'
import Sequelize from 'sequelize'

const UrlAverage = mysql.define('urlAverage', {
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
  count: {
    type: Sequelize.INTEGER(11),
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
  tcp_time: {
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
  device_type: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  os_name: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  browser_name: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  browser_version: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  date_type: {
    type: 'TINYINT(1)',
    allowNull: true
  }
}, {
  tableName: 'url_average'
})

UrlAverage.sync()
export default UrlAverage
