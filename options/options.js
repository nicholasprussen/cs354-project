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

    checkbox.addEventListener('click', function(checkbox) {
      //add functionality to remove 'checked' websites
      var index = viewSites.indexOf(checkbox.target.id);
      if (index > -1){
        viewSites.splice(index, 1);
        console.log(viewSites);
      }
      else{
        viewSites.push(checkbox.target.id);
        console.log(viewSites);
      }
    });
    page.appendChild(checkbox);
    page.appendChild(label);
    page.appendChild(br);
  }
}

let page = document.getElementById('site_checkboxes');
constructOptions(sites);


let dm_checkbox = document.getElementById('darkmode');
dm_checkbox.addEventListener('click', function() {
  let add_script = document.getElementById('scripts');
  var script = document.createElement('script');
  script.src = 'darkmode.js'
  add_script.appendChild(script);
});
