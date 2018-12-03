import mysql from '@/utils/server/mysql'
import Sequelize from 'sequelize'

const urlResourceAverage = mysql.define('urlResourceAverage', {
  id: {
    type: Sequelize.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  url_id: {
    type: Sequelize.INTEGER(11),
    allowNull: true
  },
  url: {
    type: Sequelize.STRING(100),
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
  wait_ttfb_time: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  },
  block_time: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  },
  download_time: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  },
  size: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  },
  type: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  duration: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  }
}, {
  tableName: 'url_resource_average'
})

urlResourceAverage.sync()
export default urlResourceAverage
