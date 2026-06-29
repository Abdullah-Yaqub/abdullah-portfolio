document.addEventListener("DOMContentLoaded", () => {
    // 1. تهيئة الأنيميشن (AOS)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
    });

    // 2. تأثير الكتابة التلقائية (Typing Effect)
    const texts = ["مطور واجهات متكاملة", "مهندس أنظمة Full-Stack"];
    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    let isDeleting = false;
    const typingElement = document.getElementById("typing-text");

    function type() {
        if (!typingElement) return;

        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];

        if (isDeleting) {
            letter = currentText.slice(0, --index);
        } else {
            letter = currentText.slice(0, ++index);
        }

        typingElement.textContent = letter;

        let typeSpeed = 100;
        if (isDeleting) {
            typeSpeed /= 2;
        }

        if (!isDeleting && letter.length === currentText.length) {
            typeSpeed = 2000; // توقف مؤقت بعد اكتمال الكلمة
            isDeleting = true;
        } else if (isDeleting && letter.length === 0) {
            isDeleting = false;
            count++;
            typeSpeed = 500; // توقف قبل كتابة الكلمة الجديدة
        }

        setTimeout(type, typeSpeed);
    }
    
    if (typingElement) {
        type();
    }

    // 3. الماوس المخصص (Custom Cursor Logic)
    const cursor = document.getElementById('custom-cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // إضافة تأثير التكبير للماوس عند تمريره على الروابط والأزرار
        const hoverables = document.querySelectorAll('a, button');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }
});