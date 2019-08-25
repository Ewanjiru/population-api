const mongoose = require('mongoose');
const winston = require('winston');

require('dotenv').config();

module.exports = async () => {
  const db = await mongoose.connect(process.env.DBURL, { useNewUrlParser: true });

  winston.info('Connected to MongoDB...');

  return db;
};
