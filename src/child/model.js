module.exports = (sequelize, DataTypes) => {
    const Child = sequelize.define(
        "child",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                field: "id",
            },
            name: {
                type: DataTypes.STRING(256),
                allowNull: true,
                field: "name",
            },
        },
        {
            freezeTableName: true,
            timestamps: true,
            version: true,
        }
    );

    return Child;
};
