const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const QRCode = require("qrcode");
const XLSX = require("xlsx");

const app = express();
const session = require("express-session");
app.use(
  session({
    secret: "absensi-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  const token = req.query.token;

  // cek token

  if (token !== qrToken) {
    return res.send(`

      <html>

      <head>

      <title>QR Expired</title>

      <style>

      body{
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
        flex-direction:column;
        font-family:Arial;
      }

      </style>

      </head>

      <body>

      <h1>❌ QR SUDAH EXPIRED</h1>

      <p>Silakan scan QR terbaru</p>

      </body>

      </html>

    `);
  }
    req.session.qrValid = true;
  // kalau token valid
  res.sendFile(__dirname + "/public/index.html");
});
app.use(express.static("public"));

const PORT = 3000;
// const express = require("express");

// const app = express();

app.get("/", (req, res) => {
    res.send("Hello Vercel");
});

module.exports = app;
// const BASE_URL = "https://unclothed-coke-educator.ngrok-free.dev";

// =========================
// QR TOKEN
// =========================

let qrToken = generateToken();
let expiredAt = Date.now() + 20 * 1000;

function generateToken() {
  return Math.random().toString(36).substring(2, 10);
}

// refresh tiap 10 detik
setInterval(() => {
  qrToken = generateToken();

  expiredAt = Date.now() + 20 * 1000;

  console.log("QR REFRESH:", qrToken);
}, 20 * 1000);

// =========================
// START SERVER
// =========================

// app.listen(PORT, () => {
//   console.log(`Server running on ${PORT}`);
// });

// =========================
// GET MAHASISWA
// =========================

app.get("/mahasiswa", (req, res) => {
  db.query("SELECT * FROM mahasiswa", (err, result) => {
    if (err) throw err;

    res.json(result);
  });
});

// =========================
// QR GENERATOR
// =========================
app.get("/qr", async (req, res) => {
  try {
    const url = `${BASE_URL}/?token=${qrToken}`;

    const qr = await QRCode.toDataURL(url);

    res.json({
      qr,
      expired: expiredAt,
    });
  } catch (err) {
    res.json({
      error: true,
    });
  }
});


app.get("/show-qr", (req, res) => {
  res.send(`

<!DOCTYPE html>
<html lang="id">

<head>

<meta charset="UTF-8">
<title>PresenTI - QR Absensi</title>

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Segoe UI',sans-serif;
}

body{
background:linear-gradient(135deg,#dfe9ff,#edf3ff);
min-height:100vh;
padding:30px;
}

.container{
max-width:1400px;
margin:auto;
}

.logo{
text-align:center;
margin-bottom:20px;
}

.logo h1{
font-size:60px;
font-weight:bold;
color:#0b1d61;
}

.logo span{
color:#2f7cff;
}

.logo p{
font-size:24px;
color:#555;
}

.title{
text-align:center;
font-size:50px;
font-weight:bold;
margin-bottom:20px;
color:#0b1d61;
}

.main{
display:grid;
grid-template-columns:300px 1fr 320px;
gap:25px;
align-items:start;
}

.card{
background:white;
border-radius:25px;
padding:25px;
box-shadow:0 10px 25px rgba(0,0,0,.08);
}

.card h2{
margin-bottom:20px;
color:#0b1d61;
}

.info{
margin-bottom:20px;
padding-bottom:15px;
border-bottom:1px solid #eee;
}

.info strong{
display:block;
font-size:15px;
color:#777;
}

.info span{
font-size:22px;
font-weight:bold;
}

.center{
text-align:center;
}

.qr-box{
background:white;
padding:30px;
border-radius:30px;
display:inline-block;
box-shadow:0 10px 25px rgba(0,0,0,.1);
}

#qrImage{
width:350px;
}

.timer-box{
margin-top:25px;
display:inline-flex;
align-items:center;
gap:10px;
padding:15px 40px;
background:linear-gradient(
90deg,
#1f6dff,
#8f54ff
);
border-radius:50px;
color:white;
font-size:40px;
font-weight:bold;
}

.badge{
display:inline-block;
margin-bottom:20px;
padding:10px 20px;
background:#5d7cff;
color:white;
border-radius:30px;
}

.step{
background:#f7f9ff;
padding:15px;
border-radius:15px;
margin-bottom:15px;
font-size:18px;
}

</style>

</head>

<body>

<div class="container">

<div class="logo">

<h1>Scan<span>TI</span></h1>

<p>Sistem Absensi Mahasiswa</p>

</div>

<div class="title">

QR ABSENSI MAHASISWA

</div>

<div class="main">

<div class="card">

<h2>📘 Informasi Kelas</h2>

<div class="info">
<strong>Mata Kuliah</strong>
<span>IT Project Portfolio</span>
</div>

<div class="info">
<strong>Dosen</strong>
<span>Alfiansyah Halomoan Siregar,M.Kom</span>
</div>

<div class="info">
<strong>Pertemuan</strong>
<span>16</span>
</div>

<div class="info">
<strong>Tanggal</strong>
<span id="tanggal"></span>
</div>

<div class="info">
<strong>Waktu</strong>
<span id="jam"></span>
</div>

</div>

<div class="center">

<div class="badge">
📱 Scan QR ini untuk melakukan absensi
</div>

<div class="qr-box">

<img id="qrImage">

</div>

<br>

<h2 style="margin-top:20px">
QR AKTIF DALAM
</h2>

<div class="timer-box">

<span id="timer">
20
</span>

DETIK

</div>

</div>

<div class="card">

<h2>📷 Cara Absen</h2>

<div class="step">
1. Scan QR Code menggunakan HP mahasiswa.
</div>

<div class="step">
2. Pilih nama mahasiswa.
</div>

<div class="step">
3. Klik tombol Absen Sekarang.
</div>

<div class="step">
4. Kehadiran akan tercatat otomatis.
</div>

</div>

</div>

</div>

<script>

async function loadQR(){

const res =
await fetch('/qr');

const data =
await res.json();

document
.getElementById('qrImage')
.src = data.qr;

}

loadQR();

setInterval(()=>{

loadQR();

timeLeft = 20;

},10000);

let timeLeft = 20;

setInterval(()=>{

document
.getElementById('timer')
.innerHTML = timeLeft;

timeLeft--;

if(timeLeft < 0){

timeLeft = 20;

}

},1000);

function updateClock(){

const now =
new Date();

document
.getElementById('tanggal')
.innerHTML =
now.toLocaleDateString('id-ID');

document
.getElementById('jam')
.innerHTML =
now.toLocaleTimeString('id-ID');

}

updateClock();

setInterval(updateClock,1000);

</script>

</body>

</html>

`);
});

app.post("/absen", (req, res) => {
    if (!req.session.qrValid) {
    return res.json({
      status: "error",
      message: "Silakan scan QR kembali"
    });
  }
  const { nama, npm, device_id, token } = req.body;

  const today = new Date().toISOString().split("T")[0];

  // =========================
  // VALIDASI TOKEN QR
  // =========================

  // if (token !== qrToken) {
  //   return res.json({
  //     status: "error",

  //     message: "QR sudah expired, silakan scan ulang",
  //   });
  // }
  

  // =========================
  // CEK MAHASISWA
  // =========================

  db.query(
    "SELECT * FROM mahasiswa WHERE npm=?",

    [npm],

    (err, mhsResult) => {
      if (err) throw err;

      if (mhsResult.length === 0) {
        return res.json({
          status: "error",

          message: "Mahasiswa tidak ditemukan",
        });
      }

      const mahasiswa = mhsResult[0];

      // =========================
      // DEVICE PERTAMA
      // =========================

      if (!mahasiswa.device_id) {
        db.query(
          "UPDATE mahasiswa SET device_id=? WHERE npm=?",

          [device_id, npm],

          (err) => {
            if (err) throw err;

            lanjutAbsen();
          },
        );
      } else {
        // device berbeda

        if (mahasiswa.device_id !== device_id) {
          return res.json({
            status: "error",

            message: "Harus menggunakan HP pertama",
          });
        }

        lanjutAbsen();
      }

      // =========================
      // ABSEN
      // =========================

      function lanjutAbsen() {
        db.query(
          "SELECT * FROM absensi WHERE npm=? AND tanggal=?",

          [npm, today],

          (err, absenResult) => {
            if (err) throw err;

            if (absenResult.length > 0) {
              return res.json({
                status: "error",

                message: "Sudah absen hari ini",
              });
            }

            db.query(
              `INSERT INTO absensi
(npm,nama,tanggal,jam,status,device_id)
VALUES(?,?,?,?,?,?)`,

              [npm, nama, today, new Date(), "Hadir", device_id],

              (err) => {
                if (err) throw err;

                db.query(
                  `UPDATE mahasiswa
     SET jumlah_hadir = jumlah_hadir + 1
     WHERE npm=?`,

                  [npm],

                  (err) => {
                    if (err) throw err;
                    req.session.qrValid = false;
                    res.json({
                      status: "success",
                      message: "Absensi berhasil",
                    });
                  },
                );
              },
            );
          },
        );
      }
    },
  );
});

// =========================
// DATA ADMIN
// =========================

app.get("/admin-data", (req, res) => {
  db.query(
    `
    SELECT 
    mahasiswa.npm,
    mahasiswa.nama,
    mahasiswa.jumlah_hadir,
    absensi.tanggal,
    absensi.jam,
    absensi.status

    FROM mahasiswa

    LEFT JOIN absensi
    ON mahasiswa.npm = absensi.npm

    ORDER BY mahasiswa.npm ASC
  `,
    (err, result) => {
      if (err) throw err;

      res.json(result);
    },
  );
});

// =========================
// DOWNLOAD EXCEL
// =========================

app.get("/download-excel", (req, res) => {
  db.query(
    `
    SELECT 
    npm,
    nama,
    tanggal,
    status

    FROM absensi
  `,
    (err, result) => {
      if (err) throw err;

      const workbook = XLSX.utils.book_new();

      const worksheet = XLSX.utils.json_to_sheet(result);

      XLSX.utils.book_append_sheet(workbook, worksheet, "Absensi");

      const fileName = "data_absensi.xlsx";

      XLSX.writeFile(workbook, fileName);

      res.download(fileName);
    },
  );
});

// ADMIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM admin WHERE username=? AND password=?",
    [username, password],
    (err, result) => {
      if (err) throw err;

      if (result.length > 0) {
        req.session.admin = username;

        return res.json({
          success: true,
        });
      }

      res.json({
        success: false,
        message: "Username atau Password salah",
      });
    },
  );
});

function checkLogin(req, res, next) {
  if (req.session.admin) {
    next();
  } else {
    res.redirect("/login.html");
  }
}

app.get("/dashboard", checkLogin, (req, res) => {
  res.sendFile(__dirname + "/public/dashboard.html");
});

app.post("/mahasiswa", checkLogin, (req, res) => {
  const { npm, nama, prodi } = req.body;

  db.query(
    `INSERT INTO mahasiswa
(npm,nama,prodi)
VALUES(?,?,?)`,

    [npm, nama, prodi],

    (err) => {
      if (err) throw err;

      res.json({
        success: true,
      });
    },
  );
});

app.put("/mahasiswa/:id", checkLogin, (req, res) => {
  const id = req.params.id;

  const { nama, prodi } = req.body;

  db.query(
    `UPDATE mahasiswa
SET nama=?,prodi=?
WHERE id=?`,

    [nama, prodi, id],

    (err) => {
      if (err) throw err;

      res.json({
        success: true,
      });
    },
  );
});

app.delete("/mahasiswa/:id", checkLogin, (req, res) => {
  db.query(
    "DELETE FROM mahasiswa WHERE id=?",

    [req.params.id],

    (err) => {
      if (err) throw err;

      res.json({
        success: true,
      });
    },
  );
});

app.get("/admin-data", (req, res) => {
  db.query(
    `
    SELECT
      m.id,
      m.npm,
      m.nama,

      COUNT(a.id) AS jumlah_hadir,

      MAX(a.tanggal) AS tanggal_terakhir

    FROM mahasiswa m

    LEFT JOIN absensi a
    ON m.npm = a.npm

    GROUP BY
    m.id,
    m.npm,
    m.nama

    ORDER BY m.npm ASC

  `,
    (err, result) => {
      if (err) throw err;

      res.json(result);
    },
  );
});

app.get("/dashboard-stats", checkLogin, (req, res) => {
  db.query("SELECT COUNT(*) total FROM mahasiswa", (err, mhs) => {
    db.query(
      "SELECT COUNT(*) hadir FROM absensi WHERE tanggal=CURDATE()",
      (err, hadir) => {
        db.query("SELECT COUNT(*) total_absensi FROM absensi", (err, absen) => {
          res.json({
            totalMahasiswa: mhs[0].total,

            hadirHariIni: hadir[0].hadir,

            totalAbsensi: absen[0].total_absensi,
          });
        });
      },
    );
  });
});

app.get("/statistik-harian", checkLogin, (req, res) => {
  db.query(
    `
SELECT
tanggal,
COUNT(*) jumlah_hadir
FROM absensi
GROUP BY tanggal
ORDER BY tanggal DESC
`,

    (err, result) => {
      if (err) throw err;

      res.json(result);
    },
  );
});
