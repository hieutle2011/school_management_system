const { role } = require('../helper')

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                field: "id",
            },
            username: {
                type: DataTypes.STRING(256),
                allowNull: true,
                field: "username",
            },
            password: {
                type: DataTypes.STRING(256),
                allowNull: false,
                field: "password",
            },
            role: {
                type: DataTypes.ENUM,
                values: [role.Admin, role.Owner, role.Teacher],
                field: "role",
            },
        },
        {
            freezeTableName: true,
            timestamps: true,
            version: true,
        }
    );
    User.associate = function (models) {
        User.hasMany(models.school);
    };

    return User;
};
