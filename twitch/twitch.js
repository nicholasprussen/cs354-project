////////////////////////////////////////
//Run on load
////////////////////////////////////////

$(function() {
  mainDiv = createContainer("twitch");
  //append entire div to website
  $("body").append(mainDiv);
});

addCSSStyling();

//functions for adding draggability and resizability to the div
$(function() {
  $(".twitch-draggable").draggable({
      iframeFix: true
  });
});

$(function (){
  $(".twitch-draggable").resizable({
     aspectRatio: 1/0.7,
     minHeight: 450,
     minWidth: 640,
     disabled: "true",
     iframeFix: true,
     start: function(event, ui){
         $('#twitch-iframe-video-container').css('pointer-events', 'none');
     },
     stop: function(event, ui){
         $('#twitch-iframe-video-container').css('pointer-events', 'auto');
     }
  });
});

//add event listeners to all the buttons embedded
setTimeout(function (){
  document.getElementById("hide-content-button").addEventListener("click", hideContent);
  document.getElementById("hide-everything-button").addEventListener("click", hideEverything);
  document.getElementById("submitLink").addEventListener("click", submitNewtwitchLink);
  document.getElementById("vidLink-value").addEventListener("keyup", function(event){
      event.preventDefault();
      if(event.key === "Enter"){
          document.getElementById("submitLink").click();
      }
  });
}, 1000);


//////////////////////////////////////////
//Functions
//////////////////////////////////////////

//on submission click, get new embed link and display iframe
function submitNewtwitchLink() {

  //Ali's code for twitch implementation
  var domain = document.domain;
  var inputText = document.getElementById("vidLink-value").value;
  var embedLink = "https://player.twitch.tv/?channel=" + inputText + "&parent=" + domain;

  //this copies the iframe and rebuilds instead of setting source
  var original = document.getElementById("twitch-iframe-video-container");
  var newiframe = document.createElement("iframe");
  newiframe.id = "twitch-iframe-video-container";
  newiframe.src = embedLink;
  var parent = original.parentElement;
  parent.replaceChild(newiframe, original);

  //unhide iframe
  document.getElementById("twitch-iframe-video-container").style.display = "block";

  //move button container down and make content button visible
  document.getElementById("twitch-nav-menu").style.height = "6%";

  //extend the draggable box
  document.getElementById("twitch-draggable-container").style.height = "450px";
  document.getElementById("twitch-draggable-container").style.width = "640px";

  //resize everyone's height
  document.getElementById("twitch-search-bar").style.height = "14%";
  document.getElementById("twitch-iframe-container").style.display = "block";

  //clear text field
  document.getElementById("vidLink-value").value = "";

  //unhide the stop video button
  document.getElementById("hide-content-button").style.display = "block";

  //turn on resizing
  $(function (){
      $(".twitch-draggable").resizable("enable");
  });
}

//hide all elements on the page by destroying them
function hideEverything() {
  document.getElementById("twitch-draggable-container").remove();
}

//on click of hide content, hide twitch video
function hideContent(){

  //hide twitch iframe
  document.getElementById("twitch-iframe-video-container").style.display = "none";
  document.getElementById("hide-content-button").style.display = "none";

  //remove src to stop video playback
  document.getElementById("twitch-iframe-video-container").src = "";

  //shrink draggable back down
  document.getElementById("twitch-draggable-container").style.height = "75px";
  document.getElementById("twitch-draggable-container").style.width = "640px";

  //resize everyone's dimensions
  document.getElementById("twitch-search-bar").style.height = "65%";
  document.getElementById("twitch-iframe-container").style.display = "none";
  document.getElementById("twitch-nav-menu").style.height = "35%";

  //remove resizability
  $(function (){
      $(".twitch-draggable").resizable("disable");
  });
}

function addCSSStyling(){
  //////////////////////////////////////////
  //CSS Styling
  //////////////////////////////////////////
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');

  style.type = 'text/css';

  // create CSS as a string
  var css = `
  #twitch-search-bar {
      height: 65%;
      width: 100%;
      background: rgba(0, 0, 0, 0.85);
  }
  #twitch-nav-menu {
      height: 35%;
      width: 100%;
      background: rgba(0, 0, 0, 0.85);
  }
  #twitch-container {
      height: 100%;
      width: 100%;
  }
  ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      text-decoration: none;
      height: 100%;
  }
  .left-nav-elements {
      float: left;
  }
  .right-nav-elements {
      float: right;
  }
  li {
      text-align: center;
      line-height: 100%;
  }
  .twitch-li-a {
      display: block;
      color: #6441a5;
      font-weight: bold;
      font-family: Arial, Helvetica, sans-serif;
      height: 19.25px;
      padding-right: 16px;
      padding-left: 16px;
      padding-top: 7px;
      text-decoration: none;
      text-align: center;
  }
  a.hover-elem:hover {
      background-color: #111;
      text-decoration: none;
  }
  a.indiv-elem:hover {
      text-decoration: none;
  }
  #vidLink-value {
      height: 65%;
      width: 80%;
      border: 1px solid black;
      margin-top: 8.5px;
      margin-left: 0%;
      font-size: 16px;
  }
  #submitLink {
      margin-top: 5px;
      background-color: black;
      color: #FFFAFA;
      margin-left: 2%;
      padding: 4px 16px;
      border: none;
      cursor: pointer;
      width: 14%;
      height: 65%;
  }
  #search-form {
      width: 100%;
      height: 100%;
  }
  #twitch-iframe-container {
      width: 100%;
      height: 80%;
  }
  #twitch-iframe-video-container {
      width: 100%;
      height: 100%;
  }
 `;

  // IE8 and below.
  if (style.styleSheet) {
      style.styleSheet.cssText = css;
  } else {
      style.appendChild(document.createTextNode(css));
  }
  // add it to the head
  head.appendChild(style);
}