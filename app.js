// Firebase configuration and contact form submission
const firebaseConfig = {
  apiKey: "AIzaSyC8LaNW6PGrasUTJwJQlgRsNWJbTKbn1NM",
  authDomain: "omionix-techhub.firebaseapp.com",
  projectId: "omionix-techhub",
  storageBucket: "omionix-techhub.firebasestorage.app",
  messagingSenderId: "1050111036238",
  appId: "1:1050111036238:web:582f5534c662a912aaac1f",
  measurementId: "G-JBKF48YQLR"
};

// Initialize Firebase
if (typeof firebase === 'undefined') {
  const script = document.createElement('script');
  script.src = "https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js";
  script.onload = () => {
    const dbScript = document.createElement('script');
    dbScript.src = "https://www.gstatic.com/firebasejs/9.22.2/firebase-database-compat.js";
    dbScript.onload = initFirebaseContact;
    document.head.appendChild(dbScript);
  };
  document.head.appendChild(script);
} else {
  initFirebaseContact();
}

function initFirebaseContact() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const database = firebase.database();
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const phone = document.getElementById('contact-phone').value.trim();
      const message = document.getElementById('contact-message').value.trim();
      if (!name || !email || !phone || !message) {
        alert('Please fill in all fields.');
        return;
      }
      const requestRef = database.ref('request').push();
      requestRef.set({
        name,
        email,
        phone,
        message,
        timestamp: new Date().toISOString()
      }).then(() => {
        alert('Thank you! Your request has been submitted.');
        contactForm.reset();
      }).catch((error) => {
        alert('Error submitting your request. Please try again.');
        console.error(error);
      });
    });
  }
}
// Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

       let currentTestimonial = 0;
    const items = document.querySelectorAll('#testimonial-carousel .carousel-item');

    function changeTestimonial(direction) {
        items[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + direction + items.length) % items.length;
        items[currentTestimonial].classList.add('active');
    }

    // Rotate every 5 seconds
    setInterval(() => changeTestimonial(1), 15000);


        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenuButton.innerHTML = mobileMenu.classList.contains('hidden') ? 
                '<i class="fas fa-bars"></i>' : 
                '<i class="fas fa-times"></i>';
        });

        // Close mobile menu when clicking on links
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });

    
function openWhatsApp() {
      const phoneNumber = "7906577658"; // ✅ Replace with your number
      const message = encodeURIComponent("Hello Sir! I need some help.");
      const url = `https://wa.me/${7906577658}?text=${message}`;
      const popup = document.getElementById("welcomePopup");

      // Show popup
      popup.style.display = "block";

      // After 2 seconds, redirect to WhatsApp
      setTimeout(() => {
        popup.style.display = "none";

        // Detect if mobile
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        if (isMobile) {
          window.location.href = url; // Open in same tab (mobile)
        } else {
          window.open(url, "_blank"); // New tab (desktop)
        }
      }, 2000);
    }


//   chatbot

document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMinimize = document.getElementById('chatbotMinimize');
    const chatbotClose = document.getElementById('chatbotClose');

    // State
    let isChatbotOpen = false;
    let reopenTimeoutId = null;

    // Toggle chatbot visibility
    chatbotToggle.addEventListener('click', function () {
        isChatbotOpen = !isChatbotOpen;
        chatbotContainer.classList.toggle('open', isChatbotOpen);
        chatbotToggle.classList.toggle('active', isChatbotOpen);
        if (isChatbotOpen) {
            chatbotInput.focus();
        }
    });

    // Minimize chatbot
    chatbotMinimize.addEventListener('click', function () {
        chatbotContainer.classList.remove('open');
        chatbotToggle.classList.remove('active');
        isChatbotOpen = false;
    });

    // Close chatbot
    chatbotClose.addEventListener('click', function () {
        chatbotContainer.classList.remove('open');
        chatbotToggle.classList.remove('active');
        isChatbotOpen = false;

        // Show confirmation
        const confirmationMessage = createBotMessage("Chat closed. Click the chat icon to reopen.");
        chatbotMessages.appendChild(confirmationMessage);
        scrollToBottom();

        // Clear any previous timeout
        if (reopenTimeoutId) {
            clearTimeout(reopenTimeoutId);
        }

        // Reopen after 3 seconds
        chatbotClose.disabled = true;
        setTimeout(() => {
     chatbotClose.disabled = false;
        }, 3000);

    });

    // Send message on enter key
    chatbotInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && chatbotInput.value.trim() !== '') {
            sendMessage();
        }
    });

    // Send message on button click
    chatbotSend.addEventListener('click', function () {
        if (chatbotInput.value.trim() !== '') {
            sendMessage();
        }
    });

    // Function to send message
    function sendMessage() {
        const messageText = chatbotInput.value.trim();
        if (messageText === '') return;

        const userMessage = createUserMessage(messageText);
        chatbotMessages.appendChild(userMessage);
        scrollToBottom();

        chatbotInput.value = '';
        showTypingIndicator();

        setTimeout(() => {
            hideTypingIndicator();

            const botResponse = getBotResponse(messageText);
            const botMessage = createBotMessage(botResponse.text);

            if (botResponse.quickReplies) {
                const repliesContainer = document.createElement('div');
                repliesContainer.className = 'quick-replies';

                botResponse.quickReplies.forEach(reply => {
                    const button = document.createElement('button');
                    button.className = 'quick-reply';
                    button.textContent = reply;
                    button.setAttribute('data-reply', reply);
                    button.addEventListener('click', function () {
                        chatbotInput.value = reply;
                        sendMessage();
                    });
                    repliesContainer.appendChild(button);
                });

                botMessage.appendChild(repliesContainer);
            }

            chatbotMessages.appendChild(botMessage);
            scrollToBottom();
        }, 1500);
    }

    // Function to create user message
    function createUserMessage(text) {
        const message = document.createElement('div');
        message.className = 'message user-message';
        message.textContent = text;
        return message;
    }

    // Function to create bot message
    function createBotMessage(text) {
        const message = document.createElement('div');
        message.className = 'message bot-message';
        message.textContent = text;
        return message;
    }

    // Typing indicator
    function showTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatbotMessages.appendChild(typing);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const typing = chatbotMessages.querySelector('.typing-indicator');
        if (typing) typing.remove();
    }

    function scrollToBottom() {
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // Bot response logic
    function getBotResponse(userMessage) {
        const lowerMsg = userMessage.toLowerCase();
        let response = {};

        if (lowerMsg.includes('website status') || lowerMsg.includes('status')) {
            response.text = "To check your order status, please provide your order number.";
            response.quickReplies = ["Yes, look up my orders", "No thanks"];
        } else if (lowerMsg.includes('maintenance') || lowerMsg.includes('refund')) {
            response.text = "Our return policy allows returns within 30 days. Please tell me the reason.";
            response.quickReplies = ["Item damaged", "Wrong item", "Changed my mind", "Other"];
        } else if (lowerMsg.includes('account') || lowerMsg.includes('login')) {
            response.text = "Account help is available. What issue are you facing?";
            response.quickReplies = ["Can't login", "Forgot password", "Update details", "Close account"];
        } else if (lowerMsg.includes('payment') || lowerMsg.includes('card') || lowerMsg.includes('billing')) {
            response.text = "For payment issues, verify your billing info. Want to update your payment method?";
            response.quickReplies = ["Update payment", "Report fraud", "Payment not processed"];
        } else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            response.text = "Hello! How can I assist you today?";
            response.quickReplies = ["Website status", "Maintenance", "Account help", "Payment issues"];
        } else {
            response.text = `I understand you're asking about "${userMessage}". Want me to connect you to a human?`;
            response.quickReplies = ["Yes, connect me", "No, keep chatting", "Ask another question"];
        }

        return response;
    }

    // Removed auto-open on load (optional)
});
