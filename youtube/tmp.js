////////////////////////////////////////
//Run on load
////////////////////////////////////////

//Create main container div
div = createContainerDiv();

//Create the div that holds the iframe
var iFrameDiv = document.createElement("div");
iFrameDiv.id = "iframe-object";

//Iframe that holds the embedded video
var myIframe = '<iframe id="iframe-video-container" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
iFrameDiv.innerHTML = myIframe;

//create the menu and append to main div
var iframeMenu = document.createElement('div');
iframeMenu.id = "iframe-menu";
iframeMenu.innerHTML =
                        '<div id="youtube-search-bar">' +
                            '<div id="form-container">' +
                                '<form">' +
                                    '<input id="vidLink-value" type="text" name="vidLink" />' +
                                    '<input id="submitLink" type="button" value="search" /><br>' +
                                    // '<input style="float: left" id="goBackButton" type="button" value="Go Back" />' +
                                '</form>' +
                            '</div>' +
                        '</div>';
                        //This is the old social menu, keeping it just in case
                        // '<div id="social-menu" style="text-align: center; position: relative; width:100%; height:100%; background: #000000;">' +
                        //     '<button id="news" style="width:25%; height: 100%; background-color: green; border-right: none; display: inline-block;">News</button>' +
                        //     '<button id="youtube-add-link" style="width:25%; height: 100%; background-color: red; border-right: none; display: inline-block;">YouTube</button>' +
                        //     '<button id="twitch" style="width:25%; height: 100%; background-color: purple; border-right: none; display: inline-block;">Twitch</button>' +
                        //     '<button id="reddit" style="width:25%; height: 100%; background-color: red; display: inline-block;">Reddit</button>' +
                        // '</div>';

//container for hide elements buttons
var hideIframe = document.createElement('div');
hideIframe.id = "hideIframeButton";
hideIframe.style.height = "50%";
hideIframe.innerHTML = '<div id="hide-content" class="row">' +
                            '<div id="everything-button-container" class="column">' +
                                '<button id="hide-everything-button"> Hide Everything </button> </div>' +
                            '<div id="content-button-container" class="column" style="height: 100%; width:50%; float: left; display: none; ">' +
                                '<button id="hide-content-button" style="width: 100%; height: 100%; background: grey;"> Stop Video </button> </div>' +
                       '</div>';

//append menu and hide buttons to div
div.prepend(iframeMenu);
div.append(iFrameDiv);
div.append(hideIframe);

//This is the div that holds the draggable and resizable events
var draggableDiv = document.createElement('div');
//props
draggableDiv.id = "draggable-container";
draggableDiv.className = "draggable";
//styles
draggableDiv.style.height = "125px";
draggableDiv.style.width = "640px";
draggableDiv.style.position = "fixed";
draggableDiv.style.display = "block";
draggableDiv.style.background = "background-color: rgba(0, 0, 0, 0.75);";
draggableDiv.style.top = "50px";
draggableDiv.style.right = "10px";
draggableDiv.style.textAlign = "center";
draggableDiv.style.zIndex = "2147483647";

//add all divs to the draggable div
draggableDiv.append(div);

//append entire div to website
$("body").append(draggableDiv);

//make sure all tags have height for dynamic resizing
document.getElementsByTagName("body")[0].style.height = "100%";
document.getElementsByTagName("html")[0].style.height = "100%";



//functions for adding draggability and resizability to the div
$(function() {
    $(".draggable").draggable({
        iframeFix: true
    });
});

$(function (){
    $(".draggable").resizable({
       aspectRatio: 4/3,
       minHeight: 125,
       minWidth: 640,
       disabled: "true",
       iframeFix: true,
       start: function(event, ui){
           $('#iframe-video-container').css('pointer-events', 'none');
       },
       stop: function(event, ui){
           $('#iframe-video-container').css('pointer-events', 'auto');
       }
    });
});

//add event listeners to all the buttons embedded
document.getElementById("hide-content-button").addEventListener("click", hideContent);
document.getElementById("hide-everything-button").addEventListener("click", hideEverything);
document.getElementById("submitLink").addEventListener("click", submitNewYoutubeLink);

//////////////////////////////////////////
//Functions
//////////////////////////////////////////

//This is called at the beginning, creates main container div to be injected
function createContainerDiv() {
    //create main container div
    var retDiv = document.createElement('div');

    //set div properties
    retDiv.id = "extension-container";
    return retDiv;
}

//on submission click, get new embed link and display iframe
function submitNewYoutubeLink() {

    //Oscars code for taking youtube link and getting embed link
    var inputText = document.getElementById("vidLink-value").value;
    pos = inputText.indexOf("watch?v=") + 8;
    id = inputText.substr(pos, inputText.length-1);
    var embedLink = "https://www.youtube.com/embed/" + id;
    document.getElementById("iframe-video-container").src = embedLink;

    //unhide iframe
    document.getElementById("iframe-video-container").style.display = "block";

    //move hide content button down
    document.getElementById("everything-button-container").style.width = "50%";
    document.getElementById("content-button-container").style.display = "block";

    //extend the draggable box
    document.getElementById("draggable-container").style.height = "480px";
    document.getElementById("draggable-container").style.width = "640px";

    //resize everyone's height
    document.getElementById("extension-container").style.top = "5%";
    document.getElementById("iframe-menu").style.height = "10%";
    document.getElementById("hideIframeButton").style.height = "10%";
    document.getElementById("iframe-object").style.display = "block";


    //turn on resizing
    $(function (){
        $(".draggable").resizable("enable");
    });
}

//hide all elements on the page by destroying them
function hideEverything() {
    document.getElementById("draggable-container").remove();
}


//on click of hide content, hide youtube video
function hideContent(){

    //hide youtube iframe
    document.getElementById("iframe-video-container").style.display = "none";

    //move buttons back up and hide content button
    document.getElementById("everything-button-container").style.width = "100%";
    document.getElementById("content-button-container").style.display = "none";

    //remove src to stop video playback
    document.getElementById("iframe-video-container").src = "";

    //shrink draggable back down
    document.getElementById("draggable-container").style.height = "125px";

    //resize everyone's dimensions
    document.getElementById("extension-container").style.top = "10%";
    document.getElementById("iframe-menu").style.height = "50%";
    document.getElementById("hideIframeButton").style.height = "50%";
    document.getElementById("iframe-object").style.display = "none";
    document.getElementById("draggable-container").style.width = "640px";

    //remove resizability
    $(function (){
        $(".draggable").resizable("disable");
    });
}

// get the head and create a style element
var head = document.head || document.getElementsByTagName('head')[0];
var style = document.createElement('style');

style.type = 'text/css';

// create CSS as a string
var css = `
  #extension-container {
    z-index: 2147483647;
    position: relative;
    top:10%;
    width: 100%;
    height: 90%;";
  }
  /*without this, can't change the size of the iframe dynamically*/
  #iframe-object {
    height = 85%;
    width = 100%;
    display = none;
  }
  #iframe-video-container {
    position: relative;
    display: none;
    width: 100%;
    height: 100%;
  }
  #iframe-menu {
    height = 50%;
  }
  #youtube-search-bar {
     background: rgba(0, 0, 0, 0.5);
     display: block;
     width: 100%;
     height: 100%;
   }
   #form-container {
     padding-left: 10px;
     height: 100%;
     width: 100%;
   }
   #vidLink-value {
     float: left;
     height: 24px;
     width: 60%;
   }
   #submitLink {
      float: left;
      background-color: black;
      color: #FFFAFA;
      margin-left: 10px;
      padding: 4px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
   }
   #hide-content{
     position: relative;
     background: rgba(0, 0, 0, 0.5);
   }
   #everything-button-container {
     height: 100%;
     width:100%;
     float: left;
   }
   #hide-everything-button {
     margin-left: 3%;
     padding: 4px 16px;
     background: black;
     color: #FFFAFA;
     border: none;
     border-radius: 6px;
     cursor: pointer;
   }
   #
   `;

// IE8 and below.
if (style.styleSheet) {
    style.styleSheet.cssText = css;
} else {
    style.appendChild(document.createTextNode(css));
}

// add it to the head
head.appendChild(style);

//THESE MAY NO LONGER BE NEEDED


//go back from the submission menu
// function goBackFromYoutube(){
//     document.getElementById("youtube-search-bar").style.display = "none";
//     document.getElementById("social-menu").style.display = "block";

//     //shrink draggable box
//     document.getElementById("draggable-container").style.height = "125px";
// }

// //this is what happens when the youtube button is clicked
// function enterInsertVideoMode() {

//     //hide menu elements
//     document.getElementById("social-menu").style.display = "none";

//     //unhide youtube link submission
//     document.getElementById("youtube-search-bar").style.display = "block";
// }
