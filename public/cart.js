// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('flexfusion-cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateTotals();
});

function loadCartItems() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = '';

    cart.forEach((item, index) => {
        // Parse the price to remove ₹ and convert to number
        const priceNumber = parseFloat(item.price.replace('₹', ''));
        const itemTotal = priceNumber * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item" data-index="${index}">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <span class="price">₹${priceNumber}</span>
                    <span class="item-total">Item Total: ₹${itemTotal}</span>
                </div>
                <div class="cart-actions">
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                        <span class="quantity-display">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                    <button class="delete-btn" onclick="removeItem(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
}

function showLoginAlert() {
    const alertHTML = `
        <div class="custom-alert">
            <h3>Login Required</h3>
            <p>Please login to complete your purchase</p>
            <div class="alert-buttons">
                <button class="alert-btn login" onclick="window.location.href='login.html'">Login</button>
                <button class="alert-btn cancel" onclick="closeAlert()">Cancel</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', alertHTML);
}

function closeAlert() {
    const alert = document.querySelector('.custom-alert');
    if (alert) {
        alert.remove();
    }
}

function updateQuantity(index, change) {
    const item = cart[index];
    const newQuantity = Math.max(1, Math.min(10, item.quantity + change));

    if (newQuantity !== item.quantity) {
        cart[index].quantity = newQuantity;
        localStorage.setItem('flexfusion-cart', JSON.stringify(cart));

        // Update display
        const quantityDisplay = document.querySelector(`[data-index="${index}"] .quantity-display`);
        const itemTotalDisplay = document.querySelector(`[data-index="${index}"] .item-total`);
        const priceNumber = parseFloat(item.price.replace('₹', ''));

        if (quantityDisplay && itemTotalDisplay) {
            quantityDisplay.textContent = newQuantity;
            itemTotalDisplay.textContent = `Item Total: ₹${(priceNumber * newQuantity).toFixed(2)}`;
        }

        updateTotals();
    }
}

function removeItem(index) {
    const item = document.querySelector(`[data-index="${index}"]`);
    item.style.transform = 'translateX(100%)';
    item.style.opacity = '0';
    
    setTimeout(() => {
        cart.splice(index, 1);
        localStorage.setItem('flexfusion-cart', JSON.stringify(cart));
        loadCartItems();
        updateTotals();
    }, 300);
}

function updateTotals() {
    const subtotal = cart.reduce((sum, item) => {
        const priceNumber = parseFloat(item.price.replace('₹', ''));
        return sum + (priceNumber * item.quantity);
    }, 0);

    const shipping = cart.length > 0 ? 99 : 0;
    const total = subtotal + shipping;

    // Update display with fixed decimal places
    document.getElementById('subtotal').textContent = `₹${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `₹${total.toFixed(2)}`;
}

document.getElementById('checkout-btn').addEventListener('click', function() {
    const totalAmount = cart.reduce((sum, item) => {
        const priceNumber = parseFloat(item.price.replace('₹', ''));
        return sum + (priceNumber * item.quantity);
    }, 0) + 99; // Adding shipping cost

    // Store total amount in sessionStorage
    sessionStorage.setItem('paymentAmount', totalAmount.toFixed(2));
    
    // Redirect to payment page
    window.location.href = 'payment';
});