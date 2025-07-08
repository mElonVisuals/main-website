document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessages = document.getElementById('form-messages');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default form submission

            // Clear previous messages
            formMessages.style.display = 'none';
            formMessages.classList.remove('success', 'error');
            clearErrorMessages();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            let isValid = true;

            // Simple client-side validation
            if (name === '') {
                displayError('name', 'Name is required.');
                isValid = false;
            }
            if (email === '') {
                displayError('email', 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(email)) {
                displayError('email', 'Please enter a valid email address.');
                isValid = false;
            }
            if (message === '') {
                displayError('message', 'Message is required.');
                isValid = false;
            }

            if (!isValid) {
                formMessages.textContent = 'Please correct the errors in the form.';
                formMessages.classList.add('error');
                formMessages.style.display = 'block';
                return;
            }

            // Prepare form data
            const formData = {
                name,
                email,
                subject,
                message
            };

            // Send data to backend (PHP or Node.js)
            try {
                // Replace '/api/contact.php' or '/api/contact' with your actual backend endpoint
                const response = await fetch('backend/contact.php', { // Or '/api/contact' for Node.js
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json' // Important for JSON responses
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok) {
                    formMessages.textContent = result.message || 'Your message has been sent successfully!';
                    formMessages.classList.add('success');
                    contactForm.reset(); // Clear the form
                } else {
                    formMessages.textContent = result.message || 'There was an error sending your message. Please try again.';
                    formMessages.classList.add('error');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                formMessages.textContent = 'An unexpected error occurred. Please try again later.';
                formMessages.classList.add('error');
            } finally {
                formMessages.style.display = 'block';
            }
        });
    }

    function displayError(field, message) {
        const errorElement = document.getElementById(`${field}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearErrorMessages() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
    }

    function isValidEmail(email) {
        // Basic email regex
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});