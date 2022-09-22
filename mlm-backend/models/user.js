const Sequelize = require('sequelize');
const db = require('../database/db');

const User = db.sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.STRING
    },
    upline_id: {
        type: Sequelize.INTEGER
    },
});

// UPLINE
User.hasMany(User, { as: 'Downline', foreignKey: 'upline_id' });
User.belongsTo(User, { as: 'Upline', foreignKey: 'upline_id' });

module.exports = User;
