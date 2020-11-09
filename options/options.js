var sites = [];

function constructOptions()
{
  var sitesArray = sites["sites"];
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
      if(sitesArray[item].hidden == 0){
        sitesArray[item].hidden = 1;
      } else {
      sitesArray[item].hidden = 0;
      }
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
  .then((response) => {response.json(); sites = response.json()})
  .then((json) => constructOptions());