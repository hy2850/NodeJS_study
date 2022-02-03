const mongoose = require('mongoose');

const { Schema } = mongoose;
const {
  Types: { ObjectId }, // object destructuring
} = Schema;
const commentSchema = new Schema({
  commenter: {
    type: ObjectId,
    required: true,
    ref: 'User', // ⭐️ commenter 필드에 User 스키마의 User ObjectId 들어감 - 나중에 Join에 쓰임
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Comment', commentSchema);
