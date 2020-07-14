const trackingModel = require('../db').tracking;
const classModel = require('../db').classroom;
const userModel = require('../db').user;
const childModel = require('../db').child;
const schoolModel = require('../db').school;

const { csvExport } = require('../helper');

async function getAllTeacherClassTracking(req, res, next) {
    try {
        const { format } = req.query;
        const { id } = req.user;
        const trackings = await trackingModel.findAll({
            where: {
                '$classroom.teacher.id$': id
            },
            include: [
                {
                    model: classModel,
                    include: [
                        { model: userModel, as: 'teacher' }
                    ]
                },
                {
                    model: childModel,
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        if (!trackings) return res.status(400).json({ message: 'Data not found' });

        if (format && format === 'csv') {
            csvExport(res, next, makeBodyCSV(trackings), 'teacher_class_tracking')
        } else {
            res.send(trackings);
        }
    } catch (error) {
        next(error);
    }
}

async function getAllHQClassTracking(req, res, next) {
    try {
        const { format } = req.query;
        const { id } = req.user;
        const { schoolId } = req.params;

        const whereCls = { '$classroom.school.ownerId$': id }
        schoolId ? whereCls['$classroom.schoolId$'] = schoolId : null

        const trackings = await trackingModel.findAll({
            where: whereCls,
            include: [
                {
                    model: classModel,
                    include: [
                        { model: schoolModel, as: 'school' }
                    ]
                },
                {
                    model: childModel,
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        if (!trackings) return res.status(400).json({ message: 'Data not found' });

        if (format && format === 'csv') {
            csvExport(res, next, makeBodyCSV(trackings), 'school_tracking')
        } else {
            res.send(trackings);
        }
    } catch (error) {
        next(error);
    }
}

async function getAllOwnerClassTracking(req, res, next) {
    try {
        const { format } = req.query;
        const { id } = req.user;
        const { classId } = req.params;

        const whereCls = { '$classroom.school.ownerId$': id }
        classId ? whereCls['$classroom.id$'] = classId : null

        const trackings = await trackingModel.findAll({
            where: whereCls,
            include: [
                {
                    model: classModel,
                    include: [
                        { model: schoolModel, as: 'school' }
                    ]
                },
                {
                    model: childModel,
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        if (!trackings) return res.status(400).json({ message: 'Data not found' });

        if (format && format === 'csv') {
            csvExport(res, next, makeBodyCSV(trackings), 'class_tracking')
        } else {
            res.send(trackings);
        }
    } catch (error) {
        next(error);
    }
}

function makeBodyCSV(trackings) {
    return trackings.map((track) => ({
        id: track.id,
        child_name: track.child.name,
        class_id: track.classroomId,
        time_check_in: track.timeCheckIn,
        time_check_out: track.timeCheckOut,
    }))
}

module.exports = {
    getAllTeacherClassTracking,
    getAllHQClassTracking,
    getAllOwnerClassTracking,
}