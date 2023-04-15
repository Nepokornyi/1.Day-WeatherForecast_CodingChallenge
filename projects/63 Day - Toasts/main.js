const TOAST_LIMIT = 3;
const currentToasts = [];

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        showToast(e.target.id)
    })
})

async function showToast (type) {
    if(currentToasts.length < TOAST_LIMIT){
        const toast = document.createElement('div');
        toast.className = 'toast'
    
        const icon = document.createElement('i');
        if(type === 'success'){
            icon.className = 'fa-solid fa-check';
            icon.style.color = 'green';
        }
        else if(type === 'error'){
            icon.className = 'fa-solid fa-xmark';
            icon.style.color = 'red';
        }
        else{
            icon.className = 'fa-solid fa-triangle-exclamation';
            icon.style.color = 'orange';
        }
        toast.appendChild(icon);
    
        const description = document.createElement('p');
        description.textContent = type;
        toast.appendChild(description)
    
        const progress = document.createElement('div');
        progress.className = `progress ${type}`;
        toast.appendChild(progress);
    
        const container = document.querySelector('.toast-container');
        container.appendChild(toast);
    
        currentToasts.push(toast);
    
        await delay(10);
        toast.style.opacity = '1';
    
        await delay(3000);
        toast.style.opacity = '0';
    
        await delay(350)
        toast.remove()

        currentToasts.shift()
    }
}

function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}