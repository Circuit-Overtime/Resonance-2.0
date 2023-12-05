var main_dataBase = firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username"));
// setInterval(console.log(Date.now()), 1000);
const numberOfSomgs = 97;
const randomIndex = Math.floor(Math.random() * numberOfSomgs);

player = document.getElementById('music_player');
var resonance_per = document.querySelector(':root');
// ----------------------------------------------------------GETTING SONGS---------------------------------------------------------------------------------------- 
document.getElementById("main_container").innerHTML = "";
database_music.collection("Songs").limit(51).get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        music_unit = `<div class="music_unit" data-id="${doc.data().music_src}" id="${doc.data().name}"onclick = "playSong(this)">
        <div class="album_image">
        <img src="${doc.data().album}">
        </div>
        <h2 class="unit_song_name"> ${(doc.id).slice(0,14).concat("...")}</h2>
        <p class="unit_song_artist">${doc.data().uploader}</p>
        <ion-icon name="heart" id="add_laterlist" data-id="${doc.data().name}" onclick="laterList(this)"></ion-icon>
        <ion-icon name="musical-note" id="add_playlist" data-id="${doc.data().name}" onclick = "playList(this)"></ion-icon>
      </div>`
      
 // shuffles the DOM
      $(function () {
        var parent = $("#main_container");
        var divs = parent.children();
        while (divs.length) {
            parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
        }
    });


      document.getElementById("main_container").innerHTML += music_unit;
    //   resonance_per.style.setProperty('--album_gradient', color);
    });
});
// --------------------------------------------------PLAYING A SINGLE SONG------------------------------------------------------------------------------------------------------- 
function playSong(self)
{
  document.getElementById("qr_expand").style.transform = "translate(-1000px)";
  document.getElementById("waveforms").innerHTML = "";
  document.getElementById("waveforms").style.width = "0%";
  document.getElementById("barcode").style.height = "0%";

  document.getElementById("audio_player").src = "";
  document.getElementById("audio_player").pause();
   document.getElementById("audio_player").currentTime = 0;
  document.getElementById("playlist_player").style.transform = "translateY(690px)";
 if(document.getElementById("playList").classList.contains("active"))
 {
  document.getElementById("playList").classList.toggle("active");
 }
 
    music_source = self.getAttribute("data-id");
    music_id = self.getAttribute("id");
    player.pause();
    player.currentTime = 0;
    document.getElementById("music_unit_name_displayed").innerHTML = music_id;
    document.getElementById("player").style.transform = "translateY(0px)";
    player.src = music_source;
    setTimeout(() => {
        
        document.getElementById("play_button").style.opacity = "1";
        document.getElementById("play_button").style.pointerEvents = "all";
        // console.log(document.getElementById("music_player").duration);
        document.getElementById("change_seek").setAttribute("max", document.getElementById("music_player").duration);
        setInterval(() => {
          document.getElementById("change_seek").setAttribute("max", document.getElementById("music_player").duration)
    document.getElementById("change_seek").value = document.getElementById("music_player").currentTime;
    
    // song_elapsed = (Math.round(document.getElementById("music_player").currentTime) / Math.round(document.getElementById("music_player").duration) * 100 + "%");


    var minutes_current_unit = parseInt(document.getElementById("music_player").currentTime / 60, 10);
  var seconds_current_unit = parseInt(document.getElementById("music_player").currentTime % 60);
  if(minutes_current_unit < 10)
  {
    minutes_current_unit = "0" + minutes_current_unit;
  }
  if(seconds_current_unit < 10)
  {
    seconds_current_unit = "0" + seconds_current_unit;
  }
  document.getElementById("current_time_unit").innerHTML = minutes_current_unit + ":" + seconds_current_unit;


  var minutes_total_unit = parseInt(document.getElementById("music_player").duration / 60, 10);
  var seconds_total_unit = parseInt(document.getElementById("music_player").duration % 60);
  if(minutes_total_unit < 10)
  {
    minutes_total_unit = "0" + minutes_total_unit;
  }
  if(seconds_total_unit < 10)
  {
    seconds_total_unit = "0" + seconds_total_unit;
  }
  document.getElementById("total_time_unit").innerHTML = minutes_total_unit + ":" + seconds_total_unit;
  if(document.getElementById("music_player").paused == true)
  {
    document.querySelector(".pause_button").style.opacity = "0";
    document.querySelector(".pause_button").style.pointerEvents = "none";
    document.querySelector(".play_button").style.opacity = "1";
    document.querySelector(".play_button").style.pointerEvents = "all";
  }
  if(document.getElementById("music_player").paused == false)
  {
    document.querySelector(".pause_button").style.opacity = "1";
    document.querySelector(".pause_button").style.pointerEvents = "all";
    document.querySelector(".play_button").style.opacity = "0";
    document.querySelector(".play_button").style.pointerEvents = "none";

  }
        }, 200)
        
    }, 1500)
    database_music.collection("Songs").doc(music_id).get().then((doc) => {
      waveform_id = (parseInt(doc.data().code_id));
      let waveform_value = waveform_id.toString(2);
      var qr = new QRious({
        element: document.getElementById('barcode'),
        value:  String(doc.data().name),
        size: 40,
        level: "H",
        background: 0,
        backgroundAlpha:0,
        foreground: "#ff003b",
        foregroundAlpha: 1,
      });
      document.getElementById("barcode").style.height = "50px";
      document.getElementById("waveforms").style.width = "30%";
colors = ["#ffdbe3","#fffff"];
var color = colors[Math.floor(Math.random()*colors.length)];
      for(let i=0; i < waveform_value.length/2; i++)
    {

      if(waveform_value[i] == 1)
      {
        wavefrom_unit = `<span class="waveform" style="height:35px; background: ${color};" ></span>`
        document.getElementById("waveforms").innerHTML += wavefrom_unit;
      }
      else
      {
        wavefrom_unit = `<span class="waveform" style="height:25px; top: 7px;"></span>`
        document.getElementById("waveforms").innerHTML += wavefrom_unit;
      }
    }
    document.getElementById("album_unit_player").src = doc.data().album;
    })
    
  
}
document.getElementById("close_unit_music_player").addEventListener("click", () => {
    player.pause();
    player.currentTime = 0;
    document.getElementById("player").style.transform = "translateY(200px)";
})
// -----------------------------------------------------------PLAYING PLAYLIST-------------------------------------------------------------------------------------------------------- 
function playList(self)
{
    document.getElementById("qr_expand").style.transform = "translate(-1000px)";
    player.pause();
    player.currentTime = 0;
    document.getElementById("player").style.transform = "translateY(200px)";
    playlist_add_name = self.getAttribute("data-id")
    
    firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username")).get()
    .then((doc) => {
     
   
          
        //if playlist exists then we append the song to the default playlist
       var defaultPlaylist = doc.data().defaultPlayList;
       
       database_music.collection("Users_Playlists").doc(localStorage.getItem("account_login_username") + "_playlist").update({ 
        playlist_songs : firebase.firestore.FieldValue.arrayUnion(playlist_add_name+"#"+defaultPlaylist)  //always keep the field name (if its a variable ) inside square brackets.
    })
      
    })

    
}
// =========================================================LISTEN LATER ADD================================================================================================================================================== 
function laterList(self)
{
  laterList_add_name = self.getAttribute("data-id");
  console.log(laterList_add_name)
  firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username")).update({
    Listen_Later : firebase.firestore.FieldValue.arrayUnion(laterList_add_name),
  }) 
  
}
// =============================================END OF INITIAL SONG LIST=================================================================================================================================================================================== 


   
  // document.getElementById("main_container").addEventListener("scroll", (e) => {
  //   // console.log("Element Scrollng");  
  //   var element = e.target;
  //   if (element.scrollWidth - element.scrollLeft === element.clientWidth)
  //   {
  //       console.log('scrolled');
  //   }
  // })

  function generate_card()
  {
    document.getElementById("music_player").pause();
    document.getElementById("waveforms_expand").innerHTML = "";
    document.getElementById("qr_expand").style.transform = "translate(0px)";
    const currentSong_playCard = document.getElementById("music_unit_name_displayed").innerHTML;
   
    const local_current_seekValue_playCard = document.getElementById("change_seek").value;

    document.getElementById("song_name_adver_expand").innerHTML = currentSong_playCard;
    document.getElementById("qr_expand_seek").value = local_current_seekValue_playCard;

    setInterval(() => {
      const currentTime_playcard = document.getElementById("current_time_unit").innerHTML;
      const totalTime_playcard = document.getElementById("total_time_unit").innerHTML;
      document.getElementById("qr_expand_start_time").innerHTML = currentTime_playcard;
      document.getElementById("qr_expand_end_time").innerHTML = totalTime_playcard;
    }, 800);


    database_music.collection("Songs").doc(currentSong_playCard).get().then((doc) => {
      waveform_id = (parseInt(doc.data().code_id));
      document.getElementById("album_unit_player_expand").src = doc.data().album;
      // console.log(waveform_id)
      let waveform_value = waveform_id.toString(2);
      var qr = new QRious({
        element: document.getElementById('barcode_expand'),
        value:  String(doc.data().name),
        size: 60,
        level: "H",
        background: 0,
        backgroundAlpha:0,
        foreground: "#fff",
        foregroundAlpha: 1,
      });
      document.getElementById("barcode_expand").style.height = "60px";
      colors = ["#ffdbe3","#fffff"];
      var color = colors[Math.floor(Math.random()*colors.length)];
      for(let i=0; i < waveform_value.length/2; i++)
    {

      if(waveform_value[i] == 1)
      {
        wavefrom_unit = `<span class="waveform_expand" style="height:35px; background: ${color};" ></span>`
        document.getElementById("waveforms_expand").innerHTML += wavefrom_unit;
      }
      else
      {
        wavefrom_unit = `<span class="waveform_expand" style="height:25px; top: 7px;"></span>`
        document.getElementById("waveforms_expand").innerHTML += wavefrom_unit;
      }
    }
    })
    


  }

  function downloadPlaycard()
{
  html2canvas(document.getElementById("qr_expand"), {
    allowTaint: true, useCORS: true
}).then(function (canvas) {
    var anchorTag = document.createElement("a");
    document.body.appendChild(anchorTag);
    anchorTag.download = "Resonance_Playcard.png";
    anchorTag.href = canvas.toDataURL();
    anchorTag.target = '_blank';
    anchorTag.click();
    anchorTag.remove();
});
}


  document.getElementById("qr_expand_close").addEventListener("click" ,() => {
    document.getElementById("qr_expand").style.transform = "translate(-1000px)";
  })



  

      function filter()
      {
          var input, filter, ul, li, a, i, txtValue;
          input = document.getElementById("reso_song_search");
          filter = input.value.toUpperCase();
          ul = document.getElementById("main_container");
          li = ul.getElementsByClassName("music_unit");
          // console.log(li)
          
      for (i = 0; i < li.length; i++) {
          a = li[i].getElementsByClassName("unit_song_name")[0];
          txtValue = a.textContent || a.innerText;

          if (txtValue.toUpperCase().indexOf(filter) > -1) {
            // console.log(li[i])
            li[i].style.display = "";
            } else {
            li[i].style.display = "none";
            
        }
      }
    }
          /*
          
*/
      
  
  
  document.getElementById("reso_song_search").addEventListener("keyup", () => {
      filter();
          })