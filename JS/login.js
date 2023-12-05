var toogleViewtxt = document.getElementById("login_psswd");
var toogleViewtxt_reg = document.getElementById("reg_psswd");
var toogleViewtxt_reg_conf = document.getElementById("reg_psswd_confirm");
var toogle = document.querySelectorAll("#passwd_toogle_login, #passwd_toogle_register, #passwd_toogle_register_conf");


const toggleReg = () => {
    form = document.getElementById("form");
    reg = document.getElementById("register");
    reg.style.opacity = "100%";
    reg.style.transform = "translateY(0px)";
    form.style.transform = "translateY(750px)";
    form.style.opacity = "0%";
    form.style.zIndex = "-1";
    reg.style.zIndex = "100";
    reg.style.pointerEvents = "all";

  };
  const toggleLogin = () => {
    form = document.getElementById("form");
    reg = document.getElementById("register");
    reg.style.transform = "translateY(750px)";
    form.style.transform = "translateY(0px)";
    reg.style.opacity = "0%";
    form.style.opacity = "100%"; 
    form.style.zIndex = "100";
    reg.style.zIndex = "-1";
  };

  function toogle_visibility_login()
  {
    // console.log("hello");
    if(toogleViewtxt.type === 'password')
    {
      toogleViewtxt.setAttribute('type', 'text');
      document.getElementById("passwd_toogle_login").setAttribute('class', 'fa-solid fa-eye-slash');
    }
    else
    {
   toogleViewtxt.setAttribute('type', 'password');
   
   document.getElementById("passwd_toogle_login").setAttribute('class', 'fa fa-fw fa-eye field-icon toggle-password');
      
    }
  }

  function toogle_visibility_reg()
  {

    // console.log("hello");
    if(toogleViewtxt_reg.type === 'password')
    {
      toogleViewtxt_reg.setAttribute('type', 'text');
      document.getElementById("passwd_toogle_register").setAttribute('class', 'fa-solid fa-eye-slash');
      
    }
    else
    {
    toogleViewtxt_reg.setAttribute('type', 'password');
   
   document.getElementById("passwd_toogle_register").setAttribute('class', 'fa fa-fw fa-eye field-icon toggle-password');
      
    }
  }

  function toogle_visibility_reg_conf()
  {

    // console.log("hello");
    if(toogleViewtxt_reg_conf.type === 'password')
    {
      toogleViewtxt_reg_conf.setAttribute('type', 'text');
      document.getElementById("passwd_toogle_register_conf").setAttribute('class', 'fa-eye fa-eye-slash');
      
    }
    else
    {
    toogleViewtxt_reg_conf.setAttribute('type', 'password');
   
   document.getElementById("passwd_toogle_register_conf").setAttribute('class', 'fa fa-fw fa-eye field-icon toggle-password');
      
    }
  }

      
  localStorage.openpages = Date.now();
window.addEventListener('storage', function(e) {
    if(e.key == "openpages")
    {
        localStorage.page_available = Date.now();
    }
    if(e.key == "page_available")
    {
        alert("You are having RD2 open in any other tab")
        setTimeout(() => {
            close()
        }, 80);
    }
},false)