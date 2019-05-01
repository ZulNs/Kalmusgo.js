# Dokumentasi API Kalender Musim Gorontalo

&nbsp;

## Konstruktor
### Sintaks
```javascript
new Kalmusgo([modeHijriah[, tahun[, indeksBulan[, mulaiHari[, bahasa[, warnaTema[, timeout]]]]]]]);
```

### Parameter-Parameter
- **`modeHijriah`** (optional)<br>
  Bilangan boolean yang menunjukkan mode kalender:<br>
  `true`: kalender Hijriah<br>
  `false`: kalender Masehi<br>
  Default: `false`

- **`tahun`** (optional)<br>
  Bilangan bulat yang menunjukkan angka tahun kalender. Bisa diisi dengan angka dibawah 1 (0 atau bilangan negatif) yang menunjukkan penanggalan sebelum Hijriah/Masehi. Angka 0 berarti 1 SH/SM, -1 berarti 2 SH/SM, dan seterusnya.<br>
  Default: tahun sekarang

- **`indeksBulan`** (optional)<br>
  Bilangan bulat yang menunjukkan angka indeks bulan kalender, mulai dari 0 untuk bulan Muharam/Januari hingga 11 untuk bulan Dzul-Hijjah/Desember.<br>
  Default: indeks dari bulan sekarang

- **`mulaiHari`** (optional)<br>
  Bilangan bulat yang menunjukkan hari pertama dalam mingguan (0-6), angka 0 untuk hari Senin hingga 6 untuk hari Sabtu.<br>
  Default: `1` (hari Senin)

- **`bahasa`** (optional)<br>
  Nilai string yang menunjukkan bahasa yang digunakan. Hanya mendukung bahasa Indonesia saja.<br>
  `"id"`: bahasa Indonesia<br>
  Default: `"id"`

- **`warnaTema`** (optional)<br>
  Bilangan bulat yang menunjukkan indeks warna tema (0-22) atau nilai string berupa warna yang digunakan.<br>
  <code>&nbsp;0</code> atau `"amber"`<br>
  <code>&nbsp;1</code> atau `"aqua"`<br>
  <code>&nbsp;2</code> atau `"black"`<br>
  <code>&nbsp;3</code> atau `"blue"`<br>
  <code>&nbsp;4</code> atau `"blue-grey"`"<br>
  <code>&nbsp;5</code> atau `"brown"`<br>
  <code>&nbsp;6</code> atau `"cyan"`<br>
  <code>&nbsp;7</code> atau `"dark-grey"`<br>
  <code>&nbsp;8</code> atau `"deep-orange"`<br>
  <code>&nbsp;9</code> atau `"deep-purple"`<br>
  `10` atau `"green"`<br>
  `11` atau `"grey"`<br>
  `12` atau `"indigo"`<br>
  `13` atau `"khaki"`<br>
  `14` atau `"light-blue"`<br>
  `15` atau `"light-green"`<br>
  `16` atau `"lime"`<br>
  `17` atau `"orange"`<br>
  `18` atau `"pink"`<br>
  `19` atau `"purple"`<br>
  `20` atau `"red"`<br>
  `21` atau `"teal"`<br>
  `22` atau `"yellow"`<br>
  Default: akan dipilih salah satu warna di atas secara acak

- **`timeout`** (optional)<br>
  Bilangan bulat yang menunjukkan angka timeout dalam detik untuk kembali ke tampilan tanggal sekarang.<br>
  Default: `120` detik

## Metode-Metode Instans `Kalmusgo`
- **`.attachTo(elemenParent)`**<br>
  Mengisikan elemen kalender ke dalam elemen HTML pada variabel `elemenParent`.

- **`.fireResize()`**<br>
  Memberitahu kalender untuk menyesuaikan tampilan dengan layar agar tetap responsif, terutama bila konteinernya (elemen HTML parent) statis atau bukan `document.body`.

- **`.getElement()`**<br>
  Mengembalikan elemen kalender.

- **`.resetDate(tahun, indeksBulan)`**<br>
  Mengatur tampilan kalender pada angka tahun dan indeks bulan tertentu sekaligus, sesuai dengan bilangan bulat `tahun` dan bilangan bulat `indeksBulan`.

- **`.setFirstDayOfWeek(mulaiHari)`**<br>
  Mengatur tampilan kalender dimulai dengan hari tertentu yang ditunjukkan oleh `mulaiHari` berupa bilangan bulat (0-6).

- **`.setFullYear(tahun)`**<br>
  Mengatur tampilan kalender pada angka tahun tertentu yang ditunjukkan oleh `tahun` yang berupa bilangan bulat.

- **`.setHijriMode(modeHijriah)`**<br>
  Mengatur mode kalender dengan bilangan boolean `modeHijriah`.<br>
  `true`: kalender Hijriah<br>
  `false`: kalender Masehi

- **`.setLanguage(bahasa)`**<br>
  Mengatur bahasa yang digunakan oleh kalender dengan string oleh `bahasa`.<br>
  `"id"`: bahasa Indonesia

- **`.setMonth(indeksBulan)`**<br>
  Mengatur tampilan kalender pada bulan tertentu yang ditunjukkan oleh `indeksBulan` yang berupa bilangan bulat.

- **`.setTheme([warnaTema])`**<br>
  Mengatur warna tema kalender dengan bilangan bulat (0-22) sebagai indeks warna atau nama warna dalam string yang ditunjukkan oleh `warnaTema`. Bila `warnaTema` dihilangkan maka salah satu warna yang dipilih secara acak yang akan diterapkan.<br>
  <code>&nbsp;0</code> atau `"amber"`<br>
  <code>&nbsp;1</code> atau `"aqua"`<br>
  <code>&nbsp;2</code> atau `"black"`<br>
  <code>&nbsp;3</code> atau `"blue"`<br>
  <code>&nbsp;4</code> atau `"blue-grey"`"<br>
  <code>&nbsp;5</code> atau `"brown"`<br>
  <code>&nbsp;6</code> atau `"cyan"`<br>
  <code>&nbsp;7</code> atau `"dark-grey"`<br>
  <code>&nbsp;8</code> atau `"deep-orange"`<br>
  <code>&nbsp;9</code> atau `"deep-purple"`<br>
  `10` atau `"green"`<br>
  `11` atau `"grey"`<br>
  `12` atau `"indigo"`<br>
  `13` atau `"khaki"`<br>
  `14` atau `"light-blue"`<br>
  `15` atau `"light-green"`<br>
  `16` atau `"lime"`<br>
  `17` atau `"orange"`<br>
  `18` atau `"pink"`<br>
  `19` atau `"purple"`<br>
  `20` atau `"red"`<br>
  `21` atau `"teal"`<br>
  `22` atau `"yellow"`

- **`.setTime(waktu)`**<br>
  Mengatur tampilan kalender pada satu waktu tertentu yang ditunjukkan oleh bilangan bulat `waktu` sebagai angka dalam milidetik.

- **`.setTodayTimeout(timeout)`**<br>
  Mengatur waktu timeout dalam bilangan bulat `timeout` sebagai angka dalam detik untuk mengembalikan tampilan kalender ke waktu sekarang.

- **`.today()`**<br>
  Mengembalikan tampilan kalender ke waktu tahun dan bulan sekarang.

## Metode-Metode Tambahan untuk `Date.prototype` dan `HijriDate.prototype`
Dengan menggunakan librari ini, metode-metode berikut akan ditambahkan pada instans `Date.prototype` dan `HijriDate.prototype`.
- **`.getMonthName([indeksBulan])`**
  Mengembalikan nama bulan sesuai angka indeks bulan (0-11) yang diinginkan dalam `indeksBulan` sebagai nilai string ("Januari"-"Desember" atau "Muharam"-"Dzul-Hijjah"). If `indeksBulan` dihilangkan maka nama bulan sekarang yang akan dikembalikan.

- **`.getMonthShortName([indeksBulan])`**
  Mengembalikan nama dari indeks bulan (0-11) yang diinginkanthat dalam `indkesBulan` sebagai string yang bisa dibaca ("Januari"-"Desember" atau "Muharam"-"Dzul-Hijjah"). Jika `indeksBulan` dihilangkan maka nama bulan sekarang yang akan dikembalikan.

- **`.getWeekdayName([hari])`**
  Mengembalikan nama hari (0-6) dalam `hari` sebagai string yang bisa dibaca ("Minggu"-"Sabtu"). Jika `hari` dihilangkan maka nama hari sekarang yang akan dikembalikan.

- **`.getWeekdayShortName([hari])`**
  Mengembalikan singkatan nama hari (0-6) dalam `hari` sebagai string yang bisa dibaca ("Min"-"Sab"). Jika `hari` dihilangkan maka singkatan nama hari sekarang yang akan dikembalikan.

- **`.getYearString([tahun])`**
  Mengembalikan bilangan bulat tahun yang diinginkan dalam `tahun` diikuti dengan singkatan era ("M"/"SM" atau "H"/"SH") sebagai string. Jika `tahun` dihilangkan maka tahun sekarang yang akan dikembalikan.

- **`.todayShortString()`**
  Mengembalikan singkatan tanggal sekarang sebagai string yang bisa dibaca tergantung mode kalender (Masehi atau Hijriah). Sebagai contoh "Jum, 4 Jan 2019" untuk mode kalender Masehi atau "Jum, 27 Rak 1440" untuk mode kalender Hijriah.

- **`.todayString()`**
  Mengembalikan tanggal sekarang sebagai string yang bisa dibaca tergantung mode kalender (Masehi atau Hijriah). Sebagai contoh  "Jum'at, 4 Januari 2019" untuk mode kalender Masehi atau "Jum'at, 27 Rabi'ul-Akhir 1440" untuk mode kalender Hijriah.

&nbsp;

&nbsp;

&nbsp;

---
#### Didesain oleh ZulNs
##### @Gorontalo, 29 April 2019
---
