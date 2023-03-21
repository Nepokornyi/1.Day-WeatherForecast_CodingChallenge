import React, { useState } from 'react'

import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'
import VideoBg from './assets/video.mp4';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <section className='page'>
            <div className="overlay"></div>
            <video src={VideoBg} muted autoPlay loop></video>
            <div className="page_content">
                <h1>Launching Soon</h1>
                <h3>Leave your email and we'll let you know once site goes live.</h3>
                
                <FlipClockCountdown
                    to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
                    className='flip-clock'
                    labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
                    duration={0.5}
                />

                <button className="notify-btn">Notify Me</button>
            </div>
        </section>
    </div>


  )
}

export default App
