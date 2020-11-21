// Variables
var currentSubreddit = "all";

////////////////////////////////////////
//Run on load
////////////////////////////////////////
function runOnLoadReddit(sites) {
    // Set initial menu to sites.json
    var sitesArray = sites["sites"];

    // Get updated values from storage if they exist
    chrome.storage.sync.get("sites", function(obj) {
        if(obj["sites"] == null) {
            console.log("storage not in place yet");
        } else {
            sitesArray = obj["sites"];
        }

        //Check if page was open
        if(sitesArray[1].used) {

            var currentSubreddit = "all";

            $(function() {
                mainDiv = createContainer("reddit");
                //append entire div to website
                $("body").append(mainDiv);
            });

            addCSSStylingReddit();

            //functions for adding draggability and resizability to the div
            $(function() {
                $(".reddit-draggable").draggable({
                    iframeFix: true
                });
            });

            $(function (){
                $(".reddit-draggable").resizable({
                aspectRatio: 1.28/1,
                minHeight: 300,
                minWidth: 384,
                iframeFix: true,
                start: function(event, ui){
                    $('#reddit-iframe-child').css('pointer-events', 'none');
                },
                stop: function(event, ui){
                    $('#reddit-iframe-child').css('pointer-events', 'auto');
                }
                });
            });

            //add event listeners to all the buttons embedded
            setTimeout(function (){
                document.getElementById("reddit-hide-content").addEventListener("click", hideContentReddit);
                document.getElementById("hide-everything-reddit").addEventListener("click", hideEverythingReddit);
                document.getElementById("submit-link-reddit").addEventListener("click", submitNewRedditLink);
                document.getElementById("redditSubmission").addEventListener("keyup", function(event){
                    event.preventDefault();
                    if(event.key === "Enter"){
                        document.getElementById("submit-link-reddit").click();
                    }
                });
                if(sitesArray[1].goToLink != ""){
                    document.getElementById("redditSubmission").value = sitesArray[1].goToLink;
                    document.getElementById("submit-link-reddit").click();
                }
                getRedditIframe();
            }, 1000);
        }
    });
}

//////////////////////////////////////////
//Functions
//////////////////////////////////////////

//on submission click, get new embed link and display iframe
function submitNewRedditLink() {
    var inputText = document.getElementById("redditSubmission").value;
    chrome.storage.sync.get("sites", function(obj) {
        sitesArray = obj["sites"];
        sitesArray[1].goToLink = inputText;
        chrome.storage.sync.set({"sites": sitesArray}, function() {
            console.log("Reddit goToLink updated", obj);
            var iframeChild = getRedditIframe();
            var copyOfSource = iframeChild.src;

            //Nick's code for changing subreddit
            inputText = document.getElementById("redditSubmission").value;
            copyOfSource = copyOfSource.replace(currentSubreddit, inputText);
            currentSubreddit = inputText;
            iframeChild.src = copyOfSource;

            //clear text field
            document.getElementById("redditSubmission").value = "";

        });
    });
}

//hide all elements on the page by destroying them
function hideEverythingReddit() {
    link = document.getElementById("redditSubmission").value;
    document.getElementById("reddit-draggable-container").remove();
    chrome.storage.sync.get("sites", function(obj) {
        sitesArray = obj["sites"];
        sitesArray[1].used = false;
        sitesArray[1].goToLink = "";
        chrome.storage.sync.set({"sites": sitesArray}, function() {
            console.log("Reddit used updated", sitesArray);
        });
    });
}

//on click of hide content, hide reddit content
function hideContentReddit(){

    //hide reddit iframe
    document.getElementById("reddit-iframe-video-container").style.display = "none";
    document.getElementById("reddit-hide-content").style.display = "none";

    //remove src to stop video playback
    document.getElementById("reddit-iframe-video-container").src = "";

    //shrink draggable back down
    document.getElementById("reddit-draggable-container").style.height = "75px";
    document.getElementById("reddit-draggable-container").style.width = "640px";

    //resize everyone's dimensions
    document.getElementById("reddit-search-bar").style.height = "65%";
    document.getElementById("reddit-iframe-container").style.display = "none";
    document.getElementById("reddit-nav-menu").style.height = "35%";

    //remove resizability
    $(function (){
        $(".reddit-draggable").resizable("disable");
    });

    chrome.storage.sync.get("sites", function(obj) {
        sitesArray = obj["sites"];
        sitesArray[1].goToLink = "";
        chrome.storage.sync.set({"sites": sitesArray}, function() {
            console.log("Reddit used updated", sitesArray);
        });
    })
}

function addCSSStylingReddit(){
    //////////////////////////////////////////
    //CSS Styling
    //////////////////////////////////////////
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';

    // create CSS as a string
    var css = `
    #reddit-search-bar {
        height: 10%;
        width: 100%;
        background: rgba(0, 0, 0, 0.85);
    }
    #reddit-nav-menu {
        height: 5%;
        width: 100%;
        background: rgba(0, 0, 0, 0.85);
    }
    #reddit-container {
        height: 100%;
        width: 100%;
    }
    .anti-productivity-ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        text-decoration: none;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }
    #container-label {
        float: left;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 100%;
    }
    .left-nav-elements {
        float: left;
    }
    .right-nav-elements {
        float: right;
    }
    .anti-productivity-li {
        text-align: center;
        flex: 1 0 auto;
    }
    #anti-productivity-center-buttons {
        margin: 0;
        flex: 1 0 auto;
    }
    .reddit-li-a {
        display: block;
        color: #FF4500;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 13px;
        padding-right: 16px;
        padding-left: 16px;
        height: 100%;
        text-decoration: none;
        text-align: center;
        line-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .reddit-p {
        display: block;
        color: #FF4500;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 13px;
        padding-left: 7px;
        padding-right: 7px;
        margin: 0;
        flex: 1 0 auto;
    }
    a.hover-elem:hover {
        background-color: #111;
        text-decoration: none;
    }
    a.indiv-elem:hover {
        text-decoration: none;
    }
    #redditSubmission {
        height: 65%;
        width: 80%;
        border: 1px solid black;
        margin-top: 8.5px;
        margin-left: 0%;
        font-size: 16px;
    }
    #submit-link-reddit {
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
    #reddit-iframe-container {
        width: 100%;
        height: 85%;
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

function getRedditIframe(){
    var parentDiv = document.getElementById("reddit-iframe-container");
    parentDiv.style.height = "85%";

    var iframeChild = parentDiv.getElementsByTagName("iframe")[0];
    iframeChild.style.width = "99.4%";
    iframeChild.style.height = "99.4%";

    iframeChild.parentElement.style.height = "100%";
    iframeChild.id = "reddit-iframe-child";


    return iframeChild;
}

fetch(chrome.runtime.getURL("sites.json"))
  .then((response) => response.json())
  .then((json) => runOnLoadReddit(json));