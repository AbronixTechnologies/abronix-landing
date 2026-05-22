try {
    if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS not loaded');
    }

    const params = {
        from_name: document.getElementById('cf_name').value.trim(),
        reply_to:  document.getElementById('cf_email').value.trim(),
        to_email:  document.getElementById('cf_email').value.trim(),
        phone:     document.getElementById('cf_phone').value.trim() || 'Not provided',
        service:   document.getElementById('cf_service').value,
        message:   document.getElementById('cf_msg').value.trim(),
        to_name:   'Abronix Technologies',
        subject:   'New Contact Inquiry'
    };

    // 1️⃣ Send admin email
    await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        params
    );

    // 2️⃣ Send auto reply
    await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_AUTOREPLY_TEMPLATE_ID,
        {
            ...params,
            subject: 'Thank You for Contacting Abronix Technologies'
        }
    );

    // Success UI
    msg.className = 'form-msg success';
    msg.innerHTML =
        '<i class="fas fa-check-circle me-2"></i>Message sent successfully! We\'ll get back to you within 24 hours.';

    form.reset();

    form.querySelectorAll('.is-valid')
        .forEach(f => f.classList.remove('is-valid'));

    document.getElementById('charCount').textContent = '0';

    btn.innerHTML = '<i class="fas fa-check me-2"></i>Sent!';
    btn.style.background = '#16a34a';

    setTimeout(() => {
        btn.innerHTML =
            '<i class="fas fa-paper-plane me-2"></i>Send Message';

        btn.style.background = '';
        btn.disabled = false;
        msg.className = 'form-msg';
    }, 5000);

} catch (err) {

    console.error('EmailJS FULL ERROR:', err);

    msg.className = 'form-msg error';

    msg.innerHTML =
        '<i class="fas fa-exclamation-circle me-2"></i>Failed to send. Please email us directly at <a href="mailto:abronixtechnologies@gmail.com" style="color:var(--gold)">abronixtechnologies@gmail.com</a>';

    btn.innerHTML =
        '<i class="fas fa-paper-plane me-2"></i>Send Message';

    btn.style.background = '';
    btn.disabled = false;
}
