const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// قاعدة بيانات وهمية (للمحاكاة)
let vulnerableDatabase = [
    { id: 1, name: 'Ethical Hacking Professional', price: 497, instructor: 'John Smith' },
    { id: 2, name: 'Web Security Expert', price: 397, instructor: 'Sarah Johnson' },
    { id: 3, name: 'Cloud Security Architect', price: 597, instructor: 'Mike Chen' },
    { id: 4, name: 'Network Defense', price: 347, instructor: 'Alex Rodriguez' },
    { id: 5, name: 'Digital Forensics', price: 447, instructor: 'Emily Davis' }
];

// بيانات حساسة (سيتم كشفها عبر SQL Injection)
const sensitiveData = [
    { id: 999, name: 'ADMIN_USER', price: 0, instructor: 'Username: admin, Password: Admin123!, Email: admin@cybersec.com' },
    { id: 1000, name: 'DATABASE_INFO', price: 0, instructor: 'MySQL Connection: mysql://root:CyberSec2024!@localhost/prod_db' },
    { id: 1001, name: 'API_KEYS', price: 0, instructor: 'Stripe: sk_live_51MbXy2KvI8Tk4Pw9L3jH6nG7fDcE5rT, AWS: AKIAIOSFODNN7EXAMPLE' },
    { id: 1002, name: 'SYSTEM_CONFIG', price: 0, instructor: 'JWT Secret: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9, Debug: true' }
];

// ثغرة SQL Injection حقيقية في API
app.get('/api/search', (req, res) => {
    const searchTerm = req.query.q || '';
    
    // VULNERABLE CODE - SQL Injection simulation
    console.log('Search term received:', searchTerm);
    
    let results = [];
    let query = SELECT * FROM courses WHERE name LIKE '%${searchTerm}%' OR instructor LIKE '%${searchTerm}%';
    
    // محاكاة SQL Injection
    if (searchTerm.includes("' OR '1'='1") || searchTerm.includes("' OR 1=1--")) {
        // يرجع كل البيانات
        results = [...vulnerableDatabase];
        query = SELECT * FROM courses WHERE name LIKE '%${searchTerm}%' OR '1'='1';
    } 
    else if (searchTerm.includes("' UNION SELECT") || searchTerm.includes("UNION ALL SELECT")) {
        // محاولة استخراج بيانات حساسة
        results = [
            ...vulnerableDatabase,
            ...sensitiveData  // كشف البيانات الحساسة!
        ];
        query = SELECT * FROM courses WHERE name LIKE '%${searchTerm}%' UNION SELECT * FROM users, system_config, api_keys;
    }
    else if (searchTerm.includes("'; DROP") || searchTerm.includes("'; DELETE")) {
        // محاكاة هدم قاعدة البيانات
        results = [{ id: 0, name: 'DATABASE_DROPPED', price: 0, instructor: 'CRITICAL: Database tables dropped - SYSTEM COMPROMISED' }];
        query = SELECT * FROM courses WHERE name LIKE '%${searchTerm}%'; DROP TABLE users; DROP TABLE courses;--;
    }
    else if (searchTerm.includes("' AND SLEEP") || searchTerm.includes("BENCHMARK")) {
        // محاكاة Time-based SQL Injection
        results = [{ id: 0, name: 'TIME_DELAY_DETECTED', price: 0, instructor: 'Time-based SQL Injection successful - Database vulnerable to blind SQLi' }];
        query = SELECT * FROM courses WHERE name LIKE '%${searchTerm}%' AND SLEEP(5)--;
    }
    else {
        // بحث عادي
        results = vulnerableDatabase.filter(course => 
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    res.json({
        query: query,
        results: results,
        vulnerable: true,
        message: "This endpoint is vulnerable to SQL Injection"
    });
});

// ثغرة في Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // VULNERABLE: SQL Injection في Login
    const query = SELECT * FROM users WHERE email = '${email}' AND password = '${password}';
    
    if (email.includes("' OR '1'='1") || email.includes("' OR 1=1--")) {
        res.json({ 
            success: true, 
            message: "SQL Injection Successful! Authentication bypassed.",
            user: { 
                name: "HACKED ADMIN ACCOUNT", 
                role: "admin", 
                balance: 9999,
                email: "hacked@system.com" 
            },
            query: query
        });
    } 
    else if (email.includes("' UNION SELECT")) {
        res.json({ 
            success: true, 
            message: "UNION-Based SQL Injection Successful!",
            user: { 
                name: "UNION INJECTION", 
                role: "super-admin", 
                balance: 100000,
                email: "union@injection.com" 
            },
            query: query
        });
    }
    else if (email === 'admin@cybersec.com' && password === 'Admin123!') {
        res.json({ 
            success: true, 
            user: { 
                name: "System Admin", 
                role: "admin", 
                balance: 10000,
                email: "admin@cybersec.com" 
            }
        });
    }
    else if (email === 'student@academy.com' && password === 'StudentPass2024!') {
        res.json({ 
            success: true, 
            user: { 
                name: "John Doe", 
                role: "student", 
                balance: 500,
                email: "student@academy.com" 
            }
        });
    }
    else {
        res.json({ 
            success: false, 
            message: "Invalid credentials",
            query: query
        });
    }
});

// endpoint إضافي vulnerable
app.get('/api/users', (req, res) => {
    const userId = req.query.id || '';
    
    // VULNERABLE: SQL Injection في parameter
    const query = SELECT * FROM users WHERE id = ${userId};
    
    let userData = { id: 1, name: 'Test User', email: 'test@test.com' };
    
    if (userId.includes('UNION') || userId.includes('OR 1=1')) {
        userData = {
            id: 'INJECTED',
            name: 'SQL Injection Successful',
            email: 'hacked@system.com',
            password: 'ExposedPassword123!',
            credit_card: '4111-1111-1111-1111'
        };
    }
    
    res.json({
        query: query,
        user: userData,
        vulnerable: true
    });
});

app.get('/', (req, res) => {
    res.json({
        message: "Vulnerable Web Application Backend",
        endpoints: {
            search: "/api/search?q=term",
            login: "/api/login (POST)",
            users: "/api/users?id=1"
        },
        note: "This server contains intentional SQL Injection vulnerabilities for educational purposes"
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(Vulnerable server running on port ${PORT});
    console.log('SQL Injection endpoints available:');
    console.log('- GET  /api/search?q=term');
    console.log('- POST /api/login');
    console.log('- GET  /api/users?id=1');
});
