module.exports = (sequelize, DataTypes) => {
    const Classroom = sequelize.define(
        "classroom",
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
            year: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: "year",
            },
        },
        {
            freezeTableName: true,
            timestamps: true,
            version: true,
        }
    );
    Classroom.associate = function (models) {
        Classroom.belongsTo(models.user, { as: 'teacher' });
        Classroom.belongsTo(models.school, { as: 'school' });
        Classroom.hasMany(models.tracking);
    };

    return Classroom;
};
