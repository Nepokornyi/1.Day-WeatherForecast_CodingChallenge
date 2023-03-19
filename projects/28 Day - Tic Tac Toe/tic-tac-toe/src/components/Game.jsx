import React, {useState} from 'react'

import Board from './Board'
import {calculateWinner} from '../helpers'


const style = {
    width: '200px',
    margin: '20px auto'
}


function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [step, setStep] = useState(0);
    const [xNext, setXNext] = useState(true);
    const winner = calculateWinner(history[step])

    const handleClick = (i) => {
        const story = history.slice(0, step + 1);
        const current = story[step];
        const squares = [...current];

        if(winner || squares[i]) return;

        squares[i] = xNext ? 'X' : 'O';

        setHistory([...story, squares]);
        setStep(story.length);
        setXNext(!xNext);
    }

    const jumpTo = (step) => {
        setStep(step);
        setXNext(step % 2 === 0);
    }


    
    const renderMoves = () => {
        return history.map((_step, move) => {
            const destination = move ? `Go to move#${move}` : 'Go to start';
            return(
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            )
        })
    }

    return(
        <>
            Tic Tac Toe
            <Board squares={history[step]} handleClick={handleClick} />
            <div style={style}>
                <p>{winner ? 'Winner: ' + winner : 'Next Player: ' + (xNext ? 'X' : 'O')}</p>
                {renderMoves()}
            </div>
        </>
    )
}

export default Game