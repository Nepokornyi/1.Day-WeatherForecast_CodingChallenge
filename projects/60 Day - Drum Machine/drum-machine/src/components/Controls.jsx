import React from 'react'
import ToggleButton from './ToggleButton';
import { createUseStyles } from 'react-jss'

const useStyle = createUseStyles({
    controlsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        minWidth: '200px',
        minHeight: '300px'
    },
    displayButton: {
        width: '150px',
        height: '50px',
        backgroundColor: 'gray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

function Controls({ pressedButton, powerOn, setPowerOn, volume, setVolume }) {

    const style = useStyle();

    const handleVolumeChange = (e) => {
        setVolume(e.target.value / 100);
    }

    return (
        <div className={style.controlsContainer}>

            <ToggleButton 
                type='Power' 
                isToggled={powerOn} 
                setIsToggled={setPowerOn} />

            <p className={style.displayButton}>{powerOn && pressedButton.phrase}</p>

            <input 
                type="range" 
                min="0" 
                max="100"
                value={volume * 100}
                onChange={handleVolumeChange} />


        </div>
    )
}

export default Controls