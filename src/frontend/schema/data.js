/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('data', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    data_info: {
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
    tableName: 'data'
  });
};
