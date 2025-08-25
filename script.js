// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('section, .timeline-item, .project');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
}

// Create floating particles
function createParticles() {
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        document.body.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 5000);
    }
}

// Smooth scrolling for email link
function smoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add typing effect to name
function typeWriter() {
    const nameElement = document.querySelector('header h1');
    const text = nameElement.textContent;
    nameElement.textContent = '';
    
    let i = 0;
    const timer = setInterval(() => {
        nameElement.textContent += text.charAt(i);
        i++;
        if (i > text.length - 1) {
            clearInterval(timer);
        }
    }, 100);
}

// Add hover effects to timeline and project items
function addHoverEffects() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projects = document.querySelectorAll('.project');
    
    [...timelineItems, ...projects].forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add click effect to project
function addClickEffects() {
    const projects = document.querySelectorAll('.project');
    
    projects.forEach(project => {
        project.addEventListener('click', function() {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Delay typing effect
    setTimeout(typeWriter, 1000);
    
    // Initialize other effects
    smoothScroll();
    addHoverEffects();
    addClickEffects();
    
    // Create particles periodically
    createParticles();
    setInterval(createParticles, 4000);
    
    // Add scroll listener
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check for visible elements
    animateOnScroll();
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
