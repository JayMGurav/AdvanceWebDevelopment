const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Missing Name field, Name is required"],
  },
  gender: {
    type: String,
    required: [true, "Missing Gender field, Gender is required"],
  },
  course: {
    type: String,
    required: [true, "Missing Course field, Course is required"],
  },
  fileName: {
    type: String,
    required: [true, "Missing Resume field, Resume is required"],
  }
}, { timestamps: true })


module.exports = mongoose.model('Student', schema)