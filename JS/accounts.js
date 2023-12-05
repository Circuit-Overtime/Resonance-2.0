firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username")).onSnapshot((doc) => {

    fetch_display_name = doc.data().displayName;
    
    is_artist = doc.data().artist;
    profile_logo = doc.data().reso_logo;
    // console.log(is_artist)
    setInterval(() => {

            if(fetch_display_name_temp != fetch_display_name)
            {
                document.getElementById("displayNameResonance").innerHTML = "";
                textToType = fetch_display_name;
                var i = 0;
                var speed = speed || 75; // Default speed if not provided
                document.getElementById("displayNameResonance").innerHTML = "";
                function type() {
                    if (i < textToType.length) {
                        document.getElementById("displayNameResonance").innerHTML += textToType.charAt(i);
                        i++;
                        setTimeout(type, speed);
                    }
                }
                type(); // Call the function to start the typing effect
            }


        // document.getElementById("displayNameResonance").innerHTML = fetch_display_name;

        document.getElementById("displayNameResonance").title = fetch_display_name;
    }, 1500);
    document.getElementById("displayNameResonance").innerHTML = "";
    fetch_display_name_temp = fetch_display_name;
    textToType = fetch_display_name;
    var i = 0;
    var speed = speed || 75; // Default speed if not provided
    document.getElementById("displayNameResonance").innerHTML = "";
    function type() {
        if (i < textToType.length) {
            document.getElementById("displayNameResonance").innerHTML += textToType.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type(); // Call the function to start the typing effect


        if(is_artist == true)
        {
            document.getElementById("user_verified_resonance").style.display = "block";
        }
        if(is_artist == false)
        {
            document.getElementById("user_verified_resonance").style.display = "none";
        }
        
        document.getElementById("profile_pic_reso").src = profile_logo;
});

document.getElementById("usr_profile").addEventListener("click", () => {
    document.getElementById("options_accounts").classList.toggle("active");
    document.querySelector(".expand_account").classList.toggle("active");
})


function reso_Signout()
{
    window.location.replace("s1.html");
}

function reso_Settings()
{
    window.location.replace("s4.html");
}
