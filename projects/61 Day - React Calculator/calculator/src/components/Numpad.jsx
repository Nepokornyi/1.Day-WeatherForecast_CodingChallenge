import React from 'react'
import Button from './Button'

import { createUseStyles } from 'react-jss'

const useStyle = createUseStyles({
    gridContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '10px',
        padding: '10px',
        minWidth: '400px'
    },

    operator: {
        color: '#337cac',
    },
    zero: {
        gridRowStart: 5,
        gridColumnStart: 1,
        gridColumnEnd: 3,
    },
    allClear: {
        backgroundColor: '#f0595f',
        gridRowStart: 1,
        gridColumnStart: 1,
        gridColumnEnd: 3,
        '&:hover': {
            backgroundColor: '#f17377'
        }
    },
    equalSign: {
        backgroundColor: '#2e86c0',
        gridRowStart: 4,
        gridRowEnd: 6,
        gridColumnStart: 4,
        height: '100%',
        '&:hover': {
            backgroundColor: '#4e9ed4'
        }
    }
})

function Numpad({ setValue, appendInput, appendOperation, calculate, reset }) {

    const style = useStyle()

    const buttons = [
        {content: '/', type: 'operation', class:style.operator},
        {content: '*', type: 'operation', class:style.operator},
        {content: '7', type: 'number'},
        {content: '8', type: 'number'},
        {content: '9', type: 'number'},
        {content: '-', type: 'operation', class:style.operator},
        {content: '4', type: 'number'},
        {content: '5', type: 'number'},
        {content: '6', type: 'number'},
        {content: '+', type: 'operation', class:style.operator},
        {content: '1', type: 'number'},
        {content: '2', type: 'number'},
        {content: '3', type: 'number'},
        {content: '0', type: 'number', class:style.zero},
        {content: '.', type: 'dot', class:style.decimal},
        {content: 'AC', type: 'reset', class:style.allClear},
        {content: '=', type: 'equal', class:style.equalSign}
    ]

    return (
        <div className={style.gridContainer}>
            {buttons.map((button, index) => {
                return <Button 
                            content={button.content} 
                            key={index}
                            styling={button.class} 
                            onClick={() => {
                                switch (button.type) {
                                    case 'number':
                                    case 'dot':
                                        appendInput(button.content)
                                        break;
                                    case 'operation':
                                        appendOperation(button.content)
                                        break;
                                    case 'reset':
                                        reset();
                                        break;
                                    case 'equal':   
                                        calculate()
                                        break;
                                    default:
                                        break;
                                }
                            }} />
            })

            }
        </div>
    )
}

export default Numpad