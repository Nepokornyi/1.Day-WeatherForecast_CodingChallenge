import React, {useState} from 'react'
import { createUseStyles } from 'react-jss'


const useStyle = createUseStyles({
    editor:{
        width: '100%',
        minHeight: '200px',
        margin: 0,
        padding: 0,
        border: 'none',
        display: 'block'
    }
})

function Editor({ handleChange }) {

    const style = useStyle();

    return (
        <>
            <textarea 
                className={style.editor}
                id='editor'
                onChange={handleChange}>

            </textarea>

        </>
    )
}

export default Editor