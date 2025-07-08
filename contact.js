// Contact Page Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // In a real app, this would send the message to the server
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
        
        // Store contact in localStorage
        const contact = {
            name,
            email,
            subject,
            message,
            date: new Date().toISOString()
        };
        
        let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    });
    
    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Toggle active class on faq-item
            faqItem.classList.toggle('active');
            
            // Toggle icon
            if (faqItem.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
                answer.style.maxHeight = '0';
            }
            
            // Close other open items
            faqQuestions.forEach(q => {
                if (q !== question) {
                    const otherItem = q.parentElement;
                    const otherAnswer = q.nextElementSibling;
                    const otherIcon = q.querySelector('i');
                    
                    otherItem.classList.remove('active');
                    otherIcon.classList.remove('fa-chevron-up');
                    otherIcon.classList.add('fa-chevron-down');
                    otherAnswer.style.maxHeight = '0';
                }
            });
        });
    });
});