const mongoose = require('mongoose');
const { locationSchema } = require('./locations');

const { Schema } = mongoose;
const subLocationSchema = new Schema({
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
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location'
  },
});

const SubLocation = mongoose.model('SubLocation', subLocationSchema);
module.exports = SubLocation;
