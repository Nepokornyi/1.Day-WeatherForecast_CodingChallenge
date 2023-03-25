const text = document.getElementById('my-text');

text.addEventListener('input', () => {
    let count = (text.value).length;
    document.getElementById('count-result').textContent = `Total characters: ${count}`;
})