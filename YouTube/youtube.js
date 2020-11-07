////////////////////////////////////////
//Run on load
////////////////////////////////////////

//Create main container div
div = createContainerDiv();

let iFrameDiv = document.createElement("div");
iFrameDiv.id = "iframe-object";
iFrameDiv.style.height = "85%";
iFrameDiv.style.width = "100%";
iFrameDiv.style.display = "none";
//Iframe that holds the embedded video
var myIframe = '<iframe id="iframe-video-container" style="position: relative; display: none;" width="100%" height="100%"  src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
iFrameDiv.innerHTML = myIframe;

//create the menu and append to main div
let iframeMenu = document.createElement('div');
iframeMenu.id = "iframe-menu";
iframeMenu.style.height = "50%";
iframeMenu.innerHTML =  
                        '<div id="youtube-search-bar" style="position: relative; background: black; display: none; width: 100%; height: 100%"' +
                            '<div id="form-container" style="padding-left: 10px; height: 100%; width: 100%">' +
                                '<form">' +
                                    '<input style="float: left" id="vidLink-value" type="text" name="vidLink" />' +
                                    '<input style="float: left" id="submitLink" type="button" value="submit" /><br>' +
                                    '<input style="float: left" id="goBackButton" type="button" value="Go Back" />' +
                                '</form>' +
                            '</div>' +
                        '</div>' +
                        '<div id="social-menu" style="text-align: center; position: relative; width:100%; height:100%; background: #000000;">' +
                            '<button id="news" style="width:25%; height: 100%; background-color: green; border-right: none; display: inline-block;">News</button>' +
                            '<button id="youtube-add-link" style="width:25%; height: 100%; background-color: red; border-right: none; display: inline-block;">YouTube</button>' +
                            '<button id="twitch" style="width:25%; height: 100%; background-color: purple; border-right: none; display: inline-block;">Twitch</button>' +
                            '<button id="reddit" style="width:25%; height: 100%; background-color: red; display: inline-block;">Reddit</button>' +
                        '</div>';

//container for hide elements buttons
let hideIframe = document.createElement('div');
hideIframe.id = "hideIframeButton";
hideIframe.style.height = "50%";
hideIframe.innerHTML = '<div id="hide-content" class="row" style="text-align: center; position: relative; width:100%; height:100%; background: #000000;">' +
                            '<div id="everything-button-container" class="column" style="height: 100%; width:100%; float: left;">' +
                                '<button id="hide-everything-button" style="width: 100%; height: 100%; background: grey;"> Hide Everything </button> </div>' +
                            '<div id="content-button-container" class="column" style="height: 100%; width:50%; float: left; display: none; ">' +
                                '<button id="hide-content-button" style="width: 100%; height: 100%; background: grey;"> Stop Video </button> </div>' +
                       '</div>';


//append menu and hide buttons to div
div.prepend(iframeMenu);
div.append(iFrameDiv);
div.append(hideIframe);



let draggableDiv = document.createElement('div');
draggableDiv.id = "draggable-container";
draggableDiv.style.height = "125px";
draggableDiv.style.width = "640px";
draggableDiv.style.position = "fixed";
draggableDiv.style.display = "block";
draggableDiv.style.background = "#3489eb";
draggableDiv.style.top = "50px";
draggableDiv.style.right = "10px";
draggableDiv.className = "draggable";
draggableDiv.style.textAlign = "center";
draggableDiv.style.zIndex = "2147483647";

draggableDiv.append(div);

//append entire div to website
$("body").append(draggableDiv);

document.getElementsByTagName("body")[0].style.height = "100%";
document.getElementsByTagName("html")[0].style.height = "100%";


$(function() {
    $(".draggable").draggable();
});

$(function (){
    $(".draggable").resizable({
       aspectRatio: 4/3, 
       minHeight: 125,
       minWidth: 640
    });

    $(".draggable")
});



//add event listeners to all the buttons embedded
document.getElementById('youtube-add-link').addEventListener("click", enterInsertVideoMode);
document.getElementById("hide-content-button").addEventListener("click", hideContent);
document.getElementById("hide-everything-button").addEventListener("click", hideEverything);
document.getElementById("submitLink").addEventListener("click", submitNewYoutubeLink);
document.getElementById("goBackButton").addEventListener("click", goBackFromYoutube);



//////////////////////////////////////////
//Functions
//////////////////////////////////////////

//This is called at the beginning, creates main container div to be injected
function createContainerDiv() {



    //create main container div
    var retDiv = document.createElement('div');


    //set div properties
    retDiv.id = "extension-container";
    retDiv.style.cssText = "z-index: 2147483647; position: relative; top:10%; width: 100%; height: 90%;";

    //insert the iframe
    retDiv.innerHTML = "<div></div>";
    
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
    //document.getElementById("hide-content").style.top = "490px";
    document.getElementById("everything-button-container").style.width = "50%";
    document.getElementById("content-button-container").style.display = "block";

    //hide submission box
    document.getElementById("youtube-search-bar").style.display = "none";

    //unhide menu
    document.getElementById("social-menu").style.display = "block";

    //extend the draggable box
    document.getElementById("draggable-container").style.height = "480px";
    document.getElementById("draggable-container").style.width = "640px";

    //resize everyone's height
    document.getElementById("extension-container").style.top = "4%";
    document.getElementById("iframe-menu").style.height = "9%";
    document.getElementById("hideIframeButton").style.height = "11%";
    document.getElementById("iframe-object").style.display = "block";

    
}

//go back from the submission menu
function goBackFromYoutube(){
    document.getElementById("youtube-search-bar").style.display = "none";
    document.getElementById("social-menu").style.display = "block";

    //shrink draggable box
    document.getElementById("draggable-container").style.height = "125px";
}

//this is what happens when the youtube button is clicked
function enterInsertVideoMode() {

    //hide menu elements
    document.getElementById("social-menu").style.display = "none";

    //unhide youtube link submission
    document.getElementById("youtube-search-bar").style.display = "block";
}

function changeEmbededVideo(link) {
     //changingIframe = document.getElementById('iframe-video-container');
     changingIframe = document.getElementById('ifrm');
     changingIframe.src = link;
}

//hide all elements on the page
//TODO add small button to bring it back possibly in menu
function hideEverything() {
    document.getElementById("draggable-container").style.display = "none";
    document.getElementById("extension-container").style.display = "none";
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

    //resize everyone's height
    document.getElementById("extension-container").style.top = "10%";
    document.getElementById("iframe-menu").style.height = "50%";
    document.getElementById("hideIframeButton").style.height = "50%";
    document.getElementById("iframe-object").style.display = "none";

    document.getElementById("draggable-container").style.width = "640px";
}
