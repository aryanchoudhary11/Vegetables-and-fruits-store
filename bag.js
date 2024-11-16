// Function to handle increase and decrease buttons
document.querySelectorAll('.main-container').forEach(box => {
    const decreaseBtn = box.querySelector('.decrease-btn');
    const increaseBtn = box.querySelector('.increase-btn');
    const quantityDisplay = box.querySelector('.quantity');

    let quantity = 1;
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
