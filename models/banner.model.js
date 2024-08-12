const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_URI, {
  dialect: 'mysql',
});

const Banner = sequelize.define('Banner', {
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false
  },
  visibility: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});



module.exports = Banner;
