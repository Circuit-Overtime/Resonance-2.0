document.getElementById("laterList").addEventListener("click" ,() => {
  document.getElementById("laterList_container").style.transform = "translateX(0px)";
})
function close_laterList()
{
  console.log("click")
  document.getElementById("laterList_container").style.transform = "translateX(1690px)";
}


let wishlistsongslist = []
firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username")).get()
    .then((doc) => {

        
        let wishList_songs = doc.data().Listen_Later;
        // console.log(wishList_songs)
        let length_wishList_songs = doc.data().Listen_Later.length;

        for (let i = 0; i < length_wishList_songs; i++)
          {

         globalThis.playList_songs = (doc.data().Listen_Later[i])
    
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
              wishlistsongslist.push(Html)

              
                // console.log(songs.length)

                  if(wishlistsongslist.length == length_wishList_songs)
                  {
                    
                    for(let j = 0; j < wishlistsongslist.length; j++)
                    {
                      //remember syntax : onclick=\"(function_name("paramer1, parameter2"))\" to pass multiple parameters through a dynamic function 
                      songs_of_wishlist  = `<div class="laterList_songs" data-id = "${wishlistsongslist[j].path}" onclick=\"(laterlistPlay('${j}, ${wishlistsongslist.length}'))\">
                    <div class="laterList_song_album">
                    <img src="${wishlistsongslist[j].cover}"></div>
                    <h2 class="Laterist_song_name">${wishlistsongslist[j].name}</h2>
                    <h2 class="Laterist_song_artist">${wishlistsongslist[j].artist}</h2>
                    <div class="div_break"></div>
                  </div>`;
                  document.getElementById("laterList_container").innerHTML += songs_of_wishlist;
                    }
                    
                  }
             
    
            })
            
          
          } 


    

})


function setTimeDur_later()
{
  var minutes_current = parseInt(document.getElementById("audio_player_later").currentTime / 60, 10);
  var seconds_current = parseInt(document.getElementById("audio_player_later").currentTime % 60);
  if(minutes_current < 10)
  {
    minutes_current = "0" + minutes_current;
  }
  if(seconds_current < 10)
  {
    seconds_current = "0" + seconds_current;
  }
  document.getElementById("current_time_later").innerHTML = minutes_current + ":" + seconds_current;


  var minutes_total = parseInt(document.getElementById("audio_player_later").duration / 60, 10);
  var seconds_total = parseInt(document.getElementById("audio_player_later").duration % 60);
  if(minutes_total < 10)
  {
    minutes_total = "0" + minutes_total;
  }
  if(seconds_total < 10)
  {
    seconds_total = "0" + seconds_total;
  }
  document.getElementById("total_time_later").innerHTML = minutes_total + ":" + seconds_total;
}    




function laterlistPlay(src)
    {
      
function nextShift()
{
   // console.log("next")
   next_song = parseInt(song_number+1) //due to the icon exclusive look
   song_number = parseInt(next_song)
   console.log(song_number)
   document.getElementById("laterList_player_name").innerHTML = wishlistsongslist[next_song].name;
   document.getElementById("laterList_player_artist").innerHTML = wishlistsongslist[next_song].artist;
   document.getElementById("laterList_player_album_src").src = wishlistsongslist[next_song].cover;
   document.getElementById("audio_player_later").src = wishlistsongslist[next_song].path;
   setInterval(() => {
     // console.log(document.getElementById("audio_player_later").duration);
     setTimeDur_later();
   }, 200)

}

function prevShift()
{
  // console.log("prev")
  prev_song = parseInt(song_number-1) //due to the icon exclusive look
  song_number = parseInt(prev_song)
  console.log(song_number)
  document.getElementById("laterList_player_name").innerHTML = wishlistsongslist[prev_song].name;
  document.getElementById("laterList_player_artist").innerHTML = wishlistsongslist[prev_song].artist;
  document.getElementById("laterList_player_album_src").src = wishlistsongslist[prev_song].cover;
  document.getElementById("audio_player_later").src = wishlistsongslist[prev_song].path;
  if(song_number == 0)
    {
      document.getElementById("playlist_player_back_later").style.opacity = "25%";
      document.getElementById("playlist_player_back_later").style.pointerEvents = "none";
    }
    setInterval(() => {
      // console.log(document.getElementById("audio_player_later").duration);
      setTimeDur_later();
    }, 200)
  
    
}

      document.getElementById("laterList_player").style.transform = "translateY(0px)";
      let song_number = parseInt(src.split(",")[0]);
      console.log(song_number)
      let total_song_length = parseInt(src.split(",")[1]);
        document.getElementById("music_player").pause();
        document.getElementById("music_player").currentTime = 0;
        document.getElementById("player").style.transform = "translateY(200px)";
        //pause the  playlist
      
    
      document.getElementById("laterList_player_name").innerHTML = wishlistsongslist[song_number].name;
      document.getElementById("laterList_player_artist").innerHTML = wishlistsongslist[song_number].artist;
      document.getElementById("laterList_player_album_src").src = wishlistsongslist[song_number].cover;
      document.getElementById("audio_player_later").src = wishlistsongslist[song_number].path;
      // wavesurfer.load(wishlistsongslist[song_number].path);
    
    
    
    
      setTimeout(() => {

        setTimeDur_later();
        document.getElementById("playlist_player_play_later").addEventListener("click", () => {
          document.getElementById("audio_player_later").play();
        })
        document.getElementById("playlist_player_pause_later").addEventListener("click", () => {
          document.getElementById("audio_player_later").pause();
        })
    
        setInterval(() => {
          
          document.querySelector(".playlist_player_seek").value = document.getElementById("audio_player").currentTime;
          // console.log(song_number)
          if(parseInt(song_number) == parseInt(0))
          {
            document.querySelector(".playlist_player_back_later").style.opacity = "25%";
            document.querySelector(".playlist_player_back_later").style.pointerEvents = "none";
          }
         else if(parseInt(song_number) != parseInt(0))
          {
            document.querySelector(".playlist_player_back_later").style.opacity = "100%";
            document.querySelector(".playlist_player_back_later").style.pointerEvents = "all";
          }

          if(song_number == total_song_length-1)
          {
            document.querySelector(".playlist_player_fast_later").style.opacity = "25%";
            document.querySelector(".playlist_player_fast_later").style.pointerEvents = "none";
          }
          else if(song_number != total_song_length-1)
          {
            document.querySelector(".playlist_player_fast_later").style.opacity = "100%";
            document.querySelector(".playlist_player_fast_later").style.pointerEvents = "all";
          }
      
          
    
          // console.log(document.getElementById("audio_player").paused)
          document.querySelector(".laterList_player_seek_later").value = document.getElementById("audio_player_later").currentTime;
      if(document.getElementById("audio_player_later").paused == false) //audio_elm is playing
      {
        document.querySelector(".playlist_player_pause_later").style.opacity = "1";
        document.querySelector(".playlist_player_pause_later").style.pointerEvents = "all";
        document.querySelector(".playlist_player_play_later").style.opacity = "0";
        document.querySelector(".playlist_player_play_later").style.pointerEvents = "none";
      }
    
      if(document.getElementById("audio_player_later").paused == true) //audio_elm is paused
      {
        
        document.querySelector(".playlist_player_pause_later").style.opacity = "0";
        document.querySelector(".playlist_player_pause_later").style.pointerEvents = "none";
        document.querySelector(".playlist_player_play_later").style.opacity = "1";
        document.querySelector(".playlist_player_play_later").style.pointerEvents = "all";
      }
    
      
      
      },200)
    
      document.getElementById("playlist_player_fast_later").addEventListener("click", () => {
        nextShift();
      })
    
      document.getElementById("playlist_player_back_later").addEventListener("click", () => {
        prevShift();
      })
        
      
    
    
        }, ((1700)));
    
        // console.log();
    }

    
function shiftTime_later()
{
  document.getElementById("audio_player_later").currentTime = document.querySelector(".laterList_player_seek_later").value;

}

function change_playList_vol_later()
{
  document.getElementById("audio_player_later").volume = document.querySelector(".playlist_player_vol_later").value / 100;
}


function closeLaterList()
{
  
  document.getElementById("audio_player_later").src = "";
  document.getElementById("audio_player_later").pause();
  document.getElementById("audio_player_later").currentTime = 0;
  document.getElementById("laterList_player").style.transform = "translateY(220px)";
}





