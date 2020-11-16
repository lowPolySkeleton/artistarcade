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
                    
                    let post = document.createElement('article');
                    post.classList.add('fadeIn');
                    post.setAttribute('id', e.sys.id);
                    post.innerHTML = '<a class="galleryTile" href="' + e.fields.link + '" target="_blank">' + md.render(e.fields.tileImage) + '</a>'
    
                    gallery.appendChild(post)
                }
            }
        }
    };
    xmlhttp.open('GET', API_BASE_URL + '/spaces/' + API_SPACE_ID + '/entries?access_token=' + API_TOKEN + '&content_type=tile&limit=' + limit + '&skip=' + skip + '&order=fields.artistName');
    xmlhttp.send();
}


getTiles(999,0)



