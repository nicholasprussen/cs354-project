////////////////////////////////////////
//Run on load
////////////////////////////////////////

//Create main container div
div = createContainerDiv();

//create the menu and append to main div
let iframeMenu = document.createElement('div');
iframeMenu.id = "iframe-menu";
iframeMenu.innerHTML =  
                        '<div id="youtube-search-bar" style="position: fixed; background: black; top: 80px; display: none; width: 640px; height: 50px"' +
                            '<div id="form-container" style="padding-left: 10px; height: 100%; width: 100%">' +
                                '<form">' +
                                    '<input style="float: left" id="vidLink-value" type="text" name="vidLink" />' +
                                    '<input style="float: left" id="submitLink" type="button" value="submit" /><br>' +
                                    '<input style="float: left" id="goBackButton" type="button" value="Go Back" />' +
                                '</form>' +
                            '</div>' +
                        '</div>' +
                        '<div id="social-menu" class="row" style="position: fixed; top: 80px; right: 15px; width:640px; height:50px; background: #000000;">' +
                            '<div class="column" style="background: #000000; height: 100%; width:25%; float: left;"></div>' + 
                            '<div class="column" style="background: #00ff00; height: 100%; width:25%; float: left;"></div>' +
                            '<div class="column" style="background: #ff0000; height: 100%; width:25%; float: left;">' +
                                '<button id="youtube-add-link" style="width:100%; height:100%">YouTube</button>' +
                            '</div>' +
                            '<div class="column" style="background: #0000ff; height: 100%; width:25%; float: left;"></div>' +
                        '</div>';

//container for hide elements buttons
let hideIframe = document.createElement('div');
hideIframe.id = "hideIframeButton";
hideIframe.innerHTML = '<div id="hide-content" class="row" style="text-align: center; position: fixed; top: 130px; right: 15px; width:640px; height:50px; background: #000000;">' +
                            '<div id="everything-button-container" class="column" style="height: 100%; width:100%; float: left;">' +
                                '<button id="hide-everything-button" style="width: 100%; height: 100%; background: grey;"> Hide Everything </button> </div>' +
                            '<div id="content-button-container" class="column" style="height: 100%; width:50%; float: left; display: none; ">' +
                                '<button id="hide-content-button" style="width: 100%; height: 100%; background: grey;"> Stop Video </button> </div>' +
                       '</div>';


//append menu and hide buttons to div
div.prepend(iframeMenu);
div.append(hideIframe);

//append entire div to website
$("body").append(div);

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

    //Iframe that holds the embedded video
    var myIframe = '<iframe id="iframe-video-container" style="position: fixed; right: 15px; top: 130px; display: none;" width="640px" height="360p"  src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';


    //create main container div
    var retDiv = document.createElement('div');


    //set div properties
    retDiv.id = "extension-container";
    retDiv.style.cssText = "z-index: 2147483647; position: absolute; right: 15px; top: 65px; width: 640px; height: 360px; text-align: right";

    //insert the iframe
    retDiv.innerHTML = myIframe;
    
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
    document.getElementById("hide-content").style.top = "490px";
    document.getElementById("everything-button-container").style.width = "50%";
    document.getElementById("content-button-container").style.display = "block";

    //hide submission box
    document.getElementById("youtube-search-bar").style.display = "none";

    //unhide menu
    document.getElementById("social-menu").style.display = "block";
}

//go back from the submission menu
function goBackFromYoutube(){
    document.getElementById("iframe-video-container").style.top = "130px";
    document.getElementById("youtube-search-bar").style.display = "none";
    document.getElementById("hide-content").style.top = "410px";
    document.getElementById("social-menu").style.display = "block";
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
    document.getElementById("extension-container").style.display = "none";
}


//on click of hide content, hide youtube video
function hideContent(){

    //hide youtube iframe
    document.getElementById("iframe-video-container").style.display = "none";

    //move buttons back up and hide content button
    document.getElementById("hide-content").style.top = "130px";
    document.getElementById("everything-button-container").style.width = "100%";
    document.getElementById("content-button-container").style.display = "none";

    //remove src to stop video playback
    document.getElementById("iframe-video-container").src = "";
}
