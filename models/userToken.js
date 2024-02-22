const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userToken', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'user_tokens',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_tokens_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
