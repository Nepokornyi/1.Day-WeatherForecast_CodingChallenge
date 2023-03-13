const container = document.getElementById('joke');
const button = document.getElementById('button');
const url = 'https://v2.jokeapi.dev/joke/Any?type=single';

let getJoke = () => {
    container.classList.remove('fade');
    fetch(url).then(data => data.json()).then(item => {
        container.textContent = `${item.joke}`;
        container.classList.add('fade');
    });
}

button.addEventListener('click', getJoke);
getJoke();