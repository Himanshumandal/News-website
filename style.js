const API_KEY="d31f494d9726489ba18df413d93e0343";
const url="https://newsapi.org/v2/everything?q="

//https://newsapi.org/v2/everything?q=keyword&apiKey=d31f494d9726489ba18df413d93e0343

window.addEventListener('load',()=>fetchNews("India"));
async function fetchNews(query){
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data=await res.json();
    console.log(data);
    binddata(data.articles);
}
function reload(){
    window.location.reload();
}
function binddata(articles){
    const cardscontainer=document.getElementById('card-container');
    const newscardtemp=document.getElementById('template-news-card');

    cardscontainer.innerHTML="";
    articles.forEach((article)=>{
        if(!article.urlToImage) return;
        const cardclone=newscardtemp.content.cloneNode(true);
        filldataincard(cardclone,article);
        cardscontainer.appendChild(cardclone);
    });

}
    function filldataincard(cardclone,article){
        const newimg=cardclone.querySelector("#news-img");
        const newtitle=cardclone.querySelector("#news-title");
        const newsource=cardclone.querySelector("#news-source");
        const newdesc=cardclone.querySelector("#news-desc");

        newimg.src=article.urlToImage;
        newtitle.innerHTML=article.title;
        newdesc.innerHTML=article.description;

        const date=new DataTransfer(article.publishedAt).toLocaleString("en-US",{
            timeZone:"Asia/Jakarta"
        });

        newsource.innerHTML=`${article.source.name}. ${date}`;
        cardclone.firstElementChild.addEventListener('click',()=>{
            window.open(article.url,"_blank");
        });
    }
    let curselect=null;
    
    function onnav(id){
        fetchNews(id);
        const navitem=document.getElementById(id);
        curselect?.classList.remove('active');
        curselect=navitem;
        curselect.classList.add('active');
        textb.value="";
    }

    const searchb=document.getElementById("search-button");

    const textb=document.getElementById("search-text"); 

    searchb.addEventListener("click",()=>{
        const query=textb.value;
        if(!query) return;
        fetchNews(query);
        curselect?.classList.remove('active');
        curselect=null;
    });