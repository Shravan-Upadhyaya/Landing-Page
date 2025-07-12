// Tab switching for About section
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.getAttribute('data-tab');
    tabContents.forEach(content => {
      content.classList.toggle('active', content.id === target);
    });
  });
});

// Testimonial slider
const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.slider-btn.prev');
const nextBtn = document.querySelector('.slider-btn.next');
let currentTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    showTestimonial(currentTestimonial);
  });
  nextBtn.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  });
}

// Optional: Auto-advance testimonials every 8 seconds
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 8000); 


// Chatbox logic
const chatbox = document.getElementById('chatbox');
const chatboxToggle = document.getElementById('chatboxToggle');
const chatboxClose = document.getElementById('chatboxClose');
const chatboxForm = document.getElementById('chatboxForm');
const chatboxInput = document.getElementById('chatboxInput');
const chatboxMessages = document.getElementById('chatboxMessages');

// Open chatbox
chatboxToggle.addEventListener('click', () => {
  chatbox.classList.add('open');
  chatboxToggle.style.display = 'none';
  chatboxInput.focus();
});
// Close chatbox
chatboxClose.addEventListener('click', () => {
  chatbox.classList.remove('open');
  chatboxToggle.style.display = 'flex';
});

// Send message
chatboxForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const userMsg = chatboxInput.value.trim();
  if (!userMsg) return;
  addChatMessage('user', userMsg);
  chatboxInput.value = '';
  setTimeout(() => {
    addChatMessage('bot', 'Thank you for contacting us we will reach out to you through mail');
    // Simulate sending email via mailto
    sendMail(userMsg);
  }, 600);
});

function addChatMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = 'chatbox-message ' + sender;
  const bubble = document.createElement('div');
  bubble.className = 'chatbox-bubble';
  bubble.textContent = text;
  msgDiv.appendChild(bubble);
  chatboxMessages.appendChild(msgDiv);
  chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
}

function sendMail(userMsg) {
  // Change this to your desired email address
  const email = 'your@email.com';
  const subject = encodeURIComponent('Nutri Tech Website Chat Query');
  const body = encodeURIComponent('User query: ' + userMsg);
  // Open mailto link (no backend)
  window.open(`mailto:${email}?subject=${subject}&body=${body}`);
} 


document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); 

        const targetId = this.getAttribute('href'); 
        const targetPosition = document.querySelector(targetId).offsetTop;
        const startPosition = window.scrollY; 
        const distance = targetPosition - startPosition; 
        const duration = 400;
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp; 
            const progress = timestamp - start;
            const progressRatio = Math.min(progress / duration, 1);
            const easeInOutQuad = progressRatio < 0.5
                ? 2 * progressRatio * progressRatio
                : 1 - Math.pow(-2 * progressRatio + 2, 2) / 2;
            window.scrollTo(0, startPosition + distance * easeInOutQuad); 

            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    });
});

const scrolltopBtn = document.getElementById('scrolltop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    scrolltopBtn.classList.add('show');
  } else {
    scrolltopBtn.classList.remove('show');
  }
});
scrolltopBtn.addEventListener('click', function (e) {
        e.preventDefault(); 

        const targetPosition = 0;
        const startPosition = window.scrollY; 
        const distance = targetPosition - startPosition; 
        const duration = 400;
        let start = null;

        function step(timestamp) {
            if (!start) start = timestamp; 
            const progress = timestamp - start;
            const progressRatio = Math.min(progress / duration, 1);
            const easeInOutQuad = progressRatio < 0.5
                ? 2 * progressRatio * progressRatio
                : 1 - Math.pow(-2 * progressRatio + 2, 2) / 2;
            window.scrollTo(0, startPosition + distance * easeInOutQuad); 

            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        }

        window.requestAnimationFrame(step);
    });


// Fade-in/out sections on scroll
const fadeSections = document.querySelectorAll('.section-fade');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.15
});

fadeSections.forEach(section => fadeObserver.observe(section)); 

const fadeSectionsfast = document.querySelectorAll('.section-fade-fast');
const fadeObserverfast = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.1
});

fadeSectionsfast.forEach(section => fadeObserverfast.observe(section)); 

function toggleMobileMenu(menu) {
  menu.classList.toggle('open');
}
