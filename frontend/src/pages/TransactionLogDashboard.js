import React, { useState, useEffect } from 'react';
import API from '../api';

function TransactionLogDashboard() {
    const [logs, setLogs] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchTransactionLogs = async () => {
        try {
            const response = await API.get('/transaction/logs', {
                params: { startDate, endDate }
            });
            setLogs(response.data);
        } catch (error) {
            console.error("트랜잭션 로그를 불러오는 중 오류 발생:", error);
        }
    };

    return (
        <div>
            <h2>트랜잭션 로그 대시보드</h2>
            <div>
                <label>시작 날짜: </label>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <label>종료 날짜: </label>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <button onClick={fetchTransactionLogs}>로그 조회</button>
            </div>
            <ul>
                {logs.map((log, index) => (
                    <li key={index}>
                        <p><strong>트랜잭션 ID:</strong> {log.transactionId}</p>
                        <p><strong>사용자 ID:</strong> {log.userId}</p>
                        <p><strong>타임스탬프:</strong> {new Date(log.timestamp).toLocaleString()}</p>
                        <p><strong>결과:</strong> {log.result}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TransactionLogDashboard;
