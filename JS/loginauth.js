//--------------------#THIS IS USED TO FETCH DATA FROM FIRESTORE DATABASE UNIQUELY FOR EACH USER#---------------------------------------------------------------------------------------



var good_bye = [
  "Adios",
  "Arrivederci",
  "Au Revoir",
  "Adeus",
  "Auf Wiedersehen",
  "Sayōnara",
  "Do svidaniya",
  "Annyeong",
  "Slan",
  "Tot ziens",
  "Good Bye",
  "Tata",
  "Alvida"];
var TilesAnimationInterval;
document.getElementById("successLoaderContainer").classList.remove("OpacityActive");
function auth_user()
{
  var user_login_email = document.getElementById("login_usr").value; // this was initially user_email
  var docRef = db.collection("users").doc(user_login_email);

  docRef.get().then((doc) => { //gets the whole data against the entered email address
      if (doc.exists) 
      {
          // console.log("Document data:", doc.data().username); //gets the username from the doc
          
      } 

      else 
      {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          var error = document.getElementById("error");
          error.innerHTML = "Your Account hasn't been registered with Nightangle, please SIGN-UP by clicking  on the sign-up button";
      }

  })
  .catch((error) => 
  {
      console.log("Error getting document:", error);
      //make a process to tell the user to check the internet connection and the connection with the server.
  });

}

function time()
{
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes();
  return time
}

time_now = time();
const timestamp = Date.now();
const database = firebase.database();

const fetchlog = database.ref("log/");    

 var errorMessage_disp = "";


  
// Function to login a user
  function login_usr()
  {
    var log_username_parse = String(document.getElementById("login_usr").value.toLowerCase().trim()); //this is the entered value in DOM
    var log_usr = document.getElementById("login_email").value; //email entered by user
    var docRef = db.collection("users").doc(log_username_parse);
    var log_psswd = document.getElementById("login_psswd").value; //password entered by user
   
    
      firebase.auth().signInWithEmailAndPassword(log_usr, log_psswd);
      docRef.get().then((doc) => { //gets the whole data against the entered email address
      if ((doc.exists) && (doc.data().allow == true)) //change this to true to allow only devs inside this scheme
      {
          // console.log("Document data:", doc.data().username); //gets the username from the doc
          security_check_for_username = doc.data().username; //passes the username of the doc to the var (server value)
          security_check_for_psswd = doc.data().password; //psswd from server
          security_check_for_email = doc.data().email;
          if ((security_check_for_username == log_username_parse) && (security_check_for_psswd == log_psswd) && (security_check_for_email == log_usr)) //checks if entered username, email and password fields matches with the server
          { 
      
            document.getElementById("successLoaderContainer").classList.add("OpacityActive");
            let numberOfTilesSpawned = document.querySelectorAll(".tile").length;
          
            var TilesAnimationInterval = setInterval(() => {
              var n = Math.floor(Math.random() * (numberOfTilesSpawned - 0 + 1)) + 0;
             document.querySelectorAll(".tile")[n].click();
             
            }, 1300 );

             
           
              setTimeout(() => {
                document.getElementById("successLoaderContainer").classList.remove("OpacityActive");
                clearInterval(TilesAnimationInterval);
              localStorage.setItem("account_login_username", log_username_parse);
              localStorage.setItem("account_login_email", log_usr);
              location.replace("s3.html");
              }, 4300);


          }
          if ((security_check_for_username != log_username_parse) && (security_check_for_psswd == log_psswd))
          {
            var error = document.getElementById("error");
            error.innerHTML = "Entered Username doesn't match with the account";
          } 
          if ((security_check_for_username == log_username_parse) && (security_check_for_psswd != log_psswd))
          {
            var error = document.getElementById("error");
            error.innerHTML = "Entered Password is wrong";
          }
          if ((security_check_for_username != log_username_parse) && (security_check_for_psswd != log_psswd))
          {
            var error = document.getElementById("error");
            error.innerHTML = "Username and Password not associated with the entered email";
          }
// create a message when account does not exist
      }
      else if ((doc.data() == undefined))
      {
        // doc.data() will be undefined in this case
        var error = document.getElementById("error");
          error.innerHTML = "Your Account hasn't been registered with Nightangle, please SIGN-UP by clicking  on the sign-up button";
      }
      else 
      {
        // 
          var error = document.getElementById("error");
          error.innerHTML = "Sorry! But, Account not Authenticated for Entry through this gateway -- contact admin if you think this is a mistake";  
          
      } 
    })
  
  }

  
document.getElementById("logout_btn").addEventListener("click", () =>
{
  firebase.auth().signOut().then(function() {
    // console.log('Signed Out');
    window.localStorage.clear();
    document.getElementById("re_enter").style.display = "none";
    logout = document.querySelector(".logout");
    form = document.getElementById("form");
    logout.style.transform = "translateY(750px)";
    logout.style.zIndex = "-1";
    logout.style.opacity = "0";
    form.style.transform = "translateY(0px)";
    form.style.opacity = "100%"; 
    form.style.zIndex = "100";
    form.style.pointerEvents = "all";

  }, function(error) {
    alert('Sign Out Error', error);
    // console.error('Sign Out Error', error);
  });
})

  



// ----------------------------------#LOGIN FRONT END SECURITY CHECKS#----------------------------------------------------------------
// Login Securtity Checks 
login_btn = document.getElementById("signin_btn");
function login()
{   var error = document.getElementById("error");
    var log_usr = document.getElementById("login_email").value;
    var log_psswd = document.getElementById("login_psswd").value;
    // alert(log_usr + " " + log_psswd);
    if (log_usr == "" || log_psswd == "")
    {
        // console.log("Invalid");
        errorMessage_disp = "Please Enter a Valid Input, either of the credentials are empty";
        error.innerHTML =   errorMessage_disp;
    }
    else
    {
        login_usr();
    }

    
}

// -----------------------------------#THINGS THAT APPEAR ON THE SCREEN BEFORE/AFTER LOGOUT#------------------------------------------------
//makes the logout appear and hides the login/register
if (localStorage.getItem("account_login_username") != null) {
  var randomGoodBye = good_bye[Math.floor(Math.random()*good_bye.length)];
  document.getElementById("re_enter").style.display = "block";
  form = document.getElementById("form");
  reg = document.getElementById("register");
  logout = document.querySelector(".logout");
  reg.style.transform = "translateY(750px)";
  form.style.transform = "translateY(750px)";
  logout.style.opacity = "1";
  logout.style.zIndex = "100";
  logout.pointerEvents = "all";
  logout.style.transform = "translateY(0px)";
  document.getElementById("logout_greetings").innerHTML = randomGoodBye;
  reg.style.opacity = "0%";
  form.style.opacity = "0%"; 
  form.style.zIndex = "-1";
  reg.style.zIndex = "-1";
  form.style.pointerEvents = "none"
  reg.style.pointerEvents = "none"
}
//makes the logout appear and hides the login/register
//makes the logout disappear and makes the reg appear and the login disapp
else if (localStorage.getItem("account_login_username") === null) {
  form = document.getElementById("form");
  document.getElementById("re_enter").style.display = "none";
  reg = document.getElementById("register");
  reg.style.transform = "translateY(750px)";
  form.style.transform = "translateY(0px)";
  reg.style.opacity = "0%";
  form.style.opacity = "100%"; 
  form.style.zIndex = "100";
  form.pointerEvents  = "all";
  reg.style.zIndex = "-1";
  logout.style.transform = "translateY(750px)";
  logout.style.zIndex = "-1";
  logout.style.opacity = "0";
  logout.style.pointerEvents = "none";
}
document.getElementById("re_enter").addEventListener("click", () => {
  location.replace("s3.html");
})



// passes the login info to the log

// fetchlog.on("child_added", function (snapshot) {

//   const user_name_web = snapshot.val();
//   user_name_disp = user_name_web.log_username_parse;

//   const log_name_disp = `<li class=${"log"}> <p> ${user_name_disp} ${" has joined the chat at: "} ${time_now} </p></li>`
//   document.getElementById("messages").innerHTML += log_name_disp ; //adds the created p tag having name of user to the chat layout
//   document.getElementById("usr_name").innerHTML = "You are: " + " " + document.getElementById("login_usr").value;;
// });



// setInterval(() => {
  // console.clear()
// }, 100);