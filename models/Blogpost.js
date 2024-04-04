const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create Blogpost model
class Blogpost extends Model {}

// Define table columns and configuration
Blogpost.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posted_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posted_on: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    timestamps: false,
    modelName: 'blogpost',
  }
);


module.exports = Blogpost;