const mongoose = require('mongoose');

const { Schema } = mongoose;
const locationSchema = new Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: true,
  },
  femaleCount: {
    type: Number,
  },
  maleCount: {
    type: Number,
  },
  population: {
    type: Number,
  }
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
