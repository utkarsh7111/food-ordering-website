/**
 * Menu Page Functionality
 * This file handles menu item quantity controls and cart integration
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Load saved quantities from cart when page loads
    loadCartData();
    
    // Set up quantity controls for each menu item
    setupQuantityControls();
});

/**
 * Load quantities from cart storage and display them
 */
function loadCartData() {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    // Update quantity display for each item in cart
    document.querySelectorAll('.menu_item').forEach(item => {
        const itemName = item.dataset.itemName;
        const qtyDisplay = item.querySelector('.qty_display');
        
        if (cart[itemName]) {
            qtyDisplay.textContent = cart[itemName];
        }
    });
}

/**
 * Set up click handlers for plus/minus buttons
 */
function setupQuantityControls() {
    document.querySelectorAll('.menu_item').forEach(item => {
        const itemName = item.dataset.itemName;
        const minusBtn = item.querySelector('.qty_minus');
        const plusBtn = item.querySelector('.qty_plus');
        const qtyDisplay = item.querySelector('.qty_display');

        // Plus button - increase quantity
        plusBtn.addEventListener('click', function(e) {
            e.preventDefault();
            let currentQty = parseInt(qtyDisplay.textContent);
            currentQty++;
            qtyDisplay.textContent = currentQty;
            
            // Update cart in localStorage
            updateCart(itemName, currentQty);
        });

        // Minus button - decrease quantity
        minusBtn.addEventListener('click', function(e) {
            e.preventDefault();
            let currentQty = parseInt(qtyDisplay.textContent);
            
            if (currentQty > 0) {
                currentQty--;
                qtyDisplay.textContent = currentQty;
                
                // Update cart in localStorage
                if (currentQty === 0) {
                    removeFromCartStorage(itemName);
                } else {
                    updateCart(itemName, currentQty);
                }
            }
        });
    });
}

/**
 * Update item quantity in cart storage
 * @param {string} itemName - Name of the item
 * @param {number} quantity - New quantity
 */
function updateCart(itemName, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    cart[itemName] = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart display (from cart.js)
    if (typeof calculateCartCount === 'function') {
        calculateCartCount();
    }
}

/**
 * Remove item from cart storage
 * @param {string} itemName - Name of the item to remove
 */
function removeFromCartStorage(itemName) {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    delete cart[itemName];
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart display (from cart.js)
    if (typeof calculateCartCount === 'function') {
        calculateCartCount();
    }
}
