import React from 'react'
import { createUseStyles } from 'react-jss'

const useStyle = createUseStyles({
    header: {
        width: '100%',
        backgroundColor: '#4aa3a3',
        display: 'flex',
        alignItems: 'center',
        padding: '0 15px',
        gap: '10px',
        '& i': {
            fontSize: '24px'
        },
        '& .fa-arrows-alt': {
            marginLeft: 'auto',
            transform: 'rotate(45deg)',
            cursor: 'pointer'
        }
    }
})

function Header({ title, onExpand, resetHeight }) {

    const style = useStyle();

    const handleExpand = () => {
        onExpand();
        resetHeight();
    }


    return (
        <div className={style.header}>
            <i className="fa-brands fa-free-code-camp"></i>
            <h3 className={style.title}>{title}</h3>
            <i className="fa fa-arrows-alt" onClick={handleExpand}></i>
        </div>
    )
}

export default Header