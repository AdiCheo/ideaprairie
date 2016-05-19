'use strict';

import mongoose from 'mongoose';

var MessageSchema = new mongoose.Schema({
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

MessageSchema.pre('find', function(next){
  this.populate('user', 'name');
  next();
});
MessageSchema.pre('findOne', function(next){
  this.populate('user', 'name');
  next();
});

export default mongoose.model('Message', MessageSchema);
