import mysql from '../utils/mysql'
import Sequelize from 'sequelize'

const UrlResource = mysql.define('urlResource', {
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
  path: {
    type: Sequelize.STRING(100),
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
  load_time: {
    type: 'DOUBLE(10,2)',
    allowNull: true
  }
}, {
  tableName: 'url_resource'
})

UrlResource.sync()
export default UrlResource
