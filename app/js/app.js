import LocomotiveScroll from 'locomotive-scroll'
import Swiper, {Navigation} from 'swiper';

const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
})

gsap.registerPlugin(ScrollTrigger)


scroller.on('scroll', ScrollTrigger.update)

ScrollTrigger.scrollerProxy(
    'body', {
        scrollTop(value) {
            return arguments.length ?
                scroller.scrollTo(value, 0, 0) :
                scroller.scroll.instance.scroll.y
        },
        getBoundingClientRect() {
            return {
                left: 0, top: 0,
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
    }
)


ScrollTrigger.create({
    trigger: '.crafted__section--image img',
    scroller: 'body',
    start: 'top+=30% 50%',
    end: 'bottom-=40% 50%',
    animation: gsap.to('.crafted__section--image img', {scale: 1.2}),
    scrub: 2
})


ScrollTrigger.create({
    trigger: '.mushroom__line svg',
    scroller: 'body',
    start: 'top+=30% 50%',
    end: 'bottom-=40% 50%',
    animation: gsap.fromTo(".mushroom__line svg circle", {opacity: 1}, {opacity: 1}),
    scrub: 2
})

ScrollTrigger.addEventListener('refresh', () => scroller.update())

ScrollTrigger.refresh()

//FAQ Collapse
const faqItems = document.querySelectorAll(".f_page--item__header");
const singleProductFaqItems = document.querySelectorAll(".sp_faq--item__header");

function toggleAccordion(event, array) {
    const itemToggle = event.currentTarget.getAttribute('aria-expanded');
    for (let i = 0; i < array.length; i++) {
        array[i].setAttribute('aria-expanded', 'false');
    }
    if (itemToggle === 'false') {
        event.currentTarget.setAttribute('aria-expanded', 'true');
    }
    ScrollTrigger.refresh()
}

faqItems.forEach(item => item.addEventListener('click', event => toggleAccordion(event, faqItems)))
singleProductFaqItems.forEach(item => item.addEventListener('click', event => toggleAccordion(event, singleProductFaqItems)));

const headerBurger = document.querySelector('.header__main--burger');
const headerNav = document.querySelector('.header__main--nav');

if (headerBurger) {
    headerBurger.addEventListener('click', (event) => {
        event.preventDefault();
        headerBurger.classList.toggle('active')
        headerNav.classList.toggle('active')
    })
}

let intFrameWidth = window.innerWidth;
if (intFrameWidth < 440) {
    scroller.destroy()
}

const exploreSlider = new Swiper('.explore-slider', {
    modules: [ Navigation ],
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    slidesPerView: 3,
    spaceBetween: 50,
    breakpoints: {
        // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 0
        },
        // when window width is >= 480px
        480: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        // when window width is >= 640px
        640: {
            slidesPerView: 3,
            spaceBetween: 40
        }
    }
});

const productSlider = new Swiper('.product-slider', {
    modules: [ Navigation ],
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    slidesPerView: 1
});
