# CyberSec Academy - Vulnerable Web Application

## Overview
This is an intentionally vulnerable web application designed for cybersecurity education and penetration testing practice.

## Features
- SQL Injection vulnerabilities in search and login
- Exposed API keys and credentials
- Client-side authentication bypass
- No input sanitization
- Detailed vulnerability demonstrations

## Quick Start

### Frontend (Netlify)
1. Upload index.html to Netlify
2. Update BACKEND_URL in the JavaScript to your server URL

### Backend (Render/Heroku)
1. Deploy this repository to Render/Heroku
2. The server will start automatically

## Vulnerabilities

### 1. SQL Injection
*Endpoints:*
- GET /api/search?q=TERM
- POST /api/login
- GET /api/users?id=ID

*Test Payloads:*
```sql
' OR '1'='1
' UNION SELECT 1,2,3--
'; DROP TABLE users--
' OR SLEEP(5)--
