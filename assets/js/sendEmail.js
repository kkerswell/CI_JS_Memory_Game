const btn = document.getElementById('contact-btn');
btn.innerHTML = 'Send Message';

document.getElementById('contactForm')
    .addEventListener('submit', function (event) {
        event.preventDefault();

        btn.innerHTML = 'Sending...';

        const serviceID = 'service_h1fgdpq';
        const templateID = 'template_ms9blkp';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                btn.innerHTML = 'Message Sent!';
                btn.disabled = true
            }, (err) => {
                btn.innerHTML = 'Error';
                btn.disabled = true
            });
    });