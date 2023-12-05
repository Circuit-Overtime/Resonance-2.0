setTimeout(() => {
    setInterval(() => {
        usr_temp = localStorage.getItem("account_login_username");
        usr_eml = localStorage.getItem("account_login_email");
        localStorage.setItem("account_login_username", usr_temp)
        localStorage.setItem("account_login_email", usr_eml)
    }, 100);
    

}, 200);

if((localStorage.getItem("account_login_username") == null))
{
    location.replace("s1.html")
}


localStorage.openpages_reso_dev = Date.now();
window.addEventListener('storage', function(e) {
    if(e.key == "openpages_reso_dev")
    {
        localStorage.page_available_resoDev = Date.now();
    }
    if(e.key == "page_available_resoDev")
    {
        alert("You are having RD2 open in any other tab");
        setTimeout(() => {
            close();
        }, 80);
    }
},false)


window.onload
{
    document.getElementById("genre_selection").value =  localStorage.getItem("default_upload_genre");
}


document.getElementById("upload_section_pop").addEventListener("click" , () => {
    document.getElementById("the_musics_upload").classList.toggle("active");
})


let today = new Date().toLocaleDateString();
var resonance_per = document.querySelector(':root');
var firebaseConfig = {
    apiKey: "AIzaSyBL0d5Equk-xEDyDzmflArXAwRRSz24M1M",
    authDomain: "storage-b195d.firebaseapp.com",
    projectId: "storage-b195d",
    storageBucket: "gs://storage-b195d.appspot.com",
    messagingSenderId: "967844400430",
    databaseURL: "https://storage-b195d-default-rtdb.firebaseio.com",
    appId: "1:967844400430:web:e626050e6489abfbda3ebf"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const database_files = firebase.database();
  const database_music = firebase.firestore();

  var main_database = {
    apiKey: "AIzaSyAUgJj60PbLp87XDEru1hABxGHIppJkJiM",
    authDomain: "chat-c774b.firebaseapp.com",
    databaseURL: "https://chat-c774b-default-rtdb.firebaseio.com",
    projectId: "chat-c774b",
    storageBucket: "chat-c774b.appspot.com",
    messagingSenderId: "74762195917",
    appId: "1:74762195917:web:a8f94415ad6a018d6daa84"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(main_database, "secondary");


  
  //Listen for file selection
fileButton = document.getElementById("music_upd_button_reso");
fileButton.addEventListener('click', function(){ 
    def_gen = document.getElementById("genre_selection").value;
    if((document.getElementById("genre_selection").value == "")|| (document.getElementById("genre_selection").value.length <= 2))
    {
        alert("Please provide a valid Genre")
    }
    else
    {
    localStorage.setItem("default_upload_genre", def_gen)
    var input = document.createElement('input')
    input.type = 'file';
    input.accept = ".mp3";
    input.multiple = "multiple";
    
    input.onchange = e =>
    {
        console.log(e.target.files.length)
        if(e.target.files.length == 1)
        {
            document.getElementById("the_musics_upload").style.height = "62px";
        }
        else if(e.target.files.length == 2)
        {
            document.getElementById("the_musics_upload").style.height = "110px";
        }
        else if(e.target.files.length == 3)
        {
            document.getElementById("the_musics_upload").style.height = "165px";
        }
        else if(e.target.files.length == 4)
        {
            document.getElementById("the_musics_upload").style.height = "200px";
        }
        else if((e.target.files.length >= 5) && (e.target.files.length <= 10))
        {
            document.getElementById("the_musics_upload").style.height = "262px";
        }
        else
        {
            alert("You Can Only Upload Upto 10 Musics at a Time")
        }
        if(e.target.files.length <= 10)
        {
            for (var i = 0; i < e.target.files.length; i++) {
                var imageFile = e.target.files[i];
               
                uploadImageAsPromise(imageFile);
            }
        }
      
    }
    //Get files
    
    input.click()
    }
    
});

//Handle waiting to upload each file using promise
function uploadImageAsPromise (imageFile) {

    display_prog = `<h2 class="the_music_upload_name" id="${imageFile.name}">${imageFile.name}</h2>
                <div class="the_music_upload_prog" id="${imageFile.name + "prog"}"></div>`;

                document.getElementById("the_musics_upload").innerHTML += display_prog;

                document.getElementById("upload_section_pop").style.animationPlayState = "running";

                setInterval(() => {
                    if(document.getElementById("the_musics_upload").classList.contains("active"))
                        {
                            document.getElementById("upload_section_pop").style.animationPlayState = "paused";
                        }
                    else
                        {
                            document.getElementById("upload_section_pop").style.animationPlayState = "running";
                        }},1200)


    return new Promise(function (resolve, reject) {
        var storageRef = firebase.storage().ref("Music_Asset_Nightangle/"+imageFile.name + ".mp3");

        //Upload file
        var task = storageRef.put(imageFile);
        
        //Update progress bar
        task.on('state_changed',
            function progress(snapshot){
                

                var percentage = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                console.log(snapshot.location , percentage)
                percentage = Math.floor(percentage) + "%";
                document.getElementById(imageFile.name + "prog").style.width = percentage;
                setInterval(function() {
                    var elem = document.getElementById("the_musics_upload");
                    elem.scrollTop = elem.scrollHeight;
                  }, 1000);
                
                
                // document.getElementById(imageFile.name + "prog").width += percentage;
            },  
            function error(err){

            },
            function complete(){
                task.snapshot.ref.getDownloadURL().then(function(url){
                    def_upload_gen = localStorage.getItem("default_upload_genre")
                    file_name_save = imageFile.name.split(".")[0];
                    var downloadURL = url;
                        database_music.collection('Songs').doc(file_name_save).set({
                            music_src : downloadURL,
                            date_uploaded: today,
                            genre: def_upload_gen,
                            name : file_name_save,
                            file_size: imageFile.size,
                            uploader: "Resonance Official",
                            artist: "-",
                            album_name : "-",
                            code_id : Date.now(),
                            banned: false,
                            album : "https://firebasestorage.googleapis.com/v0/b/chat-c774b.appspot.com/o/0A%20NightAngle%20Assets%2Fdef%20logo.jpg?alt=media&token=2acb6b5b-c634-4927-b029-d107913efe00",
                        });
                })
                document.getElementById("upload_section_pop").style.animationPlayState = "paused";
                document.getElementById(imageFile.name).remove();
                document.getElementById(imageFile.name + "prog").remove();
                if(document.getElementById("the_musics_upload").classList.contains("active"))
                        {
                            document.getElementById("the_musics_upload").classList.toggle("active");
                        }

               
            }
        );
    });
}

setInterval(() => {
    document.getElementById("songs_number").innerHTML = "Total Number of songs: " + document.getElementsByClassName("table_units").length;
}, 1000);



// database_music.collection("Songs").get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//         // doc.data() is never undefined for query doc snapshots
//         // console.log(doc.data())
//         tr_struc = `<tr id="${doc.data().name}" data-id="${doc.data().name}" class="table_units" ">
//         <td data-column="Song_Name"  class="Song_Name"  onclick="edit_music(this)" data-id="${doc.data().name}">${doc.data().name}</td>
//         <td data-column="Genre" class="Genre" >${doc.data().genre}</td>
//         <td data-column="Artist" class="Artist" >${doc.data().artist}</td>
//         <td data-column="Album_Name" class="Album_Name" >${doc.data().album_name}</td>
//         <td data-column="DOU" class="DOU" >${doc.data().date_uploaded}</td>
//         <td data-column="Uploader" class="Uploader" >${doc.data().uploader}</td>
//         <td data-column="Album" class="album_pic"  data-id="${doc.data().name}" onclick = "edit_thumbnail(this)"><img src="${doc.data().album}" id="${doc.data().name}" class="tr_image"></td>
//       </tr>`

        

//     });
// });

document.getElementById("genre_selection").addEventListener("blur", () => {
    
    if(document.getElementById("genre_selection").value != "")
    {
    // console.log("Focus lost")
    def_gen = document.getElementById("genre_selection").value;
    localStorage.setItem("default_upload_genre", def_gen);
    document.getElementById("genre_selection").value =  localStorage.getItem("default_upload_genre");
    }
    document.getElementById("genre_selection").value =  localStorage.getItem("default_upload_genre");
})

function edit_music(self)
{
    song_name = self.getAttribute("data-id");
    document.getElementById("edit_music").style.opacity = "1";
    document.getElementById("edit_music").style.display  = "block";
    document.getElementById("edit_music").style.pointerEvents = "all";
    document.getElementById("edit_music").style.zIndex= "100";
  
    firebase.firestore().collection("Songs").doc(song_name).get().then((docs) => {
        document.getElementById("edit_music_uploader").value = docs.data().uploader;
        document.getElementById("edit_music_artist").value = docs.data().artist;
        document.getElementById("edit_music_genre").value = docs.data().genre;
        document.getElementById("edit_music_album").value = docs.data().album_name;
        document.getElementById("bannSong").checked = docs.data().banned;
        setInterval(() => {
            if((document.getElementById("edit_music_album").value == "") || (document.getElementById("edit_music_uploader").value == "") || (document.getElementById("edit_music_artist").value == "") || (document.getElementById("edit_music_genre").value == ""))
        {
            document.getElementById("edit_music_save").style.transform = "translateX(1400px)"
        }
        else
        {
            document.getElementById("edit_music_save").style.transform = "translateX(0000px)"
        }   
        }, 800);    
        
        
    })
    document.getElementById("edit_music_save").addEventListener("click", () => {
        new_uploader = document.getElementById("edit_music_uploader").value;
        new_genre = document.getElementById("edit_music_genre").value;
        new_artist = document.getElementById("edit_music_artist").value;
        new_album_name = document.getElementById("edit_music_album").value;
        is_banned = document.getElementById("bannSong").checked;
        firebase.firestore().collection("Songs").doc(song_name).update({
            uploader: new_uploader,
            artist: new_artist,
            genre: new_genre,
            album_name : new_album_name,
            banned : is_banned,
        })
    document.querySelector(".success_notif").style.display = "block";

    setTimeout(() => {
        document.querySelector(".success_notif").style.display = "none";
        document.getElementById("edit_music").style.opacity = "0";
        document.getElementById("edit_music").style.display  = "none";
        document.getElementById("edit_music").style.pointerEvents = "none";
        document.getElementById("edit_music").style.zIndex= "-1";
        document.getElementById("edit_music_uploader").value = "";
        document.getElementById("edit_music_artist").value = "";
        document.getElementById("edit_music_genre").value = "";
        document.getElementById("edit_music_album").value = "";
    }, 1000);
 
})
  
    
}



document.getElementById("close_edit_music").addEventListener("click" , () => {
    document.getElementById("edit_music").style.opacity = "0";
    document.getElementById("edit_music").style.display  = "none";
    document.getElementById("edit_music").style.pointerEvents = "none";
    document.getElementById("edit_music").style.zIndex= "-1";
    document.getElementById("edit_music_uploader").value = "";
    document.getElementById("edit_music_artist").value = "";
    document.getElementById("edit_music_genre").value = "";
    document.getElementById("edit_music_album").value = "";
})

setInterval(() => {
if((document.querySelector(".the_musics_upload").childElementCount == 0))
{
    no_upload = `<img src="https://firebasestorage.googleapis.com/v0/b/chat-c774b.appspot.com/o/0A%20NightAngle%20Assets%2Fno_upload.png?alt=media&token=77953990-732e-48f7-ad56-3388e090ea7d" class="no_upload_scheduled" id="no_upload_scheduled">`
    document.getElementById("the_musics_upload").innerHTML = no_upload;
    document.getElementById("no_upload_scheduled").style.display = "block";
}  
else
{
    document.getElementById("no_upload_scheduled").style.display = "none";
}
}, 1200);


/*
{ <ion-icon name="pause"  class="upload_pause" id="${imageFile.name + "pause"}" onclick=\"(pause_upload('${imageFile}'))\"></ion-icon>
                    <ion-icon name="play"  class="upload_resume"  id="${imageFile.name + "resume"}" onclick=\"(resume_upload('${imageFile} '))\" ></ion-icon>
                    <ion-icon name="stop"  class="upload_stop" id="${imageFile.name + "stop"}"onclick=\"(stop_upload('${imageFile}'))\" ></ion-icon> }*/

document.getElementById("info_pop").addEventListener("click", () => {
    document.getElementById("description_about").classList.toggle("active");
})

document.getElementById("close_desc_abt").addEventListener("click", () => {
    document.getElementById("description_about").classList.toggle("active");
})


document.getElementById("step_pop").addEventListener("click", () => {
    document.getElementById("steps_about").classList.toggle("active");
})

document.getElementById("close_steps").addEventListener("click", () => {
    document.getElementById("steps_about").classList.toggle("active");
})



function uploadThumb (thumbFile, songNameDir) {
        var storageRef = firebase.storage().ref("Thumbnail_Asset_Nightangle/"+songNameDir+"_thumbnail");

        //Upload file
        var task = storageRef.put(thumbFile);
        
        //Update progress bar
        task.on('state_changed',
            function progress(snapshot){
                var percentage_thumb = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                
                percentage_thumb = Math.floor(percentage_thumb) + "%";
                console.log(percentage_thumb)
                resonance_per.style.setProperty('--thumb_upload_prog', percentage_thumb);
            },  
            function error(err){

            },
            function complete(){
                task.snapshot.ref.getDownloadURL().then(function(url){
                    def_upload_gen = localStorage.getItem("default_upload_genre")
                    file_name_save = thumbFile.name.split(".")[0];
                    var downloadURL = url;
                        database_music.collection('Songs').doc(songNameDir).update({
                            album : downloadURL,
                        });
                        document.getElementById(songNameDir).setAttribute("src",  url);
                })
                setTimeout(() => {
                    resonance_per.style.setProperty('--thumb_upload_prog', 0);
                }, 1200);
                
            }
        );
   
}




function edit_thumbnail(self)
{
    console.log(self.getAttribute("data-id"));
    var songNameDir = self.getAttribute("data-id");
    var input = document.createElement('input')
    input.type = 'file';
    input.accept = ".jpg";
    input.onchange = e =>
    {   
        thumbFile = e.target.files[0];
        uploadThumb(thumbFile, songNameDir);
    }  
    input.click()
}



database_music.collection("Songs").where("uploader", "==", "Resonance Official").onSnapshot((docs) => {
    document.getElementById("music_table_body").innerHTML = "";
    var cities = [];
    docs.forEach((doc) => {
        cities.push(doc.data());
        tr_struc = `<tr id="${doc.data().name}" data-id="${doc.data().name}" class="table_units">
        
        <td data-column="Song_Name"  class="Song_Name"  onclick="edit_music(this)" data-id="${doc.data().name}">${doc.data().name.slice(0,40).concat("...")}</td>
        <td data-column="Genre" class="Genre" >${doc.data().genre}</td>
        <td data-column="Artist" class="Artist" >${doc.data().artist}</td>
        <td data-column="Album_Name" class="Album_Name" >${doc.data().album_name}</td>
        <td data-column="DOU" class="DOU" >${doc.data().date_uploaded}</td>
        <td data-column="Uploader" class="Uploader" >${doc.data().uploader.slice(0,40).concat("...")}</td>
        <td data-column="code_id" class="code_id" >${doc.data().code_id}</td>
        <td data-column="Album" class="album_pic"  data-id="${doc.data().name}" onclick = "edit_thumbnail(this)"><img src="${doc.data().album}" id="${doc.data().name}" class="tr_image"></td>
      </tr>`

      setTimeout(() => {
        if(doc.data().banned == true)
        {
            document.getElementById(doc.data().name).style.opacity = "35%";
        }
      }, 700);
       
        document.getElementById("music_table_body").innerHTML += tr_struc;
    });
    filter();

    document.getElementById("music_table_body").innerHTML += tr_struc;
        function filter()
        {
            var input, filter, ul, li, a, i, txtValue;
            input = document.getElementById("reso_search");
            filter = input.value.toUpperCase();
            ul = document.getElementById("music_table_body");
            li = ul.getElementsByClassName("table_units");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByClassName("Song_Name")[0];
            txtValue = a.textContent || a.innerText;
            
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                // console.log(li[i])
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    
    }
    document.getElementById("reso_search").addEventListener("keyup", () => {
        filter();
            })


})


// ------------------------------------------------------------------------------------------------------------------------

firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username")).get().then((doc) => {
    // console.log(doc.data());
    document.getElementById("usr_profile_pic").src = doc.data().profile_logo;
    document.getElementById("usr_name_disp").innerHTML += doc.data().displayName;
})

setInterval(() => {
firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username")).get().then((doc) => {
    // console.log(doc.data().dev);
    
        if(doc.data().dev == true)
        {
            document.getElementById("maintenance_or_deny").style.display = "none";
        }
        else
        {
                document.getElementById("maintenance_or_deny").style.display = "block";
                setTimeout(() => {
                    console.log("exit")
                    window.location.replace("s3.html");
                }, 3000);
        }

  
    // document.getElementById("usr_profile_pic").src = doc.data().profile_logo;
})
}, 1000);

document.getElementById("logout_button").addEventListener("click", () => {
    window.location.replace("s1.html");
})


