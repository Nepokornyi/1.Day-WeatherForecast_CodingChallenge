import React from 'react'

import { createUseStyles } from 'react-jss'

const useStyle = createUseStyles({
    controls: {
        display: 'flex',
        gap: '20px',
    }
})

function TimerControl({ setSession, setBreaking, setIsPlaying}) {

    const style = useStyle();

    const handlePlay = () => {setIsPlaying(true)}
    const handleStop = () => {setIsPlaying(false)}

    const handleReset = () => {
        setSession(25);
        setBreaking(5);
        setIsPlaying(false);
    }

    return (
        <div className={style.controls}>
            <button onClick={handlePlay}><i className="fa fa-play fa-2x" /></button>
            <button onClick={handleStop}><i className="fa fa-pause fa-2x" /></button>
            <button onClick={handleReset}><i className="fa fa-refresh fa-2x"></i></button>
        </div>
    )
}

export default TimerControl