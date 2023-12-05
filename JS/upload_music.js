if((localStorage.getItem("account_login_username") === null))
{
    location.replace("Login_or_Reg.html");
}

window.onblur = function() {
  // console.log('Got focus');
}

var genreValue = null; 
const user = localStorage.getItem("account_login_username");
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


  //this is the main account data-base
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


  $('.genreCheckBox').on('change', function() {
    $('.genreCheckBox').not(this).prop('checked', false);  
});

var main_dataBase = firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username"));
main_dataBase.get().then((doc) => {
  user_artistic_name = (doc.data().artistic_name);
})


document.getElementById("upload_music").onclick = function(e)
{
   
    var input = document.createElement('input')
    input.type = 'file';
    input.accept = ".mp3";
   
    input.onchange = e => 
    {    
        files = e.target.files;
          filename =  (files[0].name)
        var ext = filename.split('.').pop();
        globalThis.filename_name = filename.split('.')[0]
        globalThis.fileSize = (files[0].size)
        // console.log(ext)
        console.log(filename_name)
        reader = new FileReader();
        reader.onload = function()
        {

          
          document.getElementById("main_upload_zone").style.transform = "translateY(0px)";
          if(user_artistic_name != "")
          {
            document.getElementById("song_artist_label").style.display = "none";
            document.getElementById("song_artist_name").style.display = "none";
            document.getElementById("song_artist_name").style.pointerEvents = "none";
            document.getElementById("artist_name").innerHTML += " " + user_artistic_name;
          }

          if(user_artistic_name == "")
          {
            document.getElementById("song_artist_label").style.display = "all";
            document.getElementById("song_artist_name").style.display = "all";
            document.getElementById("song_artist_name").style.pointerEvents = "all";
            document.getElementById("artist_name").style.display = "none";
          }


          single_upload_unit = `<div class="single_upload_unit" id="pop${filename}">
          <span class="sample_music_name" id="sample_music_name">${filename}</span>
          <div class = "upload_progress" id = "upload_progress"></div>
        </div>`;
        document.getElementById("song_names_uploading").innerHTML += single_upload_unit;
        document.querySelector(".song_name").value = filename_name;
        document.getElementById("upload_music_unit").style.transform = "translateX(0px)";
        
        }
        reader.readAsDataURL(files[0])
        
        
        
    }
   

    input.click();
    
    }



music_upload_button = document.getElementById("upload_music_unit"); 

music_upload_button.onclick = function()
{   

  if(document.getElementById("song_artist_name").value != "")
  {
    firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username")).update({
      artistic_name : document.getElementById("song_artist_name").value,
    })
  }
  storage_music_name = document.querySelector(".song_name").value;
  console.log(storage_music_name)
  var genreElements = document.getElementsByClassName('genreCheckBox');
  for(var i=0; genreElements[i]; ++i){
        if(genreElements[i].checked){
          genreValue = genreElements[i].value;
             break;
        }
  }

if((user_artistic_name == "") && (document.getElementById("song_artist_name").value == ""))
{
  alert("Please provide your artistic name");
}

else
{
  if((storage_music_name != "" ) && (genreValue != null))
{
  // storage_music_name = document.getElementById("song_name").value;
  
    document.getElementById("upload_music_unit").style.transform = "translateX(-500px)";
    var uploadTask = firebase.storage().ref("Music_Asset_Nightangle/" + storage_music_name + ".mp3").put(files[0]);
   
    uploadTask.on('state_changed', function(snapshot){
      document.getElementById("song_artist_name").style.pointerEvents = "none";
         console.log("uploading")
         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
         progress = Math.floor(progress) + "%";
         resonance_per.style.setProperty('--upload_prog', progress);
    },
    function(error)
    {
        console.log("failed to upload")

    },
    function()
    {
      var main_dataBase = firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username"));
      main_dataBase.get().then((doc) => {
      user_artistic_name = (doc.data().artistic_name);
    })

        const timestamp = Date.now();
        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
            var resonance_url = url;
            database_music.collection('Songs').doc(storage_music_name).set({
              music_src : resonance_url,
              date_uploaded: today,
              uploader: user_artistic_name,
              genre : genreValue,
              name : storage_music_name,
              album : "https://firebasestorage.googleapis.com/v0/b/chat-c774b.appspot.com/o/0A%20NightAngle%20Assets%2Fdef%20logo.jpg?alt=media&token=2acb6b5b-c634-4927-b029-d107913efe00",

              
          });

          setTimeout(() =>  {
            document.getElementById("pop"+filename).remove();
            resonance_per.style.setProperty('--upload_prog', 0);
          }, 2000)
        }
    );
    document.getElementById("song_name").value = filename;
    document.getElementById("main_upload_zone").style.transform = "translateY(-1400px)";
});
}
else
{
  alert("Please mention both the song name and the genre");
}
}
}



