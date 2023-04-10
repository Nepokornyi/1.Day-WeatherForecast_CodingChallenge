window.addEventListener('keydown', (e) => {
    document.getElementById('result').innerHTML = (
        `Pressed Key is <span>${e.key}</span>`
    )
})