aud_elm = document.getElementById("audio_player");
globalThis.playList_full = false;
var depot_per = document.querySelector(':root');
var email_to_separate_uploads = localStorage.getItem("account_login_email");
var pass_show = email_to_separate_uploads.replace("@" , "")
var pass_show = pass_show.replace(".", "")
email_to_separate_uploads = pass_show;
let preset_songs = []
firebase.firestore().collection("Resonance_Playlist").limit(1).where("type", "==", "Resonance_Playlist")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
    
        if(doc.data().banned == false)
        {
          slides = `<div class="top_playlist_banner_cont" data-id="${doc.data().playList_name},${doc.data().songs}" onclick = "playPlayList(this)" id="top_playlist_banner_cont">
          <h2 class="play_list_name_top">${doc.data().playList_name}</h2>
          <h2 class="play_list_verified_top">Resonance Verified <img src="CSS/IMAGES/verified_resonance.png" class="play_list_verifiedmark_top" id="${doc.data().playList_name}"></h2>
          <img src=${doc.data().thumbnail}" class="play_list_thumb_top" id="play_list_thumb_top">
          <img src="${doc.data().thumbnail}" class="play_list_thumb_top_small" id="play_list_thumb_top_small">
          <button class= "playthisplaylist" id="playthisplaylist " value="" ><ion-icon name="play" class="play_list_play_top"></ion-icon>Play</button>
          <h2 class="total_number_of_plays">${doc.data().playList_play}</h2><ion-icon name="play" class="number_of_plays"></ion-icon>
      </div>`
      document.getElementById("top_playlist_banner").innerHTML += slides;
        }
        setTimeout(() => {
          if(document.getElementById("top_playlist_banner").childElementCount == 1)
          {
           document.getElementById("top_playlist_banner_cont").style.animationPlayState = "paused";
  
           let slideIndex = 0;
           showSlides(slideIndex);
          }
        }, 1200);
       
       
      })

    });
  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("top_playlist_banner_cont");
    // console.log(slides)
    // let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > slides.length) {slideIndex = 1}
      slides[slideIndex-1].style.display = "block";
      setTimeout(showSlides, 5000); // Change image every 2 seconds
    }
  
function playPlayList(self)
{
  songs_inside_playlist = "";
  preset_playlist_name = "";
  preset_songs = []
  document.getElementById("playList").innerHTML = "";
  songs_inside_playlist = self.getAttribute("data-id").split(",").slice(1)
  preset_playlist_name = self.getAttribute("data-id").split(",")[0]
  // console.log(songs_inside_playlist)
  playSetPlaylist(songs_inside_playlist, preset_playlist_name);
  
}



function playSetPlaylist(songs_arr, list_name)
{ 
 
    
      document.getElementById("playList").innerHTML += `<h2 class="playlist_name_disp" id="playlist_name_disp"> <i class="fa-solid fa-headphones-simple fa-duotone fa- fa-shake"></i>${" "+list_name}</h2> <ion-icon name="close-circle" class="close_playlist_originals"  id="close_playlist_originals" onclick="closePlayList()"></ion-icon>`
      len = songs_arr.length;
          for (let i = 0; i < len; i++)
          {
              database_music.collection("Songs").doc(songs_arr[i]).get().then((doc) => {
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
              preset_songs.push(Html)
                // console.log(songs.length)
                
                  if(preset_songs.length == len)
                  {
                    
                    for(let j = 0; j < preset_songs.length; j++)
                    {
                      //remember syntax : onclick=\"(function_name("paramer1, parameter2"))\" to pass multiple parameters through a dynamic function 
                      songs_of_playlist  = `<div class="playList_songs" data-id = "${preset_songs[j].path}" onclick=\"(playlistPlay_set('${j}, ${songs.length}'))\">
                    <div class="playlist_song_album">
                    <img src="${preset_songs[j].cover}"></div>
                    <h2 class="playlist_song_name">${preset_songs[j].name}</h2>
                    <h2 class="playlist_song_artist">${preset_songs[j].artist}</h2>
                    <div class="div_break"></div>
                    <ion-icon name="caret-forward" class="expand_playlist_song"></ion-icon>
                  </div>`;
                  document.getElementById("playList").innerHTML += songs_of_playlist;
                    } 
                  }
            })  
          } 
          document.getElementById("playList").classList.contains("active") == false
          {
            document.getElementById("playList").classList.toggle("active")
          }
          database_music.collection("Resonance_Playlist").doc(list_name).get().then((song_played_number) => {
            curr_songPlay = song_played_number.data().playList_play;
            database_music.collection("Resonance_Playlist").doc(list_name).update({
              playList_play : curr_songPlay + 1,
            });
          })
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

       
            
            
function playPlayListAud()
{
    aud_elm.play();
}


function pausePlayListAud()
{
    // console.log("play");
    aud_elm.pause();
}


function playlistPlay_set(src)
{
  let song_number = parseInt(src.split(",")[0]);

  let total_song_length = parseInt(src.split(",")[1]);
    document.getElementById("music_player").pause();
    document.getElementById("music_player").currentTime = 0;
    document.getElementById("player").style.transform = "translateY(200px)";
  
  document.getElementById("playlist_player").style.transform = "translateY(0px)";
  document.getElementById("playlist_player").style.opacity = "0.95";
  document.getElementById("playlist_player").style.zIndex = "10000";

  document.getElementById("playlist_player_name").innerHTML = preset_songs[song_number].name;
  document.getElementById("playlist_player_artist").innerHTML = preset_songs[song_number].artist;
  document.getElementById("playlist_player_album_src").src = preset_songs[song_number].cover;
  document.getElementById("audio_player").src = preset_songs[song_number].path;





  setTimeout(() => {
   
    document.getElementById("playlist_player_play").addEventListener("click", () => {
      document.getElementById("audio_player").play();
    })
    document.getElementById("playlist_player_pause").addEventListener("click", () => {
      document.getElementById("audio_player").pause();
    })

    setInterval(() => {
      // console.log(song_number)
      if(parseInt(song_number) == (0))
      {
        document.querySelector(".playlist_player_fast").style.opacity = "25%";
        document.querySelector(".playlist_player_fast").style.pointerEvents = "none";
      }
       else if(song_number == total_song_length-1)
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

  document.getElementById("playlist").childElementCount == 0 ? document.getElementById("playlist_popup").disabled = true : document.getElementById("playlist_popup").disabled = false;
  
  setTimeDur();
  },200)

  document.getElementById("playlist_player_fast").addEventListener("click", () => {
    next_song = parseInt(song_number-1) //due to the icon exclusive look
    song_number = parseInt(next_song)
    document.getElementById("playlist_player_name").innerHTML = preset_songs[next_song].name;
    document.getElementById("playlist_player_artist").innerHTML = preset_songs[next_song].artist;
    document.getElementById("playlist_player_album_src").src = preset_songs[next_song].cover;
    document.getElementById("audio_player").src = preset_songs[next_song].path;
    setTimeDur();
  
  })

  document.getElementById("playlist_player_back").addEventListener("click", () => {
    prev_song = parseInt(song_number+1) //due to the icon exclusive look
    song_number = parseInt(prev_song)
    document.getElementById("playlist_player_name").innerHTML = preset_songs[prev_song].name;
    document.getElementById("playlist_player_artist").innerHTML = preset_songs[prev_song].artist;
    document.getElementById("playlist_player_album_src").src = preset_songs[prev_song].cover;
    document.getElementById("audio_player").src = preset_songs[prev_song].path;
    setTimeDur();

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


