
const { DataTypes } = require("sequelize");
const { sequelize } = require("../Data/databaseConnect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = sequelize.define("user", {
    username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: {
            msg: "Bu kullanıcı adı zaten alınmış"
        },
        validate: {
            notEmpty: {
                msg: "Kullanıcı adı boş olamaz"
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        selected: false,
        validate: {
            notEmpty: {
                msg: "Şifre boş olamaz"
            },
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: "Bu mail zaten alınmış"
        },
        validate: {
            notEmpty: {
                msg: "mail boş olamaz"
            }
        }
    },
    suspend: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    premium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    resetPasswordCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resetPasswordCurrentTime: {
        type: DataTypes.DATE,
        allowNull: true,
    }
});

User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

User.beforeUpdate(async (user) => {
    if (user.changed('password')) { // Eğer şifre değiştiyse
      user.password = await bcrypt.hash(user.password, 10);
    }
  });
User.prototype.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};
User.prototype.createJWTToken = function () {
    const payload = {
        id: this.id,
        email:this.email,
        username: this.username
    };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE });
};

module.exports = User;
