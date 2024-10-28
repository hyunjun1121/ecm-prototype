import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import TransactionLogDashboard from './pages/TransactionLogDashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transaction-logs" element={<TransactionLogDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
