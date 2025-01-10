import React, { createContext, useEffect, useState } from 'react'
import { useContract } from './hooks/useContract'
import Stake from './components/Stake'
import Unstake from './components/Unstake'
import Wallet from './components/Wallet'
import TokenTransfer from './components/TokenTransfer'
import { Box, Flex, Heading, Skeleton, Spinner, Table } from '@radix-ui/themes'
import Transfer from './components/Transfer'
import TransferFrom from './components/TransferFrom'
import OperationForm from './components/OperationForm'
import TransactionList from './components/TransactionList'
import MyWallet from './components/MyWallet'
import Header from './components/Header'
import Body from './components/Body'

export const AppContext = createContext()

const App = () => {
  const [logs, setLogs] = useState([])
  const [isReload, setIsReload] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { connectWallet, contract, signer, provider } = useContract()

  useEffect(() => {
    connectWallet()
  }, [])

  console.log('isLoading', isLoading)

  return contract ? (
    <AppContext.Provider
      value={{
        connectWallet,
        contract,
        signer,
        provider,
        logs,
        setLogs,
        isReload,
        setIsReload,
        isLoading,
        setIsLoading,
      }}
    >
      <Box className="h-[100vh] bg-[#f7f9ff]">
        {/* <h1>Staking DApp</h1>
        <button onClick={connectWallet}>Connect Wallet</button> */}

        <Header />

        <Body contract={contract} />
      </Box>

      {isLoading && (
        <Flex
          align="center"
          justify="center"
          className="w-[100vw] h-[100vh] fixed inset-y-0 bg-gray-500 bg-opacity-5 backdrop-blur-sm z-50"
        >
          <Spinner size="3" />
        </Flex>
      )}
    </AppContext.Provider>
  ) : (
    <Flex
      align="center"
      justify="center"
      className="w-[100vw] h-[100vh] fixed bg-gray-500 bg-opacity-5 backdrop-blur-sm z-50"
    >
      <Spinner size="3" />
    </Flex>
  )
}

export default App
