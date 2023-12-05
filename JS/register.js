today  = new Date();
var date = today.getDate() + "/" + (today.getMonth()+1) + "/" + today.getFullYear() ; //gives the  current date to the system
const db = firebase.firestore();
const reg_form = document.querySelector("#register");
document.getElementById("successLoaderContainer").classList.remove("OpacityActive");

function register_usr()
{
    var error_reg = document.getElementById("error_reg");
    error_reg.innerHTML = "";
      globalThis.reg_usr = document.getElementById("reg_usr").value.toLowerCase(); // gets the username (user entered in DOM)
      var reg_email = document.getElementById("reg_email").value; //gets the email (user entered in DOM)
      var reg_psswd = document.getElementById("reg_psswd").value; //gets the password (user entered in DOM)
      var reg_psswd_confirm = document.getElementById("reg_psswd_confirm").value; //gets the confirm password (user entered in DOM)
    console.log(reg_email, reg_psswd);
    var usrFind = db.collection("users").doc(reg_usr);
    usrFind.get().then((doc) => { //gets the whole data against the entered email address
      if (doc.exists) //if the username already exists
      {
        var error_reg = document.getElementById("error_reg");
        error_reg.innerHTML = "Username already exists. Please choose a different one";
        

        setTimeout(function(){
          error_reg.innerHTML = "";
          document.getElementById("reg_usr").value = "";
          document.getElementById("reg_usr").focus();
        }, 2500)
      }
      else //if the username does not exists then proceed to create a new user
      {

        document.getElementById("successLoaderContainer").classList.add("OpacityActive");
              let numberOfTilesSpawned = document.querySelectorAll(".tile").length;
            
              var TilesAnimationInterval = setInterval(() => {
                var n = Math.floor(Math.random() * (numberOfTilesSpawned - 0 + 1)) + 0;
               document.querySelectorAll(".tile")[n].click();
               
              }, 1300 );

        firebase.auth().createUserWithEmailAndPassword(reg_email, reg_psswd)
        .then((userCredential) => {
          var user = userCredential.user; //suspends all the values to user variable
          console.log(user.email, user.uid)
            db.collection('users').doc(reg_usr).set({
                username : reg_usr,
                password : reg_psswd,
                email : reg_email,
                uid : user.uid,
                verified : false,
                dev : false,
                allow : true,
                originals : false,
                followers : 0,
                following : 0,
                posts : 0,
                date_of_creation : date,
                artistic_name : "",
                artist: false,
                defaultPlayList : "Listen_Later",
                Playlists : ["Listen_Later"],
                reso_logo : "https://firebasestorage.googleapis.com/v0/b/chat-c774b.appspot.com/o/0A%20NightAngle%20Assets%2Fdef%20logo.jpg?alt=media&token=2acb6b5b-c634-4927-b029-d107913efe00",
                Listen_Later : ["Closer - The Chainsmokers"], //to initiate a list type in firebase add the square brackets at the decaliration which changes the datatype to an array
                displayName : reg_usr,
                profile_logo: "https://firebasestorage.googleapis.com/v0/b/chat-c774b.appspot.com/o/0A%20NightAngle%20Assets%2Fdef%20logo.jpg?alt=media&token=2acb6b5b-c634-4927-b029-d107913efe00",
            })
            

            form = document.getElementById("form");
             
        
              document.getElementById("reg_usr").value = "";
              document.getElementById("reg_email").value = "";
              document.getElementById("reg_psswd").value = "";
              document.getElementById("reg_psswd_confirm").value = "";
              
        
              
        
            setTimeout(function(){
              
              document.getElementById("successLoaderContainer").classList.remove("OpacityActive");
              clearInterval(TilesAnimationInterval);
              window.location.reload();
              
            }, 4300)  
        
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var error_reg = document.getElementById("error_reg");
          error_reg.innerHTML = errorMessage;
        
        });
      }

    })


// function to register a user

}

//Register security checks

  reg_btn = document.getElementById("btn_reg");
  function register()
  {
      var reg_usr = document.getElementById("reg_usr").value;
      var reg_email = document.getElementById("reg_email").value;
      var reg_psswd = document.getElementById("reg_psswd").value;
      var reg_psswd_confirm = document.getElementById("reg_psswd_confirm").value;
      if ( reg_usr == "" || reg_email == "" || reg_psswd == "" || reg_psswd_confirm == "") 
      {
        // alert("required Fields were not filled");
        var error_reg = document.getElementById("error_reg");
        error_reg.innerHTML = "Required Credential Fields were not Filled";

        
      }
      if(reg_psswd !== reg_psswd_confirm)
      {
        var error_reg = document.getElementById("error_reg");
        error_reg.innerHTML = "Passwords Entries don't Match";
      }
      else
      {
        register_usr(); 
      }
  }



