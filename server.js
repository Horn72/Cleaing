const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'database-1.crsqe2mgquf6.ap-southeast-2.rds.amazonaws.com', // RDS 엔드포인트
  user: 'admin',     // RDS 사용자 이름
  password: 'jinwoo8228', // RDS 비밀번호
  database: 'database-1'  // 데이터베이스 이름
});

db.connect(err => {
  if (err) {
    console.error('MySQL 연결 실패: ', err);
    return;
  }
  console.log('MySQL에 연결되었습니다.');
});

// // 데이터 수신 및 저장
// app.post('/submit', (req, res) => {
//   const { name, phone_num, address, secret_num } = req.body;

//   const query = 'INSERT INTO your_table (name, phone_num, address, secret_num) VALUES (?, ?, ?, ?)';
//   db.query(query, [name, phone_num, address, secret_num], (err, result) => {
//     if (err) {
//       console.error('데이터 삽입 실패: ', err);
//       res.status(500).send('서버 오류');
//       return;
//     }
//     res.send('데이터가 성공적으로 저장되었습니다.');
//   });
// });

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
