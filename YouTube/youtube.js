function insertIframe(){
     //Iframe that holds the embedded video
     const myIframe = '<iframe id="iframe-video-container" style="position: fixed; right: 15px; top: 130px;" width="640px" height="360p"  src="https://www.youtube.com/embed/aMlMcyO8Oag" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

     //div to hold the menu and iframe
     let div = document.createElement('div');
     div.id = "extension-container";
     div.style.zIndex = 2147483647;
     div.style.position = "absolute";
     div.style.right = "15px";
     div.style.top = "65px";
     div.style.width = "640px";
     div.style.height = "360px";
     div.style.textAlign = "right";
     //insert the iframe
     div.innerHTML = myIframe;

     //create the menu and append to main div
     let iframeMenu = document.createElement('div');
     iframeMenu.id = "iframe-menu";
     iframeMenu.innerHTML =  '<div class="row" style="position: fixed; top: 80px; right: 15px; width:640px; height:50px; background: #000000;">' +
                              '<div class="column" style="background: #000000; height: 100%; width:25%; float: left;"></div>' +
                              '<div class="column" style="background: #00ff00; height: 100%; width:25%; float: left;"></div>' +
                              '<div class="column" style="background: #ff0000; height: 100%; width:25%; float: left;">' +
                                   '<button id="youtube-add-link" style="width:100%; height:100%">YouTube</button>' +
                              '</div>' +
                              '<div class="column" style="background: #0000ff; height: 100%; width:25%; float: left;"></div>' +
                         '</div>';
     //append menu to div
     div.prepend(iframeMenu);

     //append entire div to website
     $("body").append(div);

     //check to make sure button exists before adding event listener
     if(document.getElementById('youtube-add-link')){
          document.getElementById('youtube-add-link').addEventListener("click", changeEmbededVideo);
     }
}

function convertLink(link){
     //Convert link to embed link
     pos = link.indexOf("watch?v=") + 8;
     id = link.substr(pos, link.length-1);
     embedLink = "https://www.youtube.com/embed/" + id;

     //put embed link in iframe
     changeEmbededVideo(embedLink);
}

function changeEmbededVideo(link) {
     //changingIframe = document.getElementById('iframe-video-container');
     changingIframe = document.getElementById('ifrm');
     changingIframe.src = link;
 }