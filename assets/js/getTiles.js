const API_BASE_URL = 'https://cdn.contentful.com';
const API_SPACE_ID = 's9od3ngssoy7';
const API_TOKEN = 'jeveoIL9LNZLFhRXWPKxpJFdJV4T1gbc4eeUEaroplg';

function getTiles(limit, skip){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText)
            let md = new Remarkable();
            let gallery = document.getElementById('gallery')

            if(data.total == 0){
                gallery.appendChild("<h2>Coming Soon</h2>")
            }else{
                for (let i = 0; i < data.items.length; i++) {
                    const e = data.items[i];
                    console.log(e)
                    
                    let tile = document.createElement('a');
                    tile.classList.add('fadeIn');
                    tile.setAttribute('id', e.sys.id);
                    tile.setAttribute('href', e.fields.link);
                    tile.setAttribute('class', 'galleryTile');
                    tile.setAttribute('data-search', e.fields.searchKeywords + ' ' + e.fields.artistName);
                    tile.innerHTML = md.render(e.fields.tileImage)
    
                    gallery.appendChild(tile)
                }
            }
        }
    };
    xmlhttp.open('GET', API_BASE_URL + '/spaces/' + API_SPACE_ID + '/entries?access_token=' + API_TOKEN + '&content_type=tile&limit=' + limit + '&skip=' + skip + '&order=fields.artistName');
    xmlhttp.send();
}


getTiles(999,0)


function search() {
    var input, filter, container, tiles, i, data;
    input = document.getElementById('tileSearch');
    filter = input.value.toUpperCase();
    container = document.getElementById("gallery");
    tiles = container.getElementsByTagName('a');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < tiles.length; i++) {
      data = tiles[i].getAttribute('data-search');
      if (data.toUpperCase().indexOf(filter) > -1) {
        tiles[i].style.display = "";
      } else {
        tiles[i].style.display = "none";
      }
    }
  }


