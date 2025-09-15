// Mobile Navbar Toggle
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar && nav) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close && nav) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Stats Counter Animation
(function () {
    const boxes = document.querySelectorAll('.stat-box');

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    function animateBox(box) {
        if (box.dataset.animated) return;
        box.dataset.animated = '1';

        const target = parseInt(box.dataset.target || 0, 10);
        const duration = parseInt(box.dataset.duration || 1500, 10);
        const ring = box.querySelector('.progress-ring');
        const numberEl = box.querySelector('.stat-number');

        if (!ring || !numberEl) return; // safeguard

        let percent = 100;
        if (box.dataset.percent !== undefined) {
            percent = Math.min(100, Math.max(0, +box.dataset.percent));
        } else if (box.dataset.max !== undefined) {
            const max = Math.max(1, +box.dataset.max);
            percent = Math.min(100, Math.round((target / max) * 100));
        }

        const color = box.dataset.color || '#e60000';
        const startTime = performance.now();
        const endAngle = 360 * (percent / 100);

        function frame(now) {
            const elapsed = now - startTime;
            const t = Math.min(1, elapsed / duration);
            const eased = easeOutCubic(t);

            // Update number
            const currentValue = Math.floor(eased * target);
            numberEl.textContent = currentValue.toLocaleString();

            // Update progress ring
            const currentAngle = eased * endAngle;
            ring.style.background = `conic-gradient(${color} 0deg ${currentAngle}deg, #eee ${currentAngle}deg 360deg)`;

            if (t < 1) {
                requestAnimationFrame(frame);
            } else {
                numberEl.textContent = target.toLocaleString();
            }
        }

        requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateBox(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.35 }
    );

    boxes.forEach(b => io.observe(b));
})();

const cursorDot = document.querySelector(".cursor-dot");

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.pageX;
      mouseY = e.pageY;
    });

    function animate() {
      // Smooth follow effect (lerp)
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;

      cursorDot.style.left = dotX + "px";
      cursorDot.style.top = dotY + "px";

      requestAnimationFrame(animate);
    }

    animate();