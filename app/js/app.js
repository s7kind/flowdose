import LocomotiveScroll from 'locomotive-scroll'
import Swiper, {Navigation} from 'swiper';


const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,
})



ScrollTrigger.addEventListener("refresh", () => scroller.update());

gsap.registerPlugin(ScrollTrigger)

scroller.on('scroll', ScrollTrigger.refresh)

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

ScrollTrigger.addEventListener('refresh', () => scroller.update())

ScrollTrigger.refresh()

//FAQ Collapse
const faqItems = document.querySelectorAll(".f_page--item__header");
const singleProductFaqItems = document.querySelectorAll(".sp_faq--item__header");


// if (singleProductFaqItems.length > 0) {
//     toggleAccordion(singleProductFaqItems)
// }
//
// if (faqItems.length > 0) {
//     toggleAccordion(faqItems)
// }

function toggleAccordion(array) {
    let heightArray = [];

    for (let i = 0; i < array.length; i++) {
        heightArray.push(array[i].nextElementSibling.clientHeight);
        array[i].nextElementSibling.style.maxHeight = `0px`;

        array[i].addEventListener('click', event => {
            const itemToggle = event.currentTarget;
            itemToggle.classList.toggle('is_active');
            let contentBox = itemToggle.nextElementSibling;

            if (!itemToggle.classList.contains('is_active')) {
                contentBox.style.maxHeight = `0px`
            } else {
                contentBox.style.maxHeight = `${heightArray[i]}px`
            }
            ScrollTrigger.refresh();
        })
    }
}

const headerBurger = document.querySelector('.header__main--burger');
const headerNav = document.querySelector('.header__main--nav');

if (headerBurger) {
    headerBurger.addEventListener('click', (event) => {
        event.preventDefault();
        headerBurger.classList.toggle('active')
        headerNav.classList.toggle('active')
    })
}

const exploreSlider = new Swiper('.explore-slider', {
    modules: [Navigation],
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
    modules: [Navigation],
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    slidesPerView: 1
});
