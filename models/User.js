const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    minlength: 8,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  pesel: {
    type: String,
    minlength: 11,
    maxlength: 11,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: true
  },
  sex: {
    type: String,
    required: true
  },
  terms: {
    type: String,
    required: true
  }
});

UserSchema.plugin(mongooseUniqueValidator);
module.exports = mongoose.model('User', UserSchema);