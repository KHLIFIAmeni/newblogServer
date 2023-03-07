module.exports = (Sequelize, DataTypes) => {
    const Comment = Sequelize.define('Comment', {
        // Model attributes are defined here
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            validate: {
                isDate: true,
            }
        }
    })
    Comment.associate = models => {
        Comment.belongsTo(models.Article, { onDelete: "cascade" })
        Comment.belongsTo(models.User, { onDelete: "cascade" })
    }
    return Comment
}