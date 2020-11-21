chrome.tabs.onActivated.addListener( function(info) {
    console.log("hi");
    chrome.storage.sync.get("sites", function(obj) {
        if(obj["sites"] == null) {
            return 0;
        } else {
            sitesArray = obj["sites"];
        }

        for(let site in sitesArray){
            if(!sitesArray[site].hidden){
                if(sitesArray[site].used){
                    chrome.tabs.executeScript({
                        file: sitesArray[site].value + '/' + sitesArray[site].value + ".js"
                    });
                }
            }
        }
    });
});