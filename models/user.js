module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define('User', {
        // Model attributes are defined here
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING
            // allowNull defaults to true
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            }
        },
        dateBirth: {
            type: DataTypes.DATEONLY,
            validate: {
                isDate: true,             // only allow date strings
                isAfter: "01-01-1920",    // only allow date strings after a specific date
                isBefore: "01-01-2011"

            }

        },
        tel: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING
        }
    })
    User.associate = models => {
        User.hasMany(models.Article, { onDelete: "cascade" })
        User.hasMany(models.Comment, { onDelete: "cascade" })
    }
    return User
}