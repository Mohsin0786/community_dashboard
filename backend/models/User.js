const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 30,
    },
    joinDate: Date,
    messageCount: Number,
    lastActive: Date,
  });
  
  module.exports = mongoose.model('User', userSchema);
  