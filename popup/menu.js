function populateButtons(sites) {
    // Set initial menu to sites.json
    var sitesArray = sites["sites"];

    // Get updated values from storage if they exist
    chrome.storage.sync.get("sites", function(obj) {
        sitesArray = obj["sites"];

        //Iterate through every site (even hidden) in stored SitesArray
        for(let site in sitesArray){

            //Check storage if site should be hidden
            if(!sitesArray[site].hidden){

                //Create Button
                var button = document.createElement("button");
                button.id = sitesArray[site].value;
                button.className = "button";

                //Set image
                var image = document.createElement("img");
                image.src = chrome.runtime.getURL("images/" + sitesArray[site].value + "-logo.png");
                image.style.height = "32px";
                image.style.width = "32px";
                button.appendChild(image);

                //Check to make sure we are running at right time
                try {
                    var menu = document.getElementById("drop-content");
                    menu.appendChild(button);
                } catch (error) {
                    console.log("extension not yet loaded.");
                }
            } else {
                console.log(sitesArray[site].name, " hidden from menu");
            }
        }
    });
}

fetch(chrome.runtime.getURL("sites.json"))
  .then((response) => response.json())
  .then((json) => populateButtons(json));