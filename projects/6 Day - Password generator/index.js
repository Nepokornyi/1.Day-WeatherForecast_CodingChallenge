const length = document.querySelector('.pass-length input');
const generateBtn = document.querySelector('.generate');
const passwordInput = document.querySelector('.input-box input');
const passwordIndicator = document.querySelector('.pass-indicator')
const options = document.querySelectorAll('.option input');
const copyBtn = document.querySelector('.input-box span');

const characters = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '^!$%|[](){}:;.,*+-#@<>'
}

const generatePassword = () =>{
    let staticPassword = '',
    randomPassword = '',
    excludeDuplicate = false,
    passLength = length.value;

    options.forEach(option =>{
        if(option.checked){
            if(option.id !== 'exc-duplicate' && option.id !== 'spaces'){
                staticPassword += characters[option.id] 
            } 
            else if(option.id === 'spaces'){
                staticPassword += ` ${staticPassword} `;
            }
            else{
                excludeDuplicate = true;
            }
        }
    })

    for(let i = 0; i < passLength; i++){
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)]
        if(excludeDuplicate){
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        }
        else{
            randomPassword += randomChar
        }
    }

    passwordInput.value = randomPassword;
    copyBtn.classList.remove('check');
}

const updatePassIndicator = () => {
    passwordIndicator.id = length.value <= 8 ? 'weak' : length.value <= 16 ? 'medium' : 'strong'
}

const updateSlider = () => {
    document.querySelector('.pass-length span').innerHTML = length.value;
    generatePassword();
    updatePassIndicator();
    copyBtn.classList.remove('check');
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyBtn.classList.add('check');
}

copyBtn.addEventListener('click', copyPassword);
length.addEventListener('input', updateSlider);
generateBtn.addEventListener('click', generatePassword);