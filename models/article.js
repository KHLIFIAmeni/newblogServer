module.exports = (Sequelize, DataTypes) => {
    const Article = Sequelize.define('Article', {
        // Model attributes are defined here
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        article: {
            type: DataTypes.STRING
            // allowNull defaults to true
        },
        date: {
            type: DataTypes.DATEONLY,
            validate: {
                isDate: true,
            }
        },
        image: {
            type: DataTypes.STRING
        }

    })
    Article.associate = models => {
        Article.hasMany(models.Comment, { onDelete: "cascade" })
        Article.belongsTo(models.User, { onDelete: "cascade" })
        Article.belongsTo(models.Category, { onDelete: "cascade" })
    }
    return Article
}