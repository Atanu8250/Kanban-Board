const mongoose = require('mongoose');

const aiUsageSchema = mongoose.Schema({
     userId: {
          type: String,
          required: true,
          index: true,
     },
     dateKey: {
          type: String,
          required: true,
          index: true,
     },
     count: {
          type: Number,
          default: 0,
     },
     lastRequestAt: {
          type: Date,
          default: Date.now,
     },
     requestTimestamps: {
          type: [Date],
          default: [],
     },
}, { versionKey: false, timestamps: true });

aiUsageSchema.index({ userId: 1, dateKey: 1 }, { unique: true });

const AIUsageModel = mongoose.model('ai_usage', aiUsageSchema);

module.exports = AIUsageModel;
