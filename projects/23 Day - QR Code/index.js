const wrapper = document.querySelector('.wrapper');
const generateButton = document.querySelector('.form button');
const qrInput = document.querySelector('.form input');
const qrImg = document.querySelector('.qr-code img');

generateButton.addEventListener('click', () => {
    if(!qrInput.value) return;

    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrInput.value}`
    wrapper.classList.add('active');
    qrImg.addEventListener('load', () => {
        wrapper.classList.add('active');
    });
});

qrInput.addEventListener('keyup', () => {
    if(!qrInput.value){
        wrapper.classList.remove('active')
    }
})