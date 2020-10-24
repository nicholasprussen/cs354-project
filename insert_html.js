// var div = document.createElement('div');
// div.id = "fuck";
// //div.innerHTML = "<h1>fuck</h1>";
// //$('fuck').load(chrome.extension.getURL('test.html'));
// // $.get(chrome.extension.getURL('test.html'), function(html){
// //      var $html = $(html);
// //      div.innerHTML = $html.find('div').text();
// //  });
// div.height = "500px";
// div.width = "500px";
// div.style.background = "#000000";
// div.style.zIndex = 99999999;
// div.innerText = "fuck";
//$("#fuck").load(chrome.extension.getURL("test.html"));

$testURL = chrome.extension.getURL('test.html');
const myIframe = '<iframe height="100%" width="100%" style="position: sticky" src="chrome-extension://ikcnkbebhgbbhpkhjacplbgcmgdhccfb/test.html"></iframe>';
let div = document.createElement('div');
div.style.zIndex = 2147483647;
div.style.position = "absolute";
div.style.right = "15px";
div.style.top = "65px";
div.style.width = "640px";
div.style.height = "360px";
div.style.textAlign = "right";
div.innerHTML = myIframe;

$("body").append(div);

//document.body.appendChild(div);
