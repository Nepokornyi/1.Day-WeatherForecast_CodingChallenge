import React, {useContext} from 'react'

import { GlobalContext } from '../../context/GlobalState'

function Balance() {

  const { transactions } = useContext(GlobalContext);
  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  return (
    <>
        <h4 className='balance-header'>Your Balance</h4>
        <p id='balance'>${total}</p>
    </>
  )
}

export default Balance