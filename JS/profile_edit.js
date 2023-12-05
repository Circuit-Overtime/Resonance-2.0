
firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username")).onSnapshot((doc) => {
    reso_profile_pic = doc.data().reso_logo;

    document.getElementById("profile_image_reso").src = reso_profile_pic;
    document.getElementById("first-name").value = doc.data().displayName;
    updateSelectedPlayList()
});

document.getElementById("name_edit_field").addEventListener("click", () => {
    new_reso_name = document.getElementById("first-name").value;
   
    document.getElementById("first-name").style.pointerEvents = "all"
    document.getElementById("first-name").focus();
    document.getElementById("save_reso_name_edit").style.transform = "translateX(00px)";
})


    document.getElementById("name_edit_field").addEventListener("focusout", () => {
        // console.log("lost")
        document.getElementById("first-name").style.pointerEvents = "none";
        document.getElementById("first-name").style.borderBottom = "var(--uiFieldBorderWidth) solid var(--fieldBorderColor, rgba(0, 0, 0, 0))";
        document.getElementById("save_reso_name_edit").style.transform = "translateX(1400px)";
    }) 

    document.getElementById("save_reso_name_edit").addEventListener("click", () => {
        new_reso_name = document.getElementById("first-name").value;
        console.log(new_reso_name)
        if((new_reso_name.length >= 6))
        {
            firebase.firestore(app).collection("users").doc(localStorage.getItem("account_login_username")).update({
                displayName : new_reso_name
            })
            document.getElementById("success_error_reso").style.color = "#0f0";
            document.getElementById("success_error_reso").style.opacity = "1";
            document.getElementById("success_error_reso").innerHTML = "Your Username has been successfully updated!"
           
            document.getElementById("save_reso_name_edit").style.transform = "translateX(1400px)";
            setTimeout(() => {
                document.getElementById("success_error_reso").style.opacity = "0";
            }, 1500);
        }
        else
        {
            
            document.getElementById("success_error_reso").style.opacity = "1";
            document.getElementById("success_error_reso").innerHTML = "Your Username should be atleast 6 characters long -- choose wisely!!"
            
            setTimeout(() => {
                document.getElementById("success_error_reso").style.opacity = "0";
            }, 2500);
        }
       
    })
   
    document.getElementById("close_profile_section").addEventListener("click", () => {
        document.getElementById("profile_section").style.width = "9%";
        document.getElementById("profile_section").style.transform = "translateX(-160px)";
    })

    document.getElementById("close_profile_section").addEventListener("click", () => {
        
    })

    function reso_Profile()
    {
        document.getElementById("options_accounts").classList.toggle("active");
        document.querySelector(".expand_account").classList.toggle("active");
        document.getElementById("profile_section").style.width = "97%";
        document.getElementById("profile_section").style.transform = "translateX(0px)";
    }

function uploadUserDP()
{
    var input = document.createElement('input')
    input.type = 'file';
    input.accept = ".jpg";
    input.onchange = e =>
    {   
        thumbFile = e.target.files[0];
        editUserDP(thumbFile);
    }  
    input.click()
}

function editUserDP (usr_dp) {
    var storageRef = firebase.storage(app).ref(localStorage.getItem("account_login_username")+"/"+"User_DP");

    //Upload file
    var task = storageRef.put(usr_dp);
    
    //Update progress bar
    task.on('state_changed',
        function progress(snapshot){
            var percentage_thumb = snapshot.bytesTransferred / snapshot.totalBytes * 100;
            
            percentage_thumb = Math.floor(percentage_thumb) + "%";
            document.getElementById("usr_pofile_upload_resonance_progress").style.width = percentage_thumb;
        },  
        function error(err){

        },
        function complete(){
            task.snapshot.ref.getDownloadURL().then(function(url){

                var downloadURL = url;
                    firebase.firestore(app).collection('users').doc(localStorage.getItem("account_login_username")).update({
                        reso_logo : url,
                    });
                    document.getElementById("profile_image_reso").setAttribute("src",  url);
            })
            setTimeout(() => {
                document.getElementById("usr_pofile_upload_resonance_progress").style.width = 0;
            }, 1200);
            
        }
    );

}