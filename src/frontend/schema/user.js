/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    nick: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    detail_info: {
      type: DataTypes.JSON,
      allowNull: true
    },
    create_time: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    modified_time: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'user'
  });
};
