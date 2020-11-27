////////////////////////////////////////
//Run on load
////////////////////////////////////////
function runOnLoadTwitter(sites) {
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
        if(sitesArray[2].used) {

            $(function() {
                mainDiv = createContainer("twitter");
                //append entire div to website
                $("body").append(mainDiv);
            });

            addCSSStylingTwitter();

            //functions for adding draggability and resizability to the div
            $(function() {
                $(".twitter-draggable").draggable({
                    iframeFix: true
                });
            });

            $(function (){
                $(".twitter-draggable").resizable({
                    minHeight: 155,
                    minWidth: 500,
                    disabled: "true",
                    iframeFix: true,
                    maxWidth: 1200,
                    maxHeight: 2000,
                    start: function(event, ui){
                        $('#twitter-iframe-container').css('pointer-events', 'none');
                    },
                    stop: function(event, ui){
                        $('#twitter-iframe-container').css('pointer-events', 'auto');
                    },
                    resize: function(event, ui){
                        var draggableWidth = document.getElementById("twitter-draggable-container").clientWidth;
                        $('.twitter-timeline').css({width: (draggableWidth - 2)});
                    }
                });
            });

            //add event listeners to all the buttons embedded
            setTimeout(function (){
                document.getElementById("twitter-hide-content").addEventListener("click", hideContentTwitter);
                document.getElementById("hide-everything-twitter").addEventListener("click", hideEverythingTwitter);
                document.getElementById("submit-link-twitter").addEventListener("click", submitNewTwitterLink);
                document.getElementById("twitterSubmission").addEventListener("keyup", function(event){
                    event.preventDefault();
                    if(event.key === "Enter"){
                        document.getElementById("submit-link-twitter").click();
                    }
                });
                if(sitesArray[2].goToLink != ""){
                    document.getElementById("twitterSubmission").value = sitesArray[2].goToLink;
                    document.getElementById("submit-link-twitter").click();
                }
            }, 1000);
        }
    });
}

//////////////////////////////////////////
//Functions
//////////////////////////////////////////

//on submission click, get new embed link and display iframe
function submitNewTwitterLink() {
    var inputText = document.getElementById("twitterSubmission").value;
    chrome.storage.sync.get("sites", function(obj) {
        sitesArray = obj["sites"];
        sitesArray[2].goToLink = inputText;
        chrome.storage.sync.set({"sites": sitesArray}, function() {
            
            //taking link from twitter profile to create embedded timeline
            //link for a element
            var embedLink = "https://twitter.com/" + inputText

            //rebuild div to eliminate old timeline and initiate new one
            var originalTwitterDiv = document.getElementById("twitter-iframe-container");
            var newTwitterDiv = document.createElement("div");
            newTwitterDiv.id = "twitter-iframe-container";

            //build a for new timeline
            newTwitterDiv.innerHTML = '<a class="twitter-timeline" data-width="500" data-height="500" href="' + embedLink + '"> Tweets by ' + inputText + '</a>';

            //replace old div
            var parent = originalTwitterDiv.parentElement;
            parent.replaceChild(newTwitterDiv, originalTwitterDiv);

            //inject script to run twttr command and rebuild widget
            var runTwtterScript = "twttr.widgets.load(document.getElementById('twitter-iframe-container'));";
            var script = document.createElement("script");
            script.id = "twitter-build-script";
            script.innerHTML = runTwtterScript;
            document.head.appendChild(script);

            //wait a half second and add a border to tell size
            setTimeout( function () {
                $('.twitter-timeline').css({width: '498', height: '100%'});
                $('.twitter-timeline-rendered').css({border: '1px solid black'});
                // if(document.getElementById("twitter-widget-0")){
                //     document.getElementById("twitter-widget-0").style.border = "1px solid black";
                // }
            }, 1000);

            //unhide iframe
            document.getElementById("twitter-iframe-container").style.display = "block";

            //move button container down and make content button visible
            document.getElementById("twitter-nav-menu").style.height = "25px";

            //extend the draggable box
            document.getElementById("twitter-draggable-container").style.height = "575px";
            document.getElementById("twitter-draggable-container").style.width = "500px";

            //resize everyone's height
            document.getElementById("twitter-search-bar").style.height = "50px";
            document.getElementById("twitter-iframe-container").style.display = "block";

            //clear text field
            document.getElementById("twitterSubmission").value = "";

            //unhide the stop video button
            document.getElementById("twitter-hide-content").style.display = "flex";

            //turn on resizing
            $(function (){
                $(".twitter-draggable").resizable("enable");
            });
        });
    });
}

//hide all elements on the page by destroying them
function hideEverythingTwitter() {
    link = document.getElementById("twitterSubmission").value;
    document.getElementById("twitter-draggable-container").remove();
    chrome.storage.sync.get("sites", function(obj) {
        sitesArray = obj["sites"];
        sitesArray[2].used = false;
        sitesArray[2].goToLink = "";
        chrome.storage.sync.set({"sites": sitesArray}, function() {
            console.log(sitesArray);
        });
    });
}

//on click of hide content, hide twitter feed
function hideContentTwitter(){

    //hide twitter iframe
    document.getElementById("twitter-iframe-container").style.display = "none";
    document.getElementById("twitter-hide-content").style.display = "none";

    //remove src to stop video playback
    document.getElementById("twitter-iframe-container").src = "";

    //shrink draggable back down
    document.getElementById("twitter-draggable-container").style.height = "75px";
    document.getElementById("twitter-draggable-container").style.width = "500px";

    //resize everyone's dimensions
    document.getElementById("twitter-search-bar").style.height = "65%";
    document.getElementById("twitter-iframe-container").style.display = "none";
    document.getElementById("twitter-nav-menu").style.height = "35%";

    //remove resizability
    $(function (){
        $(".twitter-draggable").resizable("disable");
    });

    chrome.storage.sync.get("sites", function(obj) {
        sitesArray = obj["sites"];
        sitesArray[2].goToLink = "";
        chrome.storage.sync.set({"sites": sitesArray}, function() {
            console.log(sitesArray);
        });
    })
}

function addCSSStylingTwitter(){
    //////////////////////////////////////////
    //CSS Styling
    //////////////////////////////////////////
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

    style.type = 'text/css';

    // create CSS as a string
    var css = `
    #twitter-search-bar {
        height: 65%;
        width: 100%;
        background: rgba(0, 0, 0, 255);
    }
    #twitter-nav-menu {
        height: 35%;
        width: 100%;
        background: rgba(0, 0, 0, 255);
    }
    #twitter-container {
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
    .anti-productivity-center-buttons {
        margin: 0;
        flex: 1 0 auto;
    }
    .twitter-li-a {
        display: block;
        color: #1DA1F2;
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
    .twitter-p {
        display: block;
        color: #1DA1F2;
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
    #twitterSubmission {
        height: 65%;
        width: 80%;
        border: 1px solid black;
        margin-top: 8.5px;
        margin-left: 0%;
        font-size: 16px;
    }
    #submit-link-twitter {
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
    #twitter-iframe-container {
        width: 100%;
        height: calc(100% - 75px);
    }
    #twitter-iframe-video-container {
        width: 100%;
        height: 100%;
    }
    #twitter-playlist-submit {
        display: none;
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

fetch(chrome.runtime.getURL("sites.json"))
  .then((response) => response.json())
  .then((json) => runOnLoadTwitter(json));