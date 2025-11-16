const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 🔥 قاعدة بيانات وهمية (للمحاكاة)
let vulnerableDatabase = [
    { id: 1, name: 'Ethical Hacking', price: 497, instructor: 'John Smith' },
    { id: 2, name: 'Web Security', price: 397, instructor: 'Sarah Johnson' },
    { id: 3, name: 'Cloud Security', price: 597, instructor: 'Mike Chen' }
];

// 🔥 ثغرة SQL Injection حقيقية في API
app.get('/api/search', (req, res) => {
    const searchTerm = req.query.q || '';
    
    // VULNERABLE CODE - SQL Injection simulation
    console.log('Search term:', searchTerm);
    
    let results = [];
    
    // محاكاة SQL Injection
    if (searchTerm.includes("' OR '1'='1") || searchTerm.includes("' OR 1=1--")) {
        // يرجع كل البيانات
        results = [...vulnerableDatabase];
    } 
    else if (searchTerm.includes("' UNION SELECT")) {
        // محاولة استخراج بيانات حساسة
        results = [
            ...vulnerableDatabase,
            { id: 999, name: 'ADMIN_USER', price: 0, instructor: 'username: admin, password: Admin123!' },
            { id: 1000, name: 'DATABASE_INFO', price: 0, instructor: 'DB: mysql://root:pass@localhost/cybersec' }
        ];
    }
    else if (searchTerm.includes("'; DROP")) {
        // محاكاة هدم قاعدة البيانات
        results = [{ id: 0, name: 'DATABASE_DROPPED', price: 0, instructor: 'SYSTEM COMPROMISED' }];
    }
    else {
        // بحث عادي
        results = vulnerableDatabase.filter(course => 
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    res.json({
        query: SELECT * FROM courses WHERE name LIKE '%${searchTerm}%',
        results: results,
        vulnerable: true
    });
});

// 🔥 ثغرة في Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // VULNERABLE: SQL Injection في Login
    if (email.includes("' OR '1'='1") || email.includes("' OR 1=1--")) {
        res.json({ 
            success: true, 
            message: "SQL Injection Successful!",
            user: { name: "HACKED ADMIN", role: "admin", balance: 9999 }
        });
    } else {
        res.json({ 
            success: false, 
            message: "Invalid credentials" 
        });
    }
});

app.listen(3000, () => {
    console.log('Vulnerable server running on port 3000');
});
