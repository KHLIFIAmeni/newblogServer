module.exports = (Sequelize, DataTypes) => {
    const Message = Sequelize.define('Message', {
        // Model attributes are defined here
        Object: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            }
        },
        message: {
            type: DataTypes.STRING
            // allowNull defaults to true
        },
        date: {
            type: DataTypes.DATEONLY,
            validate: {
                isDate: true,
            }
        },
    })
    return Message
}