
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const locations = require('../routes/locations');

module.exports = (app) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/api/locations', locations);
  app.use(errors());
};
