import React, { useContext, useState } from 'react'
import { stakeTokens, unstakeTokens } from '../utils/contractFunctions'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { PersonIcon } from '@radix-ui/react-icons'
import { AppContext } from '../App'

const Unstake = () => {
  const {
    connectWallet,
    contract,
    signer,
    provider,
    isReload,
    setIsReload,
    setLogs,
  } = useContext(AppContext)

  const handleUnstake = async () => {
    if (!contract) return
    try {
      const res = await unstakeTokens(contract)
      alert('Unstaking successful!')
      setIsReload((prev) => !prev)
      setLogs((prev) => [...prev, res])

      console.log('res', res)
    } catch (error) {
      alert('Error unstaking tokens. Check console for details.')
    }
  }

  return (
    <Flex
      direction="column"
      align="stretch"
      justify="start"
      className="p-2 w-[280px] border-[1px] rounded-[4px] mb-2 bg-[#fff]"
    >
      <Text className="font-medium text-[16px] mb-2">Unstake tokens</Text>

      <Flex align="center" justify="end">
        <Button
          className="cursor-pointer !text-[14px] !px-4 !font-medium"
          onClick={handleUnstake}
        >
          Unstake
        </Button>
      </Flex>
    </Flex>
  )
}

export default Unstake
