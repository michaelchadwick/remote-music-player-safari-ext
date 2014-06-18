// init
var audioSource = document.getElementById("audioSource");
var music = document.getElementById("music");
var btnPlay = document.getElementById("btnPlay");
var btnPause = document.getElementById("btnPause");
var btnStop = document.getElementById("btnStop");
var btnVolUp = document.getElementById("btnVolUp");
var btnVolDown = document.getElementById("btnVolDown");
var volMeter = document.getElementById("volMeter");
var statusMsg = document.getElementById("statusMsg");
var statusCurTime = document.getElementById("curTime");

btnPause.disabled = true;
btnStop.disabled = true;
music.src = audioSource.value;
music.load();
updateVolMeter(music.volume);
updateCurTime(music.currentTime);

// event handlers
music.addEventListener('loadstart', function() {
  updateStatus("loading audio...");
});
music.addEventListener('canplay', function() {
  updateStatus("audio now playable");
  statusCurTime.min = 0;
  statusCurTime.max = music.duration;
  updateCurTime(music.currentTime);
});
music.addEventListener('play', function() {
  updateStatus("audio playing...");
});
music.addEventListener('pause', function() {
  if (music.currentTime == 0) updateStatus("audio stopped");
  else if (music.currentTime == music.duration) {
    updateStatus("audio ended");
    btnPlay.disabled = false;
    btnPause.disabled = true;
    btnStop.disabled = true;
  } else updateStatus("audio paused");
});
music.addEventListener('timeupdate', function() {
  if (music.currentTime == music.duration) { updateStatus("audio ended"); }
  updateCurTime(music.currentTime);
});
music.addEventListener('error', function failed(e) {
  switch (e.target.error.code) {
   case e.target.error.MEDIA_ERR_ABORTED:
     updateStatus('err: playback aborted');
     break;
   case e.target.error.MEDIA_ERR_NETWORK:
     updateStatus('err: network error');
     break;
   case e.target.error.MEDIA_ERR_DECODE:
     updateStatus('err: audio corrupted or unsupported');
     break;
   case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
     updateStatus('err: network failure/unsupported format.');
     break;
   default:
     updateStatus('err: unknown error');
     break;
   }
});

// methods
function updateVolMeter(volume)
{
  volMeter.innerText = Math.floor(volume * 100);
}
function updateStatus(msg)
{
  statusMsg.innerText = msg;
}
function updateCurTime(curTime)
{
  statusCurTime.value = curTime;
}

function audioSourceChange(text) {
  music.pause();
  console.log("audioSource now: " + text.value);
  music.src = text.value;
  music.load();
}
function timeChange(time)
{
  music.currentTime = time.value;
}

function playIt() {
  music.play();
  btnPlay.disabled = true;
  btnPause.disabled = false;
  btnStop.disabled = false;
}
function pauseIt() {
  music.pause();
  btnPlay.disabled = false;
  btnPause.disabled = true;
  btnStop.disabled = false;
}
function stopIt() {
  music.pause();
  music.currentTime = 0;
  btnPlay.disabled = false;
  btnPause.disabled = true;
  btnStop.disabled = true;
}
function volUp() {
  music.volume+=0.1;
  updateVolMeter(music.volume);
}
function volDown() {
  music.volume-=0.1;
  updateVolMeter(music.volume);
}