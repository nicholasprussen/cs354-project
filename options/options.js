function constructOptions(sites) {

    //Set initial options to sites.json
    var sitesArray = sites["sites"];

    //Get new list
    chrome.storage.sync.get("sites", function(obj) {

        // Check if sites has been set in storage
        if(obj["sites"] != null) {
            sitesArray = obj["sites"];
        }

        //Iterate through list
        for(let site in sitesArray) {

            // Create HTML element for site
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = sitesArray[site].value;
            checkbox.name = sitesArray[site].value;
            checkbox.value = sitesArray[site].value;
            checkbox.checked = sitesArray[site].hidden;
            var label = document.createElement('label');
            label.htmlFor = sitesArray[site].value;
            label.appendChild(document.createTextNode(sitesArray[site].name));
            var br = document.createElement('br');

            // Add click functionality
            checkbox.addEventListener('click', function() {
                sitesArray[site].hidden = !sitesArray[site].hidden;
                chrome.storage.sync.set({"sites": sitesArray}, function() {});
            });
            try {
                page = document.getElementById('site_checkboxes');
                page.appendChild(checkbox);
                page.appendChild(label);
                page.appendChild(br);
            } catch (error) {}
        }
    });
}

fetch(chrome.runtime.getURL("sites.json"))
  .then((response) => response.json())
  .then((json) => constructOptions(json));