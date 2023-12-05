function scan_nav()
{
    document.querySelector(".container").style.transform = "translateY(-400px)";
    //transform: translateY(-400px);
    document.getElementById("qr_expand").style.transform = "translate(-1000px)";
    document.querySelector(".songs_nav").style.pointerEvents = "all";
    document.querySelector(".songs_nav").style.borderBottom = "none";
    document.querySelector(".home_nav").style.color = "#fff";
    document.querySelector(".home_nav").style.pointerEvents = "all";
    document.querySelector(".songs_nav").style.color = "#fff";
    document.querySelector(".songs_nav").style.color = "#fff";

    document.querySelector(".reso_scan").style.color = "#0f0";
    document.querySelector(".reso_scan").style.borderBottom = "2px solid #0f0";
    document.querySelector(".reso_scan").style.pointerEvents = "none";

    document.querySelector(".top_playlist_banner").style.display = "none";
    document.querySelector(".main_container").style.transform = "translateX(1500px)";

    document.getElementById("qr_code_scanner").style.display = "block";
    document.getElementById("qr_code_scanner").style.height = "490px";
    document.getElementById("qr_code_scanner").style.zIndex = "1003";
    load();

}

var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-24451557-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();