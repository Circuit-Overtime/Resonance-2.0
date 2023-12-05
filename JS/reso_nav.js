








var lastScrollTop = 0;

  document.getElementById("body").addEventListener("scroll", (e) => {
    contentHolderDOM.scrollTop + contentHolderDOM.clientHeight >= contentHolderDOM.scrollHeight ? 
  null : null
   
  })

window.onload = function() {
    if (window.matchMedia("(min-width: 767px)").matches)
    {
        setTimeout(() => {
            document.getElementById("main_container").scrollTo({
                top: 10,
                behavior: "smooth"
            });
        }, 5800);

        setTimeout(() => {
            document.getElementById("main_container").scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, 800);
       
    }
  };


function home_nav()
{
    // if (window.matchMedia("(min-width: 767px)").matches) {

    //     document.querySelector(".main_container").style.top = "32%";
    // document.querySelector(".main_container").style.left = "-55";
    // document.querySelector(".top_playlist_banner").style.display = "block";
    // document.querySelector(".main_container").style.backgroundColor =  "transparent";
    // document.querySelector(".main_container").style.height = "450px";
    // document.querySelector(".main_container").style.overflowY = "auto";
    // document.querySelector(".main_container").style.overflowX = "auto"; 
    // }
     
        document.querySelector(".main_container").style.top = "46%";
    document.querySelector(".main_container").style.left = "16%";
    document.querySelector(".top_playlist_banner").style.display = "block";
    document.querySelector(".main_container").style.backgroundColor =  "transparent";
    document.querySelector(".main_container").style.height = "inherit";
    document.querySelector(".main_container").style.overflowY = "inherit";
    document.querySelector(".main_container").style.overflowX = "auto";
    document.querySelector(".main_container").style.flexWrap = "inherit";  
    
    document.querySelector(".main_container").style.transform = "translateX(0px)";
    document.querySelector(".container").style.transform = "translateY(-400px)";
    document.getElementById("qr_expand").style.transform = "translate(-1000px)";
    document.querySelector(".songs_nav").style.pointerEvents = "all";
    document.querySelector(".songs_nav").style.borderBottom = "none";
    document.querySelector(".home_nav").style.color = "#0f0";
    document.querySelector(".home_nav").style.pointerEvents = "none";
    document.querySelector(".songs_nav").style.color = "#fff";

    // document.getElementsByClassName("music_unit").style.position =  "absolute";
    
    
    
    document.querySelector(".reso_scan").style.color = "#fff";
    document.querySelector(".reso_scan").style.borderBottom = "";
    document.querySelector(".reso_scan").style.pointerEvents = "all";

    var elements = document.getElementsByClassName("music_unit");
    for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].style.minWidth = "220px";
        elements[i].style.height =  "240px;";
        elements[i].style.width =  "200px";
        elements[i].style.left = "20px";
        elements[i].style.marginRight = "25px";
        elements[i].style.marginBottom = "15px";
    }


    const total_elements_in_dom = document.getElementById("main_container").childElementCount;
    // console.log(total_elements_in_dom)
    for (let i = 66; i < total_elements_in_dom; i++)
    {
        cont = document.getElementById("main_container").children[i].id
        console.log(cont)
        document.getElementById(cont).remove(); 
    }

    document.getElementById("qr_code_scanner").style.height = "0%";
    document.getElementById("qr_code_scanner").style.display = "none";
    document.getElementById("qr_code_scanner").style.zIndex = "-1";
}



function songs_nav()
{
    document.querySelector(".main_container").style.transform = "translateX(0px)";
    document.querySelector(".container").style.transform = "translateY(00px)";
    document.getElementById("qr_expand").style.transform = "translate(-1000px)";
    document.querySelector(".songs_nav").style.pointerEvents = "none";
    document.querySelector(".songs_nav").style.borderBottom = "2px solid #0f0";
    document.querySelector(".home_nav").style.color = "#fff";
    document.querySelector(".home_nav").style.pointerEvents = "all";
    document.querySelector(".songs_nav").style.color = "#0f0";

       document.querySelector(".main_container").style.backgroundColor =  "transparent";
    document.querySelector(".main_container").style.height = "470px";
    document.querySelector(".main_container").style.top = "14%";
    document.querySelector(".main_container").style.overflowY = "auto";
    document.querySelector(".main_container").style.overflowX = "hidden";
    document.querySelector(".main_container").style.flexWrap = "wrap";
    document.querySelector(".main_container").style.display = "flex";


    document.querySelector(".top_playlist_banner").style.display = "none";
    if ((window.matchMedia("(min-width: 767px)").matches) == false) {
        console.log("Big Screen");
       
    }
   
    
 
    

    document.querySelector(".reso_scan").style.color = "#fff";
    document.querySelector(".reso_scan").style.borderBottom = "";
    document.querySelector(".reso_scan").style.pointerEvents = "all";

    document.getElementById("qr_code_scanner").style.height = "0%";
    document.getElementById("qr_code_scanner").style.display = "none";
    document.getElementById("qr_code_scanner").style.zIndex = "-1";
    
var elements = document.getElementsByClassName("music_unit");
    for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].style.height =  "210px";
        elements[i].style.width =  "190px";
        elements[i].style.left = "20px";
        elements[i].style.minWidth = "170px";
        elements[i].style.marginRight = "20px";
        elements[i].style.marginBottom = "15px";
    }

}

document.querySelector(".main_container").addEventListener('scroll', function(event)
{

    var st = window.pageYOffset || document.querySelector(".main_container").scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
   if (st > lastScrollTop){
    var element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight)
    {
        // console.log('scrolled'); 
        element_list = (document.getElementById("main_container").childElementCount);
        random_element_index = Math.floor(Math.random() * element_list-1);
        random_song_to_start_from = (document.getElementById("main_container").children[random_element_index].id)


        database_music.collection("Songs").limit(8).orderBy("name").startAfter(random_song_to_start_from).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                music_unit = `<div class="music_unit" data-id="${doc.data().music_src}" id="${doc.data().name}"onclick = "playSong(this)">
                <div class="album_image">
                <img src="${doc.data().album}">
                </div>
                <h2 class="unit_song_name"> ${(doc.id).slice(0,14).concat("...")}</h2>
                <p class="unit_song_artist">${doc.data().uploader}</p>
                <ion-icon name="heart" id="add_laterlist" data-id="${doc.data().name}" onclick="laterList(this)"></ion-icon>
                <ion-icon name="musical-note" id="add_playlist" data-id="${doc.data().name}" onclick = "playList(this)"></ion-icon>
              </div>`

        
        
              document.getElementById("main_container").innerHTML += music_unit; 
            //   resonance_per.style.setProperty('--album_gradient', color);
            });
        });


       

    }
    var elements = document.getElementsByClassName("music_unit");
    for (var i = 0, len = elements.length; i < len; i++) {
        elements[i].style.height =  "210px";
        elements[i].style.width =  "190px";
        elements[i].style.left = "20px";
        elements[i].style.minWidth = "170px";
        elements[i].style.marginRight = "20px";
        elements[i].style.marginBottom = "15px";
    }
   } else {
      // upscroll code
   }
   lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling



});


document.querySelector(".expand_nav_bar").addEventListener("click", () => {
    document.getElementById("side_navbar").classList.add("active");
})

document.getElementById("close_nav_bar").addEventListener("click", () => {
    document.getElementById("side_navbar").classList.remove("active");
})


