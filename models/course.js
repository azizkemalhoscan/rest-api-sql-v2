'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Sequelize.Model{}
  Course.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: Sequelize.TEXT
    },
    estimatedTime: {
      type: Sequelize.STRING,
      allowNull: true
    },
    materialsNeeded: {
      type: Sequelize.STRING,
      allowNull: true
    },
  }, { sequelize });

 Course.Associate = (models) => {
  Course.hasMany(models.User, {
    foreignKey: {
      fieldName: "userId",
    },
  });
 };

  return Course;
}

// Example From starter files

  // Movie.associate = (models) => {
  //   Movie.belongsTo(models.Person, {
  //     as: 'director',
  //     foreignKey: {
  //       fieldName: 'directorPersonId',
  //       allowNull: false,
  //     },
  //   });
  //   // TODO Add associations.
  // };

// Course
// id (Integer, primary key, auto-generated)
// userId (id from the Users table)
// title (String)
// description (Text)
// estimatedTime (String, nullable)
// materialsNeeded (String, nullable)
// When defining models for an existing database..
