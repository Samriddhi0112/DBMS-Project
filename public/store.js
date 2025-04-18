let cart = JSON.parse(localStorage.getItem('flexfusion-cart')) || [];
let isLoggedIn = false; // This should be updated based on your authentication system

// ======= SHARED HELPER FUNCTION =======
function isUserLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function showCustomAlert(title, message) {
    const alertHTML = `
        <div class="custom-alert">
            <h3>${title}</h3>
            <p>${message}</p>
            <div class="alert-buttons">
                <button class="alert-btn login" onclick="window.location.href='login.html'">Login</button>
                <button class="alert-btn cancel" onclick="closeCustomAlert()">Cancel</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', alertHTML);
}

function closeCustomAlert() {
    const alert = document.querySelector('.custom-alert');
    if (alert) {
        alert.remove();
    }
}

// ========== PRODUCT PAGE / STORE JS ==========
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const cartCountSpan = document.getElementById('cart-count');

    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product-card');

    // Add click event listener to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Get the filter value from data-filter attribute
            const filterValue = this.getAttribute('data-filter');

            // Show/hide products based on category
            products.forEach(product => {
                if (filterValue === 'all') {
                    product.style.display = 'block';
                } else {
                    product.style.display = 
                        product.getAttribute('data-category') === filterValue 
                            ? 'block' 
                            : 'none';
                }
            });

            // Add smooth animation
            products.forEach(product => {
                product.style.opacity = '0';
                setTimeout(() => {
                    product.style.opacity = '1';
                }, 300);
            });
        });
    });

    // Add to Cart functionality for product cards
    document.querySelectorAll('.product-card .add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.product-card');
            const product = {
                name: card.querySelector('h3').textContent,
                price: card.querySelector('.price').textContent,
                image: card.querySelector('img').src,
                description: card.querySelector('.description').textContent,
                quantity: 1
            };

            // Add to cart without login check
            let cart = JSON.parse(localStorage.getItem('flexfusion-cart')) || [];
            const existingProductIndex = cart.findIndex(item => item.name === product.name);
            
            if (existingProductIndex >= 0) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('flexfusion-cart', JSON.stringify(cart));
            updateCartCount();

            // Visual feedback
            const cartIcon = document.querySelector('.cart');
            cartIcon.classList.add('cart-flash');
            setTimeout(() => cartIcon.classList.remove('cart-flash'), 700);
        });
    });

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem('flexfusion-cart')) || [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountSpan.textContent = count;
    }

    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        menuToggle.classList.toggle('active');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('product-modal');
    const closeBtn = document.querySelector('.close');
    const productCards = document.querySelectorAll('.product-card');
    
    // Product modal functionality
    productCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('add-to-cart-btn')) {
                const category = this.getAttribute('data-category');
                showProductModal(this, category);
            }
        });
    });

    // Quantity controls
    document.getElementById('increase-quantity').addEventListener('click', () => {
        const input = document.getElementById('quantity');
        if (input.value < 10) input.value = parseInt(input.value) + 1;
    });

    document.getElementById('decrease-quantity').addEventListener('click', () => {
        const input = document.getElementById('quantity');
        if (input.value > 1) input.value = parseInt(input.value) - 1;
    });

    // Size selection
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Add to cart from modal - No login check
    document.getElementById('add-to-cart-modal').addEventListener('click', function() {
        const product = {
            id: this.getAttribute('data-product-id'),
            name: document.getElementById('modal-title').textContent,
            price: document.querySelector('.modal-price').textContent,
            quantity: parseInt(document.getElementById('quantity').value),
            size: document.querySelector('.size-btn.selected')?.getAttribute('data-size'),
            weight: document.getElementById('weight-select')?.value,
            image: document.getElementById('modal-image').src
        };

        addToCart(product);
        modal.style.display = 'none';
        showToast('Added to cart successfully!');
    });

    // Close modal handlers
    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Initialize cart count
    updateCartCount();
});

function showProductModal(productCard, category) {
    const modal = document.getElementById('product-modal');
    const title = productCard.querySelector('h3').textContent;
    const price = productCard.querySelector('.price').textContent;
    const description = productCard.querySelector('.description').textContent;
    const image = productCard.querySelector('img').src;
    const productName = title.toLowerCase();

    // Update modal content
    document.getElementById('modal-title').textContent = title;
    document.querySelector('.modal-price').textContent = price;
    document.querySelector('.modal-description').textContent = description;
    document.getElementById('modal-image').src = image;

    const sizeSelector = document.querySelector('.size-selector');
    const weightSelector = document.querySelector('.weight-selector');
    
    // Reset and hide all selectors first
    sizeSelector.style.display = 'none';
    weightSelector.style.display = 'none';

    // Show appropriate options based on product type
    if (category === 'equipment' && productName.includes('dumbbells')) {
        weightSelector.style.display = 'block';
        const weightSelect = document.getElementById('weight-select');
        weightSelect.innerHTML = `
            <option value="2kg">2kg</option>
            <option value="4kg">4kg</option>
            <option value="6kg">6kg</</option>
            <option value="8kg">8kg</option>
            <option value="10kg">10kg</option>
        `;
    } else if (category === 'apparel') {
        if (productName.includes('shoes') || productName.includes('running')) {
            sizeSelector.style.display = 'block';
            document.querySelector('.size-options').innerHTML = `
                <button class="size-btn" data-size="5UK">5 UK</button>
                <button class="size-btn" data-size="6UK">6 UK</button>
                <button class="size-btn" data-size="7UK">7 UK</button>
                <button class="size-btn" data-size="8UK">8 UK</button>
            `;
        } else if (!productName.includes('cap') && !productName.includes('socks')) {
            sizeSelector.style.display = 'block';
            document.querySelector('.size-options').innerHTML = `
                <button class="size-btn" data-size="S">S</button>
                <button class="size-btn" data-size="M">M</button>
                <button class="size-btn" data-size="L">L</button>
                <button class="size-btn" data-size="XL">XL</button>
            `;
        }
    } else if (category === 'supplements') {
        weightSelector.style.display = 'block';
        const weightSelect = document.getElementById('weight-select');
        weightSelect.innerHTML = `
            <option value="500g">500g</option>
            <option value="1kg">1kg</option>
            <option value="2kg">2kg</option>
        `;
    }

    // Reset quantity
    document.getElementById('quantity').value = 1;

    // Reset size selection
    document.querySelectorAll('.size-btn').forEach(btn => btn.classList.remove('selected'));

    // Add click handlers for size buttons
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    modal.style.display = 'block';
}

function addToCart(product) {
    const existingItem = cart.find(item => 
        item.id === product.id && 
        item.size === product.size && 
        item.weight === product.weight
    );

    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showToast('Added to cart successfully!');
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.parentElement.classList.add('cart-flash');
    setTimeout(() => {
        cartCount.parentElement.classList.remove('cart-flash');
    }, 700);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Add hover effects for product images
document.querySelectorAll('.product-card').forEach(card => {
    const img = card.querySelector('img');
    if (img) {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.3s ease';
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });
    }
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('product-modal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function(e) {
        if (!e.target.classList.contains('add-to-cart-btn')) {
            const category = this.getAttribute('data-category');
            showProductModal(this, category);
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart count
    updateCartCount();
    
    // Add to Cart functionality
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const product = {
                name: card.querySelector('h3').textContent,
                price: card.querySelector('.price').textContent,
                image: card.querySelector('img').src,
                description: card.querySelector('.description').textContent,
                quantity: 1
            };
            
            addToCart(product);
        });
    });
});

function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    
    if (existingItem) {
        existingItem.quantity = Math.min(10, existingItem.quantity + 1);
    } else {
        cart.push(product);
    }
    
    localStorage.setItem('flexfusion-cart', JSON.stringify(cart));
    updateCartCount();
    showToast('Added to cart successfully!');
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}