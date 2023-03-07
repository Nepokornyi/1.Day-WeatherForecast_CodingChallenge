const fileInput = document.querySelector('.file-input');
const previewImage = document.querySelector('.preview-img img');
const chooseImgButton = document.querySelector('.choose-img');
const chooseResetButton = document.querySelector('.reset-filter')
const saveImageButton = document.querySelector('.save-img')

const filterOptions = document.querySelectorAll('.filter button');
const filterName = document.querySelector('.filter-info .name');
const filterSlider = document.querySelector('.slider input');
const filterValue = document.querySelector('.filter-info .value');

const rotateOptions = document.querySelectorAll('.rotate button');


let brightness = 100, 
    saturation = 100, 
    inversion = 0, 
    grayscale = 0;

let rotate = 0,
    flipHorizontal = 1,
    flipVertical = 1;

const applyFilters = () => {
    previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`
    previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () =>{
    let file = fileInput.files[0];
    if(!file) return;
    previewImage.src = URL.createObjectURL(file);
    previewImage.addEventListener('load', () =>{
        chooseResetButton.click();
        document.querySelector('.container').classList.remove('disabled');
    })
}

const updateFilter = () => {
    filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector('.filter .active');

    if(selectedFilter.id === 'brightness'){
        brightness = filterSlider.value;
    }
    else if(selectedFilter.id === 'saturation'){
        saturation = filterSlider.value;
    }
    else if(selectedFilter.id === 'inversion'){
        inversion = filterSlider.value;
    }
    else if(selectedFilter.id === 'grayscale'){
        grayscale = filterSlider.value;
    }
    applyFilters();
}

filterOptions.forEach(option =>{
    option.addEventListener('click', () =>{
        document.querySelector('.filter .active').classList.remove('active')
        option.classList.add('active');
        filterName.innerText = option.innerText;

        if(option.id === 'brightness'){
            filterSlider.max  = '200';
            filterSlider.value = brightness;
            filterValue.innerText = `${brightness}%`;
        }
        else if(option.id === 'saturation'){
            filterSlider.max  = '200';
            filterSlider.value = saturation;
            filterValue.innerText = `${saturation}%`;
        }
        else if(option.id === 'inversion'){
            filterSlider.max  = '100';
            filterSlider.value = inversion;
            filterValue.innerText = `${inversion}%`;
        }
        else if(option.id === 'grayscale'){
            filterSlider.max  = '100';
            filterSlider.value = grayscale;
            filterValue.innerText = `${grayscale}%`;
        }
    })
})

rotateOptions.forEach(option =>{
    option.addEventListener('click', () =>{
        if(option.id === 'left'){
            rotate -= 90;
        }
        else if(option.id === 'right'){
            rotate += 90;
        }
        else if(option.id === 'vertical'){
            flipVertical = flipVertical === 1 ? -1 : 1;
        }
        else if(option.id === 'horizontal'){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
        }
        applyFilters();
    })
})

const resetFilter = () => {
    brightness = 100; saturation = 100; inversion = 0; grayscale = 0;
    rotate = 0; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click();
    applyFilters();
}

const saveImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = previewImage.naturalWidth;
    canvas.height = previewImage.naturalHeight;
    
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180);
    }

    ctx.scale(flipHorizontal, flipVertical);
    ctx.drawImage(previewImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement('a');
    link.download = 'image.jpg';
    link.href = canvas.toDataURL();
    link.click();
}


fileInput.addEventListener('change', loadImage);
filterSlider.addEventListener('input', updateFilter);
chooseResetButton.addEventListener('click', resetFilter);
saveImageButton.addEventListener('click', saveImage)
chooseImgButton.addEventListener('click', () =>{
    fileInput.click();
});