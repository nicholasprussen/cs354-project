////////////////////////////////////////
//Run on load
////////////////////////////////////////

$(function() {
    mainDiv = createContainer("spotify");
    //append entire div to website
    $("body").append(mainDiv);
});

addCSSStyling();

//functions for adding draggability and resizability to the div
$(function() {
    $(".spotify-draggable").draggable({
        iframeFix: true
    });
});

$(function (){
    $(".spotify-draggable").resizable({
       minHeight: 155,
       minWidth: 500,
       disabled: "true",
       iframeFix: true,
       start: function(event, ui){
           $('#spotify-iframe-container').css('pointer-events', 'none');
       },
       stop: function(event, ui){
           $('#spotify-iframe-container').css('pointer-events', 'auto');
       }
    });
});

//add event listeners to all the buttons embedded
setTimeout(function (){
    document.getElementById("spotify-hide-content").addEventListener("click", hideContentspotify);
    document.getElementById("hide-everything-spotify").addEventListener("click", hideEverythingspotify);
    document.getElementById("submit-link-spotify").addEventListener("click", submitNewspotifyLink);
    // document.getElementById("spotify-album-submit").addEventListener("click", switchToAlbumSubmission);
    // document.getElementById("spotify-playlist-submit").addEventListener("click", switchToPlaylistSubmission);
    // document.getElementById("spotify-song-submit").addEventListener("click", switchToSongSubmission);
    document.getElementById("spotifySubmission").addEventListener("keyup", function(event){
        event.preventDefault();
        if(event.key === "Enter"){
            document.getElementById("submit-link-spotify").click();
        }
    });
}, 1000);


//////////////////////////////////////////
//Functions
//////////////////////////////////////////

//on submission click, get new embed link and display iframe
function submitNewspotifyLink() {

    //this takes links from either spotify native app or web app and manipulates it

    //storage vars
    var embedLink = null;
    var splitURl;
    var objID = null;
    var bareSpotifyLink = null;

    //get link
    var inputText = document.getElementById("spotifySubmission").value;

    //split by question mark if link is from desktop app
    if(inputText.includes("?")){
        cutDownLink = inputText.split("?");
        inputText = cutDownLink[0];
        console.log("found ?:" + inputText);
    }

    //check what type of link and construct link
    if(inputText.includes("album")){
        bareSpotifyLink = "https://open.spotify.com/embed/album/";
        splitURl = inputText.substr(31, inputText.length - 1);
    }
    else if(inputText.includes("playlist")){
        bareSpotifyLink = "https://open.spotify.com/embed/playlist/";
        splitURl = inputText.substr(34, inputText.length - 1);
    }
    else if(inputText.includes("track")){
        bareSpotifyLink = "https://open.spotify.com/embed/track/";
        splitURl = inputText.substr(31, inputText.length - 1);
    }

    //Compile final link for iframe insertion
    embedLink = bareSpotifyLink + splitURl;

    //this copies the iframe and rebuilds instead of setting source
    var original = document.getElementById("spotify-iframe-container");
    var newiframe = document.createElement("iframe");
    newiframe.id = "spotify-iframe-container";
    newiframe.src = embedLink;
    newiframe.setAttribute('frameborder', '0');
    newiframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    var parent = original.parentElement;
    parent.replaceChild(newiframe, original);

    //unhide iframe
    document.getElementById("spotify-iframe-container").style.display = "block";

    //move button container down and make content button visible
    document.getElementById("spotify-nav-menu").style.height = "25px";

    //extend the draggable box
    document.getElementById("spotify-draggable-container").style.height = "155px";
    document.getElementById("spotify-draggable-container").style.width = "500px";

    //resize everyone's height
    document.getElementById("spotify-search-bar").style.height = "50px";
    document.getElementById("spotify-iframe-container").style.display = "block";

    //clear text field
    document.getElementById("spotifySubmission").value = "";

    //unhide the stop video button
    document.getElementById("spotify-hide-content").style.display = "flex";

    //turn on resizing
    $(function (){
        $(".spotify-draggable").resizable("enable");
    });
}

//hide all elements on the page by destroying them
function hideEverythingspotify() {
    document.getElementById("spotify-draggable-container").remove();
}

//on click of hide content, hide spotify video
function hideContentspotify(){

    //hide spotify iframe
    document.getElementById("spotify-iframe-container").style.display = "none";
    document.getElementById("spotify-hide-content").style.display = "none";

    //remove src to stop video playback
    document.getElementById("spotify-iframe-container").src = "";

    //shrink draggable back down
    document.getElementById("spotify-draggable-container").style.height = "75px";
    document.getElementById("spotify-draggable-container").style.width = "500px";

    //resize everyone's dimensions
    document.getElementById("spotify-search-bar").style.height = "65%";
    document.getElementById("spotify-iframe-container").style.display = "none";
    document.getElementById("spotify-nav-menu").style.height = "35%";

    //remove resizability
    $(function (){
        $(".spotify-draggable").resizable("disable");
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
    #spotify-search-bar {
        height: 65%;
        width: 100%;
        background: rgba(0, 0, 0, 0.85);
    }
    #spotify-nav-menu {
        height: 35%;
        width: 100%;
        background: rgba(0, 0, 0, 0.85);
    }
    #spotify-container {
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
    .spotify-li-a {
        display: block;
        color: green;
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
    .spotify-p {
        display: block;
        color: green;
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
    #spotifySubmission {
        height: 65%;
        width: 80%;
        border: 1px solid black;
        margin-top: 8.5px;
        margin-left: 0%;
        font-size: 16px;
    }
    #submit-link-spotify {
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
    #spotify-iframe-container {
        width: 100%;
        height: calc(100% - 75px);
    }
    #spotify-iframe-video-container {
        width: 100%;
        height: 100%;
    }
    #spotify-playlist-submit {
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