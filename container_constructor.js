//////////////////////////////////////
// Construct Containers to be injected
//////////////////////////////////////
function createContainer(containerType){

    //this is the top level draggable container
    var draggableDiv = createDraggableDiv(containerType);

    //this is the container that holds all inner stuff
    var mainDiv = createMainContainer(containerType);

    //this is the container that holds the iframe for each implementation
    var childContainer = createChildContainer(containerType);

    //this holds the container name and minimize/stop
    var navigationBar = createNavigationBar(containerType);

    //this is where the search bar is made
    var searchBar = null;
    if(containerType === "youtube" || containerType === "twitch" || containerType === "reddit" || containerType === "spotify"){
        searchBar = createSearchBar(containerType);
    }


    //add all divs to the main one
    mainDiv.append(navigationBar);
    mainDiv.append(searchBar);
    mainDiv.append(childContainer);

    //put main into draggable
    draggableDiv.append(mainDiv);

    return draggableDiv;
}

//create the main container
function createMainContainer(containerType){

    //create a div element
    var extensionContainerDiv = document.createElement('div');
    //unique name for extension-container
    extensionContainerDiv.id = containerType + "-container";

    return extensionContainerDiv;
}

//specific implementations for all different container types
function createChildContainer(containerType){
    //youtube and twitch use the same implementation
    if(containerType === "youtube" || containerType === "twitch"){
        var iframeContainer = document.createElement("div");
        iframeContainer.id = containerType + "-iframe-container";
        iframeContainer.innerHTML = '<iframe id="' + containerType + '-iframe-video-container" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
        return iframeContainer;
    }
    //this differs since the redditjs api uses this script element to embed an iframe
    else if(containerType === "reddit"){
        var redditContainer = document.createElement("div");
        redditContainer.id = containerType + "-iframe-container";
        redditContainer.innerHTML = "<script id='reddit-script' src='https://redditjs.com/subreddit.js' data-subreddit='all' data-width='640px'></script>";
        return redditContainer;
    }
    //different internal iframe params
    else if(containerType === "spotify"){
        var spotifyContainer = document.createElement("div");
        spotifyContainer.id = containerType + "-iframe-container";
        spotifyContainer.innerHTML = '<iframe src="" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';
        return spotifyContainer;
    }
}

//Create navigation bar and format name
function createNavigationBar(containerType){
    //create div with unique name
    var navigationBar = document.createElement("div");
    navigationBar.id = containerType + "-nav-menu";

    //format name based on container type
    var formattedName = null;
    var minIconName = null;
    var closeIconName = null;

    //set strings for specific implementations
    if(containerType === "youtube"){
        formattedName = "YouTube";
        minIconName = chrome.runtime.getURL("images/red-minimize-icon.png");
        closeIconName = chrome.runtime.getURL("images/red-close-icon.png");
    } else if(containerType === "twitch"){
        formattedName = "Twitch";
        minIconName = chrome.runtime.getURL("images/purple-minimize-icon.png");
        closeIconName = chrome.runtime.getURL("images/purple-close-icon.png");
    }
    else if(containerType === "reddit"){
        formattedName = "Reddit (Use Browser Back Button to Go Back)";
        minIconName = chrome.runtime.getURL("images/red-minimize-icon.png");
        closeIconName = chrome.runtime.getURL("images/red-close-icon.png");
    }
    else if(containerType === "spotify"){
        formattedName = "Spotify";
        minIconName = chrome.runtime.getURL("images/green-minimize-icon.png");
        closeIconName = chrome.runtime.getURL("images/green-close-icon.png");
    }

    //construct nav bar html
    navigationBar.innerHTML =
                        '<div id="container-label"><p class="' + containerType + '-p">' + formattedName + '</p></div>' +
                        '<ul class="anti-productivity-ul">' +
                            '<li class=".anti-productivity-li">' +
                                '<a id="' + containerType + '-hide-content" class="right-nav-elements hover-elem ' + containerType + '-li-a" style="display: none">' +
                                    '<img id="' + containerType +'-minimize-button-img" class="anti-productivity-center-buttons" src="' + minIconName + '"></img></a></li>' +
                            '<li class=".anti-productivity-li">' +
                                '<a id="hide-everything-' + containerType + '" class="right-nav-elements hover-elem ' + containerType + '-li-a">' +
                                '<img class="anti-productivity-center-buttons" src="' + closeIconName + '"></img></a></li>' +
                        '</ul>';
    return navigationBar;
}

//create the search bar if needed by implementation
function createSearchBar(containerType){

    //unique name assignment
    var searchBar = document.createElement("div");
    searchBar.id = containerType + "-search-bar";

    //search field placeholders for each one
    var textSubmisssionField = "Insert text here...";
    if(containerType === "youtube"){
        textSubmisssionField = "Insert Video URL Here...";
    }
    else if(containerType === "twitch"){
        textSubmisssionField = "Insert Channel Name Here...";
    }
    else if(containerType === "reddit"){
        textSubmisssionField = "Insert Subreddit Name Here...";
    }
    else if(containerType === "spotify"){
        textSubmisssionField = "Insert Spotify Playlist/Song/Album URL Here...";
    }

    //construct html
    searchBar.innerHTML =
                        '<form id="search-form" onSubmit="return false;">' +
                            '<input id="' + containerType + 'Submission" type="text" placeholder="' + textSubmisssionField + '" name="vidLink" />' +
                            '<input id="submit-link-' + containerType + '" type="button" value="Submit" />' +
                        '</form>';

    return searchBar;
}

//top level div that holds everything
function createDraggableDiv(containerType){

    //create the div
    var draggableDiv = document.createElement("div");

    //set some vars
    draggableDiv.id = containerType + "-draggable-container";
    draggableDiv.className = containerType + "-draggable";

    //if reddit, will already be expanded
    if(containerType === "reddit"){
        draggableDiv.style.height = "500px";
    } else {
       draggableDiv.style.height = "75px";
    }
    
    //if spotify, different aspect
    if(containerType === "spotify"){
        draggableDiv.style.width = "500px";
    } else{
        draggableDiv.style.width = "640px";
    }

    //set css for draggable div
    draggableDiv.style.position = "fixed";
    draggableDiv.style.display = "block";
    draggableDiv.style.background = "background-color: rgba(0, 0, 0, 0.75);";
    draggableDiv.style.top = "50px";
    draggableDiv.style.right = "10px";
    draggableDiv.style.textAlign = "center";
    draggableDiv.style.zIndex = "2147483647";

    return draggableDiv;
}