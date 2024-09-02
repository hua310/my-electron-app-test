const btn = document.getElementById('btn');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const input = document.getElementById('input');

btn.onclick = () => {
    alert( `${'你好,bro;' + myApi.verson}`)
}

btn2.onclick = () => {
  myApi.saveFile(input.value);
}

btn3.onclick = async () => {
  const res = await myApi.readFile();
  alert(res);
}

if(navigator){
  navigator.getBattery()
  .then(status=>{
      console.table(status);
      Charging(status.charging);
      BatteryLevel(status.level);

      status.onCharging = () => Charging(status.charging);
      status.onLevelChange = () => BatteryLevel(status.level);
  })
}
else{
  alert('Sorry your browser dosen\'t support the navigator object');
}

let level = document.querySelector(".level");
let text = document.querySelector(".text");
function Charging(status){
  if(status){
  level.classList.add("charging");
  text.innerHTML = "电量： ";
  }
  else{  
  level.classList.remove("charging");
  }
}

function BatteryLevel(value) {
  text.append(value*100+'%') ;
  level.style.height = value*100+'%' ;
}

document.querySelector('#showVideo').addEventListener('click', e => init(e));

async function init(e) {
  const constraints = window.constraints = {
    audio: true,
    video: true
  };
  
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    handleSuccess(stream);
    e.target.disabled = true;
  } catch (e) {
    handleError(e);
  }
}


function handleSuccess(stream) {
  const video = document.querySelector('video');
  const videoTracks = stream.getVideoTracks();
  console.log('Got stream with constraints:', constraints);
  console.log(`Using video device: ${videoTracks[0].label}`);
  window.stream = stream; // make variable available to browser console
  video.srcObject = stream;
}

function handleError(error) {
  console.error(error);
}
