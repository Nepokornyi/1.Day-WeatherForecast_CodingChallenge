window.addEventListener('scroll', (e) => {
    document.body.style.cssText += `--scrollTop: ${this.scrollY}px`
    // += for adding value to existing styles or it wont work
})

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
ScrollSmoother.create({
    wrapper: '.wrapper',
    content: '.container'
})