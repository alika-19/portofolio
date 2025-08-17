const form = document.getElementById('contact-form');
const nameInput = form.name;
const emailInput = form.email;
const messageInput = form.message;
const successMsg = document.getElementById('success-message');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const messageError = document.getElementById('message-error');

function validateEmail(email) {
    // Simple and commonly used regex for basic email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Reset errors tiap kali submit
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    successMsg.textContent = '';

    let valid = true;

    if (nameInput.value.trim() === '') {
        nameError.textContent = 'Please enter your name.';
        valid = false;
    }

    if (!validateEmail(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address.';
        valid = false;
    }

    if (messageInput.value.trim() === '') {
        messageError.textContent = 'Please enter your message.';
        valid = false;
    }

    if (valid) {
        // Simulate sending message (no backend)
        successMsg.textContent = 'Thank you! Your message has been sent.';
        form.reset();
    }
});
