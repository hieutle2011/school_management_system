const express = require('express');
const cors = require("cors");
const { authorize, errorHandler } = require('./middleware')
const userHandler = require('./users/handler')
const schoolHandler = require('./school/handler')
const trackingHandler = require('./tracking/handler')
const { role } = require('./helper')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/v1/login', userHandler.login);
app.get('/api/v1/user', authorize(), userHandler.getUser);

app.get('/api/v1/users', authorize(role.Admin), userHandler.getAll);
app.get('/api/v1/schools/all', authorize(role.Admin), schoolHandler.getAll);

app.get('/api/v1/tracking/teacher', authorize(role.Teacher), trackingHandler.getAllTeacherClassTracking);
app.get('/api/v1/tracking/hq', authorize(role.HQ), trackingHandler.getAllHQClassTracking);
app.get('/api/v1/tracking/hq/school/:schoolId', authorize(role.HQ), trackingHandler.getAllHQClassTracking);
app.get('/api/v1/tracking/owner', authorize([role.HQ, role.Owner]), trackingHandler.getAllOwnerClassTracking);
app.get('/api/v1/tracking/owner/class/:classId', authorize([role.HQ, role.Owner]), trackingHandler.getAllOwnerClassTracking);

app.get('/api/v1/class', authorize(role.Teacher), userHandler.getTeacherClass);
app.get('/api/v1/class/:classId', authorize(role.Teacher), userHandler.getTeacherClass);

app.get('/api/v1/schools', authorize(role.HQ), userHandler.getOwnerSchools);
app.get('/api/v1/schools/:schoolId', authorize([role.Owner, role.HQ]), userHandler.getOwnerSchoolClass);
app.get('/api/v1/schools/:schoolId/class/:classId', authorize([role.Owner, role.HQ]), userHandler.getOwnerSchoolClass);


app.use((req, res) =>
    res
        .status(404)
        .json({ message: `Cannot ${req.method} API ${req.originalUrl}` })
);

app.use(errorHandler)

module.exports = app;