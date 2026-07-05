-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 21 Jun 2026 pada 11.46
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `absensi_qr`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `absensi`
--

CREATE TABLE `absensi` (
  `id` int(11) NOT NULL,
  `npm` varchar(20) DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `tanggal` timestamp NULL DEFAULT NULL,
  `jam` time DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `device_id` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin123');

-- --------------------------------------------------------

--
-- Struktur dari tabel `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `id` int(11) NOT NULL,
  `npm` varchar(20) DEFAULT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `jenis_kelamin` varchar(20) DEFAULT NULL,
  `device_id` varchar(100) DEFAULT NULL,
  `jumlah_hadir` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `mahasiswa`
--

INSERT INTO `mahasiswa` (`id`, `npm`, `nama`, `jenis_kelamin`, `device_id`, `jumlah_hadir`) VALUES
(1, '2304190044', 'MUHAMMAD YUSUF CHANIAGO', 'LAKI LAKI', NULL, 0),
(2, '2304190045', 'FADLI IBRAHIM PULUNGAN', 'LAKI LAKI', NULL, 0),
(3, '2304190046', 'RAHMAD SYAHPUTRA PRATAMA', 'LAKI LAKI', NULL, 0),
(5, '2304190048', 'RAMADHAN HARAHAP', 'LAKI LAKI', NULL, 0),
(8, '2304190051', 'SHEILA PUSPITA SARI', 'PEREMPUAN', NULL, 0),
(9, '2304190052', 'ULFAN MARDIANSYAH LUBIS', 'LAKI LAKI', NULL, 0),
(10, '2304190053', 'NIKE SILALAHI', 'PEREMPUAN', 'dev-vprne6ycg', 0),
(11, '2304190054', 'SOPA RAMADANI', 'PEREMPUAN', NULL, 0),
(12, '2304190055', 'SAMIR', 'LAKI LAKI', NULL, 0),
(13, '2304190056', 'RENDY FITRAH HARAHAP', 'LAKI LAKI', NULL, 0),
(14, '2304190057', 'ALISA PUTRI TANJUNG', 'PEREMPUAN', NULL, 0),
(15, '2304190058', 'RIZKY HASIBUAN', 'LAKI LAKI', NULL, 0),
(16, '2304190059', 'MELI HANDAYANI', 'PEREMPUAN', NULL, 0),
(17, '2304190060', 'NOVRIZAL RAMADHAN HARAHAP', 'LAKI LAKI', NULL, 0),
(18, '2304190061', 'DIO ARDIANSYAH', 'LAKI LAKI', NULL, 0),
(19, '2304190062', 'AZZAHRA USWATUL SALWA HARAHAP', 'PEREMPUAN', NULL, 0),
(20, '2304190063', 'ZALALUDDIN PANE', 'LAKI LAKI', NULL, 0),
(21, '2304190064', 'AISYAH RAMADHANI BATUBARA', 'PEREMPUAN', 'dev-8clng290t', 0),
(22, '2304190065', 'FILZAH HANANI', 'PEREMPUAN', NULL, 0),
(23, '2304190066', 'ZIDANE AKBAR', 'LAKI LAKI', NULL, 0),
(24, '2304190067', 'ALFIN GUNTUR HAMONANGON', 'LAKI LAKI', NULL, 0),
(25, '2304190068', 'RIZKY SHALSABILA', 'PEREMPUAN', NULL, 0),
(26, '2304190069', 'DINDA SYARA', 'PEREMPUAN', NULL, 0),
(27, '2304190070', 'YUSRIL RASYID HASIBUAN', 'LAKI LAKI', NULL, 0),
(28, '2304190071', 'RIYAN RIFANSYAH HARAHAP', 'LAKI LAKI', NULL, 0),
(29, '2304190073', 'PRATIWI OKTARIA TANJUNG', 'PEREMPUAN', NULL, 0),
(30, '2304190074', 'AISAH REZKI', 'PEREMPUAN', NULL, 0),
(31, '2304190075', 'BEMA NUARA GUSTI', 'LAKI LAKI', NULL, 0),
(32, '2304190076', 'RIANSYAH', 'LAKI LAKI', NULL, 0),
(33, '2304190078', 'LILI RAHMA WITA NASUTION', 'PEREMPUAN', NULL, 0),
(34, '2304190079', 'ILHAM SAHDI NASUTION', 'LAKI LAKI', NULL, 0),
(35, '2304190080', 'ILHAM SYUKUR HARAHAP', 'LAKI LAKI', NULL, 0),
(36, '2304190081', 'INTAN JUMANTI', 'PEREMPUAN', NULL, 0),
(37, '2304190082', 'YUDHIKA FERDY KURNIAWAN', 'LAKI LAKI', NULL, 0),
(38, '2304190083', 'ALDI PRATAMA RANGKUTI', 'LAKI LAKI', NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `absensi`
--
ALTER TABLE `absensi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `absensi`
--
ALTER TABLE `absensi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `mahasiswa`
--
ALTER TABLE `mahasiswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
