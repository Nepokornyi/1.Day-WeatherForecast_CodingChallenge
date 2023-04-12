import React from 'react'
import Header from './Header'
import { createUseStyles } from 'react-jss';

const useStyle = createUseStyles({
    container: props => ({
        position: 'relative',
        boxShadow: '0 0px 20px rgba(255, 255, 255, 0.5)',
        width: props.width,
        margin: '1.25rem'
    })
})

function Content({ width, title, children }) {

    const style = useStyle({ width });

    return (
        <div className={style.container}>
            <Header title={title} />
            {children}
        </div>
    )
}

export default Content