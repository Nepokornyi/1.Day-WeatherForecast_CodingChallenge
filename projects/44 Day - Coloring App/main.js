const container = document.querySelector('main');
const svg = document.querySelector('svg'); 
const group = document.querySelector('#group');
const colorInput = document.querySelector('#color-input');
const sizeInput = document.querySelector('#size-input');

let currentColor, currentSize, svgWidth, svgHeight;
let deviceType = '';
let events = {
    mouse: {
        click: 'click',
    },
    touch: {
        click: 'touchstart'
    }
};

const isTouchDevice = () => {
    try {
        document.createEvent('TouchEvent');
        deviceType = 'touch';
        return true;
    }
    catch (e) {
        deviceType = 'mouse';
        return false;
    }
};

let touchDevice = isTouchDevice();

colorInput.addEventListener('input', () => {
    let value = colorInput.value;
    if (/^#[0-9a-f]{3,6}$/i.test(value)) {
        currentColor = value;
    }
});

sizeInput.addEventListener('input', () => {
    let value = parseInt(sizeInput.value);
    if (!isNaN(value) && value > 0) {
        currentSize = value;
    }
});

container.addEventListener(events[deviceType].click, (e) => {
    console.log(e);
    let mouseX = !touchDevice ? e.clientX : e.touches[0].clientX;
    let mouseY = !touchDevice ? e.clientY : e.touches[0].clientY;
    let relativeX = mouseX - container.getBoundingClientRect().left;
    let relativeY = mouseY - container.getBoundingClientRect().top;

    let finalX = relativeX * svgWidth / container.clientWidth;
    let finalY = relativeY * svgHeight / container.clientHeight;
    
   
    
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttributeNS(null, "cx", finalX);
    circle.setAttributeNS(null, "cy", finalY);
    circle.setAttributeNS(null, "r", currentSize);
    circle.setAttributeNS(null, "fill", currentColor);
    
    group.appendChild(circle);

    console.log(circle)
});

window.onload = () => {
    currentColor = '#0075ff';
    colorInput.value = currentColor;
    currentSize = 5;
    sizeInput.value = currentSize;
    updateSvgSize();
}

window.addEventListener('resize', updateSvgSize);

function updateSvgSize() {
    svgWidth = svgHeight = 500;
    svg.setAttribute('width', svgWidth);
    svg.setAttribute('height', svgHeight);
}
