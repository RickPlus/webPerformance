import mysql from '../utils/mysql'
import Sequelize from 'sequelize'

const User = mysql.define('user', {
  id: {
    type: Sequelize.INTEGER(11).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(16),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  appId: {
    type: Sequelize.INTEGER(64),
    allowNull: true
  }
}, {
  tableName: 'user'
})

User.sync()
export default User
