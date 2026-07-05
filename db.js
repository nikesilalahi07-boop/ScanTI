const mysql = require('mysql2');


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'absensi_qr'
});

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'scaw3891_absen',
//   password: '@bsen2026',
//   database: 'scaw3891_absensi_db'
// });

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');
});

module.exports = db;