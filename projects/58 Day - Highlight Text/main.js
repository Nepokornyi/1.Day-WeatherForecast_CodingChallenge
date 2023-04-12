const button = document.querySelector('button');

button.addEventListener('click', () => {
    const textToSearchElement =  document.getElementById('text-search');
    const paragraph = document.getElementById('paragraph');
    let textToSearch = textToSearchElement.value;

    textToSearch = textToSearch.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")

    let pattern = new RegExp(`${textToSearch}`, "gi")

    paragraph.innerHTML = paragraph.textContent.replace(pattern, match => `<mark>${match}</mark>`)
});