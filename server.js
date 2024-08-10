const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL 연결 설정
const db = mysql.createConnection({
    host: 'database-1.crsqe2mgquf6.ap-southeast-2.rds.amazonaws.com',  // AWS RDS 엔드포인트
    user: 'admin',      // 사용자 이름
    password: 'jinwoo8228',  // 비밀번호
    database: 'cleaing_return'   // 데이터베이스 이름
});

// MySQL 연결
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// 데이터 삽입 API 엔드포인트
app.post('/submit', (req, res) => {
    const { name, phone_num, address, secret_num } = req.body;
    const query = 'INSERT INTO request_return (name, phone_num, address, secret_num) VALUES (?, ?, ?, ?)';
    db.query(query, [name, phone_num, address, secret_num], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err.stack);
            res.status(500).send('Error inserting data');
            return;
        }
        res.send('Data inserted successfully');
    });
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});