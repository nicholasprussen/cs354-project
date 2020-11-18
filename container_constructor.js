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
    if(containerType === "youtube" || containerType === "twitch" || containerType === "reddit"){
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
    else if(containerType === "reddit"){
        var redditContainer = document.createElement("div");
        redditContainer.id = containerType + "-iframe-container";
        redditContainer.innerHTML = "<script id='reddit-script' src='https://redditjs.com/subreddit.js' data-subreddit='all' data-width='640'></script>";
        return redditContainer;
    }
}

//Create navigation bar and format name
function createNavigationBar(containerType){
    //create div with unique name
    var navigationBar = document.createElement("div");
    navigationBar.id = containerType + "-nav-menu";

    //format name based on container type
    var formattedName = null;
    if(containerType === "youtube"){
        formattedName = "YouTube";
    } else if(containerType === "twitch"){
        formattedName = "Twitch";
    }
    else if(containerType === "reddit"){
        formattedName = "Reddit (Use Browser Back Button to Go Back)";
    }

    navigationBar.innerHTML =
                            '<ul>' +
                                '<li><a class="indiv-elem left-nav-elements ' + containerType + '-li-a">' + formattedName + '</a></li>' +
                                '<li><a id="hide-everything-' + containerType + '" class="right-nav-elements hover-elem ' + containerType + '-li-a">Close Extension</a></li>' +
                                '<li><a id="' + containerType + '-hide-content" class="right-nav-elements hover-elem ' + containerType + '-li-a" style="display: none">Close Video</a></li>' +
                            '</ul>';
    return navigationBar;
}

//create the search bar if needed by implementation
function createSearchBar(containerType){

    //unique name assignment
    var searchBar = document.createElement("div");
    searchBar.id = containerType + "-search-bar";

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

    searchBar.innerHTML =
                        '<form id="search-form" onSubmit="return false;">' +
                            '<input id="' + containerType + 'Submission" type="text" placeholder="' + textSubmisssionField + '" name="vidLink" />' +
                            '<input id="submit-link-' + containerType + '" type="button" value="Submit" />' +
                        '</form>';

    return searchBar;
}

//top level div that holds everything
function createDraggableDiv(containerType){


    var draggableDiv = document.createElement("div");

    draggableDiv.id = containerType + "-draggable-container";
    draggableDiv.className = containerType + "-draggable";

    if(containerType === "reddit"){
        draggableDiv.style.height = "500px";
    } else {
       draggableDiv.style.height = "75px"; 
    }
    
    draggableDiv.style.width = "640px";
    draggableDiv.style.position = "fixed";
    draggableDiv.style.display = "block";
    draggableDiv.style.background = "background-color: rgba(0, 0, 0, 0.75);";
    draggableDiv.style.top = "50px";
    draggableDiv.style.right = "10px";
    draggableDiv.style.textAlign = "center";
    draggableDiv.style.zIndex = "2147483647";

    return draggableDiv;
}