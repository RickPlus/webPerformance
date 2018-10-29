/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(16),
      allowNull: false,
      field: 'name'
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'password'
    }
  }, {
    tableName: 'user'
  });
};
