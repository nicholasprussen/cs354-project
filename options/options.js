

let page = document.getElementById('site_checkboxes');
function constructOptions(sites) {
  for (let item of sites) {
    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = item;
    checkbox.name = item;
    checkbox.value = item;

    var label = document.createElement('label');
    label.htmlFor = item;
    label.appendChild(document.createTextNode(item));

    var br = document.createElement('br');

    checkbox.addEventListener('click', function() {
      //add functionality to remove 'checked' websites from user view
    });
    page.appendChild(checkbox);
    page.appendChild(label);
    page.appendChild(br);
  }
}
constructOptions(sites);

/*
let page = document.getElementById('darkmode_switch');
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: item}, function() {
        console.log('color is ' + item);
      })
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);
*/
