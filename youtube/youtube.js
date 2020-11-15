////////////////////////////////////////
//Run on load
////////////////////////////////////////

$(function() {
    mainDiv = createContainer("youtube");
    //append entire div to website
    $("body").append(mainDiv);
});

addCSSStyling();

//functions for adding draggability and resizability to the div
$(function() {
    $(".youtube-draggable").draggable({
        iframeFix: true
    });
});

$(function (){
    $(".youtube-draggable").resizable({
       aspectRatio: 1/0.7,
       minHeight: 450,
       minWidth: 640,
       disabled: "true",
       iframeFix: true,
       start: function(event, ui){
           $('#youtube-iframe-video-container').css('pointer-events', 'none');
       },
       stop: function(event, ui){
           $('#youtube-iframe-video-container').css('pointer-events', 'auto');
       }
    });
});

//add event listeners to all the buttons embedded
setTimeout(function (){
    document.getElementById("youtube-hide-content").addEventListener("click", hideContentYoutube);
    document.getElementById("hide-everything-youtube").addEventListener("click", hideEverythingYoutube);
    document.getElementById("submit-link-youtube").addEventListener("click", submitNewYoutubeLink);
    document.getElementById("youtubeSubmission").addEventListener("keyup", function(event){
        event.preventDefault();
        if(event.key === "Enter"){
            document.getElementById("submit-link-youtube").click();
        }
    });
}, 1000);


//////////////////////////////////////////
//Functions
//////////////////////////////////////////

//on submission click, get new embed link and display iframe
function submitNewYoutubeLink() {

    //Oscars code for taking youtube link and getting embed link
    var inputText = document.getElementById("youtubeSubmission").value;
    pos = inputText.indexOf("watch?v=") + 8;
    id = inputText.substr(pos, inputText.length-1);
    var embedLink = "https://www.youtube.com/embed/" + id;

    //this copies the iframe and rebuilds instead of setting source
    var original = document.getElementById("youtube-iframe-video-container");
    var newiframe = document.createElement("iframe");
    newiframe.id = "youtube-iframe-video-container";
    newiframe.src = embedLink;
    var parent = original.parentElement;
    parent.replaceChild(newiframe, original);

    //unhide iframe
    document.getElementById("youtube-iframe-video-container").style.display = "block";

    //move button container down and make content button visible
    document.getElementById("youtube-nav-menu").style.height = "6%";

    //extend the draggable box
    document.getElementById("youtube-draggable-container").style.height = "450px";
    document.getElementById("youtube-draggable-container").style.width = "640px";

    //resize everyone's height
    document.getElementById("youtube-search-bar").style.height = "14%";
    document.getElementById("youtube-iframe-container").style.display = "block";

    //clear text field
    document.getElementById("youtubeSubmission").value = "";

    //unhide the stop video button
    document.getElementById("youtube-hide-content").style.display = "block";

    //turn on resizing
    $(function (){
        $(".youtube-draggable").resizable("enable");
    });
}

//hide all elements on the page by destroying them
function hideEverythingYoutube() {
    document.getElementById("youtube-draggable-container").remove();
}

//on click of hide content, hide youtube video
function hideContentYoutube(){

    //hide youtube iframe
    document.getElementById("youtube-iframe-video-container").style.display = "none";
    document.getElementById("youtube-hide-content").style.display = "none";

    //remove src to stop video playback
    document.getElementById("youtube-iframe-video-container").src = "";

    //shrink draggable back down
    document.getElementById("youtube-draggable-container").style.height = "75px";
    document.getElementById("youtube-draggable-container").style.width = "640px";

    //resize everyone's dimensions
    document.getElementById("youtube-search-bar").style.height = "65%";
    document.getElementById("youtube-iframe-container").style.display = "none";
    document.getElementById("youtube-nav-menu").style.height = "35%";

    //remove resizability
    $(function (){
        $(".youtube-draggable").resizable("disable");
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
    #youtube-search-bar {
        height: 65%;
        width: 100%;
        background: rgba(0, 0, 0, 0.85);
    }
    #youtube-nav-menu {
        height: 35%;
        width: 100%;
        background: rgba(0, 0, 0, 0.85);
    }
    #youtube-container {
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
    .youtube-li-a {
        display: block;
        color: red;
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
    #youtubeSubmission {
        height: 65%;
        width: 80%;
        border: 1px solid black;
        margin-top: 8.5px;
        margin-left: 0%;
        font-size: 16px;
    }
    #submit-link-youtube {
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
    #youtube-iframe-container {
        width: 100%;
        height: 80%;
    }
    #youtube-iframe-video-container {
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