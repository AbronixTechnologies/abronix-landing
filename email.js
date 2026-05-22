// ════════════════════════════════
// EmailJS Configuration
// ════════════════════════════════

const EMAILJS_PUBLIC_KEY  = 'wd23Wm0SY7vVVO8-c';
const EMAILJS_SERVICE_ID  = 'service_ja4v7bm';
const EMAILJS_TEMPLATE_ID = 'template_nbpowsm';
const EMAILJS_AUTOREPLY_TEMPLATE_ID = 'template_ept7ot2';

// Init EmailJS
(function () {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }
})();

// ════════════════════════════════
// Contact Form
// ════════════════════════════════

const form = document.getElementById('contactForm');

form.addEventListener('submit', async function (e) {

    e.preventDefault();
    e.stopPropagation();

    let valid = true;

    const fields = form.querySelectorAll('[required]');

    // Reset validation
    fields.forEach(f => {
        f.classList.remove('is-invalid', 'is-valid');
    });

    // Validate required fields
    fields.forEach(f => {

        let ok = true;

        if (f.type === 'checkbox') {

            ok = f.checked;

        } else if (f.type === 'email') {

            ok =
                f.value.trim() !== '' &&
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim());

        } else if (f.tagName === 'SELECT') {

            ok = f.value !== '';

        } else {

            ok =
                f.value.trim().length >=
                (parseInt(f.getAttribute('minlength')) || 1);
        }

        if (!ok) {

            valid = false;

            if (f.type === 'checkbox') {

                document.getElementById('agreeError').style.display = 'block';

            } else {

                f.classList.add('is-invalid');
            }

        } else {

            if (f.type === 'checkbox') {

                document.getElementById('agreeError').style.display = 'none';

            } else {

                f.classList.add('is-valid');
            }
        }
    });

    // Optional phone validation
    const phone = document.getElementById('cf_phone');

    if (phone.value.trim() !== '') {

        const ph = phone.value.trim();

        if (!/^[+\d\s\-()]{7,20}$/.test(ph)) {

            phone.classList.add('is-invalid');
            valid = false;

        } else {

            phone.classList.add('is-valid');
        }
    }

    if (!valid) return;

    // UI Elements
    const btn = document.getElementById('submitBtn');
    const msg = document.getElementById('formMsg');

    btn.disabled = true;

    btn.innerHTML =
        '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';

    msg.className = 'form-msg';
    msg.textContent = '';

    // Form Data
    const params = {

        from_name:
            document.getElementById('cf_name').value.trim(),

        reply_to:
            document.getElementById('cf_email').value.trim(),

        to_email:
            document.getElementById('cf_email').value.trim(),

        phone:
            document.getElementById('cf_phone').value.trim() ||
            'Not provided',

        service:
            document.getElementById('cf_service').value,

        message:
            document.getElementById('cf_msg').value.trim(),

        to_name:
            'Abronix Technologies',

        subject:
            'New Contact Inquiry'
    };

    try {

        // ════════════════════════════════
        // 1. Send Admin Email
        // ════════════════════════════════

        await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            params
        );

        // ════════════════════════════════
        // 2. Send Auto Reply
        // (Doesn't break main flow if failed)
        // ════════════════════════════════

        emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_AUTOREPLY_TEMPLATE_ID,
            {
                ...params,
                subject:
                    'Thank You for Contacting Abronix Technologies'
            }
        )
        .then(() => {

            console.log('Auto-reply sent successfully');

        })
        .catch(err => {

            console.error('Auto-reply failed:', err);
        });

        // ════════════════════════════════
        // Success UI
        // ════════════════════════════════

        msg.className = 'form-msg success';

        msg.innerHTML =
            '<i class="fas fa-check-circle me-2"></i>' +
            'Message sent successfully! ' +
            'We\'ll get back to you within 24 hours.';

        form.reset();

        form.querySelectorAll('.is-valid')
            .forEach(f => f.classList.remove('is-valid'));

        document.getElementById('charCount').textContent = '0';

        btn.innerHTML =
            '<i class="fas fa-check me-2"></i>Sent!';

        btn.style.background = '#16a34a';

        setTimeout(() => {

            btn.innerHTML =
                '<i class="fas fa-paper-plane me-2"></i>Send Message';

            btn.style.background = '';

            btn.disabled = false;

            msg.className = 'form-msg';

        }, 5000);

    } catch (err) {

        // ════════════════════════════════
        // Error Handling
        // ════════════════════════════════

        console.error('EmailJS ERROR:', err);
        console.error('Status:', err?.status);
        console.error('Message:', err?.text);

        msg.className = 'form-msg error';

        msg.innerHTML =
            '<i class="fas fa-exclamation-circle me-2"></i>' +
            'Failed to send. Please email us directly at ' +
            '<a href="mailto:abronixtechnologies@gmail.com" ' +
            'style="color:var(--gold)">' +
            'abronixtechnologies@gmail.com' +
            '</a>';

        btn.innerHTML =
            '<i class="fas fa-paper-plane me-2"></i>Send Message';

        btn.style.background = '';

        btn.disabled = false;
    }
});
