const http = require('http');
const db = require('./db');
const app = require('./app');
const config = require('./config');

const server = http.createServer(app);
db.sequelize.sync().then(async () => {
    server.listen(config.server.port, err => {
        if (err) {
            console.log(`Start server error`, err);
        } else {
            console.log(`Server is listening on port ${config.server.port}`);
        }
    });
}, (err) => {
    console.log(err)
});