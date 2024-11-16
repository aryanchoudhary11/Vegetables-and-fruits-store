let menuIcon = document.querySelector('#menu-box');
let navbar = document.querySelector('#nav_bar');
menuIcon.onclick = () => {
    navbar.classList.toggle('active');
}
window.onscroll = () => {
    navbar.classList.remove('active');
}


let bag = [];

function addToBag(event) {
    const vegetableBox = event.target.closest('.vegetable-box');
    const name = vegetableBox.querySelector('#name').textContent;
    const price = vegetableBox.querySelector('#price').textContent;
    const discount = vegetableBox.querySelector('#discount').textContent;
    const item = { name, price, discount };
    bag.push(item);
}
document.querySelectorAll('.bag-btn button').forEach(button => {
    button.addEventListener('click', addToBag);
});