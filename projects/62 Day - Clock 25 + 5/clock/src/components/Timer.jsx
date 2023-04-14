import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

const useStyle = createUseStyles({
    timer: {
        padding: '40px',
        margin: '25px',
        border: '1px solid #646cff',
        borderRadius: '50%'
    },
    lastMinute: {
        color: 'red'
    }
})

function Timer({ value, isPlaying, timeBreak, setTimeBreak }) {

    const style = useStyle();

    const [time, setCurrentTime] = useState(value * 60);

    useEffect(() => {
        if (time === 0) {
            setTimeBreak(!timeBreak)
        }
    }, [time])

    useEffect(() => {
        setCurrentTime(value * 60)
    }, [value, timeBreak])

    useEffect(() => {
        let timerId = null;

        if (isPlaying) {
            timerId = setInterval(() => {
                setCurrentTime(time - 1);
            }, 1000)
        }

        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
        }

    }, [isPlaying, time]);

    const remainingMinutes = Math.floor(time / 60).toString().padStart(2, '0');
    const remainingSeconds = (time % 60).toString().padStart(2, '0');

    return (
        <div className={`${style.timer} ${time < 60 ? style.lastMinute : ''}`}>
            Session <br />
            {remainingMinutes}:{remainingSeconds}
        </div>
    )
}

export default Timer