function populateButtons(sites) {
    // Set initial menu to sites.json
    var sitesArray = sites["sites"];

    // chrome.storage.sync.clear(function(){
    //     console.log("Cleared ^-^");
    // })

    // Get updated values from storage if they exist
    chrome.storage.sync.get("sites", function(obj) {

        // Check if sites has been set in storage
        if(obj["sites"] == null) {
            console.log("storage not in place yet");
        } else {
            sitesArray = obj["sites"];
        }

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

                //Add Click functionality
                button.addEventListener("click", function() {
                    sitesArray[site].used = true;
                    chrome.storage.sync.set({"sites": sitesArray}, function() {
                        console.log("Using updated", sitesArray);
                        chrome.tabs.executeScript({
                            file: sitesArray[site].value + '/' + sitesArray[site].value + ".js"
                        });
                    });
                });

                //Add to page if we are running at the right time.
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