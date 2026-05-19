// ════════════════════════════════
// EmailJS Configuration
// Replace YOUR_PUBLIC_KEY with your actual EmailJS Public Key
// Replace YOUR_SERVICE_ID with your EmailJS Service ID  
// Replace YOUR_TEMPLATE_ID with your EmailJS Template ID
// ════════════════════════════════
const EMAILJS_PUBLIC_KEY   = 'wd23Wm0SY7vVVO8-c';   // ← Change this
const EMAILJS_SERVICE_ID   = 'service_ja4v7bm';   // ← Change this
const EMAILJS_TEMPLATE_ID  = 'template_nbpowsm';  // ← Change this

// Init EmailJS
(function(){
    if(typeof emailjs !== 'undefined') emailjs.init(EMAILJS_PUBLIC_KEY);
})();

// ── Form validation + EmailJS send
const form = document.getElementById('contactForm');
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    e.stopPropagation();

    // Custom validation
    let valid = true;
  const fields = form.querySelectorAll('[required]');
    fields.forEach(f => {
        f.classList.remove('is-invalid', 'is-valid');
    let ok = true;
    if(f.type === 'checkbox'){ ok = f.checked; }
    else if(f.type === 'email'){ ok = f.value.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()); }
    else if(f.tagName === 'SELECT'){ ok = f.value !== '' && f.value !== null; }
    else{ ok = f.value.trim().length >= (parseInt(f.getAttribute('minlength')) || 1); }

    if(!ok){
        valid = false;
        if(f.type === 'checkbox'){
            document.getElementById('agreeError').style.display = 'block';
        } else {
            f.classList.add('is-invalid');
        }
    } else {
        if(f.type === 'checkbox'){
            document.getElementById('agreeError').style.display = 'none';
        } else {
            f.classList.add('is-valid');
        }
    }
});

// Phone validation (optional field)
  const phone = document.getElementById('cf_phone');
if(phone.value.trim() !== ''){
  const ph = phone.value.trim();
    if(!/^[+\d\s\-()]{7,20}$/.test(ph)){
        phone.classList.add('is-invalid'); valid = false;
    } else{
        phone.classList.add('is-valid');
    }
}

if(!valid) return;

  const btn = document.getElementById('submitBtn');
  const msg = document.getElementById('formMsg');
btn.disabled = true;
btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending…';
msg.className = 'form-msg'; msg.textContent = '';

// EmailJS send
try {
    if(typeof emailjs === 'undefined') throw new Error('EmailJS not loaded');

  const params = {
      from_name: document.getElementById('cf_name').value.trim(),
      reply_to:  document.getElementById('cf_email').value.trim(),
      phone:     document.getElementById('cf_phone').value.trim() || 'Not provided',
      service:   document.getElementById('cf_service').value,
      message:   document.getElementById('cf_msg').value.trim(),
      to_name:   'Abronix Technologies',
      subject: "New Contact Inquiry"  // 👈 ADD THIS
  };

    // 1. Send admin email
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);

    // 2. Call auto-reply file
    if (typeof sendAutoReply === 'function') {
        sendAutoReply(params);
    }
  
    msg.className = 'form-msg success';
    msg.innerHTML = '<i class="fas fa-check-circle me-2"></i>Message sent successfully! We\'ll get back to you within 24 hours.';
    form.reset();
    form.querySelectorAll('.is-valid').forEach(f => f.classList.remove('is-valid'));
    document.getElementById('charCount').textContent = '0';
    btn.innerHTML = '<i class="fas fa-check me-2"></i>Sent!';
    btn.style.background = '#16a34a';
    setTimeout(() => { btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message'; btn.style.background = ''; btn.disabled = false; msg.className = 'form-msg'; }, 5000);

} catch(err) {
    console.error('EmailJS FULL ERROR:', JSON.stringify(err, null, 2));
    alert(JSON.stringify(err, null, 2));
    msg.className = 'form-msg error';
    msg.innerHTML = '<i class="fas fa-exclamation-circle me-2"></i>Failed to send. Please email us directly at <a href="mailto:abronixtechnologies@gmail.com" style="color:var(--gold)">abronixtechnologies@gmail.com</a>';
    btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Send Message';
    btn.style.background = '';
    btn.disabled = false;
}




});