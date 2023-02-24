const container = document.querySelector('.container');
const video = document.querySelector('.video');
let videoHeight = container.offsetHeight;

let popUp = true;


window.addEventListener('scroll', () => {
    if(window.scrollY > videoHeight){
        if(popUp){
            video.classList.add('popUp')
        }
    }
    else{
        video.classList.remove('popUp')
    }
})

