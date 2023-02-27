const menuButton = document.querySelector('.menu-btn');
const navigation = document.querySelector('.navigation')

menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('active')
    navigation.classList.toggle('active')
})


const buttons = document.querySelectorAll('.nav-btn');
const slides = document.querySelectorAll('.video-slide');
const content = document.querySelectorAll('.content');

let sliderNav = function(activeSlide){
    buttons.forEach((button) =>{
        button.classList.remove('active');
    })
    slides.forEach((slide) =>{
        slide.classList.remove('active');
    })
    content.forEach((content) =>{
        content.classList.remove('active');
    })


    buttons[activeSlide].classList.add('active');
    slides[activeSlide].classList.add('active');
    content[activeSlide].classList.add('active');
}

buttons.forEach((button, i) => {
    button.addEventListener('click', () => {
        sliderNav(i);
    })
})


