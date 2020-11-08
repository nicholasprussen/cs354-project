function populateButtons(sites)
{
  var sitesArray = sites["sites"];
  //sitesArray[0].hidden = 1;
  //console.log(sitesArray);
  for(let item in sitesArray)
  {
    if(sitesArray[item].hidden == 0){
      var button = document.createElement("button");
    button.id = sitesArray[item].value;
    button.className = "button";

    var image = document.createElement("img");
    image.src = chrome.runtime.getURL("images/" + sitesArray[item].value + "-logo.png");
    image.style.height = "32px";
    image.style.width = "32px";

    button.appendChild(image);

    try {
      var menu = document.getElementById("drop-content");
      menu.appendChild(button);
    } catch (error) {
      console.log("extension not yet loaded.");
    }

    button.addEventListener("click", function() {
      chrome.tabs.executeScript({
        file: sitesArray[item] + '/' + sitesArray[item].value + '.js'
      });
    })
    }
  }
}

fetch(chrome.runtime.getURL("sites.json"))
  .then((response) => response.json())
  .then((json) => populateButtons(json));