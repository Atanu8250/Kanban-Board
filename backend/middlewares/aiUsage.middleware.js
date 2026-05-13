const AIUsageModel = require('../models/aiUsage.model');

const AI_DAILY_LIMIT = 10;

const getUtcDateKey = () => new Date().toISOString().slice(0, 10);

const consumeAiUsage = async (req, res, next) => {
     try {
          const userId = req.headers.userId;
          const title = typeof req.body?.title === 'string' ? req.body.title.trim() : '';
          const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';

          if (!userId) {
               res.status(401).send({ message: 'User not authenticated for AI usage tracking' });
               return;
          }

          if (!title && !prompt) {
               res.status(400).send({ message: 'Task title or prompt is required' });
               return;
          }

          const dateKey = getUtcDateKey();
          const usageRecord = await AIUsageModel.findOne({ userId, dateKey });

          if (usageRecord && usageRecord.count >= AI_DAILY_LIMIT) {
               res.status(429).send({
                    message: `AI daily limit reached. You can use it ${AI_DAILY_LIMIT} times per day.`
               });
               return;
          }

          await AIUsageModel.findOneAndUpdate(
               { userId, dateKey },
               {
                    $setOnInsert: { userId, dateKey },
                    $inc: { count: 1 },
                    $set: { lastRequestAt: new Date() },
               },
               { upsert: true, new: true }
          );

          next();
     } catch (error) {
          console.log('error in consumeAiUsage middleware:', error);
          res.status(500).send({ message: error.message, error });
     }
};

module.exports = consumeAiUsage;
