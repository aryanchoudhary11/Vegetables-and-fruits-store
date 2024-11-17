let bagItemObjects;
onload();
function onload(){
    loadBagItemObjects();
    displayBagItems();
}

function loadBagItemObjects(){
    bagItemObjects = bag.map(bagItem => {
        for(let i = 0; i < items.length; i++){
            if(bagItem.name == items[i].name){
                return items[i];
            }
        }
    });

}

function displayBagItems() {
    let containerElement = document.querySelector('.main-container');
    if (bagItemObjects.length === 0) {
        containerElement.innerHTML = `
        <div class="empty-bag">
            <p>Your bag is Empty</p>
        </div>`;
        return;
    }

    let innerHTML = '';
    bagItemObjects.forEach(bagItem => {
        innerHTML += generateHTML(bagItem);
    });
    containerElement.innerHTML = innerHTML;

}

function removeFromBag(itemName){
    bag = bag.filter(bagItemName => bagItemName.name != itemName);
    localStorage.setItem('bag', JSON.stringify(bag));
    loadBagItemObjects();
    displayBagCount();
    displayBagItems();
}

function generateHTML(item){

        return `
        <div class="boxes-container">
            <div class="item-container" id="item">
                <img src="${item.imagePath}" alt="${item.name}">
            </div>
            <div class="item-details">
                <span id="name">${item.name}</span><br>
                <span id="price">MRP: <s>${item.price}</s> ${item.discounted_price}</span>
                <span id="discount">(${item.discount} OFF)</span><br>
                <div class="buttons">
                    <div class="counter">
                        <button class="decrease-btn">-</button>
                        <span class="quantity">1</span><span><b>Kg</b></span>
                        <button class="increase-btn">+</button>
                    </div>
                    <button id="remove-btn" onclick = "removeFromBag('${item.name}')">Remove</button>
                </div>
            </div>
        </div>`

}
// Function to handle increase and decrease buttons

document.querySelectorAll('.boxes-container').forEach((box) => {
    const decreaseBtn = box.querySelector('.decrease-btn');
    const increaseBtn = box.querySelector('.increase-btn');
    const quantityDisplay = box.querySelector('.quantity');

    let quantity = 1; 

    quantityDisplay.textContent = quantity;

    increaseBtn.addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
    });

    decreaseBtn.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
        }
        quantityDisplay.textContent = quantity;
    });
});