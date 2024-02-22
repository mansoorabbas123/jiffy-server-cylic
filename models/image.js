const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('image', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    public_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    public_url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      },
      unique: "images_categoryId_key"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'images',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "images_categoryId_key",
        unique: true,
        fields: [
          { name: "categoryId" },
        ]
      },
      {
        name: "images_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
