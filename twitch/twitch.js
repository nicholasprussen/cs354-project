////////////////////////////////////////
//Run on load
////////////////////////////////////////
function runOnLoadTwitch(sites) {
    // Set initial menu to sites.json
    var sitesArray = sites["sites"];

    // Get updated values from storage if they exist
    chrome.storage.sync.get("sites", function(obj) {
        if(obj["sites"] != null) {
            sitesArray = obj["sites"];
        };

        //Check if page was open
        if(sitesArray[3].used) {

            $(function() {
                mainDiv = createContainer("twitch");
                //append entire div to website
                $("body").append(mainDiv);
            });

            addCSSStylingTwitch();

            //functions for adding draggability and resizability to the div
            $(function() {
                $(".twitch-draggable").draggable({
                    iframeFix: true,
                    containment: 'parent'
                });
            });

            $(function (){
                $(".twitch-draggable").resizable({
                aspectRatio: 1/0.7,
                minHeight: 100,
                minWidth: 142,
                disabled: "true",
                iframeFix: true,
                start: function(event, ui){
                    $('#twitch-iframe-video-container').css('pointer-events', 'none');
                },
                stop: function(event, ui){
                    $('#twitch-iframe-video-container').css('pointer-events', 'auto');
                },
                resize: function(event, ui){
                    if(document.getElementById("twitch-draggable-container").clientWidth < 400 && document.getElementById("twitch-draggable-container").clientWidth > 300){
                        document.getElementById("twitchSubmission").style.width = "45%";
                        document.getElementById("twitchSubmission").style.marginTop = "2px";
                        document.getElementById("submit-link-twitch").style.width = "45%";
                        document.getElementById("submit-link-twitch").style.marginTop = "2px";
                        document.getElementById("twitch-nav-menu").style.height = "6%";
                        document.getElementById("twitch-search-bar").style.height = "14%";
                    } else if(document.getElementById("twitch-draggable-container").clientWidth <= 300){
                        document.getElementById("twitch-nav-menu").style.height = "20%";
                        document.getElementById("twitch-search-bar").style.height = "0";
                    } else if(document.getElementById("twitch-draggable-container").clientWidth >= 400){
                        document.getElementById("twitchSubmission").style.width = "80%";
                        document.getElementById("twitchSubmission").style.marginTop = "8.5px";
                        document.getElementById("submit-link-twitch").style.width = "14%";
                        document.getElementById("submit-link-twitch").style.marginTop = "5px";
                        document.getElementById("twitch-nav-menu").style.height = "6%";
                        document.getElementById("twitch-search-bar").style.height = "14%";
                    }
                }
                });
            });

            //add event listeners to all the buttons embedded
            setTimeout(function (){
                document.getElementById("twitch-hide-content").addEventListener("click", hideContentTwitch);
                document.getElementById("hide-everything-twitch").addEventListener("click", hideEverythingTwitch);
                document.getElementById("submit-link-twitch").addEventListener("click", submitNewTwitchLink);
                document.getElementById("twitchSubmission").addEventListener("keyup", function(event){
                    event.preventDefault();
                    if(event.key === "Enter"){
                        document.getElementById("submit-link-twitch").click();
                    }
                });
                if(sitesArray[3].goToLink != ""){
                    document.getElementById("twitchSubmission").value = sitesArray[3].goToLink;
                    document.getElementById("submit-link-twitch").click();
                }
            }, 1000);
        }
    });
}

//////////////////////////////////////////
//Functions
//////////////////////////////////////////

//on submission click, get new embed link and display iframe
function submitNewTwitchLink() {
    var inputText = document.getElementById("twitchSubmission").value;
    chrome.storage.sync.get("sites", function(obj) {
        sitesArray = obj["sites"];
        sitesArray[3].goToLink = inputText;
        chrome.storage.sync.set({"sites": sitesArray}, function() {

            //Ali's code for twitch implementation
            var domain = document.domain;
            var embedLink = "https://player.twitch.tv/?channel=" + inputText + "&parent=" + domain;

            //this copies the iframe and rebuilds instead of setting source
            var original = document.getElementById("twitch-iframe-video-container");
            var newiframe = document.createElement("iframe");
            newiframe.id = "twitch-iframe-video-container";
            newiframe.src = embedLink;
            newiframe.setAttribute('frameborder', '0');
            newiframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
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
            document.getElementById("twitchSubmission").value = "";

            //unhide the stop video button
            document.getElementById("twitch-hide-content").style.display = "flex";

            //turn on resizing
            $(function (){
                $(".twitch-draggable").resizable("enable");
            });
        });
    });
}

//hide all elements on the page by destroying them
function hideEverythingTwitch() {
    link = document.getElementById("twitchSubmission").value;
    document.getElementById("twitch-draggable-container").remove();
    chrome.storage.sync.get("sites", function(obj) {
        sitesArray = obj["sites"];
        sitesArray[3].used = false;
        sitesArray[3].goToLink = "";
        chrome.storage.sync.set({"sites": sitesArray}, function() {});
    })
}

//on click of hide content, hide twitch video
function hideContentTwitch(){

    //hide twitch iframe
    document.getElementById("twitch-iframe-video-container").style.display = "none";
    document.getElementById("twitch-hide-content").style.display = "none";

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

    chrome.storage.sync.get("sites", function(obj) {
        sitesArray = obj["sites"];
        sitesArray[3].goToLink = "";
        chrome.storage.sync.set({"sites": sitesArray}, function() {});
    })
}

function addCSSStylingTwitch(){
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
    .twitch-li-a {
        display: block;
        color: #9146FF;
        font-weight: bold;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 13px;
        padding-right: 7px;
        padding-left: 7px;
        height: 100%;
        text-decoration: none;
        text-align: center;
        line-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .twitch-p {
        display: block;
        color: #9146FF;
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
    #twitchSubmission {
        height: 65%;
        width: 80%;
        border: 1px solid black;
        margin-top: 8.5px;
        margin-left: 0%;
        font-size: 16px;
    }
    #submit-link-twitch {
        margin-top: 5px;
        background-color: black;
        color: #FFFAFA;
        margin-left: 2%;
        border: none;
        cursor: pointer;
        width: 14%;
        height: 65%;
    }
    #search-form {
        width: 100%;
        height: 100%;
        text-align: center;
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

fetch(chrome.runtime.getURL("sites.json"))
  .then((response) => response.json())
  .then((json) => runOnLoadTwitch(json));