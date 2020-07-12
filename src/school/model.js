const { status } = require('../helper')

module.exports = (sequelize, DataTypes) => {
    const School = sequelize.define(
        "school",
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
            parentId: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: "parent_id",
            },
            paymentType: {
                type: DataTypes.ENUM,
                values: [status.Free, status.Paid],
                field: "payment_type",
            },
        },
        {
            freezeTableName: true,
            timestamps: true,
            version: true,
        }
    );
    School.associate = function (models) {
        School.belongsTo(models.user, { as: 'owner' });
        School.hasMany(models.classroom, { foreignKey: 'schoolId' });
    };

    return School;
};
