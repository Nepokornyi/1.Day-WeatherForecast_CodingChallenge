const button = document.querySelector('.download-button');

const fileLink = 'https://drive.google.com/uc?export=download&id=1aYiaLn3YOjL-_o5QBCy7tU1epqA6gZoi'

button.addEventListener('click', () => {
    if(button.classList.contains('disable-timer')){
        return(location.href = fileLink)
    }
    
    let timer = button.dataset.timer;
    button.classList.add('timer')
    button.innerHTML = `Your file going to be downloaded in ${timer} seconds`

    const initCounter = setInterval(() => {
        if(timer > 0){
            timer--;
            return button.innerHTML = `Your file going to be downloaded in ${timer} seconds`
        }
        clearInterval(initCounter);
        location.href = fileLink;
        button.textContent = 'Your file being downloaded'

        setTimeout(() => {
            button.classList.replace('timer', 'disable-timer');
            button.innerHTML ='<span class="icon material-symbols-outlined">download</span><span class="text">Download Again</span>'
        }, 3000)
    }, 1000)
});