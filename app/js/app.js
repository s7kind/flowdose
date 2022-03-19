import LocomotiveScroll from 'locomotive-scroll'

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
    trigger: '.mushroom__line',
    scroller: 'body',
    start: 'top+=30% 50%',
    end: 'bottom-=40% 50%',
    animation: gsap.fromTo(".mushroom__line", {width: 0}, {width: '100%'}),
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
singleProductFaqItems.forEach(item => item.addEventListener('click', event => toggleAccordion(event, singleProductFaqItems)))