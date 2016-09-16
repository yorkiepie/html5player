$('.toggle, .inner-toggle').click(function(e) {
  	e.preventDefault();
    var $this = $(this);
    if ($this.next()[0].classList.contains('show')) {
        $this.next().removeClass('show');
        $this.next().slideUp(350);
    } else {
        $this.parent().parent().find('li .inner, li .first').removeClass('show');
        $this.parent().parent().find('li .inner, li .first').slideUp(350);
        $this.next().toggleClass('show');
        $this.next().slideToggle(350);
    }
});
videojs.autoSetup();

    videojs('myvideo').ready(function(){
      console.log(this.options()); //log all of the default videojs options
      
       // Store the video object
      var myPlayer = this, id = myPlayer.id();
      // Make up an aspect ratio
      var aspectRatio = 264/640; 

      function resizeVideoJS(){
        var width = document.getElementById(id).parentElement.offsetWidth;
        myPlayer.width(width).height( width * aspectRatio );

      }
      
      // Initialize resizeVideoJS()
      resizeVideoJS();
      // Then on resize call resizeVideoJS()
      window.onresize = resizeVideoJS; 
    });
var myvideo = myPlayer,
    playbutton = document.getElementById('playme'),
    restart = document.getElementById('restart'),
    chapt1 = document.getElementById('chapt1'),
    chapt2 = document.getElementById('chapt2'),
    chapt3 = document.getElementById('chapt3');

chapt1.addEventListener("click", function (event) {
    event.preventDefault();
  	myvideo.src = "http://cdn-origin-discovery.digitalshowcase.piksel.com/trailers/2016/09/15/10/35/1b_RM_CO3_HDR_Clip1_22M.mp4";
    myvideo.autoplay = true;
  	myvideo.currentTime = 0;
}, false);

chapt2.addEventListener("click", function (event) {
    event.preventDefault();
    myvideo.src="http://cdn-origin-discovery.digitalshowcase.piksel.com/trailers/2016/09/16/08/34/1a_RM_SDR_Clip1_22M.mp4"
    myvideo.currentTime = 0;
    myvideo.play();
}, false);

chapt3.addEventListener("click", function (event) {
    event.preventDefault();
    myvideo.src="http://cdn-origin-discovery.digitalshowcase.piksel.com/trailers/2016/09/16/13/45/1a_RM_SDR_Clip2_22M.mp4";
    myvideo.currentTime = 0;
    myvideo.play();
}, false);

// only in to demonstrate video
playbutton.addEventListener("click", function () {
    if (myvideo.paused) {
        myvideo.play();
    } else {
        myvideo.pause();
    }
}, false);

restart.addEventListener("click", function (event) {
    event.preventDefault();
    myvideo.play();
    myvideo.pause();
    myvideo.currentTime = 0;
    myvideo.play();
}, false);


$(document).ready(function() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'http://www.freesfx.co.uk/rx2/mp3s/2/2706_1329133089.mp3');
   
  $.get();
    audioElement.addEventListener("load", function() {
      audioElement.play();
    }, true);
  
    $('.toggle').click(function() {
      audioElement.play();
    });
  
    $('.inner-toggle').click(function() {
      audioElement.play();
    });
});