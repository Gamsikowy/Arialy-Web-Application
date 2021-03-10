const slider = document.querySelector('.slider');
const sliderFigure = document.querySelector('.slider figure');
const counters = document.querySelectorAll('.counter');
const dynamicCountAd = document.querySelector('.dynamic-count-ad');
const hoverCommunique = document.querySelector('.hover-communique');
const skipLoginBtn = document.querySelector('.skip-log-btn');
const skipRegisterBtn = document.querySelector('.skip-reg-btn');
const moveUpBtn = document.querySelector('.move-up-btn');
const newsletterSpace = document.querySelector('.newsletter-space');
const newsletterBtn = document.querySelector('.news-btn');
const registerSpace = document.querySelector('.register-space');
const loginSpace = document.querySelector('.login-space');
const formNewsletter = document.querySelector('.form-newsletter');
const subscribeNewsletterBtn = document.querySelector('.subscribe-news-btn');
const ulNavChildren = document.querySelectorAll('.ul-navbar form');
const noRedirects = document.querySelectorAll('.no-redirect');
const logoNavigate = document.querySelector('.logo-navigate');
const incentiveBtn = document.querySelector('.incentive-btn');
const loginBtn = document.querySelector('.sub-news-btn');
const registerBtn = document.querySelector('.register-btn');
const formLogin = document.querySelector('.form-login');
const formRegister = document.querySelector('.form-register');

const indexNavigate = (target, duration) => {
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
        t /= d/2;
        if (t < 1) return c/2*t*t+b;
        t--;
        return -c/2*(t*(t-2)-1)+b;
    }
    requestAnimationFrame(animationHandler);
};

// slider behavior when hover
slider.addEventListener('mouseover', () => {
    sliderFigure.style.animationPlayState = 'paused';
    hoverCommunique.innerText = 'Leave the slider to resume';
});

slider.addEventListener('mouseout', () => {
    sliderFigure.style.animationPlayState = 'running';
    hoverCommunique.innerText = 'Hover to stop the slider';
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

loginBtn.addEventListener('click', () => {
    formLogin.submit();
});

registerBtn.addEventListener('click', () => {
    formRegister.submit();
});

// change page title
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'Come back to us';
    } else {
        document.title = 'Arialy - Your Trusted Banking';
    }
});

// animations on the site
const speed = 1000000;

counters.forEach(counter => {
    window.addEventListener('scroll', () => {
        const addCounter = () => {
            const maximum = +counter.dataset.target;
            const counterInnerText = counter.innerText;
            let count = counterInnerText.substring(0, counterInnerText.length - 1);
            count = +count;

            const i = Math.ceil(maximum / speed);

            if (count < maximum) {
                if (counter.dataset.flag === 'percentage') {
                    counter.innerText = i + count + '%';
                } else if (counter.dataset.flag === 'seconds') {
                    counter.innerText = i + count + ' s';
                } else if (counter.dataset.flag === 'thousand') {
                    counter.innerText = i + count + 'K';
                }
                setTimeout(addCounter, 1);
            } else {
                if (counter.dataset.flag === 'percentage') {
                    count.innerText = maximum + '%';
                } else if (counter.dataset.flag === 'seconds') {
                    counter.innerText = maximum + ' s';
                } else if (counter.dataset.flag === 'thousand') {
                    count.innerText = maximum + ' K';
                }
            }
        };

        const bottomViewportBorder = window.scrollY + window.innerHeight;
        const startCountingBorder = dynamicCountAd.offsetTop + (dynamicCountAd.offsetHeight / 1.2);
        if (bottomViewportBorder > startCountingBorder) addCounter();
        });
});

noRedirects.forEach(noRedirect => {
    noRedirect.addEventListener('click', () => {
        alert('This is an example site so there is no attachment');
    });
});

incentiveBtn.addEventListener('click', () => {
    indexNavigate(registerSpace, 1000);
});

skipRegisterBtn.addEventListener('click', () => {
    indexNavigate(registerSpace, 1000);
});

skipLoginBtn.addEventListener('click', () => {
    indexNavigate(loginSpace, 1000);
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > window.innerHeight / 1.5) {
        moveUpBtn.classList.add('visible');
    } else {
        moveUpBtn.classList.remove('visible');
    }
});

newsletterBtn.addEventListener('click', () => {
    newsletterSpace.style.display = 'flex';
    indexNavigate(newsletterSpace, 1000);
});

subscribeNewsletterBtn.addEventListener('click', () => {
    formNewsletter.submit();
});

moveUpBtn.addEventListener('click', () => {
    const body = document.querySelector('body');
    indexNavigate(body, 1000);
});