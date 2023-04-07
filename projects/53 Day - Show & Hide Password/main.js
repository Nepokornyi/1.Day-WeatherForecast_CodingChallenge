const password = document.querySelector('input');
const button = document.querySelector('i');

button.addEventListener('click', () => {
    if(password.type === 'password') {
        password.type = 'text';
        button.classList.add('hide');
    }
    else {
        password.type = 'password';
        button.classList.remove('hide');
    }

})