function constructOptions(sites)
{
  var sitesArray = sites["sites"];
  chrome.storage.sync.set({"sites": sitesArray}, function() {
    console.log(sitesArray);
  });
  for(let item in sitesArray)
  {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = sitesArray[item].value;
    checkbox.name = sitesArray[item].value;
    checkbox.value = sitesArray[item].value;

    var label = document.createElement('label');
    label.htmlFor = sitesArray[item].value;
    label.appendChild(document.createTextNode(sitesArray[item].name));

    var br = document.createElement('br');

    checkbox.addEventListener('click', function(checkbox) {
      //add functionality to remove 'checked' websites
      storArray = [];
      found = false;
      index = 0;
      chrome.storage.sync.get("sites", function(val) {
        console.log(val["sites"]);
        storArray = val["sites"];
        for(let site in storArray){
          if(storArray[site].value == sitesArray[item].value){
            found = true;
          }
          if(!found){
            index++;
          }
        }
        if(found){
          storArray.splice(index, 1);
          chrome.storage.sync.set({"sites": storArray}, function() {
            console.log(storArray);
          })
        } else {
          storArray.push(sitesArray[item].value);
          chrome.storage.sync.set({"sites": storArray}, function() {
            console.log(storArray);
          })
        }
      })
    });
    try {
      page = document.getElementById('site_checkboxes');
      page.appendChild(checkbox);
      page.appendChild(label);
      page.appendChild(br);
    } catch (error) {
      console.log("extension not yet loaded.");
    }
  }
}

fetch(chrome.runtime.getURL("sites.json"))
  .then((response) => response.json())
  .then((json) => constructOptions(json));