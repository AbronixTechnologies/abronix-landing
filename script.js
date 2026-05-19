// ── Navbar scroll
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
});

// ── Scroll-to-top button
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('show', window.scrollY > 400);
});

// ── Close mobile nav on link click
document.querySelectorAll('#navMenu .nav-link').forEach(l => {
    l.addEventListener('click', () => {
        const c = document.getElementById('navMenu');
if(c.classList.contains('show')) bootstrap.Collapse.getInstance(c)?.hide();
});
});

// ── Scroll reveal
const rvs = document.querySelectorAll('.reveal');
const rvo = new IntersectionObserver((es) => {
    es.forEach((e, i) => {
        if(e.isIntersecting){ setTimeout(() => e.target.classList.add('in'), i * 90); rvo.unobserve(e.target); }
});
}, {threshold: .1});
rvs.forEach(el => rvo.observe(el));

// ── Counter animation
const cnts = document.querySelectorAll('[data-target]');
const cno = new IntersectionObserver((es) => {
    es.forEach(e => {
        if(e.isIntersecting){
        const el = e.target, t = +el.dataset.target;
let c = 0, s = t / 60;
      const ti = setInterval(() => { c = Math.min(c + s, t); el.textContent = Math.round(c) + '+'; if(c >= t) clearInterval(ti); }, 22);
cno.unobserve(el);
}
});
}, {threshold: .5});
cnts.forEach(el => cno.observe(el));

// ── Portfolio: inject images from data-img attribute
document.querySelectorAll('.pf-item').forEach(item => {
    const src = item.getAttribute('data-img');
if(src && src.trim() !== ''){
  const img = document.createElement('img');
    img.src = src;
    img.alt = item.querySelector('span') ? item.querySelector('span').textContent : 'Portfolio item';
    img.className = 'pf-img';
    item.insertBefore(img, item.firstChild);
    item.classList.add('has-img');
}
});

// ── Portfolio filter
function filterPF(cat, btn) {
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.pf-item').forEach(item => {
        item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
});
}

// ── Portfolio modal
const icons = {web:'🌐', logo:'🎨', print:'📄', video:'🎬', google:'🔍', social:'📱'};
const labels = {web:'Web Design & Dev', logo:'Logo & Brand Identity', print:'Print Design', video:'Video Editing', google:'Google Business Profile', social:'Social Media Setup'};

function showModal(cat, title, desc, imgSrc) {
    document.getElementById('mTitle').textContent = title;
    document.getElementById('mDesc').textContent = desc;
    document.getElementById('mTag').textContent = labels[cat] || cat;
  const prev = document.getElementById('mPreview');
    if(imgSrc && imgSrc.trim() !== ''){
        prev.innerHTML = '<img src="' + imgSrc + '" alt="' + title + '">';
    } else {
        prev.innerHTML = '<span id="mIcon">' + (icons[cat] || '🎨') + '</span>';
    }
    new bootstrap.Modal(document.getElementById('pfModal')).show();
}


// ── Testimonials scroll
const testiWrap = document.getElementById('testiScroll');
const CARD_W = 340 + 22; // card width + gap
let testiIndex = 0;
const totalCards = document.querySelectorAll('.testi-card').length;

// Build dots
const dotsWrap = document.getElementById('testiDots');
for(let i = 0; i < totalCards; i++){
  const d = document.createElement('span');
  d.className = 'testi-dot' + (i === 0 ? ' active' : '');
  d.onclick = () => goTesti(i);
  dotsWrap.appendChild(d);
}

function updateDots(){
  document.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === testiIndex));
}

function goTesti(idx){
  testiIndex = Math.max(0, Math.min(idx, totalCards - 1));
  testiWrap.scrollTo({left: testiIndex * CARD_W, behavior: 'smooth'});
  updateDots();
}

    function scrollTesti(dir){
        testiIndex = Math.max(0, Math.min(testiIndex + dir, totalCards - 1));
        testiWrap.scrollTo({left: testiIndex * CARD_W, behavior: 'smooth'});
        updateDots();
    }

// Sync dots on manual scroll
testiWrap.addEventListener('scroll', () => {
    const idx = Math.round(testiWrap.scrollLeft / CARD_W);
if(idx !== testiIndex){ testiIndex = idx; updateDots(); }
});

// Auto-scroll testimonials every 4s
let autoScroll = setInterval(() => scrollTesti(testiIndex < totalCards - 1 ? 1 : -(totalCards - 1)), 4000);
testiWrap.addEventListener('mouseenter', () => clearInterval(autoScroll));
testiWrap.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => scrollTesti(testiIndex < totalCards - 1 ? 1 : -(totalCards - 1)), 4000);
});

// ── Char count
function updateChar(el) {
    document.getElementById('charCount').textContent = el.value.length;
}



// ── Active nav highlight on scroll
const secs = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let cur = '';
secs.forEach(s => { if(window.scrollY >= s.offsetTop - 120) cur = s.id; });
document.querySelectorAll('.navbar-nav .nav-link').forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
});
});

// ── Current Year Get
document.getElementById("currentYear").textContent = new Date().getFullYear();