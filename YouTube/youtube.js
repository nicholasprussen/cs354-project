function getEmbedLink(link){
     //Convert link to embed link
     pos = link.indexOf("watch?v=") + 8;
     id = link.substr(pos, link.length-1);
     newLink = "https://www.youtube.com/embed/" + id;

     //return embed link
     console.log(newLink);
}