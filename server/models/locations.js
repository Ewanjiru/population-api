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
  },
  linkedLocation: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: "Location"
  }
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
