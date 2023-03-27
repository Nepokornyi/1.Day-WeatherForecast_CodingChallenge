import { useState } from 'react'
import Card from './Card'
import './App.css'

function App() {
    const [backgroundColor, setBackgroundColor] = useState('')

    const generateNewColor = () => {
        setBackgroundColor(`#${Math.floor(Math.random()*16777215).toString(16)}`);
    }

return (
    <div style={{backgroundColor: backgroundColor}} className="App">
        <Card onNewQuote={generateNewColor} />
    </div>
)
}

export default App
