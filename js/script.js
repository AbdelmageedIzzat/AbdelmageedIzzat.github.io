// Language toggle functionality
const languageToggle = document.getElementById('languageToggle');
const themeToggle = document.createElement('div');
themeToggle.className = 'theme-toggle';
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeToggle);

// Check for saved language preference or default to English
let currentLanguage = localStorage.getItem('language') || 'en';
document.documentElement.lang = currentLanguage;
updateLanguage(currentLanguage);

// Check for saved theme preference
let currentTheme = localStorage.getItem('theme') || 'light';
updateTheme(currentTheme);

languageToggle.addEventListener('click', () => {
  const newLanguage = currentLanguage === 'en' ? 'ar' : 'en';
  currentLanguage = newLanguage;
  document.documentElement.lang = newLanguage;
  localStorage.setItem('language', newLanguage);
  updateLanguage(newLanguage);
});

themeToggle.addEventListener('click', () => {
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  currentTheme = newTheme;
  localStorage.setItem('theme', newTheme);
  updateTheme(newTheme);
});

function updateLanguage(language) {
  // Update all elements with data attributes
  const elements = document.querySelectorAll('[data-en], [data-ar]');
  elements.forEach(element => {
    if (element.hasAttribute(`data-${language}`)) {
      const text = element.getAttribute(`data-${language}`);
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = text;
      } else if (element.tagName === 'A' || element.tagName === 'BUTTON' || element.tagName === 'SPAN') {
        element.textContent = text;
      } else {
        element.innerHTML = text;
      }
    }
  });
  
  // Update direction for Arabic
  if (language === 'ar') {
    document.body.style.direction = 'rtl';
    document.body.style.textAlign = 'right';
    // Adjust padding for RTL
    document.querySelectorAll('ul li').forEach(li => {
      li.style.paddingLeft = '0';
      li.style.paddingRight = '1.5rem';
    });
    document.querySelectorAll('ul li::before').forEach(li => {
      li.style.left = 'auto';
      li.style.right = '0';
    });
  } else {
    document.body.style.direction = 'ltr';
    document.body.style.textAlign = 'left';
    // Reset padding for LTR
    document.querySelectorAll('ul li').forEach(li => {
      li.style.paddingLeft = '1.5rem';
      li.style.paddingRight = '0';
    });
  }
}

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

// Initialize animations
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
});
