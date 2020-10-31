//Iframe that holds the embedded video
var myIframe = '<iframe id="iframe-video-container" style="position: fixed; right: 15px; top: 130px;" width="640px" height="360p"  src="https://www.youtube.com/embed/aMlMcyO8Oag" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

//div to hold the menu and iframe
let div = document.createElement('div');
div.id = "extension-container";
div.style.zIndex = 2147483647;
div.style.position = "absolute";
div.style.right = "15px";
div.style.top = "65px";
div.style.width = "640px";
div.style.height = "360px";
div.style.textAlign = "right";
//insert the iframe
div.innerHTML = myIframe;

//create the menu and append to main div
let iframeMenu = document.createElement('div');
iframeMenu.id = "iframe-menu";
iframeMenu.innerHTML =  '<div class="row" style="position: fixed; top: 80px; right: 15px; width:640px; height:50px; background: #000000;">' +
                            '<div id="youtube-search-bar" style="position: absolute; background: grey; display: none; width: 100%; height: 100px"' +
                            '<div class="column" style="background: #000000; height: 100%; width:25%; float: left;"></div>' + 
                            '<div class="column" style="background: #00ff00; height: 100%; width:25%; float: left;"></div>' +
                            '<div class="column" style="background: #ff0000; height: 100%; width:25%; float: left;">' +
                                '<button id="youtube-add-link" style="width:100%; height:100%">YouTube</button>' +
                            '</div>' +
                            '<div class="column" style="background: #0000ff; height: 100%; width:25%; float: left;"></div>' +
                        '</div>';

let hideIframe = document.createElement('div');
hideIframe.id = "hideIframeButton";
hideIframe.innerHTML = '<div id="hide-content" class="row" style="position: fixed; top: 490px; right: 15px; width:640px; height:50px; background: #000000;">' +
                            '<button id="hide-content-button" style="width: 100%; height: 100%; background: grey;"> Hide Content </button>"' +
                       '</div>'
//append menu to div
div.prepend(iframeMenu);
div.append(hideIframe);

//append entire div to website
$("body").append(div);

//check to make sure button exists before adding event listener
if(document.getElementById('youtube-add-link')){
    document.getElementById('youtube-add-link').addEventListener("click", changeEmbededVideo);
}

document.getElementById("hide-content-button").addEventListener("click", hideContent);

//this is what happens when the youtube button is clicked
function changeEmbededVideo() {
    //let extCont = document.getElementById("extension-container");
    //extCont.top = "100px";
    //let menuDiv = document.getElementById("iframe-menu");
    //menuDiv.height = "100px"
    div = document.getElementById("iframe-video-container");
    div.style.top="180px";
    youtube = document.getElementById("youtube-search-bar");
    youtube.style.display = "block";
    hideContent = document.getElementById("hide-content");
    hideContent.style.top = "540px";
    //invisibleDiv = document.getElementById('youtube-search-bar');
    //changingIframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ";
    //invisibleDiv.style.display = "block";
}

function hideContent() {
    document.getElementById("extension-container").style.display = "none";
}
