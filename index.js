let img = '';

setBackground();

async function getBackground(){
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const data = await res.json()
    img = data.urls.full;
} 

async function setBackground(){
    document.body.innerHTML=`Image loading...`;
    const res = await getBackground();
    document.body.innerHTML=``;
    document.body.style.backgroundImage=`url(${img})`;
}