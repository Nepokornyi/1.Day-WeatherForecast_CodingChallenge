const deg = 6;
const hour = document.querySelector('.hour');
const minute = document.querySelector('.minute');
const second = document.querySelector('.second');

setInterval(() =>{
    let day = new Date();
    let getHours = day.getHours() * 30;
    let getMinutes = day.getMinutes() * deg;
    let getSeconds = day.getSeconds() * deg;
    
    hour.style.transform = `rotateZ(${(getHours)+(getMinutes/12)}deg)`;
    minute.style.transform = `rotateZ(${getMinutes}deg)`;
    second.style.transform = `rotateZ(${getSeconds}deg)`;
})

