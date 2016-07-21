'use strict';

import mongoose from 'mongoose';

var ContestSchema = new mongoose.Schema({
  name: String,
  info: String,
  startDate: {
      type: Date,
      default: Date.now
  },
  endDate: {
      type: Date,
      default: Date.now
  },
  privacy: String,
  image: String,
  rewards: String,
  monetaryRewards: Number,
  documents: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  contributors: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  createdAt: {
      type: Date,
      default: Date.now
  },
  active: Boolean
});

ContestSchema.pre('find', function(next){
  this.populate('user', 'name');
  next();
});
ContestSchema.pre('findOne', function(next){
  this.populate('user', 'name');
  next();
});

export default mongoose.model('Contest', ContestSchema);
