import { useState } from 'react'

import Header from './components/Header/Header'
import Balance from './components/Balance/Balance'
import IncomeExpenses from './components/IncomeExpenses/IncomeExpenses'
import TransactionList from './components/TransactionList/TransactionList'
import AddTransaction from './components/AddTransaction/AddTransaction'

import { GlobalProvider } from './context/GlobalState'




function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <GlobalProvider>
            <Header />
            <div className="container">
                <Balance />
                <IncomeExpenses />
                <TransactionList />
                <AddTransaction />
            </div>
        </GlobalProvider>

    </div>
  )
}

export default App
