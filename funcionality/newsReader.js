const moveUpBtn = document.querySelector('.move-up-btn');
const ulNavChildren = document.querySelectorAll('.ul-navbar form');
const logoNavigate = document.querySelector('.logo-navigate');

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

// load articles based on keywords from articleTitle
window.addEventListener('load', () => {
    const articleTitle = ['capital', 'cryptocurrency', 'bank'];
    let targetElem = [];

    const capitalNewsBlock = document.querySelector('.capital-news-block');
    const cryptoNewsBlock = document.querySelector('.crypto-news-block');
    const bankingNewsBlock = document.querySelector('.banking-news-block');

    targetElem.push(capitalNewsBlock);
    targetElem.push(cryptoNewsBlock);
    targetElem.push(bankingNewsBlock);
    
    for (let j = 0; j < 3; j++) {
        // let url = `http://newsapi.org/v2/everything?q=${articleTitle[j]}&from=2020-06-23&sortBy=popularity&apiKey=048fc821ed484597a6d72ef636512b23`;
        let url = `http://newsapi.org/v2/everything?q=${articleTitle[j]}&apiKey=048fc821ed484597a6d72ef636512b23`;

        fetch(url).then(response => response.json()).then(response => {
            for (let i = 0; i < 6; i++) {
                const news = document.createElement('div');
                news.className = 'news';
                const newsCover = document.createElement('img');
                newsCover.src = response.articles[i].urlToImage;
                newsCover.alt = 'Unloaded article thumbnail';
                const newsTitle = document.createElement('h3');
                newsTitle.className = 'news-title';
                newsTitle.innerText = response.articles[i].title;
                const questionFontAwesome = document.createElement('i');
                questionFontAwesome.className = 'fas fa-question-circle';

                const readMoreBtnLink = document.createElement('a');
                readMoreBtnLink.className = 'read-more-btn-link';
                readMoreBtnLink.href = response.articles[i].url;
                const readMoreBtn = document.createElement('button');
                readMoreBtn.type = 'button';
                readMoreBtn.innerText = 'Read More';
                readMoreBtnLink.target = '_blank';
                readMoreBtn.className = 'read-more-btn';
                readMoreBtnLink.appendChild(readMoreBtn);
                const btnOnHoverBg = document.createElement('div');
                btnOnHoverBg.className = 'btn-on-hover-bg';
                btnOnHoverBg.appendChild(readMoreBtnLink);
            
                news.appendChild(newsCover);
                btnOnHoverBg.appendChild(questionFontAwesome);
                news.appendChild(newsTitle);
                news.appendChild(btnOnHoverBg);
        
                targetElem[j].appendChild(news);
            }
        });
    }
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
