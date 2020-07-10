const express = require('express');
const config = require('./config');

const { User } = require('./users')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/v1/users', async (req, res) => {
    const users = await User.findAll()
    res.send(users);
});

app.listen(config.server.port, () =>
    console.log(`Example app listening on port ${config.server.port}!`),
);