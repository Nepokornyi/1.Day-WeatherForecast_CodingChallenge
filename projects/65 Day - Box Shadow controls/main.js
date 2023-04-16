document.querySelectorAll('input').forEach( input => {
    input.addEventListener('input', inputChanged)
} )

function inputChanged(e) {
    console.log(e.target.value);

    document.documentElement.style.setProperty(
        `--${e.target.name}`, e.target.value
    )
}