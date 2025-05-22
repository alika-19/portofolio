function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;
  const strHours = hours.toString().padStart(2, '0');

  const day = now.getDate();
  const month = now.toLocaleString('default', { month: 'long' });
  const year = now.getFullYear();
  const weekday = now.toLocaleString('default', { weekday: 'long' });

  document.getElementById('hours').textContent = strHours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
  document.getElementById('ampm').textContent = ampm;

  document.getElementById('date').textContent = `${weekday}, ${day} ${month} ${year}`;
}

setInterval(updateClock, 1000);
updateClock();
