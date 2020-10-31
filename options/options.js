

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
      //add functionality to remove 'checked' websites
      const index = viewSites.indexOf(checkbox.name);
      if (index > -1){
        viewSites.splice(index, 1);
      }
      else{
        viewSites.push(checkbox.name);
      }
    });
    page.appendChild(checkbox);
    page.appendChild(label);
    page.appendChild(br);
  }
}
constructOptions(sites);


let dm_checkbox = document.getElementById('darkmode');
dm_checkbox.addEventListener('click', function() {
  let add_script = document.getElementById('scripts');
  var script = document.createElement('script');
  script.src = 'darkmode.js'
  add_script.appendChild(script);
});
