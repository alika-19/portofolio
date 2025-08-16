// script.js
(function () {
  function pad(n) { return n < 10 ? "0" + n : String(n); }

  function updateClock() {
    const now = new Date();

    // Waktu
    let h24 = now.getHours();
    const ampm = h24 >= 12 ? "PM" : "AM";
    let h12 = h24 % 12;
    if (h12 === 0) h12 = 12;

    // Tulis ke DOM (kalau elemennya ada)
    const elH = document.getElementById("hours");
    const elM = document.getElementById("minutes");
    const elS = document.getElementById("seconds");
    const elA = document.getElementById("ampm");
    const elD = document.getElementById("date");

    if (elH) elH.textContent = pad(h12);
    if (elM) elM.textContent = pad(now.getMinutes());
    if (elS) elS.textContent = pad(now.getSeconds());
    if (elA) elA.textContent = ampm;

    if (elD) {
      const days = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
      const months = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
      elD.textContent = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    }
  }

  // Pastikan mulai setelah DOM siap, lalu update tiap detik
  function start() {
    updateClock();
    setInterval(updateClock, 1000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
