const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const TransactionLog = require('./models/TransactionLog'); // 트랜잭션 로그 모델

dotenv.config();
const app = express();
app.use(express.json());

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// 트랜잭션 로그 스키마 및 모델
app.get('/transaction/logs', async (req, res) => {
    const { startDate, endDate } = req.query;
    const filter = {};

    if (startDate) filter.timestamp = { $gte: new Date(startDate) };
    if (endDate) {
        filter.timestamp = filter.timestamp || {};
        filter.timestamp.$lte = new Date(endDate);
    }

    try {
        const logs = await TransactionLog.find(filter).sort({ timestamp: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: '트랜잭션 로그를 불러오는 중 오류가 발생했습니다.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
