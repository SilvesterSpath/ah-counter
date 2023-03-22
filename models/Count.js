const mongoose = require('mongoose');

const CountSchema = mongoose.Schema({
  count: {
    type: Number,
    required: true,
  },
  person: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('count', CountSchema);
