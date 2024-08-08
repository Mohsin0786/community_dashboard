const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userId: {
    type:
    mongoose.Schema.Types.ObjectId,
    required: true
},
  content: {
    type:String,
    required: true
  },
  timestamp: Date
});

module.exports = mongoose.model('Message', messageSchema);