
var playListElements = document.getElementsByClassName('playListSelected');
var main_dataBase = firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username"));
document.getElementById("add_playList").addEventListener("click" , () => {
    document.getElementById("side_navbar").classList.add("toggle");
    document.getElementById("create_playlist").style.transform = "translateY(0px)";
    document.querySelector(".container").style.transform = "translateY(-400px)";
})

document.getElementById("playlist_create_cancel").addEventListener("click" , () => {
    document.getElementById("create_playlist").style.transform = "translateY(-200px)";
    if((document.querySelector(".songs_nav").style.color == "#0f0") || (document.querySelector(".songs_nav").style.color == "rgb(0, 255, 0)"))
    {
        document.querySelector(".container").style.transform = "translateY(0px)";
        document.querySelector(".container").focus();
    }
    else
    {
        document.querySelector(".container").style.transform = "translateY(-400px)";
    }
})


document.getElementById("playlist_create").addEventListener("click", () => {
    document.getElementById("side_navbar").classList.add("active");
    playlist_name = document.getElementById("playlist_name").value;
    playlist_name = playlist_name.replace(" ", "_");
    if((document.getElementById("playlist_name").value.length < 6) || (document.getElementById("playlist_name").value.length > 22))
    {
        document.getElementById("error_playlist_create").style.opacity = "1";
        document.getElementById("error_playlist_create").style.color = "red";
        document.getElementById("error_playlist_create").innerHTML = "Opps! Name of the playlist should be atleast 6 characters or atmost 22 characters.";
        document.getElementById("create_playlist").classList.toggle("active");

        setTimeout(() => {
            document.getElementById("error_playlist_create").style.opacity = "0";
            document.getElementById("create_playlist").classList.remove("active");
            
        }, 1500);
    }
    else
    {
        main_dataBase.update({
            Playlists: firebase.firestore.FieldValue.arrayUnion(playlist_name),
        })
        main_dataBase.update({
            [playlist_name]: [],
        })
        document.getElementById("error_playlist_create").style.opacity = "1";
        document.getElementById("error_playlist_create").innerHTML = "Playlist has been added in your account";
        document.getElementById("error_playlist_create").style.color = "#0f0";
        setTimeout(() => {
            document.getElementById("error_playlist_create").style.opacity = "0"; 
            document.getElementById("create_playlist").style.transform = "translateY(-200px)";
            document.getElementById("playlist_name").value = "";
        }, 1500);
    }
})


firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username")).onSnapshot((doc) => {
        document.getElementById("existing_playlists").innerHTML = "";
        // console.log(doc.data().Playlists[0])
        for(let i = 0; i < doc.data().Playlists.length; i++)
        {
            playListCheckbox = `<div id="radio_${doc.data().Playlists[i]}" class="features">
        <input type="radio" id="${doc.data().Playlists[i]}" class="playListSelected" name="existingPlaylists" value="${doc.data().Playlists[i]}"/>
        
        <div>
          <span>
          <i class="fa-solid fa-trash" id="${doc.data().Playlists[i]}" data-id="${doc.data().Playlists[i]}" onclick = "deleteMyPlaylist(this)"></i>
          ${doc.data().Playlists[i]}
            <br/>
          </span>
        </div>
      </div> `
      document.getElementById("existing_playlists").innerHTML += playListCheckbox;
        }
        

    });

function updateSelectedPlayList()
{
    firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username")).get()
    .then((doc) => {
        if(doc.data().defaultPlayList == "Listen_Later")
        {
            document.getElementById("Listen_Later").checked = true;
        }
        else
        {
            document.getElementById(doc.data().defaultPlayList).checked = true;
        }
        
        
        
        
    })
}
 


document.getElementById("existing_playlists").addEventListener("click", () => {
    for(var i=0; playListElements[i]; ++i){
        if(playListElements[i].checked){
          playListValue = playListElements[i].value;
            //  console.log(playListValue)
             firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username")).update({
                defaultPlayList : playListValue,
             })
             updateSelectedPlayList(); 
            //  document.getElementById("playList").innerHTML = ""
           numberOfExisitingSongs = document.getElementsByClassName("playList_songs");
                loadPlaylist(); 
         
             
          
             break;
        }
        
  }
})


    updateSelectedPlayList();





 