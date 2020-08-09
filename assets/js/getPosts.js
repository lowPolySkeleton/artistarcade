const API_BASE_URL = 'https://cdn.contentful.com';
const API_SPACE_ID = 's9od3ngssoy7';
const API_TOKEN = 'jeveoIL9LNZLFhRXWPKxpJFdJV4T1gbc4eeUEaroplg';
const loadMoreBtn = document.getElementById('loadMore')
const allpostsBtn = document.getElementById('backHome')
const hero = document.getElementById('hero')

function getPosts(limit, skip){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText)
            let md = new Remarkable();
            let blog = document.getElementById('blog')

            if(data.total == 0){
                loadMoreBtn.innerText = "No more posts to show!";
                loadMoreBtn.classList.add('shake')
            }else{
                for (let i = 0; i < data.items.length; i++) {
                    const e = data.items[i];
                    
                    let post = document.createElement('article');
                    post.classList.add('fadeIn');
                    post.setAttribute('id', e.sys.id);
                    post.innerHTML = '<h2><a href="?post=' + e.sys.id + '">' + e.fields.title + '</a></h2>' +
                                     '<span class="info">' + moment(e.fields.date).format('LL') + '</span>' +
                                     '<div class="postBody">' + md.render(e.fields.body) + '</div>'
    
                    blog.appendChild(post)
                }
            }
        }
    };
    xmlhttp.open('GET', API_BASE_URL + '/spaces/' + API_SPACE_ID + '/entries?access_token=' + API_TOKEN + '&content_type=blog&limit=' + limit + '&skip=' + skip + '&order=-fields.date');
    xmlhttp.send();
}


function getSinglePost(id){
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText)
            console.log(data)
            let md = new Remarkable();
            let blog = document.getElementById('blog')
            let heroLogo = document.getElementById('heroLogo')
            let heroLogoSmall = document.getElementById('heroLogoSmall')

            
            loadMoreBtn.classList.add('hide');
            allpostsBtn.classList.remove('hide');
            hero.classList.add('smallHero');
            heroLogo.classList.add('withHide');
            heroLogoSmall.classList.remove('withHide');

            let post = document.createElement('article');
            post.classList.add('fadeIn');
            post.setAttribute('id', data.sys.id);
            post.innerHTML = '<h2><a href="?post=' + data.sys.id + '">' + data.fields.title + '</a></h2>' +
                             '<span class="info">' + moment(data.fields.date).format('LL') + '</span>' +
                             '<div class="postBody">' + md.render(data.fields.body) + '</div>'

            blog.appendChild(post)
            document.title = data.fields.title
            document.querySelector('meta[name="description"]').setAttribute("content", data.fields.title);
            document.querySelector('meta[property="og:description"]').setAttribute("content", data.fields.title);
        }
    };
    xmlhttp.open('GET', API_BASE_URL + '/spaces/' + API_SPACE_ID + '/entries/' + id + '?access_token=' + API_TOKEN + '&content_type=blog');
    xmlhttp.send();
}

//get URL params
function getParamsByName(name, url){
    if(!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if(!results) return null;
    if(!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

let param = getParamsByName('post');
console.log(param)

if(param){
    getSinglePost(param)
}else{
    getPosts(3,0)
}

loadMoreBtn.addEventListener('click', function(e){
    e.preventDefault;
    let skipAmt = e.target.dataset.skip;
    let limitAmt = e.target.dataset.limit;

    getPosts(limitAmt, skipAmt);

    e.target.dataset.skip = Number(skipAmt) + 3
})



