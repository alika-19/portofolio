document.addEventListener("DOMContentLoaded", function() {

  // ===== Setup suara =====
  let soundEnabled = false; // default OFF
  let tickSound = new Audio('tick.wav'); // global
  tickSound.volume = 0.5;

  // ===== Fungsi pad 2 digit =====
  function pad(n){ return n < 10 ? "0"+n : n; }

  // ===== Jam Digital dengan efek pulse dan suara detik =====
  function updateClock(){
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    const clockEl = document.getElementById("digitalClock");
    clockEl.textContent = `${pad(h)}:${pad(m)}:${pad(s)}`;

    // Pulse animasi
    clockEl.classList.remove("pulse");
    void clockEl.offsetWidth;
    clockEl.classList.add("pulse");

    // Putar suara detik hanya kalau ON
    if(soundEnabled){
      tickSound.currentTime = 0;
      tickSound.play().catch(()=>{});
    } else {
      // kalau OFF → langsung berhentiin suara
      tickSound.pause();
      tickSound.currentTime = 0;
    }
  }

  setInterval(updateClock, 1000);
  updateClock();

  // ===== Stopwatch =====
  let swH=0, swM=0, swS=0, swInterval=null;

  function updateStopwatch(){
    swS++;
    if(swS===60){ swS=0; swM++; }
    if(swM===60){ swM=0; swH++; }
    document.getElementById("stopwatch").textContent = `${pad(swH)}:${pad(swM)}:${pad(swS)}`;
  }

  document.getElementById("startStop").addEventListener("click", ()=>{
    if(!swInterval){
      swInterval = setInterval(updateStopwatch, 1000);
    }
  });

  document.getElementById("pauseStop").addEventListener("click", ()=>{
    clearInterval(swInterval);
    swInterval = null;
  });

  document.getElementById("resetStop").addEventListener("click", ()=>{
    clearInterval(swInterval);
    swInterval = null;
    swH=swM=swS=0;
    document.getElementById("stopwatch").textContent = "00:00:00";
  });

  // ===== Tombol ON/OFF Suara =====
  const toggleBtn = document.getElementById("toggleSound");
  toggleBtn.addEventListener("click", ()=>{
    soundEnabled = !soundEnabled;
    toggleBtn.textContent = soundEnabled ? "🔊 Suara: ON" : "🔇 Suara: OFF";

    // kalau OFF → stop audio langsung
    if(!soundEnabled){
      tickSound.pause();
      tickSound.currentTime = 0;
    }
  });

});
