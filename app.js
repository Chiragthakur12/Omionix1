// Navbar Scroll Effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Testimonial Carousel
        let currentTestimonial = 0;
        const testimonials = [
            {
                quote: "Omionix turned our vision into a masterpiece! Their team delivered beyond our expectations with a website that not only looks incredible but has significantly increased our conversion rates.",
                name: "Sarah Johnson",
                role: "CEO, TechSolutions Inc."
            },
            {
                quote: "Working with Omionix was a game-changer for our online presence. Their innovative approach to 3D elements made our brand stand out in a crowded market.",
                name: "Michael Chen",
                role: "Marketing Director, Global Corp"
            },
            {
                quote: "The attention to detail and user experience design from Omionix resulted in a 40% increase in our e-commerce sales within the first month of launch.",
                name: "Emily Rodriguez",
                role: "E-commerce Manager, TrendStyle"
            }
        ];

        function changeTestimonial(direction) {
            const items = document.querySelectorAll('.carousel-item');
            items.forEach(item => item.classList.remove('active'));
            
            currentTestimonial += direction;
            
            if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            } else if (currentTestimonial < 0) {
                currentTestimonial = testimonials.length - 1;
            }
            
            // In a real implementation, you would update the testimonial content here
            // For the wireframe, we'll just toggle the active class
            items[currentTestimonial].classList.add('active');
        }

        // Auto-rotate testimonials
        setInterval(() => changeTestimonial(1), 5000);

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

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
    const phoneNumber = "919999999999"; // Replace with your number
    const message = encodeURIComponent("Hello Sir! I need some help.");
    const url = `https://wa.me/${7906577658}?text=${message}`;
    
    // Show the welcome popup
    const popup = document.getElementById('welcomePopup');
    popup.style.display = 'block';

    // Wait 2 seconds then redirect
    setTimeout(() => {
      window.open(url, '_blank');
      popup.style.display = 'none';
    }, 2000);
  }

//   chatbot

document.addEventListener('DOMContentLoaded', function() {
            // Elements
            const chatbotToggle = document.getElementById('chatbotToggle');
            const chatbotContainer = document.getElementById('chatbotContainer');
            const chatbotMessages = document.getElementById('chatbotMessages');
            const chatbotInput = document.getElementById('chatbotInput');
            const chatbotSend = document.getElementById('chatbotSend');
            const chatbotMinimize = document.getElementById('chatbotMinimize');
            const chatbotClose = document.getElementById('chatbotClose');
            const quickReplies = document.querySelectorAll('.quick-reply');
            
            // State
            let isChatbotOpen = false;
            
            // Toggle chatbot visibility
            chatbotToggle.addEventListener('click', function() {
                isChatbotOpen = !isChatbotOpen;
                chatbotContainer.classList.toggle('open', isChatbotOpen);
                chatbotToggle.classList.toggle('active', isChatbotOpen);
                if (isChatbotOpen) {
                    chatbotInput.focus();
                }
            });
             // Minimize chatbot
            chatbotMinimize.addEventListener('click', function() {
                chatbotContainer.classList.remove('open');
                chatbotToggle.classList.remove('active');
                isChatbotOpen = false;
            });
            
            // Close chatbot
            chatbotClose.addEventListener('click', function() {
                chatbotContainer.classList.remove('open');
                chatbotToggle.classList.remove('active');
                isChatbotOpen = false;
                
                // Show confirmation
                const confirmationMessage = createBotMessage("Chat closed. Click the chat icon to reopen.");
                chatbotMessages.appendChild(confirmationMessage);
                scrollToBottom();

                 // If container was open, reopen after 3 seconds
                setTimeout(() => {
                    chatbotContainer.classList.add('open');
                    chatbotToggle.classList.add('active');
                    isChatbotOpen = true;
                }, 3000);
            });
            
            // Send message on enter key
            chatbotInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && chatbotInput.value.trim() !== '') {
                    sendMessage();
                }
            });
            
            // Send message on button click
            chatbotSend.addEventListener('click', function() {
                if (chatbotInput.value.trim() !== '') {
                    sendMessage();
                }
            });
             // Quick reply buttons
            quickReplies.forEach(button => {
                button.addEventListener('click', function() {
                    chatbotInput.value = this.getAttribute('data-reply');
                    sendMessage();
                });
            });
            
            // Function to send message
            function sendMessage() {
                const messageText = chatbotInput.value.trim();
                if (messageText === '') return;
                
                // Add user message
                const userMessage = createUserMessage(messageText);
                chatbotMessages.appendChild(userMessage);
                scrollToBottom();
                // Clear input
                chatbotInput.value = '';
                
                // Show typing indicator
                showTypingIndicator();
                
                // Simulate bot response after delay
                setTimeout(() => {
                    // Remove typing indicator
                    hideTypingIndicator();
                    
                    // Add bot response
                    const botResponse = getBotResponse(messageText);
                    const botMessage = createBotMessage(botResponse.text);
                     // Add quick replies if available
                    if (botResponse.quickReplies) {
                        const repliesContainer = document.createElement('div');
                        repliesContainer.className = 'quick-replies';
                        
                        botResponse.quickReplies.forEach(reply => {
                            const button = document.createElement('button');
                            button.className = 'quick-reply';
                            button.textContent = reply;
                            button.setAttribute('data-reply', reply);
                            button.addEventListener('click', function() {
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
            
            // Function to create user message element
            function createUserMessage(text) {
                const message = document.createElement('div');
                message.className = 'message user-message';
                message.textContent = text;
                return message;
            }
            
            // Function to create bot message element
            function createBotMessage(text) {
                const message = document.createElement('div');
                message.className = 'message bot-message';
                message.textContent = text;
                return message;
            }
            // Function to show typing indicator
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
            
            // Function to hide typing indicator
            function hideTypingIndicator() {
                const typing = chatbotMessages.querySelector('.typing-indicator');
                if (typing) {
                    typing.remove();
                }
            }
             // Function to scroll messages to bottom
            function scrollToBottom() {
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }
            
            // Function to generate bot responses
            function getBotResponse(userMessage) {
                const lowerMsg = userMessage.toLowerCase();
                
                let response = {};
                
                // Response mapping
                if (lowerMsg.includes('Website status') || lowerMsg.includes('status')) {
                    response.text = "To check your order status, please provide your order number. Would you like me to look up recent orders linked to your account?";
                    response.quickReplies = ["Yes, look up my orders", "No thanks"];
                } 
                else if (lowerMsg.includes('Maintenance') || lowerMsg.includes('refund')) {
                    response.text = "Our return policy allows returns within 30 days of purchase. Please tell me why you'd like to make a return so I can guide you through the correct process.";
                    response.quickReplies = ["Item damaged", "Wrong item", "Changed my mind", "Other"];
                }
                else if (lowerMsg.includes('account') || lowerMsg.includes('login')) {
                    response.text = "Account help is available. What specific issue are you encountering?";
                    response.quickReplies = ["Can't login", "Forgot password", "Update details", "Close account"];
                }
                else if (lowerMsg.includes('payment') || lowerMsg.includes('card') || lowerMsg.includes('billing')) {
                    response.text = "For payment issues, please verify that your billing information matches exactly with what your bank has on file. Would you like to update your payment method?";
                    response.quickReplies = ["Update payment", "Report fraud", "Payment not processed"];
                }
                else if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
                    response.text = "Hello! How can I assist you today?";
                    response.quickReplies = ["Website status", "Maintenance", "Account help", "Payment issues"];
                }
                else {
                    response.text = "I understand you're asking about '" + userMessage + "'. For more detailed assistance, I can connect you to a human representative. Would you like me to do that?";
                    response.quickReplies = ["Yes, connect me", "No, keep chatting", "Ask another question"];
                }
                
                return response;
            }
             // Auto-open chatbot after page load
            // setTimeout(() => {
            //     chatbotContainer.classList.add('open');
            //     chatbotToggle.classList.add('active');
            //     isChatbotOpen = true;
            // }, );
        });