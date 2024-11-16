
let menuIcon = document.querySelector('#menu-box');
let navbar = document.querySelector('#nav_bar');
menuIcon.onclick = () => {
    navbar.classList.toggle('active');
}
window.onscroll = () => {
    navbar.classList.remove('active');
}


let bag;
onLoad();
function onLoad(){
    let bagItems = localStorage.getItem('bag');
    bag = bagItems ? JSON.parse(bagItems) : [];
    displayBagCount();
}
function addToBag(event) {
    const vegetableBox = event.target.closest('.vegetable-box');
    const name = vegetableBox.querySelector('#name').textContent;
    const price = vegetableBox.querySelector('#price').textContent;
    const discount = vegetableBox.querySelector('#discount').textContent;
    const item = { name, price, discount };
    bag.push(item);
    localStorage.setItem('bag', JSON.stringify(bag));
    displayBagCount();
}
document.querySelectorAll('.bag-btn button').forEach(button => {
    button.addEventListener('click', addToBag);
    
});

function displayBagCount(){
    let elementCount = document.querySelector('.items-count');
    if(bag.length > 0){
        elementCount.style.visibility = 'visible';
        elementCount.innerText = bag.length;
    } else{
        elementCount.style.visibility = 'hidden';
    }
}