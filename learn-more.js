
let bag;
onLoad();
function onLoad(){
    let bagItems = localStorage.getItem('bag');
    bag = bagItems ? JSON.parse(bagItems) : [];
    displayBagCount();
}
function displayBagCount(){
    let elementCount = document.querySelector('.items-count');
    if(bag.length > 0){
        elementCount.style.visibility = 'visible';
        elementCount.innerText = bag.length;
    } else{
        elementCount.style.visibility = 'hidden';
    }
}

let menuIcon = document.querySelector('#menu-box');
let navbar = document.querySelector('#nav_bar');

menuIcon.onclick = () => {
    navbar.classList.toggle('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
}