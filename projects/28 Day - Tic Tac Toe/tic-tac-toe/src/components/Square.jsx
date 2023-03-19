import React from 'react'

const style = {
    fontSize: '30px'
}

function Square({value, handleClick}) {
  return (
    <button style={style} onClick={handleClick}>{value}</button>
  )
}

export default Square