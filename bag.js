let bagItemObjects;
let totalPriceAns;
let totalDiscount;
let delivery;
onload();
function onload(){
    loadBagItemObjects();
    displayBagItems();
    totalPriceAns = totalpriceFunction();
    totalDiscount = discountFunction();
    delivery = deliveryCharges();
    totalBill = totalAmountFunction();
    displayBilling();
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
    let bagContainer = document.querySelector('.bag-page');
    if (bagItemObjects.length === 0) {
        bagContainer.innerHTML = `
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
    totalPriceAns = totalpriceFunction();
    totalDiscount = discountFunction();
    delivery = deliveryCharges();
    totalBill = totalAmountFunction();
    displayBagCount();
    displayBagItems();
    displayBilling();
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
function totalpriceFunction(){
    let totalPrice = 0;
    bagItemObjects.forEach(bagItem => {
        totalPrice += Number(bagItem.price);
    });
    return totalPrice.toFixed(2);
}

function discountFunction(){
    let discount = 0;
    bagItemObjects.forEach(bagItem => {
        discount +=  Number(bagItem.price) - Number(bagItem.discounted_price);
    });
    return discount.toFixed(2);
}

function deliveryCharges(){
    let charges = 0;
    if(totalPriceAns < 400){
        charges = 29;
    }
    return charges;
}

function totalAmountFunction(){
    let totalAmount = 0;
    totalAmount += totalPriceAns - totalDiscount + delivery;
    return totalAmount.toFixed(2);
}

function displayBilling(){
    let billingContainer = document.querySelector('.billing-container');
    let innerBilling = `
    <div class="billing-details">
            <span><b>PRICE DETAILS (${bagItemObjects.length} items)</b> </span>
            <div id="total-price">
              <span>Total MRP</span>
              <span>₹${totalPriceAns}</span>
            </div>
            <div id="total-discount">
              <span>Discount </span>
              <span id="discount-price">-₹${totalDiscount}</span>
            </div>
            <div id="Delievery-fees">
              <span>Delivery charges <sub>(if applicable)</sub></span>
              <span>₹${delivery}</span>
            </div>
          </div>
          <div class="total-amount">
            <span>Total Amount</span>
            <span>₹${totalBill}</span>
          </div>
          <div class="place-order-btn">
            <button>PLACE ORDER</button>
          </div>
    `;
    billingContainer.innerHTML = innerBilling;
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