/**
 * Shopping Cart Functionality
 * This file handles all cart operations across the website
 */

// Initialize cart from localStorage (persists between page visits)
let cart = JSON.parse(localStorage.getItem('cart')) || {};
let cartCount = 0;

// Menu item prices (in Rupees)
const itemPrices = {
    'Classic Cheeseburger': 399,
    'Bacon Burger': 449,
    'Veggie Burger': 349,
    'Margherita Pizza': 349,
    'Pepperoni Pizza': 399,
    'Meat Lovers Pizza': 449,
    'Spaghetti Carbonara': 349,
    'Penne Arrabbiata': 299,
    'Fettuccine Alfredo': 349,
    'Caesar Salad': 249,
    'Greek Salad': 269,
    'Chicken Salad': 299,
    'Chocolate Cake': 249,
    'Cheesecake': 299,
    'Ice Cream': 199,
    'Fresh Orange Juice': 99,
    'Iced Tea': 79,
    'Smoothie Blend': 249
};

/**
 * Calculate total items in cart
 */
function calculateCartCount() {
    cart = JSON.parse(localStorage.getItem('cart')) || {};
    cartCount = 0;
    for (let item in cart) {
        cartCount += cart[item];
    }
    updateCartDisplay();
}

/**
 * Update the cart count badge on the cart icon
 */
function updateCartDisplay() {
    const cartCountElements = document.querySelectorAll('.cart_count');
    cartCountElements.forEach(el => {
        el.textContent = cartCount;
        el.style.display = cartCount > 0 ? 'flex' : 'none';
    });
}

/**
 * Display cart items in modal popup
 */
function displayCartModal() {
    const cartBody = document.getElementById('cart_body');
    cartBody.innerHTML = '';

    // Show empty cart message if no items
    if (Object.keys(cart).length === 0) {
        cartBody.innerHTML = '<div class="cart_empty">Your cart is empty</div>';
        document.getElementById('total_items').textContent = '0';
        document.getElementById('total_price').textContent = '₹0';
        return;
    }

    let totalPrice = 0;
    let totalItems = 0;

    // Create HTML for each cart item
    for (let itemName in cart) {
        const quantity = cart[itemName];
        const price = itemPrices[itemName] || 0;
        const itemTotal = price * quantity;
        totalPrice += itemTotal;
        totalItems += quantity;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart_item';
        cartItem.innerHTML = `
            <div class="cart_item_info">
                <div class="cart_item_name">${itemName}</div>
                <div class="cart_item_details">
                    <span>Qty: <span class="cart_item_price">${quantity}</span></span>
                    <span>Price: <span class="cart_item_price">₹${price}</span></span>
                    <span>Total: <span class="cart_item_price">₹${itemTotal}</span></span>
                </div>
            </div>
            <button class="cart_item_remove" onclick="removeFromCart('${itemName}')">
                <i class="ri-delete-bin-line"></i> Remove
            </button>
        `;
        cartBody.appendChild(cartItem);
    }

    // Update totals
    document.getElementById('total_items').textContent = totalItems;
    document.getElementById('total_price').textContent = '₹' + totalPrice;
}

/**
 * Remove item from cart
 * @param {string} itemName - Name of the item to remove
 */
function removeFromCart(itemName) {
    delete cart[itemName];
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update quantity display on menu page (if present)
    document.querySelectorAll('.menu_item').forEach(item => {
        if (item.dataset.itemName === itemName) {
            item.querySelector('.qty_display').textContent = '0';
        }
    });
    
    calculateCartCount();
    displayCartModal();
}

/**
 * Initialize cart modal functionality
 */
function initCartModal() {
    const cartBtn = document.getElementById('cart_btn');
    const cartModal = document.getElementById('cart_modal');
    const cartClose = document.getElementById('cart_close');

    // Open cart modal when cart icon is clicked
    if (cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault();
            displayCartModal();
            cartModal.classList.add('show');
        });
    }

    // Close cart modal when X button is clicked
    if (cartClose) {
        cartClose.addEventListener('click', () => {
            cartModal.classList.remove('show');
        });
    }

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.classList.remove('show');
        }
    });
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', function() {
    calculateCartCount();
    initCartModal();
});
