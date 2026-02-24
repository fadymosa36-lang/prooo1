
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx=0, my=0, rx=0, ry=0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top  = my - 6 + 'px';
});

(function loop() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx - 20 + 'px';
  ring.style.top  = ry - 20 + 'px';
  requestAnimationFrame(loop);
})();

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


window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
});


const phrases = [
  'fast & scalable apps.',
  'beautiful user interfaces.',
  'full-stack solutions.'

];

let pI  = 0;  
let cI  = 0;    
let del = false; 

const tw = document.getElementById('typewriter');

function type() {
  const cur = phrases[pI];

  if (!del) {
    cI++;
    tw.textContent = cur.slice(0, cI);
    if (cI === cur.length) {
      del = true;
      setTimeout(type, 2000); 
      return;
    }
    setTimeout(type, 60); 
  } else {
    
    cI--;
    tw.textContent = cur.slice(0, cI);
    if (cI === 0) {
      del = false;
      pI = (pI + 1) % phrases.length; 
      setTimeout(type, 300);
      return;
    }
    setTimeout(type, 35); 
  }
}

setTimeout(type, 1200); 


const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll('.skill-fill').forEach(f => {
        f.style.width = f.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(r => obs.observe(r));

new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.skill-fill').forEach(f => {
        f.style.width = f.dataset.width + '%';
      });
    }
  });
}, { threshold: 0.3 }).observe(document.getElementById('about'));


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


function downloadCV() {
  const link = document.createElement('a');


  link.href = 'cv.pdf';

  link.download = 'cv.pdf';
  link.click();
}

document.getElementById('navCvBtn').addEventListener('click', e => {
  e.preventDefault();
  downloadCV();
});
