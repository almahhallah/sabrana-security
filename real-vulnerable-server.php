<?php
// ثغرة SQL Injection حقيقية
$servername = "localhost";
$username = "root"; 
$password = "";
$dbname = "test";

// أنشئ قاعدة بيانات للتجربة
$conn = new mysqli($servername, $username, $password);
$conn->query("CREATE DATABASE IF NOT EXISTS test");
$conn->query("USE test");
$conn->query("CREATE TABLE IF NOT EXISTS users (id INT, name VARCHAR(100))");
$conn->query("INSERT INTO users VALUES (1, 'Admin User')");

// VULNERABLE CODE - SQL Injection حقيقي
$user_input = $_GET['id'];
$sql = "SELECT * FROM users WHERE id = $user_input";
$result = $conn->query($sql);

while($row = $result->fetch_assoc()) {
    echo "User: " . $row['name'];
}
$conn->close();
?>
