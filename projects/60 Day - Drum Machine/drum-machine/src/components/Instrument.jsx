import React, {useState, useEffect} from 'react'
import { createUseStyles } from 'react-jss'
import TouchPad from './TouchPad';
import Controls from './Controls';

import Heater1 from '../assets/sounds/Heater-1.mp3'
import Heater2 from '../assets/sounds/Heater-2.mp3'
import Heater3 from '../assets/sounds/Heater-3.mp3'

import Heater4 from '../assets/sounds/Heater-4.mp3'
import Clap from '../assets/sounds/Clap.mp3'
import OpenHH from '../assets/sounds/OpenHH.mp3'

import Kick_n_Hat from '../assets/sounds/Kick_n_Hat.mp3'
import Kick from '../assets/sounds/Kick.mp3'
import ClosedHH from '../assets/sounds/ClosedHH.mp3'

const useStyle = createUseStyles({

    instrumentBox: {
        backgroundColor: '#b3b3b3',
        padding: '20px',
        border: '2px solid orange',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',

    }

})

function Instrument() {

    const style = useStyle();
    const [lastButton, setLastButton] = useState({ key: '', phrase: '' });
    const [powerOn, setPowerOn] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const buttons = 
    [
        {button: 'q', sound: Heater1, phrase: 'Heater1'}, 
        {button: 'w', sound: Heater2, phrase: 'Heater2'}, 
        {button: 'e', sound: Heater3, phrase: 'Heater3'}, 
        {button: 'a', sound: Heater4, phrase: 'Heater4'}, 
        {button: 's', sound: Clap, phrase: 'Clap'}, 
        {button: 'd', sound: OpenHH, phrase: 'OpenHH'}, 
        {button: 'z', sound: Kick_n_Hat, phrase: 'Kick_n_Hat'}, 
        {button: 'x', sound: Kick, phrase: 'Kick'}, 
        {button: 'c', sound: ClosedHH, phrase: 'ClosedHH'}
    ]

    useEffect(() => {

        const keydownHandler = (e) => {
            const key = e.key.toLowerCase();
            const buttonInfo = buttons.find(btn => btn.button === key);
            const phrase = buttonInfo ? buttonInfo.phrase : '';
            setLastButton({ key, phrase })
        }

        window.addEventListener('keydown', keydownHandler);
        
        return () => {
            window.removeEventListener('keydown', keydownHandler)
        }
    }, [])

    return (
        <div className={style.instrumentBox}>
            <TouchPad 
                pressedButton={lastButton}
                powerOn={powerOn} 
                volume={volume} 
                buttons={buttons} />
            <Controls 
                pressedButton={lastButton}
                powerOn={powerOn}
                setPowerOn={setPowerOn} 
                volume={volume} 
                setVolume={setVolume} />
        </div>
    )
}

export default Instrument