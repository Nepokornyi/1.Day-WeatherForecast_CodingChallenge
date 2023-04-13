import React from 'react'

import { createUseStyles } from 'react-jss'

const useStyle = createUseStyles({
    container: {
        backgroundColor: '#242424'
    },
    displayStyle:{
        width: '100%',
        textAlign: 'right',
        paddingRight: '20px',
        paddingLeft: '10px',
        backgroundColor: '#242424'
    },
    formula: {
        fontSize: '1rem',
        height: '25px',
        color: 'orange'
    },
    screen: {
        fontSize: '2rem',
        height: '80px',
        border: 'none',
    },

})

function CalculatorScreen({ value, formula }) {

    const style = useStyle();

    return (
        <div className={style.container}>
            <div className={`${style.formula} ${style.displayStyle}`}>{formula}</div>
            <input type="text" className={`${style.screen} ${style.displayStyle}`} value={value} disabled />
        </div>

    )
}

export default CalculatorScreen