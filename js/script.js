// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');

// Check for saved theme preference
let currentTheme = localStorage.getItem('theme') || 'light';
updateTheme(currentTheme);

themeToggle.addEventListener('click', () => {
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  currentTheme = newTheme;
  localStorage.setItem('theme', newTheme);
  updateTheme(newTheme);
});

function updateTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = themeToggle.querySelector('i');
  if (theme === 'dark') {
    icon.className = 'fas fa-sun';
  } else {
    icon.className = 'fas fa-moon';
  }
}

// Add animation for section cards when scrolling
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Image placeholder click functionality
function setupImagePlaceholders() {
  const placeholders = document.querySelectorAll('.image-placeholder');
  
  placeholders.forEach(placeholder => {
    placeholder.addEventListener('click', function() {
      const imgText = this.querySelector('span').textContent;
      alert(`You would upload an image for: ${imgText}\n\nIn the actual implementation, this would open a file upload dialog.`);
    });
  });
}

// Initialize animations and functionality
document.addEventListener('DOMContentLoaded', () => {
  // Add initial styles for animation
  document.querySelectorAll('.section-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });
  
  // Animate profile image
  const profileImage = document.querySelector('.profile-image-container');
  profileImage.style.opacity = '0';
  profileImage.style.transform = 'scale(0.8)';
  profileImage.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  
  setTimeout(() => {
    profileImage.style.opacity = '1';
    profileImage.style.transform = 'scale(1)';
  }, 300);
  
  // Setup image placeholders
  setupImagePlaceholders();
  
  // Add click animation to skill tags
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function() {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
});
