const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [{
    text: { type: String, required: true }
  }],
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
