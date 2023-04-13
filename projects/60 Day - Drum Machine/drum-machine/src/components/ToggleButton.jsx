import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

const useStyle = createUseStyles({
    inputToggle: {
        display: 'flex',
        flexDirection: 'column',
        color: 'black',
        '& label': {
            fontWeight: '500',
            fontSize: '18px'
        },
        '& input': {
            display: 'none'
        }
    },

    customCheckbox: ({checkboxStyle}) => ({
        backgroundColor: 'black',
        width: '60px',
        height: '30px',
        cursor: 'pointer',
        position: 'relative',
        '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            ...(checkboxStyle ? {right: 0} : { left: 0 }),
            backgroundColor: checkboxStyle ? 'blue' : 'lightblue',
            width: '20px',
            height: '20px',
            margin: '5px',
        }
    })
    
})

function ToggleButton({ type, isToggled, setIsToggled }) {

    const [checkboxStyle, setCheckboxStyle] = useState(false);

    const style = useStyle({ checkboxStyle })

    const handleCheckboxChange = () => {
        setCheckboxStyle(!checkboxStyle)
        setIsToggled(!isToggled)
    }



    return (
        <div className={style.inputToggle}>
            <label htmlFor={type}>{type}</label>
            <label className={style.customCheckbox} htmlFor={type}></label>
            <input type="checkbox" name={type} id={type} onChange={handleCheckboxChange} />
        </div>
    )
}

export default ToggleButton