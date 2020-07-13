const express = require('express');
const cors = require("cors");
const { authorize, errorHandler } = require('./middleware')
const userHandler = require('./users/handler')
const schoolHandler = require('./school/handler')
const { role } = require('./helper')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/v1/login', userHandler.login);

app.get('/api/v1/users', authorize(role.Admin), userHandler.getAll);
app.get('/api/v1/users/:id', authorize(role.Admin), userHandler.getUser);
app.get('/api/v1/schools', authorize(role.Admin), schoolHandler.getAll);

app.get('/api/v1/users/:id/class', authorize(role.Teacher), userHandler.getTeacherClass);
app.get('/api/v1/users/:id/class/:classId', authorize(role.Teacher), userHandler.getTeacherClass);
app.get('/api/v1/users/:id/schools', authorize(role.Owner), userHandler.getOwnerSchools);
app.get('/api/v1/users/:id/schools/:schoolId', authorize(role.Owner), userHandler.getOwnerSchools);
app.get('/api/v1/users/:id/schools/:schoolId/class/:classId', authorize(role.Owner), userHandler.getOwnerSchoolClass);


app.use((req, res) =>
    res
        .status(404)
        .json({ message: `Cannot ${req.method} API ${req.originalUrl}` })
);

app.use(errorHandler)

module.exports = app;