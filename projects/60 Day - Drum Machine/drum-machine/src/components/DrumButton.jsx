import React, { useState, useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'

const useStyle = createUseStyles({
    playButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
        padding: 'auto',
        boxShadow: '0 10px 25px rgba(0,0,0, .5)',
        userSelect: 'none'
    },
    activeButton: {
        boxShadow: 'none',
        marginTop: '5px',
    },
    powerActiveButton: {
        backgroundColor: 'orange'
    }
})

function DrumButton({ button, sound, power, pressedButton, volume }) {

    const style = useStyle();
    const [isActive, setIsActive] = useState(false);
    const [isPower, setIsPower] = useState(false);

    const audioRef = useRef(null);

    if (!audioRef.current) {
        audioRef.current = new Audio(sound);
    }

    useEffect(() => {
        if(pressedButton.key === button) {
            handleClickPlay();
        }
    }, [pressedButton])

    
    const handleClickPlay = () => {
        if(power){
            audioRef.current.volume = volume;
            audioRef.current.play();
            setIsPower(true);
        }

        setIsActive(true);

        setTimeout(() => {
            setIsActive(false);
            setIsPower(false);
        }, 150)

    }

    return (
        <div 
            className={`${style.playButton} ${isActive ? style.activeButton : ''} ${isPower ? style.powerActiveButton : ''}`} 
            onMouseUp={handleClickPlay}
            >
                {button.toUpperCase()}
        </div>
    )
}

export default DrumButton