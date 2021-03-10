const noRedirects = document.querySelectorAll('.no-redirect');
const faqHeaders = document.querySelectorAll('.faq-header');
const readMeBtns = document.querySelectorAll('.read-me-btn');
const aboutTransfers = document.querySelector('.about-transfers');
const aboutCards = document.querySelector('.about-cards');
const aboutCurrencies = document.querySelector('.about-currency');
const aboutComplaints = document.querySelector('.about-complaints');
const moveUpBtn = document.querySelector('.move-up-btn');
const logoNavigate = document.querySelector('.logo-navigate');
const ulNavChildren = document.querySelectorAll('.ul-navbar form');

// change page title
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'Come back to us';
    } else {
        document.title = 'Arialy - Your Trusted Banking';
    }
});

// navigation buttons
ulNavChildren.forEach(child => {
    child.addEventListener('click', () => {
        child.submit();
    });
});

logoNavigate.addEventListener('click', () => {
    logoNavigate.submit();
});

noRedirects.forEach(noRedirect => {
    noRedirect.addEventListener('click', () => {
        alert('This is an example site so there is no attachment');
    });
});

readMeBtns.forEach(readMeBtn => {
    readMeBtn.addEventListener('click', () => {
        if (readMeBtn.dataset.index === '0') {
            faqNavigate(aboutTransfers, 1000);
        } else if (readMeBtn.dataset.index === '1') {
            faqNavigate(aboutCards, 1000);
        } else if (readMeBtn.dataset.index === '2') {
            faqNavigate(aboutCurrencies, 1000);
        } else if (readMeBtn.dataset.index === '3') {
            faqNavigate(aboutComplaints, 1000);
        }
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > window.innerHeight / 1.5) {
        moveUpBtn.classList.add('visible');
    } else {
        moveUpBtn.classList.remove('visible');
    }
});

moveUpBtn.addEventListener('click', () => {
    const body = document.querySelector('body');
    faqNavigate(body, 1000);
});

// appearance of the answer
faqHeaders.forEach(faqHeader => {
    faqHeader.addEventListener('click', () => {
        let sybling = faqHeader.nextElementSibling;
        let syblingStyles = faqHeader.nextElementSibling.style;
        let height = sybling.scrollHeight + 'px';
        sybling.classList.toggle('visible');
        if (sybling.classList.contains('visible')) {
            syblingStyles.height = height;
        } else {
            syblingStyles.height = '0px';
        }
    });
});

const faqNavigate = (target, duration) => {
    let targetPos = target.getBoundingClientRect().top;
    let startPos = window.pageYOffset;
    let distance = targetPos - startPos;
    let startTime = null;

    const animationHandler = currentTime => {
        if (startTime === null) startTime = currentTime;
        let timeElapsed = currentTime - startTime;
        let run = ease(timeElapsed, startPos, distance, duration);
        window.scrollTo(0, run);

        if (timeElapsed < duration) requestAnimationFrame(animationHandler);
    }

    const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animationHandler);
};