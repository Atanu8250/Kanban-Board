const AIUsageModel = require('../models/aiUsage.model');

const AI_MINUTE_LIMIT = 2;
const ONE_MINUTE_MS = 60 * 1000;

const getUtcDateKey = () => new Date().toISOString().slice(0, 10);

const consumeAiUsagePerMinute = async (req, res, next) => {
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
        const now = new Date();
        const usageRecord = await AIUsageModel.findOne({ userId, dateKey });

        const recentRequestTimestamps = (usageRecord?.requestTimestamps || []).filter((time) => (now - new Date(time)) < ONE_MINUTE_MS);

        if (recentRequestTimestamps.length >= AI_MINUTE_LIMIT) {
            res.status(429).send({
                message: `Too many AI requests. Please wait a minute and try again. Limit is ${AI_MINUTE_LIMIT} request(s) per minute.`
            });
            return;
        }

        if (usageRecord) {
            usageRecord.requestTimestamps = [...recentRequestTimestamps, now];
            usageRecord.lastRequestAt = now;
            await usageRecord.save();
        } else {
            await AIUsageModel.create({
                userId,
                dateKey,
                count: 0,
                lastRequestAt: now,
                requestTimestamps: [now],
            });
        }

        next();
    } catch (error) {
        console.log('error in consumeAiUsagePerMinute middleware:', error);
        res.status(500).send({ message: error.message, error });
    }
};

module.exports = consumeAiUsagePerMinute;
