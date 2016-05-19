'use strict';

import mongoose from 'mongoose';

var CampaignSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Campaign', CampaignSchema);
