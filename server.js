const express = require('express');
const app = express();

//  ثغرة SQL Injection حقيقية بمحاكاة قاعدة بيانات
app.get('/api/vulnerable', (req, res) => {
    const userInput = req.query.id;
    
    // VULNERABLE CODE - SQL Injection
    const fakeQuery = SELECT * FROM users WHERE id = ${userInput};
    
    // محاكاة استجابة قاعدة بيانات
    let results = [];
    if (userInput.includes("' OR '1'='1") || userInput === "1") {
        results = [{ id: 1, name: 'Admin', email: 'admin@test.com' }];
    }
    if (userInput.includes("UNION")) {
        results = [
            { id: 1, name: 'Admin', email: 'admin@test.com' },
            { id: 2, name: 'User', email: 'user@test.com', password: 'secret123' }
        ];
    }
    
    res.json({ 
        query: fakeQuery, 
        results: results,
        vulnerable: true 
    });
});

module.exports = app;
