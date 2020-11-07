function populateButtons(sites)
{
  for(let item of sites)
  {
    var button = document.createElement("button");
    button.id = item;
    // button.innerHTML = item;
    button.className = "button";

    var image = document.createElement("img");
    image.src = chrome.runtime.getURL("images/" + item + "-logo.png");
    image.style.height = "32px";
    image.style.width = "32px";

    button.appendChild(image);
    var menu = document.getElementsByClassName("drop-content")[0];
    menu.appendChild(button);

    button.addEventListener("click", function() {
      console.log("you clicked the " + item + " button");
    })
  }
}

populateButtons(['googlenews', 'tiktok', 'twitch', 'reddit', 'youtube', 'spotify']);
// name = ['googlenews', 'tiktok', 'twitch', 'reddit', 'youtube', 'spotify', 'twitter'];