const timeDisplaySession = document.querySelector(".time-display");
const logoutBtn = document.querySelector(".log-out-btn");
const formLogout = document.querySelector(".form-logout");
const previousDelete = document.querySelector(".previous-del");
const deleteBtn = document.querySelector(".delete-btn");
const deleteBtnForm = document.querySelector(".delete-btn-form");
const userBar = document.querySelector(".user-bar");
const ulNavbar = document.querySelector(".ul-navbar");
const nextBtn = document.querySelector(".next-btn");
const previousBtn = document.querySelector(".previous-btn");
const nextBtnForm = document.querySelector(".next-btn-form");
const previousBtnForm = document.querySelector(".prev-btn-form");
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

nextBtn.addEventListener('click', () => {
    // fetch("/markets", {
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Content-type': 'application/x-www-form-urlencoded'
    //     },
    //     body: {
    //         "action": "next"//JSON.stringify(
    //     }
    // })
    // .then(res => res.json())
    // .then(res => {
    //     console.log(res);
    // })
    nextBtnForm.submit();
});

previousBtn.addEventListener('click', () => {
    previousBtnForm.submit();
});

// appearance of the button to delete the account
previousDelete.addEventListener('click', () => {
    const deleteSupport = document.querySelector(".del-support");
    deleteSupport.style.height = '200px';
});

deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // captcha support
    const captcha = document.querySelector('#g-recaptcha-response').value;

    return fetch('/user/captcha', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ captcha })
    }).then(res => res.json()).then(data => {
        if (data.success) deleteBtnForm.submit();
      });
});

// logout button
logoutBtn.addEventListener('click', () => {
    formLogout.submit();
});

// sticking the log out button
window.addEventListener('scroll', () => {
    userBar.classList.toggle('sticky', window.scrollY > ulNavbar.offsetHeight)
})

// automatic logout after 5 minutes of inactivity
const upperLimit = 5;
let time = 60 * upperLimit;

setInterval(() => { 
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timeDisplaySession.textContent = `Automatic logout in: ${minutes}:${seconds}`;
    time--;
    if (time == 0) formLogout.submit();
}, 1000);


window.addEventListener('mousemove', () => {
    time = 60 * upperLimit;
});