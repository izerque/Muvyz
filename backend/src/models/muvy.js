const { DataTypes } = require('sequelize');
const db = require('../config/db');

// Define the Muvy model with id, title, year, rating, and thumbnail attributes
const Muvy = db.define('Muvy', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER
    },
    rating: {
        type: DataTypes.FLOAT
    },
    thumbnail: {
        type: DataTypes.STRING
    },
});

// Synchronize the model with the database to create the table if it doesn't exist or update it if needed
Muvy.sync();

module.exports = Muvy;
