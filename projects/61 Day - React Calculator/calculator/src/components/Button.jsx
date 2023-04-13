import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyle = createUseStyles({
    button: {
        height: '60px',
    }   

})

function Button({ content, onClick, styling }) {

    const style = useStyle();

    return (
        <button 
            className={`${style.button} ${styling}`} 
            onClick={onClick} 
            value={content}
            >
                {content}
            </button>
    )
}

export default Button