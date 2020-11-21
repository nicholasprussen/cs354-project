///////////////////////////////////////
//Run on load
////////////////////////////////////////

$(function() {
    mainDiv = createContainer("twitter");
    //append entire div to website
    $("body").append(mainDiv);
});

addCSSStyling();

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
       start: function(event, ui){
           $('#twitter-iframe-container').css('pointer-events', 'none');
       },
       stop: function(event, ui){
           $('#twitter-iframe-container').css('pointer-events', 'auto');
       }
    });
});

//add event listeners to all the buttons embedded
setTimeout(function (){
    document.getElementById("twitter-hide-content").addEventListener("click", hideContenttwitter);
    document.getElementById("hide-everything-twitter").addEventListener("click", hideEverythingtwitter);
    document.getElementById("submit-link-twitter").addEventListener("click", submitNewtwitterLink);
    document.getElementById("twitterSubmission").addEventListener("keyup", function(event){
        event.preventDefault();
        if(event.key === "Enter"){
            document.getElementById("submit-link-twitter").click();
        }
    });
}, 1000);


//////////////////////////////////////////
//Functions
//////////////////////////////////////////

//on submission click, get new embed link and display iframe
function submitNewtwitterLink() {

    //taking link from twitter profile to create embedded timeline

    //get link
    var inputText = document.getElementById("twitterSubmission").value;
    var embedLink = "https://www.twitter.com/" + inputText

    // var domain = document.domain;
    // var embedLink = "https://twitter.com/" + inputText + "&parent=" + domain;

    // twttr.widgets.createTimeline(
    //     {
    //       sourceType: "profile",
    //       screenName: "TwitterDev"
    //     },
    //     document.getElementById("container")
    //   );

    //this copies the iframe and rebuilds instead of setting source
    var original = document.getElementById("twitter-iframe-container");
    var newiframe = document.createElement("iframe");
    newiframe.id = "twitter-iframe-container";
    newiframe.src = embedLink;
    newiframe.setAttribute('frameborder', '0');
    newiframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    var parent = original.parentElement;
    parent.replaceChild(newiframe, original);

    //unhide iframe
    document.getElementById("twitter-iframe-container").style.display = "block";

    //move button container down and make content button visible
    document.getElementById("twitter-nav-menu").style.height = "25px";

    //extend the draggable box
    document.getElementById("twitter-draggable-container").style.height = "155px";
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
}

//hide all elements on the page by destroying them
function hideEverythingtwitter() {
    document.getElementById("twitter-draggable-container").remove();
}

//on click of hide content, hide twitter video
function hideContenttwitter(){

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
        color: #1DB4B9;
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
        color: #1DB4B9;
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