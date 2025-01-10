import React, { useState } from 'react'
import { getBalance } from '../utils/contractFunctions'

const Wallet = ({ contract, signer }) => {
  const [balance, setBalance] = useState('0')

  const fetchBalance = async () => {
    if (!contract || !signer) return
    const address = await signer.getAddress()
    console.log(address)
    const _balance = await getBalance(contract, address)
    setBalance(_balance)
  }

  return (
    <div>
      <button onClick={fetchBalance}>Get Balance</button>
      <p>Your Balance: {balance} Tokens</p>
    </div>
  )
}

export default Wallet
