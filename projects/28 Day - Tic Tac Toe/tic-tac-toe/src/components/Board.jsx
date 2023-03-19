import React from 'react'
import Square from './Square'


const style = {
    border: '4px solid #646cff',
    borderRadius: '10px',
    width: '250px',
    height: '250px',
    margin: '0 auto',
    display: 'grid',
    gridTemplate: 'repeat(3, 1fr) / repeat(3, 1fr)'
}

function Board({squares, handleClick}) {

    return (
        <div style={style}>
        {
            squares.map((square, i) => {
            return(
                <Square key={i} value={square} handleClick={() => handleClick(i)} />
                )
            })
        }
        </div>
    )
}

export default Board