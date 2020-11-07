function populateButtons(sites)
{
  var sitesArray = sites["sites"];
  for(let item in sitesArray)
  {
    var button = document.createElement("button");
    button.id = sitesArray[item];
    // button.innerHTML = sitesArray[item];
    button.className = "button";

    var image = document.createElement("img");
    image.src = chrome.runtime.getURL("images/" + sitesArray[item] + "-logo.png");
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
        file: 'Youtube/' + sitesArray[item] + '.js'
      });
    })
  }
}

fetch(chrome.runtime.getURL("sites.json"))
  .then((response) => response.json())
  .then((json) => populateButtons(json));