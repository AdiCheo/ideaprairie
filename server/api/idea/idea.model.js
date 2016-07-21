'use strict';

import mongoose from 'mongoose';

var IdeaSchema = new mongoose.Schema({
  name: String,
  info: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  createdAt: {
      type: Date,
      default: Date.now
  },
  active: Boolean
});

IdeaSchema.pre('find', function(next){
  this.populate('user', 'name');
  next();
});
IdeaSchema.pre('findOne', function(next){
  this.populate('user', 'name');
  next();
});

export default mongoose.model('Idea', IdeaSchema);
