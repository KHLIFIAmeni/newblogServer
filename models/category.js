module.exports = (Sequelize, DataTypes) => {
    const Category = Sequelize.define('Category', {
        // Model attributes are defined here
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        image: {
            type: DataTypes.STRING
        }
    })
    Category.associate = models => {
        Category.hasMany(models.Article, { onDelete: "cascade" })
    }
    return Category
}