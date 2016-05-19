'use strict';

import mongoose from 'mongoose';

var CampaignSchema = new mongoose.Schema({
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

CampaignSchema.pre('find', function(next){
  this.populate('user', 'name');
  next();
});
CampaignSchema.pre('findOne', function(next){
  this.populate('user', 'name');
  next();
});

export default mongoose.model('Campaign', CampaignSchema);
