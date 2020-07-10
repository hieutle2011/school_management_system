const express = require('express');
const config = require('./config');
const cors = require("cors");
const { authorize, errorHandler } = require('./middleware')
const { getAll, login } = require('./users/handler')
const { role } = require('./helper')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/v1/login', login)
app.get('/api/v1/users', authorize(role.Admin), getAll);

app.use((req, res) =>
    res
        .status(404)
        .json({ message: `Cannot ${req.method} API ${req.originalUrl}` })
);

app.use(errorHandler)

app.listen(config.server.port, () =>
    console.log(`Example app listening on port ${config.server.port}!`),
);