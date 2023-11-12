const btn = document.getElementById('submit');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Change the button text while sending
    btn.value = '....جاري الارسال';

    // Replace these values with your actual Email.js service and template IDs
    const serviceID = 'default_service';
    const templateID = 'template_y3tiw7a';

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
