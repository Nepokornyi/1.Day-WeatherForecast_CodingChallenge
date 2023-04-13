import React, { useEffect } from 'react'
import DrumButton from './DrumButton';
import { createUseStyles } from 'react-jss'





const useStyle = createUseStyles({
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridTemplateRows: '1fr 1fr 1fr',
        gap: '10px',
        minHeight: '300px',
        minWidth: '300px',
    }
})

function TouchPad({ pressedButton, powerOn, volume, buttons }) {

    const style = useStyle();

    return (
        <div className={style.gridContainer}>
            {buttons.map((props, index) => {
                return(
                    <DrumButton 
                        key={index} 
                        id={props.button} 
                        button={props.button} 
                        pressedButton={pressedButton} 
                        sound={props.sound}
                        volume={volume}
                        power={powerOn}
                    />
                )
            })}
        </div>
    )
}

export default TouchPad