const mongoose = require('mongoose');

const PersonSchema = mongoose.Schema({
  firstName: {
    type: String,
    reqired: true,
  },
  lastName: {
    type: String,
    reqired: true,
  },
});

module.exports = mongoose.model('person', PersonSchema);
