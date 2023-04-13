import { useState } from 'react'
import { useCalculator } from './utils/useCalculator'
import './App.css'
import { createUseStyles } from 'react-jss'
import CalculatorScreen from './components/CalculatorScreen'
import Numpad from './components/Numpad'

const useStyle = createUseStyles({
    container: {
        backgroundColor: 'black',
        padding: '10px',
        display: 'grid',
    }
})

function App() {

    const style = useStyle()

    const { value, formula, appendInput, appendOperation, calculate, reset } = useCalculator();

    return (
        <div className={style.container}>
            <CalculatorScreen 
                formula={formula}
                value={value} />
            <Numpad 
                appendInput={appendInput} 
                appendOperation={appendOperation} 
                calculate={calculate} 
                reset={reset} />
        </div>
    )
}

export default App
