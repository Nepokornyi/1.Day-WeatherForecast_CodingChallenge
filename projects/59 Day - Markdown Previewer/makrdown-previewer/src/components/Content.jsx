import React, {useState} from 'react'
import Header from './Header'
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
    container: props => ({
        position: 'relative',
        minWidth: '450px',
        boxShadow: '0 0px 20px rgba(255, 255, 255, 0.5)',
        width: props.width,
        margin: '1.25rem'
    }),
    editor_expanded: {
        '& textarea': {
            resize: 'none',
            height: 'calc(100% - 65px)'
        },
        height: '85vh'  
    },
    preview_expanded: {
        
    },
    hidden: {
        display: 'none'
    }
})

function Content({ width, title, children, onExpand, expandedWindow }) {

    const style = useStyle({ width });
    let containerClass = [style.container]

    const handleExpand = () => {
        onExpand(title);
        resetTextareaHeight();
    }

    const resetTextareaHeight = () => {
        const textarea = document.getElementById('editor');
        textarea.style.removeProperty('height');
    }

    if(expandedWindow.title === title) {
        let formattedTitle = title.replace(/ /g, '_').toLowerCase();
        containerClass.push(style[`${formattedTitle}_expanded`]);
    }
    else if(expandedWindow.title !== null){
        containerClass.push(style.hidden)
    }


    return (
        <div className={containerClass.join(' ')}>
            <Header title={title} onExpand={handleExpand} resetHeight={resetTextareaHeight} />
            {children}
        </div>
    )
}

export default Content