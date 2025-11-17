const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

// قاعدة بيانات حقيقية في الذاكرة
let db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run("CREATE TABLE users (id INT, username TEXT, password TEXT, email TEXT)");
    db.run("INSERT INTO users VALUES (1, 'admin', 'Admin123!', 'admin@cybersec.com')");
    db.run("INSERT INTO users VALUES (2, 'user1', 'UserPass456!', 'user1@test.com')");
    db.run("CREATE TABLE secrets (id INT, key_name TEXT, key_value TEXT)");
    db.run("INSERT INTO secrets VALUES (1, 'API_KEY', 'sk_live_51aBcDeFgHiJkLmNoPqRsTuVwXyZ')");
    db.run("INSERT INTO secrets VALUES (2, 'DB_PASSWORD', 'MySQL_Root_Pass_2024!')");
});

// 🔥 ثغرة SQL Injection حقيقية
app.get('/api/users', (req, res) => {
    const userId = req.query.id;
    
    // VULNERABLE: string concatenation مباشر
    const query = SELECT * FROM users WHERE id = ${userId};
    
    db.all(query, (err, rows) => {
        if(err) {
            res.json({ error: err.message, query: query });
        } else {
            res.json({ results: rows, query: query });
        }
    });
});

// 🔥 ثغرة أخرى في البحث
app.get('/api/search', (req, res) => {
    const searchTerm = req.query.q;
    
    // VULNERABLE: لا يوجد input sanitization
    const query = SELECT * FROM users WHERE username LIKE '%${searchTerm}%' OR email LIKE '%${searchTerm}%';
    
    db.all(query, (err, rows) => {
        res.json({ 
            results: rows, 
            query: query,
            vulnerable: true 
        });
    });
});

// 🔥 ثغرة في Login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    // VULNERABLE: SQL Injection في Login
    const query = SELECT * FROM users WHERE username = '${username}' AND password = '${password}';
    
    db.all(query, (err, rows) => {
        if(rows.length > 0) {
            res.json({ success: true, user: rows[0], query: query });
        } else {
            res.json({ success: false, query: query });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log( Vulnerable server running on port ${PORT});
    console.log(' SQL Injection endpoints:');
    console.log('   GET  /api/users?id=1');
    console.log('   GET  /api/search?q=test');
    console.log('   POST /api/login');
});
