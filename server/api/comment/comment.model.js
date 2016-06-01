'use strict';

import mongoose from 'mongoose';

var CommentSchema = new mongoose.Schema({
  comment: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  idea: {
    type: mongoose.Schema.ObjectId,
    ref: 'Thing'
  },
  createdAt: {
      type: Date,
      default: Date.now
  },
  active: Boolean
});

export default mongoose.model('Comment', CommentSchema);
