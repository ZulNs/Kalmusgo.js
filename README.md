# Kalender Musim Gorontalo

[![DOI: 10.5281/zenodo.2656287](https://zenodo.org/badge/doi/10.5281/zenodo.2656287.svg?)](https://zenodo.org/record/2656287)

## Demo
Demo [disini](https://zulns.github.io/Kalmusgo.js/).

## Dependensi
- [HijriDate.js](https://github.com/ZulNs/HijriDate.js) untuk penggunaan obyek
[`HijriDate`](https://zulns.github.io/HijriDate.js/hijri-date-api-doc.html), librari JS untuk menghitung penanggalan Hijriyah
dengan cara yang sama seperti halnya obyek `Date` menghitung penanggalan Masehi.
- [w3css](https://github.com/ZulNs/w3css), diambil dari [CSS Framework](https://github.com/JaniRefsnes/w3css) oleh
[Jan Egil Refsnes](https://github.com/JaniRefsnes) untuk pengaturan tampilan kalender ini. 

## Penggunaan
Cukup tambahkan potongan kode berikut dalam file html anda:

### Cara offline

```html
<div id="kalmus"></div>
<link rel="stylesheet" href="../w3css/w3.css" />
<script type="text/javascript" src="../HijriDate.js/hijri-date.js"></script>
<script type="text/javascript" src="kalmusgo.js"></script>
<script type="text/javascript">
    let kmg = new Kalmusgo();
    kmg.attachTo(document.getElementById('kalmus'));
    // atau gunakan
    // document.getElementById('kalmus').appendChild(kmg.getElement());
    // kode lainnya
</script>
```

### Atau cara online:

```html
<div id="kalmus"></div>
<link rel="stylesheet" href="https://zulns.github.io/w3css/w3.css" />
<script type="text/javascript" src="https://zulns.github.io/HijriDate.js/hijri-date.js"></script>
<script type="text/javascript" src="https://zulns.github.io/Kalmusgo.js/kalmusgo.js"></script>
<script type="text/javascript">
    let kmg = new Kalmusgo();
    kmg.attachTo(document.getElementById('kalmus'));
    // atau gunakan
    // document.getElementById('kalmus').appendChild(kmg.getElement());
    // kode lainnya
</script>
```

## Dokumentasi API
Dokumentasi API [disini](kalmusgo-api-doc.md).

&nbsp;

&nbsp;

&nbsp;

---
#### Didesain oleh ZulNs
##### @Gorontalo, 29 April 2019
---
