const logEl = document.getElementById('log');
const msgInput = document.getElementById('msg');
const sendBtn = document.getElementById('send');

const replies = [
  {q: /halo|hi|hai|hello/i, a: 'Halo! Ada yang bisa aku bantu? 😊'},
  {q: /nama kamu|siapa kamu/i, a: 'Aku Chatbot Sederhana buatan Alika.'},
  {q: /cuaca|hujan|panas/i, a: 'Kalau cuaca, coba cek Weather App di portofolio.'},
  {q: /terima kasih|makasih/i, a: 'Sama-sama! Semoga membantuu 🙂'},
  {q: /apa kabar/i, a: 'Baik! Semoga hari kamu menyenangkan.'}
];

function append(divClass, text){
  const d = document.createElement('div');
  d.className = 'msg ' + divClass;
  d.textContent = text;
  logEl.appendChild(d);
  logEl.scrollTop = logEl.scrollHeight;
}

function botReply(text){
  for(const r of replies){
    if(r.q.test(text)) return r.a;
  }
  // fallback simple echo + suggestion
  return "Maaf, aku belum mengerti. Coba tanya hal lain atau ketik 'help'.";
}

sendBtn.addEventListener('click', ()=>{
  const t = msgInput.value.trim();
  if(!t) return;
  append('user', t);
  msgInput.value = '';
  setTimeout(()=>{ append('bot', botReply(t)); }, 350);
});

msgInput.addEventListener('keyup', (e)=>{ if(e.key==='Enter') sendBtn.click(); });
