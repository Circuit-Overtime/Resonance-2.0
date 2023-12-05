const auth = firebase.auth()


document.getElementById("forgot_password").onclick = function()
{
    document.getElementById("form").style.transform = "translateY(750px)";
    document.getElementById("form").style.zIndex = "-1";
    document.getElementById("form").style.opacity = "0";

    document.getElementById("reset").style.opacity = "100%";
    document.getElementById("reset").style.zIndex = "100";
    document.getElementById("reset").style.transform = "translateY(0px)";
}


document.getElementById("remember_password").onclick = function()
{
    document.getElementById("form").style.transform = "translateY(0px)";
    document.getElementById("form").style.zIndex = "100";
    document.getElementById("form").style.opacity = "1";

    document.getElementById("reset").style.opacity = "0";
    document.getElementById("reset").style.zIndex = "-1";
    document.getElementById("reset").style.transform = "translateY(750px)";
}

document.getElementById("register_if_not_reset").onclick = function()
{
    
    reg = document.getElementById("register");

    document.getElementById("form").style.transform = "translateY(0px)";
    document.getElementById("form").style.zIndex = "100";
    document.getElementById("form").style.opacity = "1";

    document.getElementById("reset").style.opacity = "0";
    document.getElementById("reset").style.zIndex = "-1";
    document.getElementById("reset").style.transform = "translateY(750px)";

    
    
    document.getElementById("form").style.transform = "translateY(750px)";
    document.getElementById("form").style.opacity = "0%";
    document.getElementById("register").style.opacity = "100%";
    document.getElementById("register").style.transform = "translateY(0px)";
    document.getElementById("form").style.zIndex = "-1";
    document.getElementById("register").style.zIndex = "100";

}
/*
function reset()
{
    document.getElementById("error_res").innerHTML = "";
    var email_val = document.getElementById("res_email"); // gets the email address of the person facing the issue
    var confirm_btn  = document.getElementById("reset_btn"); //button to send the confirmation mail for reseting password
    const email = email_val.value;
    if (email_val.value != "")
    {
        auth.sendPasswordResetEmail(email)
    .then(() => {


        
        // console.log("password reset mail sent successfully");
        document.getElementById("res_email").value = "";

        setTimeout(function(){
            document.getElementById("form").style.transform = "translateY(0px)";
            document.getElementById("form").style.zIndex = "100";
            document.getElementById("form").style.opacity = "1";

            document.getElementById("reset").style.opacity = "0";
            document.getElementById("reset").style.zIndex = "-1";
            document.getElementById("reset").style.transform = "translateY(750px)";
        }, 7000)
    })
    .catch(error => {
        document.getElementById("error_res").innerHTML = error;
        // console.log(error)
        document.getElementById("res_email").value = "";
    });
    }
    else 
    {
        document.getElementById("error_res").innerHTML = "Please fill up the field for Email ID";
        document.getElementById("res_email").value = "";
    }
}
*/

function reset()
{
    var usr_val = document.getElementById("res_usr").value.toLowerCase();
    var usr_email = document.getElementById("res_email").value;
    const usr_value_pass = usr_val;
    db.collection("users").doc(usr_val).get().then((doc) => { //gets the whole data against the entered email address
        if (doc.exists) //if the username already exists
        {
            if(doc.data().email == usr_email)
            {
            setTimeout(() => {
                document.getElementById("error_res").style.color = "lime";
                document.getElementById("error_res").innerHTML = ""
            }, 1200);
            document.getElementById("label_res_password").style.display = "block";
            document.getElementById("label_res_password_conf").style.display = "block";
            document.getElementById("reset").style.height = "590px";
            document.getElementById("res_usr").style.pointerEvents = "none";
            document.getElementById("res_email").style.pointerEvents = "none";
            document.getElementById("res_usr").disabled = true;

                document.getElementById("reset_btn").addEventListener("click" ,() => {
                    new_pass = document.getElementById("res_password").value;
                    new_pass_conf = document.getElementById("res_password_conf").value;
                    if((((new_pass == "") || (new_pass.length <= 6)) || ((new_pass_conf == "") || (new_pass_conf.length <= 6))))
                    {
                        document.getElementById("error_res").style.color = "red";
                        document.getElementById("error_res").innerHTML = "Please provide an appropiate password (more than 6 characters), both the fields should be equal.";
                    }
                    else if(new_pass != new_pass_conf)
                    {
                        
                        document.getElementById("error_res").style.color = "red";
                        document.getElementById("error_res").innerHTML = "Please provide an appropiate password (more than 6 characters), both the fields should be equal.";
                        
                    }
                    else
                    {
                        db.collection("users").doc(usr_val).update({
                            password : new_pass,
                        })
                        document.getElementById("error_res").style.color = "green";
                        document.getElementById("error_res").innerHTML = "Success! Password has been updated";
                        setTimeout(() => {
                            document.getElementById("label_res_password").style.display = "none";
                            document.getElementById("label_res_password_conf").style.display = "none";
                            document.getElementById("reset").style.height = "350px";
                            document.getElementById("res_usr").style.pointerEvents = "none";
                            document.getElementById("res_email").style.pointerEvents = "none";
                            document.getElementById("res_usr").disabled = true;
                            document.getElementById("error_res").innerHTML = "";

                            document.getElementById("form").style.transform = "translateY(0px)";
                            document.getElementById("form").style.zIndex = "100";
                            document.getElementById("form").style.opacity = "1";
                
                            document.getElementById("reset").style.opacity = "0";
                            document.getElementById("reset").style.zIndex = "-1";
                            document.getElementById("reset").style.transform = "translateY(750px)";


                        }, 1200);
                    }
                    // || (new_pass.value != new_pass_conf.value))
                })
            }
            else
            {
                document.getElementById("error_res").style.color = "red";
                document.getElementById("error_res").innerHTML = "The Applied Email Address is Wrong";
                setTimeout(() => {
                    document.getElementById("error_res").style.color = "red";
                    document.getElementById("error_res").innerHTML = "";
                }, 1200);
            }
            
        }

})
}