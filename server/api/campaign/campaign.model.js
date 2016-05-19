'use strict';

import mongoose from 'mongoose';

var CampaignSchema = new mongoose.Schema({
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

CampaignSchema.pre('find', function(next){
  this.populate('user', 'name');
  next();
});
CampaignSchema.pre('findOne', function(next){
  this.populate('user', 'name');
  next();
});

export default mongoose.model('Campaign', CampaignSchema);
