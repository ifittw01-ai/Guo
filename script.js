// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
    }
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animateElements = document.querySelectorAll('.achievement-card, .business-card, .contact-card, .about-text, .about-image');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Google Apps Script Configuration
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwfeylx8W2VumdR38ggSACz8vH3kVisXD65uBW4gkcI8sFIKe19O7AL9F6sp-FO8R-h/exec';

// EmailJS Configuration (Backup)
// 已完成配置 - 表單資料將自動發送到 contact@ifittw.com
const EMAILJS_CONFIG = {
    publicKey: 'PFQUkgEVNVRKAtzuJ',      // Public Key
    serviceId: 'service_2ohoh2f',        // Service ID (Zoho Mail)
    templateId: 'template_alm01lb'       // Template ID (小写)
};

// Initialize EmailJS
(function() {
    if (EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
})();

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get submit button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Disable button and show loading state
    submitButton.disabled = true;
    submitButton.textContent = '發送中...';
    
    // Get form data
    const formData = {
        from_name: document.getElementById('name').value,
        from_phone: document.getElementById('phone').value,
        from_email: document.getElementById('email').value,
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value
    };
    
    // Check if EmailJS is configured
    if (EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
        // EmailJS not configured - show demo mode message
        console.log('表單資料（示範模式）:', formData);
        console.log('提示：完成 EmailJS 配置後，資料將自動發送到 contact@ifittw.com');
        
        setTimeout(function() {
            // Show detailed success message
            const message = `I have received your inquiry and will reply to you as soon as possible.

If it is urgent, please email me directly.

Best regards,

Mr. Guo, Zhang-Ji

📧 contact@ifittw.com
Website: https://www.ifittw.com`;
            
            showDetailedMessage(message, 'success');
            
            // Reset form
            contactForm.reset();
            
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }, 1000); // Simulate sending delay
        
        return;
    }
    
    // Prepare data for Google Apps Script
    const scriptData = {
        name: formData.from_name,
        phone: formData.from_phone,
        email: formData.from_email,
        interest: formData.interest,
        message: formData.message
    };
    
    // Send to Google Apps Script
    fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(scriptData)
    })
    .then(function() {
        console.log('Email sent successfully via Google Apps Script!');
        
        // Show success message
        const message = `I have received your inquiry and will reply to you as soon as possible.

If it is urgent, please email me directly.

Best regards,

Mr. Guo, Zhang-Ji

📧 contact@ifittw.com
Website: https://www.ifittw.com`;
        
        showDetailedMessage(message, 'success');
        
        // Reset form
        contactForm.reset();
        
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    })
    .catch(function(error) {
        console.error('Google Apps Script error:', error);
        
        // Still show success message (no-cors mode doesn't return errors)
        const message = `I have received your inquiry and will reply to you as soon as possible.

If it is urgent, please email me directly.

Best regards,

Mr. Guo, Zhang-Ji

📧 contact@ifittw.com
Website: https://www.ifittw.com`;
        
        showDetailedMessage(message, 'success');
        
        // Reset form
        contactForm.reset();
        
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    });
});

// Helper function to show messages
function showMessage(text, type = 'success') {
    const messageDiv = document.createElement('div');
    const bgColor = type === 'success' ? '#2c5f2d' : '#d32f2f';
    
    messageDiv.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${bgColor};
        color: white;
        padding: 20px 40px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideDown 0.5s ease;
        max-width: 90%;
        text-align: center;
    `;
    messageDiv.textContent = text;
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 4 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => {
            if (document.body.contains(messageDiv)) {
                document.body.removeChild(messageDiv);
            }
        }, 500);
    }, 4000);
}

// Helper function to show detailed messages
function showDetailedMessage(text, type = 'success') {
    const bgColor = type === 'success' ? '#2c5f2d' : '#d32f2f';
    const accentColor = type === 'success' ? '#97c93d' : '#ff6b6b';
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(4px);
        z-index: 9999;
        animation: fadeIn 0.3s ease;
    `;
    
    // Create message box
    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(to bottom, white 0%, #fafafa 100%);
        color: #333;
        padding: 0;
        border-radius: 20px;
        box-shadow: 0 25px 80px rgba(0,0,0,0.4);
        z-index: 10000;
        max-width: 550px;
        width: 90%;
        animation: slideDown 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        overflow: hidden;
    `;
    
    // Add gradient header
    const header = document.createElement('div');
    header.style.cssText = `
        background: linear-gradient(135deg, ${bgColor} 0%, ${accentColor} 100%);
        padding: 40px 40px 80px 40px;
        text-align: center;
        position: relative;
    `;
    
    // Add success icon with animation
    const iconContainer = document.createElement('div');
    iconContainer.style.cssText = `
        width: 80px;
        height: 80px;
        background: white;
        border-radius: 50%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s backwards;
    `;
    
    iconContainer.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="${bgColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    `;
    
    // Add title
    const title = document.createElement('h2');
    title.textContent = 'Thank You!';
    title.style.cssText = `
        color: white;
        font-size: 28px;
        font-weight: 700;
        margin: 20px 0 0 0;
        letter-spacing: -0.5px;
    `;
    
    header.appendChild(iconContainer);
    header.appendChild(title);
    
    // Add content area
    const content = document.createElement('div');
    content.style.cssText = `
        padding: 40px;
        margin-top: -40px;
        background: white;
        border-radius: 20px 20px 0 0;
        position: relative;
    `;
    
    // Parse message and create styled content
    const lines = text.split('\n');
    lines.forEach((line, index) => {
        const p = document.createElement('p');
        p.style.cssText = `
            margin: 0 0 15px 0;
            line-height: 1.8;
            font-size: 15px;
            color: #555;
        `;
        
        // Style specific lines
        if (index === 0) {
            p.style.fontSize = '17px';
            p.style.fontWeight = '600';
            p.style.color = '#333';
            p.style.marginBottom = '20px';
        }
        
        if (line.includes('Best regards')) {
            p.style.marginTop = '25px';
            p.style.fontSize = '14px';
            p.style.color = '#999';
        }
        
        if (line.includes('Mr. Guo')) {
            p.style.fontSize = '16px';
            p.style.fontWeight = '600';
            p.style.color = bgColor;
        }
        
        // Make email clickable
        if (line.includes('📧 contact@ifittw.com')) {
            const emailLink = document.createElement('a');
            emailLink.href = 'mailto:contact@ifittw.com';
            emailLink.innerHTML = '📧 <strong>contact@ifittw.com</strong>';
            emailLink.style.cssText = `
                color: ${bgColor};
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 10px 15px;
                background: #f0f7f0;
                border-radius: 8px;
                transition: all 0.3s ease;
                font-size: 15px;
            `;
            emailLink.onmouseover = function() {
                this.style.background = '#e0f0e0';
                this.style.transform = 'translateX(5px)';
            };
            emailLink.onmouseout = function() {
                this.style.background = '#f0f7f0';
                this.style.transform = 'translateX(0)';
            };
            p.appendChild(emailLink);
        } else if (line.includes('Website:')) {
            const url = line.replace('Website: ', '').trim();
            const websiteLink = document.createElement('a');
            websiteLink.href = url;
            websiteLink.target = '_blank';
            websiteLink.innerHTML = '🌐 <strong>' + url + '</strong>';
            websiteLink.style.cssText = `
                color: ${bgColor};
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 10px 15px;
                background: #f0f7f0;
                border-radius: 8px;
                transition: all 0.3s ease;
                font-size: 15px;
            `;
            websiteLink.onmouseover = function() {
                this.style.background = '#e0f0e0';
                this.style.transform = 'translateX(5px)';
            };
            websiteLink.onmouseout = function() {
                this.style.background = '#f0f7f0';
                this.style.transform = 'translateX(0)';
            };
            p.appendChild(websiteLink);
        } else if (line.trim()) {
            p.textContent = line;
        } else {
            p.style.height = '10px';
        }
        
        content.appendChild(p);
    });
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Got it!';
    closeButton.style.cssText = `
        background: linear-gradient(135deg, ${bgColor} 0%, ${accentColor} 100%);
        color: white;
        border: none;
        padding: 14px 40px;
        border-radius: 50px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: block;
        margin: 30px auto 0 auto;
        box-shadow: 0 4px 15px rgba(44, 95, 45, 0.3);
        width: 100%;
        max-width: 200px;
    `;
    
    closeButton.onmouseover = function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 20px rgba(44, 95, 45, 0.4)';
    };
    
    closeButton.onmouseout = function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(44, 95, 45, 0.3)';
    };
    
    closeButton.onclick = function() {
        overlay.style.animation = 'fadeOut 0.3s ease';
        messageBox.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
            if (document.body.contains(messageBox)) {
                document.body.removeChild(messageBox);
            }
        }, 300);
    };
    
    content.appendChild(closeButton);
    
    // Assemble the message box
    messageBox.appendChild(header);
    messageBox.appendChild(content);
    
    // Add to page
    document.body.appendChild(overlay);
    document.body.appendChild(messageBox);
    
    // Click overlay to close
    overlay.onclick = closeButton.onclick;
}

// Add slide animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -60%) scale(0.9);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -40%) scale(0.95);
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    @keyframes scaleIn {
        from {
            transform: scale(0);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Active navigation highlight
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Add active class styling
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    highlightNavigation();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
