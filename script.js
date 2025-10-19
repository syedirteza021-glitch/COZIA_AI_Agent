// --- Page Routing ---
const pages = document.querySelectorAll('.page');
const mainContent = document.getElementById('main-content');

const showPage = (pageId) => {
    // Hide main content if a pageId is provided
    mainContent.classList.toggle('hidden', !!pageId);
    
    // Hide all individual pages
    pages.forEach(page => page.classList.add('hidden'));

    // Show the requested page
    if (pageId) {
        const activePage = document.getElementById(pageId);
        if(activePage) {
            activePage.classList.remove('hidden');
            window.scrollTo(0, 0); // Scroll to top of new page
        }
    }
};

const handleRouteChange = () => {
    const hash = window.location.hash;
    if (hash === '#terms') {
        showPage('terms-page');
    } else if (hash === '#privacy') {
        showPage('privacy-page');
    } else {
        showPage(null); // Show main content
    }
};

window.addEventListener('hashchange', handleRouteChange);
window.addEventListener('DOMContentLoaded', handleRouteChange);


// --- Mobile Menu Toggle ---
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
const navLinks = document.querySelectorAll('header a');
for (let link of navLinks) {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
}


// --- Appointment Form Submission ---
const appointmentForm = document.getElementById('appointment-form');
const successMessage = document.getElementById('form-success-message');

appointmentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const service = document.querySelector('input[name="service"]:checked').value;
    const message = document.getElementById('message').value;

    const mailtoLink = `mailto:syedirteza021@gmail.com` +
                       `?subject=${encodeURIComponent(`Appointment for ${service}: ${name}`)}` +
                       `&body=${encodeURIComponent(`Hello Cozia AI,\n\nI would like to book an appointment.\n\nName: ${name}\nEmail: ${email}\nInterested in: ${service}\n\nProject Details:\n${message}\n\nThank you.`)}`;
    
    // Open user's email client
    window.location.href = mailtoLink;

    // Show success message and clear form
    successMessage.classList.remove('hidden');
    appointmentForm.reset();

    setTimeout(() => {
        successMessage.classList.add('hidden');
    }, 5000); // Hide message after 5 seconds
});