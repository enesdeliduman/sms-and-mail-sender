const { DataTypes } = require("sequelize");
const { sequelize } = require("../Data/databaseConnect");
const User = require("./User");

const Mail = sequelize.define("mail", {
    subject: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    emailAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    message: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: User,
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
});

module.exports = Mail;