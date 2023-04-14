import { useState } from 'react'
import SetTimer from './components/SetTimer';
import Timer from './components/Timer';
import TimerControl from './components/TimerControl';

import {createUseStyles} from 'react-jss'
import './App.css'

const useStyle = createUseStyles({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    timers: {
        display: 'flex',
        gap: '50px'
    }
})

function App() {

    const style = useStyle();

    const [sessionLength, setSessionLength] = useState(25);
    const [breakLength, setBreakLength] = useState(5);
    const [timeBreak, setTimeBreak] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);


    return (
        <div className={style.mainContainer}>

            <h1>25 + 5 Clock</h1>

            <div className={style.timers}>
                <SetTimer 
                    title='Session Length' 
                    value={sessionLength} 
                    setValue={setSessionLength} 
                    isPlaying={isPlaying} />
                <SetTimer 
                    title='Break Length' 
                    value={breakLength} 
                    setValue={setBreakLength}
                    isPlaying={isPlaying} />
            </div>

            <Timer 
                isPlaying={isPlaying} 
                value={timeBreak ? breakLength : sessionLength}
                timeBreak={timeBreak}
                setTimeBreak={setTimeBreak} />

            <TimerControl 
                setSession={setSessionLength}
                setBreaking={setBreakLength}
                setIsPlaying={setIsPlaying} />
        </div>
    )
}

export default App
