const form = document.querySelector('form');
const textarea = form.querySelector('textarea'); 
const space = document.querySelector('#space');
const display = document.querySelector('.display');

function disp(result) {
    textarea.value += result;
}

space.onclick = (() => {
    textarea.value += ' ';
});

display.ondblclick = (() => {
    textarea.value = ''; 
});