const searchBtn = document.getElementById('searchBtn');
const input = document.getElementById('cityInput');
const result = document.getElementById('result');

async function geocode(city){
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const res = await fetch(url);
  if(!res.ok) throw new Error('Geocoding failed');
  const data = await res.json();
  return data.results && data.results[0] ? data.results[0] : null;
}

async function fetchWeather(lat, lon){
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
  const res = await fetch(url);
  if(!res.ok) throw new Error('Weather fetch failed');
  return await res.json();
}

async function showCityWeather(){
  const city = input.value.trim();
  if(!city){ result.innerText = 'Masukkan nama kota.'; return; }
  result.innerHTML = 'Mencari kota...';

  try{
    const place = await geocode(city);
    if(!place){ result.innerText = 'Kota tidak ditemukan. Coba nama lain.'; return; }
    result.innerHTML = `<div class="row"><strong>${place.name}, ${place.country}</strong></div>`;
    result.innerHTML += '<div style="margin-top:8px">Mengambil cuaca...</div>';
    const weather = await fetchWeather(place.latitude, place.longitude);
    if(weather && weather.current_weather){
      const cw = weather.current_weather;
      result.innerHTML = `
        <div class="row" style="justify-content:space-between">
          <div>
            <div class="temp">${cw.temperature}°C</div>
            <div>Kecepatan angin: ${cw.windspeed} m/s</div>
            <div>Arah angin: ${cw.winddirection}°</div>
            <div>Waktu: ${cw.time}</div>
          </div>
          <div style="text-align:right;color:#6b6b83">Lat ${place.latitude.toFixed(2)}, Lon ${place.longitude.toFixed(2)}</div>
        </div>
      `;
    } else {
      result.innerText = 'Tidak dapat mengambil data cuaca.';
    }
  }catch(err){
    result.innerText = 'Terjadi kesalahan: ' + err.message;
  }
}

searchBtn.addEventListener('click', showCityWeather);
input.addEventListener('keyup', (e)=>{ if(e.key==='Enter') showCityWeather(); });
