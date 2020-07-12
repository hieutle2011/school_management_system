module.exports = (sequelize, DataTypes) => {
    const Tracking = sequelize.define(
        "tracking",
        {
            id: {
                type: DataTypes.BIGINT,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                field: "id",
            },
            timeCheckIn: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: "time_check_in",
                defaultValue: () => new Date().getTime()
            },
            timeCheckOut: {
                type: DataTypes.BIGINT,
                allowNull: true,
                field: "time_check_out",
                defaultValue: () => new Date().getTime()
            },
        },
        {
            freezeTableName: true,
            timestamps: true,
            version: true,
        }
    );
    Tracking.associate = function (models) {
        Tracking.belongsTo(models.child);
        Tracking.belongsTo(models.classroom);
    };

    return Tracking;
};
