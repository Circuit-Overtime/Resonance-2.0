var defaultPlaylistName = "";
var main_dataBase = firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username"));

aud_elm = document.getElementById("audio_player");
globalThis.playList_full = false;
var depot_per = document.querySelector(':root');
var email_to_separate_uploads = localStorage.getItem("account_login_email");
var pass_show = email_to_separate_uploads.replace("@" , "")
var pass_show = pass_show.replace(".", "")
email_to_separate_uploads = pass_show;
let playlist_selected = []
let songs = []
//ShuffleSongs
function loadPlaylist()
{ 
firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username")).get().then((doc) => {
  let get_current_playlist = doc.data().defaultPlayList;
  firebase.firestore().collection("Users_Playlists").doc(localStorage.getItem("account_login_username")+"_playlist").get().then((docs) => {
    //fetch songs from main database
    if(docs.exists == false)
    {
      // console.log("your playlist does not exist")
      // console.log(document.getElementById("playList").childElementCount);
      // document.querySelector("#no_playlist_img").style.display = "block";
    }
    else
    {
      // document.querySelector("#no_playlist_img").style.display = "none";
      document.getElementById("playList").innerHTML += `<h2 class="playlist_name_disp" id="playlist_name_disp"> <i class="fa-solid fa-headphones-simple fa-duotone fa- fa-shake"></i>${" "+get_current_playlist}</h2>`
      document.getElementById("playList").innerHTML += `<i class="fa-solid fa-shuffle" id="Shuffle_PlayList" onclick="ShuffleSongs()"></i>`
      document.getElementById("playList").innerHTML += `<i class="fa-solid fa-play" id="PlayPlaylist" onclick="autoPlayPlaylist()"></i>`
      document.getElementById("playlist").innerHTML += `<ion-icon name="close-circle" class="close_playlist"  id="close_playlist" onclick="closePlayList()"></ion-icon>`
      len = docs.data().playlist_songs.length;
          for (let i = 0; i < len; i++)
          {

            if(docs.data().playlist_songs[i].split("#")[1] == get_current_playlist)
            {
              globalThis.playList_songs = (docs.data().playlist_songs[i].split("#")[0])
    
              database_music.collection("Songs").doc(playList_songs).get().then((doc) => {
                music_src_playlist = (doc.data().music_src);
                music_name_playlist = doc.data().name;
                music_image_playlist = doc.data().album;
                music_singer_playlist = doc.data().uploader;
                // console.log(music_src_playlist,music_name_playlist);
    
                let Html = {name: music_name_playlist,
                  path:music_src_playlist,
                artist:music_singer_playlist,
                cover:music_image_playlist,
                 
              }
                songs.push(Html)
                // console.log(songs.length)
                
                  if(songs.length == len)
                  {
                    
                    for(let j = 0; j < songs.length; j++)
                    {
                      //remember syntax : onclick=\"(function_name("paramer1, parameter2"))\" to pass multiple parameters through a dynamic function 
                      songs_of_playlist  = `<div class="playList_songs" id="${songs[j].name}" data-id = "${songs[j].path}" onclick=\"(playlistPlay('${j}, ${songs.length}'))\">
                    <div class="playlist_song_album">
                    <img src="${songs[j].cover}"></div>
                    <h2 class="playlist_song_name">${songs[j].name}</h2>
                    <h2 class="playlist_song_artist">${songs[j].artist}</h2>
                    <div class="div_break"></div>
                    <i class="fa-solid fa-trash" id="deleteThisPlayListSong" data-id = "${songs[j].name},${get_current_playlist}" onclick="deleteThisPlayListSong(this)"></i>
                    <ion-icon name="caret-forward" class="expand_playlist_song"></ion-icon>
                  </div>`;
                  document.getElementById("playList").innerHTML += songs_of_playlist;
                 
                    }
                    
                  }
                  if(document.getElementById("playList").childElementCount <= 1)
                  {
                    // document.getElementById("no_playlist_img").style.display = "block";
                  }
                  else
                  {
                    // document.getElementById("no_playlist_img").style.display = "none";
                  }
             
    
            })
            }
            else
            {
            }
              
          } 
    }
    
    })

})
}
 

document.getElementById("playlist_popup").addEventListener("click", () => {
  loadPlaylist();
  document.getElementById("playList").classList.toggle("active");
  
})


function setTimeDur()
{
  
  var minutes_current = parseInt(document.getElementById("audio_player").currentTime / 60, 10);
  var seconds_current = parseInt(document.getElementById("audio_player").currentTime % 60);
  if(minutes_current < 10)
  {
    minutes_current = "0" + minutes_current;
  }
  if(seconds_current < 10)
  {
    seconds_current = "0" + seconds_current;
  }
  document.getElementById("current_time").innerHTML = minutes_current + ":" + seconds_current;


  var minutes_total = parseInt(document.getElementById("audio_player").duration / 60, 10);
  var seconds_total = parseInt(document.getElementById("audio_player").duration % 60);
  if(minutes_total < 10)
  {
    minutes_total = "0" + minutes_total;
  }
  if(seconds_total < 10)
  {
    seconds_total = "0" + seconds_total;
  }
  document.getElementById("total_time").innerHTML = minutes_total + ":" + seconds_total;
}       

       
            
            
function playPlayListAud()
{
    aud_elm.play();
}


function pausePlayListAud()
{
    // console.log("play");
    aud_elm.pause();
}


function playlistPlay(src)
{
  let song_number = parseInt(src.split(",")[0]);
  document.getElementById("playlist_player_repeat").style.display = "block";
  document.getElementById("PlayListrepeat_number").style.display = "block";
  let total_song_length = parseInt(src.split(",")[1]);
    document.getElementById("music_player").pause();
    document.getElementById("music_player").currentTime = 0;
    document.getElementById("player").style.transform = "translateY(200px)";
  
  document.getElementById("playlist_player").style.transform = "translateY(0px)";
  document.getElementById("playlist_player").style.opacity = "0.95";
  document.getElementById("playlist_player").style.zIndex = "10000";

  document.getElementById("playlist_player_name").innerHTML = songs[song_number].name;
  document.getElementById("playlist_player_artist").innerHTML = songs[song_number].artist;
  document.getElementById("playlist_player_album_src").src = songs[song_number].cover;
  document.getElementById("audio_player").src = songs[song_number].path;

  setTimeout(() => {
    document.getElementById("playlist_player_play").addEventListener("click", () => {
      document.getElementById("audio_player").play();
    })
    document.getElementById("playlist_player_pause").addEventListener("click", () => {
      document.getElementById("audio_player").pause();
    })
    playPlayListAud();
    setInterval(() => {
    document.querySelector(".playlist_player_seek").setAttribute("max", document.getElementById("audio_player").duration)

      if(parseInt(song_number) == parseInt(0))
      {
        document.querySelector(".playlist_player_back").style.opacity = "25%";
        document.querySelector(".playlist_player_back").style.pointerEvents = "none";
      }
       if(song_number == total_song_length-1)
      {
        document.querySelector(".playlist_player_back").style.opacity = "25%";
        document.querySelector(".playlist_player_back").style.pointerEvents = "none";
      }
      else
      {
        document.querySelector(".playlist_player_fast").style.opacity = "1";
        document.querySelector(".playlist_player_fast").style.pointerEvents = "all";
        document.querySelector(".playlist_player_back").style.opacity = "1";
        document.querySelector(".playlist_player_back").style.pointerEvents = "all";
      }
  
      

      //updates seek
  document.querySelector(".playlist_player_seek").value = document.getElementById("audio_player").currentTime;
  if(document.getElementById("audio_player").paused == false) //audio_elm is playing
  {
    document.querySelector(".playlist_player_pause").style.opacity = "1";
    document.querySelector(".playlist_player_pause").style.pointerEvents = "all";
    document.querySelector(".playlist_player_play").style.opacity = "0";
    document.querySelector(".playlist_player_play").style.pointerEvents = "none";
  }

  if(document.getElementById("audio_player").paused == true) //audio_elm is paused
  {
    
    document.querySelector(".playlist_player_pause").style.opacity = "0";
    document.querySelector(".playlist_player_pause").style.pointerEvents = "none";
    document.querySelector(".playlist_player_play").style.opacity = "1";
    document.querySelector(".playlist_player_play").style.pointerEvents = "all";
  }
setTimeDur();
  if((document.getElementById("PlayListrepeat_number").innerHTML == "1") && (document.getElementById("audio_player").currentTime == document.getElementById("audio_player").duration))
  {
    document.querySelector(".playlist_player_seek").setAttribute("max", document.getElementById("audio_player").duration)
    pausePlayListAud();
    document.getElementById("audio_player").currentTime = 0;
    playPlayListAud();
  }
  },200)

  document.getElementById("playlist_player_fast").addEventListener("click", () => {
    next_song = parseInt(song_number-1) //due to the icon exclusive look
    song_number = parseInt(next_song)
    document.getElementById("playlist_player_name").innerHTML = songs[next_song].name;
    document.getElementById("playlist_player_artist").innerHTML = songs[next_song].artist;
    document.getElementById("playlist_player_album_src").src = songs[next_song].cover;
    document.getElementById("audio_player").src = songs[next_song].path;
    setTimeDur();
    document.querySelector(".playlist_player_seek").setAttribute("max", document.getElementById("audio_player").duration)
    
  })

  document.getElementById("playlist_player_back").addEventListener("click", () => {
    prev_song = parseInt(song_number+1) //due to the icon exclusive look
    song_number = parseInt(prev_song)
    document.getElementById("playlist_player_name").innerHTML = songs[prev_song].name;
    document.getElementById("playlist_player_artist").innerHTML = songs[prev_song].artist;
    document.getElementById("playlist_player_album_src").src = songs[prev_song].cover;
    document.getElementById("audio_player").src = songs[prev_song].path;
    setTimeDur();
    document.querySelector(".playlist_player_seek").setAttribute("max", document.getElementById("audio_player").duration)

  })
    
  


    }, ((1200)));

    // console.log();
}
function shiftTime()
{
  document.getElementById("audio_player").currentTime = document.querySelector(".playlist_player_seek").value;

}

function change_playList_vol()
{
  document.getElementById("audio_player").volume = document.querySelector(".playlist_player_vol").value / 100;
}


function contract()
{
  // document.getElementById("playlist_player").style.transform = "translateY(690px)";
  document.getElementById("playlist_player").classList.toggle("contract");
}

function closePlayList()
{
  
  document.getElementById("audio_player").src = "";
  aud_elm.pause();
  aud_elm.currentTime = 0;
  document.getElementById("playlist_player").style.transform = "translateY(690px)";
 if(document.getElementById("playList").classList.contains("active"))
 {
  document.getElementById("playList").classList.toggle("active");
 }
  

  

}


loadPlaylist();



function deleteThisPlayListSong(self)
{
  
  song_creds = self.getAttribute("data-id").split(",");
  song_creds = song_creds[0]+"#"+song_creds[1]
  id = self.getAttribute("data-id").split(",")[0]
  // 
  firebase.firestore().collection("Users_Playlists").doc(localStorage.getItem("account_login_username")+"_playlist").update({
    playlist_songs : firebase.firestore.FieldValue.arrayRemove(song_creds),
  })
  document.getElementById("audio_player").src = "";
  aud_elm.pause();
  aud_elm.currentTime = 0;
  console.log(song_creds)
  document.getElementById(id).style.background = "red";
 document.getElementById(id).style.transform = "translateX(600px)";
 document.getElementById(id).remove();

 
setTimeout(() => {
  document.getElementById("playlist_player").style.transform = "translateY(690px)";
}, 80); 

if(document.getElementById("playList").classList.contains("active"))
{
 document.getElementById("playList").classList.toggle("active");
 
}
}
// ==========================================================================================================  
function repeatSong()
{
  is_repeating = document.getElementById("playlist_player_repeat").classList.contains("onRepeat");
  if(is_repeating == true)
  {
    document.getElementById("PlayListrepeat_number").innerHTML = "1"
  }
  else
  {
    document.getElementById("PlayListrepeat_number").innerHTML = ""
  }
} 

function shuffleArray(array)
{
  for (var i = array.length - 1; i > 0; i--) {
   
    // Generate random number
    var j = Math.floor(Math.random() * (i + 1));
                
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
  
}

function ShuffleSongs()
{
  
  document.getElementById("playList").innerHTML  = "";
  
  shuffleArray(songs)
  firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username")).get().then((doc) => {
    let get_current_playlist = doc.data().defaultPlayList;
    document.getElementById("playList").innerHTML += `<h2 class="playlist_name_disp" id="playlist_name_disp"> <i class="fa-solid fa-headphones-simple fa-duotone fa- fa-shake"></i>${" "+get_current_playlist}</h2>`;
    document.getElementById("playList").innerHTML += `<i class="fa-solid fa-shuffle" id="Shuffle_PlayList" onclick="ShuffleSongs()"></i>`;  
    document.getElementById("playList").innerHTML += `<i class="fa-solid fa-play" id="PlayPlaylist" onclick="autoPlayPlaylist()"></i>`
    document.getElementById("playlist").innerHTML += `<ion-icon name="close-circle" class="close_playlist"  id="close_playlist" onclick="closePlayList()"></ion-icon>`
    for(let j = 0; j < songs.length; j++)
                    {
                      //remember syntax : onclick=\"(function_name("paramer1, parameter2"))\" to pass multiple parameters through a dynamic function 
                      songs_of_playlist  = `<div class="playList_songs" id="${songs[j].name}" data-id = "${songs[j].path}" onclick=\"(playlistPlay('${j}, ${songs.length}'))\">
                    <div class="playlist_song_album">
                    <img src="${songs[j].cover}"></div>
                    <h2 class="playlist_song_name">${songs[j].name}</h2>
                    <h2 class="playlist_song_artist">${songs[j].artist}</h2>
                    <div class="div_break"></div>
                    <i class="fa-solid fa-trash" id="deleteThisPlayListSong" data-id = "${songs[j].name},${get_current_playlist}" onclick="deleteThisPlayListSong(this)"></i>
                    <ion-icon name="caret-forward" class="expand_playlist_song"></ion-icon>
                  </div>`;
                  document.getElementById("playList").innerHTML += songs_of_playlist;
                 
                    }
                  })
}
  
function autoPlayPlaylist()
{
  document.getElementById("playlist_player_repeat").style.display = "none";
  document.getElementById("PlayListrepeat_number").style.display = "none";
  let song_number = 0;
  let total_song_length = songs.length;
    document.getElementById("music_player").pause();
    document.getElementById("music_player").currentTime = 0;
    document.getElementById("player").style.transform = "translateY(200px)";
  
  document.getElementById("playlist_player").style.transform = "translateY(0px)";
  document.getElementById("playlist_player").style.opacity = "0.95";
  document.getElementById("playlist_player").style.zIndex = "10000";

  document.getElementById("playlist_player_name").innerHTML = songs[song_number].name;
  document.getElementById("playlist_player_artist").innerHTML = songs[song_number].artist;
  document.getElementById("playlist_player_album_src").src = songs[song_number].cover;
  document.getElementById("audio_player").src = songs[song_number].path;

  setTimeout(() => {
    setTimeDur();
    playPlayListAud();
    document.getElementById("playlist_player_play").addEventListener("click", () => {
      document.getElementById("audio_player").play();
    })
    document.getElementById("playlist_player_pause").addEventListener("click", () => {
      document.getElementById("audio_player").pause();
    })

    setInterval(() => {
      document.querySelector(".playlist_player_seek").setAttribute("max", document.getElementById("audio_player").duration)
      setTimeDur();
      // console.log(song_number)
      if(parseInt(song_number) == parseInt(0))
      {
        document.querySelector(".playlist_player_back").style.opacity = "25%";
        document.querySelector(".playlist_player_back").style.pointerEvents = "none";
      }
       if(song_number == total_song_length-1)
      {
        document.querySelector(".playlist_player_back").style.opacity = "25%";
        document.querySelector(".playlist_player_back").style.pointerEvents = "none";
      }
      else
      {
        document.querySelector(".playlist_player_fast").style.opacity = "1";
        document.querySelector(".playlist_player_fast").style.pointerEvents = "all";
        document.querySelector(".playlist_player_back").style.opacity = "1";
        document.querySelector(".playlist_player_back").style.pointerEvents = "all";
      }
  
      

      // console.log(document.getElementById("audio_player").paused)
      document.querySelector(".playlist_player_seek").value = document.getElementById("audio_player").currentTime;
  if(document.getElementById("audio_player").paused == false) //audio_elm is playing
  {
    document.querySelector(".playlist_player_pause").style.opacity = "1";
    document.querySelector(".playlist_player_pause").style.pointerEvents = "all";
    document.querySelector(".playlist_player_play").style.opacity = "0";
    document.querySelector(".playlist_player_play").style.pointerEvents = "none";
  }

  if(document.getElementById("audio_player").paused == true) //audio_elm is paused
  {
    
    document.querySelector(".playlist_player_pause").style.opacity = "0";
    document.querySelector(".playlist_player_pause").style.pointerEvents = "none";
    document.querySelector(".playlist_player_play").style.opacity = "1";
    document.querySelector(".playlist_player_play").style.pointerEvents = "all";
  }
console.log(next_song = parseInt(song_number+1), songs.length);
if((document.getElementById("audio_player").currentTime == document.getElementById("audio_player").duration))
{
  next_song = parseInt(song_number+1) //due to the icon exclusive look
    song_number = parseInt(next_song)
    document.getElementById("playlist_player_name").innerHTML = songs[next_song].name;
    document.getElementById("playlist_player_artist").innerHTML = songs[next_song].artist;
    document.getElementById("playlist_player_album_src").src = songs[next_song].cover;
    document.getElementById("audio_player").src = songs[next_song].path;
    setTimeDur();
    document.querySelector(".playlist_player_seek").setAttribute("max", document.getElementById("audio_player").duration)
  setTimeout(() => {
    playPlayListAud();
  }, 1200);
}
// else
// {

//   setTimeout(() => {
//     document.getElementById("audio_player").src = "";
//     aud_elm.pause();
//     aud_elm.currentTime = 0;
//     document.getElementById("playlist_player").style.transform = "translateY(690px)";
//    if(document.getElementById("playList").classList.contains("active"))
//    {
//     document.getElementById("playList").classList.toggle("active");
//    }
//   }, 500);
 
  
// }
  },200)

  document.getElementById("playlist_player_fast").addEventListener("click", () => {
    next_song = parseInt(song_number-1) //due to the icon exclusive look
    song_number = parseInt(next_song)
    document.getElementById("playlist_player_name").innerHTML = songs[next_song].name;
    document.getElementById("playlist_player_artist").innerHTML = songs[next_song].artist;
    document.getElementById("playlist_player_album_src").src = songs[next_song].cover;
    document.getElementById("audio_player").src = songs[next_song].path;
    setTimeDur();
    document.querySelector(".playlist_player_seek").setAttribute("max", document.getElementById("audio_player").duration)
    
  })

  document.getElementById("playlist_player_back").addEventListener("click", () => {
    prev_song = parseInt(song_number+1) //due to the icon exclusive look
    song_number = parseInt(prev_song)
    document.getElementById("playlist_player_name").innerHTML = songs[prev_song].name;
    document.getElementById("playlist_player_artist").innerHTML = songs[prev_song].artist;
    document.getElementById("playlist_player_album_src").src = songs[prev_song].cover;
    document.getElementById("audio_player").src = songs[prev_song].path;
    setTimeDur();
    document.querySelector(".playlist_player_seek").setAttribute("max", document.getElementById("audio_player").duration)

  })
    
  


    }, ((1200)));

       
    
           
                
                
    function playPlayListAud()
    {
        aud_elm.play();
    }
    
    
    function pausePlayListAud()
    {
        // console.log("play");
        aud_elm.pause();
    }

    function shiftTime()
  {
    document.getElementById("audio_player").currentTime = document.querySelector(".playlist_player_seek").value;
  }

    function change_playList_vol()
  {
   document.getElementById("audio_player").volume = document.querySelector(".playlist_player_vol").value / 100;
  }
  function setTimeDur()
    {
      var minutes_current = parseInt(document.getElementById("audio_player").currentTime / 60, 10);
      var seconds_current = parseInt(document.getElementById("audio_player").currentTime % 60);
      if(minutes_current < 10)
      {
        minutes_current = "0" + minutes_current;
      }
      if(seconds_current < 10)
      {
        seconds_current = "0" + seconds_current;
      }
      document.getElementById("current_time").innerHTML = minutes_current + ":" + seconds_current;
    
    
      var minutes_total = parseInt(document.getElementById("audio_player").duration / 60, 10);
      var seconds_total = parseInt(document.getElementById("audio_player").duration % 60);
      if(minutes_total < 10)
      {
        minutes_total = "0" + minutes_total;
      }
      if(seconds_total < 10)
      {
        seconds_total = "0" + seconds_total;
      }
      document.getElementById("total_time").innerHTML = minutes_total + ":" + seconds_total;
    } 


   
}
document.getElementById("playlist_player_repeat").addEventListener("click", () => {
  document.getElementById("playlist_player_repeat").classList.toggle("onRepeat")
})



function repeatSong()
{
  is_repeating = document.getElementById("playlist_player_repeat").classList.contains("onRepeat");
  document.getElementById("PlayListrepeat_number").innerHTML = "1"
  if(is_repeating == true)
  {
    document.getElementById("PlayListrepeat_number").innerHTML = "1"
  }
  else
  {
    document.getElementById("PlayListrepeat_number").innerHTML = ""
  }
} 