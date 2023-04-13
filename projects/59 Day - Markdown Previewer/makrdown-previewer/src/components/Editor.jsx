import React from 'react'
import { createUseStyles } from 'react-jss'


const useStyle = createUseStyles({
    editor:{
        width: '100%',
        minHeight: '200px',
        margin: 0,
        padding: 0,
        border: 'none',
        display: 'block',
        resize: 'vertical'
    }
})

function Editor({ handleChange, initialValue }) {


    const style = useStyle();

    return (
        <>
            <textarea 
                className={style.editor}
                id='editor'
                value={initialValue}
                onChange={handleChange}>
            </textarea>

        </>
    )
}

export default Editor