import mysql from '@utils/server/mysql'
import { Base64 } from 'js-base64'
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
  default_app_id: {
    type: Sequelize.STRING(40),
    allowNull: true
  }
}, {
  tableName: 'user'
})

let pass = Base64.encode(Base64.encode('admin'))

User.sync().then(async () => {
  let admin = await User.findOne({
    where: {
      id: 1
    }
  })
  if (!admin) {
    User.create({
      name: 'admin',
      password: pass
    })
  }
})
export default User
