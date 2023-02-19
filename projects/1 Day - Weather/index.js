const container = document.querySelector('.container');
const search = document.querySelector('.search');
const weather = document.querySelector('.weather');
const details = document.querySelector('.details');
const error = document.querySelector('.error');

const APIKEY = 'fb7d0f8899a2a6aee49bd72511a2d5ce';

search.addEventListener('click', () => {

    const city = document.querySelector('.search input').value;

    if(city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=mertic&appid=${APIKEY}`).then(response => response.json()).then
    (json => {
        if(json.cod === '404'){
            container.style.height = '400px';
            weather.style.display = 'none';
            details.style.display = 'none';
            error.style.display = 'block';
            error.classList.add('appear');
            return;
        }
        error.style.display = 'none';
        error.classList.remove('appear');

        const image = document.querySelector('.weather img');
        const temperature = document.querySelector('.weather .temperature');
        const description = document.querySelector('.weather .description');
        const wind = document.querySelector('.details .wind span');
        const humidity = document.querySelector('.details .humidity span');

        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'https://cdn0.iconfinder.com/data/icons/weather-web-app-ui/100/weather-22-512.png';
                break;

            case 'Rain':
                image.src = 'https://icons-for-free.com/download-icon-rain+rainy+weather+icon-1320196493190360220_512.png';
                break;

            case 'Snow':
                image.src = 'https://icons-for-free.com/iconfiles/png/512/snow+snowy+weather+icon-1320196493288802350.png';
                break;

            case 'Clouds':
                image.src = 'https://cdn3.iconfinder.com/data/icons/sympletts-part-3/128/cloud-0-512.png';
                break;

            case 'Haze':
                image.src = 'https://cdn-icons-png.flaticon.com/512/5497/5497190.png';
                break;

            default:
                image.src = ''
        }

        temperature.innerHTML = `${parseInt(json.main.temp - 273.15)}<span>˚C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

        weather.style.display = '';
        details.style.display = '';
        weather.classList.add('appear')
        details.classList.add('appear')
        container.style.height = '450px'
    })

})