






function deleteMyPlaylist(self)
{
playListNameToDelete = self.getAttribute("data-id");
const TIME_LIMIT = 5;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;


const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info: {
      color: "green"
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD
    }
  };
  let remainingPathColor = COLOR_CODES.info.color;
  document.getElementById("deleteCountDown").innerHTML = `
  <i class="fa-solid fa-trash" id="deletePlaylisticon"></i>
  <i class="fa-solid fa-rotate-left" id="undoDeletePlaylist" onclick="undoDeletePlaylist()"></i>
  <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="10"></circle>
        <path
          id="base-timer-path-remaining"
          stroke-dasharray="283"
          class="base-timer__path-remaining ${remainingPathColor}"
          d="
            M 50, 50
            m -45, 0
            a 10,10 0 1,0 90,0
            a 10,10 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span id="base-timer-label" class="base-timer__label">${formatTime(timeLeft)}</span>
  </div>
  `;


 
    startTimer();
  
    document.getElementById("undoDeletePlaylist").addEventListener("click", () => {
        {
            
            setTimeout(() =>{
                document.getElementById("deleteCountDown").innerHTML = "";
                
                featuresLength = (document.getElementsByClassName("features").length);
            for(i = 0; i <= featuresLength; i++)
            {
                document.getElementById(document.getElementsByClassName("features")[i].id).style.pointerEvents = "all";
            }
            }, 800)
            document.getElementById("deleteCountDown").style.transform = "translateX(-200px)";
           
            clearInterval(timerInterval);
           
        }
    })

    //check both the automatic and undo functions before release
function onTimesUp() {
        setTimeout(() =>{
            
            // document.getElementById("deleteCountDown").innerHTML = "";
            featuresLength = (document.getElementsByClassName("features").length);
        for(i = 0; i < featuresLength; i++)
        {
            document.getElementById(document.getElementsByClassName("features")[i].id).style.pointerEvents = "all";
        }
        }, 800)
        document.getElementById("deleteCountDown").style.transform = "translateX(-200px)";
      clearInterval(timerInterval);

      firebase.firestore().collection("Users_Playlists").doc(localStorage.getItem("account_login_username")+"_playlist").get().then((doc) => {
        
        for (i = 0; i < doc.data().playlist_songs.length; i++)
        {
          PlaylistNameSuffix = (doc.data().playlist_songs[i].split("#")[1]);
          if(playListNameToDelete == PlaylistNameSuffix)
          {
            firebase.firestore().collection("Users_Playlists").doc(localStorage.getItem("account_login_username")+"_playlist").update({
              playlist_songs : firebase.firestore.FieldValue.arrayRemove(doc.data().playlist_songs[i]),
            })

          }
        }
        document.getElementById("radio_"+playListNameToDelete).style.transform = "translateX(-180px)";
        setTimeout(() => {
          document.getElementById("radio_"+playListNameToDelete).style.display = "none";
          document.getElementById("radio_"+playListNameToDelete).remove();
        }, 1000)
      })

      firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username")).update({
        Playlists : firebase.firestore.FieldValue.arrayRemove(playListNameToDelete),
        [playListNameToDelete] : firebase.firestore.FieldValue.delete(),
        defaultPlayList : "Listen_Later",
    })
    updateSelectedPlayList();
  }
    
    function startTimer() {
        document.getElementById("deleteCountDown").style.transform = "translateX(0px)";
        featuresLength = (document.getElementsByClassName("features").length);
        for(i = 0; i < featuresLength; i++)
        {
            document.getElementById(document.getElementsByClassName("features")[i].id).style.pointerEvents = "none";
        }
      timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        document.getElementById("base-timer-label").innerHTML = formatTime(
          timeLeft
        );
        setCircleDasharray();
       
    
        if (timeLeft === 0) {
          onTimesUp();
        }
      }, 1000);
    }
    
    function formatTime(time) {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;
    
    
    
      return `${seconds}`;
    }
    
    
    
    function calculateTimeFraction() {
      const rawTimeFraction = timeLeft / TIME_LIMIT;
      return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
    }
    
    function setCircleDasharray() {
      const circleDasharray = `${(
        calculateTimeFraction() * FULL_DASH_ARRAY
      ).toFixed(0)} 283`;
      document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
    }



}












setTimeout(() => {

}, 1200);
