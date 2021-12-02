const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
})

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email
  }
};

module.exports = mongoose.model('User', UserSchema);