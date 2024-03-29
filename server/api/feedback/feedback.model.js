'use strict';

import mongoose from 'mongoose';

var FeedbackSchema = new mongoose.Schema({
  opinion: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  thing: {
    type: mongoose.Schema.ObjectId,
    ref: 'Thing'
  },
  createdAt: {
      type: Date,
      default: Date.now
  },
  active: Boolean
});

FeedbackSchema.pre('find', function(next){
  this.populate('user', 'name');
  next();
});
FeedbackSchema.pre('findOne', function(next){
  this.populate('user', 'name');
  next();
});

export default mongoose.model('Feedback', FeedbackSchema);
