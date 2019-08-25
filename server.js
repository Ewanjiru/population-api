const express = require('express');
const winston = require('winston');

const app = express();

require('./server/startup/routes')(app);
require('./server/startup/db')();

const port = process.env.PORT || 3001;
app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = app;
