const touchArea = document.getElementById('touch-area')
const output = document.getElementById('output')

let mouseX, mouseY,
    initialX = 0,
    initialY = 0;

let isSwiped;

let events = {
    mouse:{
        down: 'mousedown',
        move: 'mousemove',
        up: 'mouseup'
    },
    touch:{
        down: 'touchstart',
        move: 'touchmove',
        up: 'touchup'
    }
}

let deviceType = '';

const isTouchDevice = () => {
    try{
        document.createEvent('TouchEvent');
        deviceType = 'touch';
        return true;
    }
    catch(e){  
        deviceType = 'mouse'
        return false;
    }
}


let rectLeft = touchArea.getBoundingClientRect().left
let rectTop = touchArea.getBoundingClientRect().top

const getXY = (e) => {
    mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rectLeft;
    mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rectTop;
}

isTouchDevice();

touchArea.addEventListener(events[deviceType].down, (e) => {
    isSwiped = true;
    getXY(e);
    initialX = mouseX;
    initialY = mouseY;
})


touchArea.addEventListener(events[deviceType].move, (e) => {
    if(!isTouchDevice()){
        e.preventDefault();
    }
    if(isSwiped){
        getXY(e);
        let diffX = mouseX - initialX 
        let diffY = mouseY - initialY
        if(Math.abs(diffY) > Math.abs(diffX)){
            output.innerText = diffY > 0 ? 'Down' : 'Up';
        }
        else{
            output.innerText = diffX > 0 ? 'Right' : 'Left';
        }
    }
})

touchArea.addEventListener(events[deviceType].up, () => {
    isSwiped = false;
})

touchArea.addEventListener('mouseleave', () => {
    isSwiped = false;
})

window.onload = () => {
    isSwiped = false;
}