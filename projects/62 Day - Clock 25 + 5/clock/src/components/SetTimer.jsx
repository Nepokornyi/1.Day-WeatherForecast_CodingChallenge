import React from 'react'

import { createUseStyles } from 'react-jss'

const useStyle = createUseStyles({
    timerControls: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    }
})

function SetTimer({ title, value, setValue, isPlaying }) {

    const style = useStyle();

    const handleSubtractValue = () => {
        if(value > 1){
            setValue(value - 1);
        }
    }

    const handleAddValue = () => {
        setValue(value + 1);
    }

    return (
        <div>
            <h2>{title}</h2>
            <div className={style.timerControls}>
                <button onClick={!isPlaying ? handleSubtractValue : undefined}><i className="fa fa-arrow-down fa-2x" /></button>
                <div>{value}</div>
                <button onClick={!isPlaying ? handleAddValue : undefined}><i className="fa fa-arrow-up fa-2x" /></button>
            </div>
        </div>
    )
}

export default SetTimer