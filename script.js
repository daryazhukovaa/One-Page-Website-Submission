// Lightbox configuration
lightbox.option({
    'resizeDuration': 300,
    'wrapAround': true,
    'albumLabel': 'Fashion Design %1 of %2',
    'fadeDuration': 300,
    'imageFadeDuration': 300
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Parallax effect for collection cards
const collectionCards = document.querySelectorAll('.collection-card');
window.addEventListener('scroll', () => {
    collectionCards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const cardBottom = card.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight && cardBottom > 0) {
            const scrollPercent = (windowHeight - cardTop) / windowHeight;
            card.style.transform = `translateY(${scrollPercent * -20}px)`;
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section, .collection-card, .achievement').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Add fade-in class for animation
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Form validation and handling
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name || data.name.length < 2) {
        isValid = false;
        showError('Please enter a valid name');
    } else if (!data.email || !emailRegex.test(data.email)) {
        isValid = false;
        showError('Please enter a valid email address');
    } else if (!data.message || data.message.length < 10) {
        isValid = false;
        showError('Please enter a message with at least 10 characters');
    }
    
    if (isValid) {
        showSuccess('Thank you for your message! We will get back to you soon.');
        form.reset();
    }
});

// Error and success message handling
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff4444';
    errorDiv.style.marginBottom = '1rem';
    
    form.insertBefore(errorDiv, form.firstChild);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.color = '#00C851';
    successDiv.style.marginBottom = '1rem';
    
    form.insertBefore(successDiv, form.firstChild);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

// Navbar scroll effect
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Image hover effect
document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.05)';
        img.style.filter = 'brightness(1.1)';
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
        img.style.filter = 'brightness(1)';
    });
}); 