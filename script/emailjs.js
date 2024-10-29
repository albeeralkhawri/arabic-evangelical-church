const btn = document.getElementById('submit');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

// Function to sanitize input values
function sanitizeInput(value) {
    const div = document.createElement('div');
    div.innerText = value;
    return div.innerHTML; // Return encoded HTML to prevent XSS
}

// Function to validate name (only letters)
function validateName(name) {
    const nameRegex = /^[A-Za-z\u0600-\u06FF\s]+$/; // Allow letters and spaces (supports Arabic and Latin)
    return nameRegex.test(name);
}

// Function to validate phone number (only digits)
function validatePhone(phone) {
    const phoneRegex = /^[0-9]+$/; // Allow only digits
    return phoneRegex.test(phone);
}

// Function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
    return emailRegex.test(email);
}

// Function to validate message (only text)
function validateMessage(message) {
    const messageRegex = /^[\s\S]*$/; // Allow all text (you can customize this)
    return messageRegex.test(message);
}

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get input values
    const nameValue = document.getElementById('name').value;
    const emailValue = document.getElementById('email').value;
    const telValue = document.getElementById('tel').value;
    const textValue = document.getElementById('text').value;

    // Validate inputs
    if (!validateName(nameValue)) {
        errorMessage.innerText = 'الاسم يجب أن يحتوي على حروف فقط.';
        return;
    }
    if (!validateEmail(emailValue)) {
        errorMessage.innerText = 'يرجى إدخال بريد إلكتروني صحيح.';
        return;
    }
    if (!validatePhone(telValue)) {
        errorMessage.innerText = 'رقم الهاتف يجب أن يحتوي على أرقام فقط.';
        return;
    }
    if (!validateMessage(textValue)) {
        errorMessage.innerText = 'الرسالة يجب أن تحتوي على نصوص فقط.';
        return;
    }

    // Change the button text while sending
    btn.value = '....جاري الارسال';

    // Replace these values with your actual Email.js service and template IDs
    const serviceID = 'default_service';
    const templateID = 'template_y3tiw7a';

    // Sanitize inputs before sending
    document.getElementById('name').value = sanitizeInput(nameValue);
    document.getElementById('email').value = sanitizeInput(emailValue);
    document.getElementById('tel').value = sanitizeInput(telValue);
    document.getElementById('text').value = sanitizeInput(textValue);

    // Use emailjs.sendForm to send the form data
    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            // To clear the form after successful submission
            const inputs = document.querySelectorAll('#name, #email, #tel, #text');
            inputs.forEach(input => {
                input.value = '';
            });

            // Show success message
            successMessage.innerText = 'تم إرسال الرسالة بنجاح';

            // Hide the success message after a few seconds (adjust the timeout as needed)
            setTimeout(() => {
                successMessage.innerText = '';
            }, 5000);

            // Restore the button text
            btn.value = 'ارسال';
        }, (err) => {
            // Handle errors
            errorMessage.innerText = 'لم يتم الارسال، يرجى المحاولة مرة أخرى';
            console.error(JSON.stringify(err));

            // Hide the error message after a few seconds (adjust the timeout as needed)
            setTimeout(() => {
                errorMessage.innerText = '';
            }, 5000);

            // Restore the button text
            btn.value = 'ارسال';
        });
});
