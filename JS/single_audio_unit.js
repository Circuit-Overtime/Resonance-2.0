document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);
var player;

function startplayer() 
{
 player = document.getElementById('music_player');
 player.controls = false;
}

function play_aud() 
{
 player.play();
} 
function pause_aud() 
{
 player.pause();
}
function stop_aud() 
{
 player.pause();
 player.currentTime = 0;
}
function change_vol()
{
 player.volume = document.getElementById("change_vol").value / 100;
}

function shiftSeekUnit()
{
  document.getElementById("music_player").currentTime = document.getElementById("change_seek").value;

}