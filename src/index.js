const express = require('express');
const config = require('./config');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(config.server.port, () =>
    console.log(`Example app listening on port ${config.server.port}!`),
);