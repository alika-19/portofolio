const genBtn = document.getElementById('gen');
const copyBtn = document.getElementById('copy');
const colorBox = document.getElementById('colorBox');
const hexEl = document.getElementById('hex');
const rgbEl = document.getElementById('rgb');

function randHex(){ return '#'+Math.floor(Math.random()*16777215).toString(16).padStart(6,'0'); }
function hexToRgb(hex){
  const c = hex.replace('#','');
  const num = parseInt(c,16);
  return [ (num>>16)&255, (num>>8)&255, num&255 ];
}

function setColor(hex){
  const rgb = hexToRgb(hex);
  colorBox.style.background = hex;
  hexEl.textContent = hex.toUpperCase();
  rgbEl.textContent = `rgb(${rgb.join(',')})`;
}

genBtn.addEventListener('click', ()=> setColor(randHex()));
copyBtn.addEventListener('click', async ()=>{
  try{
    await navigator.clipboard.writeText(hexEl.textContent);
    copyBtn.textContent = 'Copied!';
    setTimeout(()=> copyBtn.textContent = 'Copy HEX',1000);
  }catch(e){
    alert('Gagal copy: '+e.message);
  }
});

// init
setColor(randHex());
