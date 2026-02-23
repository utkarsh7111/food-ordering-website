/**
 * Main JavaScript File
 * This file handles navigation bar scroll effects and mobile menu toggle
 */

// ========== NAVBAR SCROLL EFFECT ==========
// Changes navbar background when user scrolls down
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    // Add dark background when scrolled past 20px
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});


// ========== SCROLL TO TOP BUTTON ==========
// Smoothly scrolls page to top when button is clicked
document.querySelector('#to-top').addEventListener('click', function() {
    // Smooth scroll animation
    const scrollInterval = setInterval(function() {
        // Get the element that has scrollTop (body or documentElement)
        const scrollElement = document.body.scrollTop > 0 ? document.body : document.documentElement;
        
        // Scroll up by 50px each step
        if (scrollElement.scrollTop > 0) {
            scrollElement.scrollTop = scrollElement.scrollTop - 50;
        }
        
        // Stop scrolling when we reach the top
        if (scrollElement.scrollTop < 1) {
            clearInterval(scrollInterval);
        }
    }, 10);
});


// ========== SHOW/HIDE SCROLL BUTTON ==========
// Shows the scroll-to-top button after scrolling down 100px
function showScrollButton() {
    const topButton = document.getElementById('to-top');
    
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        topButton.classList.add('show');
    } else {
        topButton.classList.remove('show');
    }
}

// Check scroll position whenever user scrolls
window.onscroll = function() {
    showScrollButton();
};


// ========== MOBILE MENU TOGGLE ==========
// Opens and closes the navigation menu on mobile devices
const menuBtn = document.getElementById('menu_btn');
const navLinks = document.getElementById('nav_links');
const menuIcon = menuBtn.querySelector('i');

menuBtn.addEventListener('click', function() {
    // Toggle the 'open' class on navigation
    navLinks.classList.toggle('open');
    
    // Change icon based on menu state (hamburger or X)
    const isOpen = navLinks.classList.contains('open');
    menuIcon.setAttribute('class', isOpen ? 'ri-close-line' : 'ri-menu-line');
});