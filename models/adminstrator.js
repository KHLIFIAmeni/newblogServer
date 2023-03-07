
module.exports = (Sequelize, DataTypes) => {
    const Administrator = Sequelize.define('Adminstrator', {
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
        login: {
            type: DataTypes.STRING,
            unique: true,

        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        }

    })
    return Administrator
}