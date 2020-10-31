function getImageURL(path)
{
  return chrome.runtime.getURL(path);
}

// function populateButtons(sites)
// {
//   for (let item of sites) {
//     var checkbox = document.createElement('input');
//     checkbox.type = 'checkbox';
//     checkbox.id = item;
//     checkbox.name = item;
//     checkbox.value = item;

//     var label = document.createElement('label');
//     label.htmlFor = item;
//     label.appendChild(document.createTextNode(item));

//     var br = document.createElement('br');

//     checkbox.addEventListener('click', function(checkbox) {
//       //add functionality to remove 'checked' websites
//       const index = viewSites.indexOf(checkbox.target.id);
//       if (index > -1){
//         viewSites.splice(index, 1);
//         console.log(viewSites);
//       }
//       else{
//         viewSites.push(checkbox.target.id);
//         console.log(viewSites);
//       }
//     });
//     page.appendChild(checkbox);
//     page.appendChild(label);
//     page.appendChild(br);
//   }
// }

//spotify
var spotify = document.getElementById("spotify");
spotify.src = chrome.runtime.getURL("images/spotify-logo.png");
spotify.style.height = "16px";
spotify.style.width = "16px";

//youtube
var youtube = document.getElementById("youtube");
youtube.src = chrome.runtime.getURL("images/youtube-logo.png");
youtube.style.height = "16px";
youtube.style.width = "16px";

//twitter
var twitter = document.getElementById("twitter");
twitter.src = chrome.runtime.getURL("images/twitter-logo.png");
twitter.style.height = "16px";
twitter.style.width = "16px";

//reddit
var reddit = document.getElementById("reddit");
reddit.src = chrome.runtime.getURL("images/reddit-logo.png");
reddit.style.height = "16px";
reddit.style.width = "16px";

//twitch
var twitch = document.getElementById("twitch");
twitch.src = chrome.runtime.getURL("images/twitch-logo.png");
twitch.style.height = "16px";
twitch.style.width = "16px";

//google news
var googlenews = document.getElementById("googlenews");
googlenews.src = chrome.runtime.getURL("images/googlenews-logo.png");
googlenews.style.height = "16px";
googlenews.style.width = "16px";

//tiktok
var tiktok = document.getElementById("tiktok");
tiktok.src = chrome.runtime.getURL("images/tiktok-logo.png");
tiktok.style.height = "16px";
tiktok.style.width = "16px";