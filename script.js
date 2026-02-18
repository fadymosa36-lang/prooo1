
/* ==================== Custom Cursor ==================== */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx=0, my=0, rx=0, ry=0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top  = my - 6 + 'px';
});

// الـ ring بيتحرك بشكل ناعم شوية أبطأ من الـ cursor
(function loop() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx - 20 + 'px';
  ring.style.top  = ry - 20 + 'px';
  requestAnimationFrame(loop);
})();

// الـ cursor بيكبر لما تحوم على أي link أو زرار
document.querySelectorAll('a, button, .project-card, .arrow-box').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(3)';
    ring.style.transform   = 'scale(0.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    ring.style.transform   = 'scale(1)';
  });
});


/* ==================== Navbar (بيتلون لما تسكرول) ==================== */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});


/* ==================== Typewriter ==================== */
// ✏️ غير الجمل دي لأي جمل حابب تكتبها
const phrases = [
  'fast & scalable apps.',
  'beautiful user interfaces.',
  'full-stack solutions.'

];

let pI  = 0;    // رقم الجملة الحالية
let cI  = 0;    // رقم الحرف الحالي
let del = false; // هل بيمسح دلوقتي؟

const tw = document.getElementById('typewriter');

function type() {
  const cur = phrases[pI];

  if (!del) {
    // بيكتب
    cI++;
    tw.textContent = cur.slice(0, cI);
    if (cI === cur.length) {
      del = true;
      setTimeout(type, 2000); // استنى ثانيتين قبل ما يمسح
      return;
    }
    setTimeout(type, 60); // سرعة الكتابة (أقل = أسرع)
  } else {
    // بيمسح
    cI--;
    tw.textContent = cur.slice(0, cI);
    if (cI === 0) {
      del = false;
      pI = (pI + 1) % phrases.length; // انتقل للجملة الجاية
      setTimeout(type, 300);
      return;
    }
    setTimeout(type, 35); // سرعة المسح (أقل = أسرع)
  }
}

setTimeout(type, 1200); // استنى شوية قبل ما تبدأ


/* ==================== Reveal on Scroll ==================== */
// العناصر اللي عليها class="reveal" بتظهر بـ animation لما تسكرول عليها
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // لو في skill bars جوا العنصر، شغلها
      e.target.querySelectorAll('.skill-fill').forEach(f => {
        f.style.width = f.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

// trigger الـ skill bars لما قسم about يظهر
new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.skill-fill').forEach(f => {
        f.style.width = f.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 }).observe(document.getElementById('about'));


/* ==================== رفع الصورة الشخصية ==================== */
document.getElementById('photoInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(ev) {
    const img = document.getElementById('heroPhoto');
    img.src = ev.target.result;
    img.style.display = 'block';
    document.getElementById('photoPlaceholder').style.display = 'none';
  };
  reader.readAsDataURL(file);
});


/* ==================== تحميل الـ CV ==================== */
function downloadCV() {
  const link = document.createElement('a');

  // ✏️ ✏️ ✏️ حط هنا مسار ملف الـ PDF بتاعك
  // مثال لو الملف في نفس الفولدر: link.href = 'CV.pdf';
  // مثال لو على رابط خارجي:       link.href = 'https://example.com/mycv.pdf';
  link.href = 'CV.pdf';

  link.download = 'CV.pdf'; // ✏️ الاسم اللي هيتنزل بيه الملف
  link.click();
}

document.getElementById('navCvBtn').addEventListener('click', e => {
  e.preventDefault();
  downloadCV();
});
