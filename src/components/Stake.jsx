import React, { useContext, useState } from 'react'
import { stakeTokens } from '../utils/contractFunctions'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { PersonIcon } from '@radix-ui/react-icons'
import { AppContext } from '../App'

const Stake = () => {
  const {
    connectWallet,
    contract,
    signer,
    provider,
    isReload,
    setIsReload,
    setLogs,
  } = useContext(AppContext)

  const [amount, setAmount] = useState('')

  const handleStake = async () => {
    if (!contract) return
    try {
      const res = await stakeTokens(contract, amount)
      setAmount('')
      alert('Staking successful!')
      setIsReload((prev) => !prev)
      setLogs((prev) => [...prev, res])
    } catch (error) {
      alert('Error staking tokens. Check console for details.')
    }
  }

  return (
    <Flex
      direction="column"
      align="stretch"
      justify="start"
      className="p-2 w-[280px] border-[1px] rounded-[4px] mb-2 bg-[#fff]"
    >
      <Text className="font-medium text-[16px] mb-2">Stake</Text>
      <Flex align="center" justify="end" className="mb-2">
        <Text className="text-[12px] mr-2">amount:</Text>
        <TextField.Root
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount to Stake"
          className="border-none focus:border-none shadow-none focus:shadow-none"
          size={4}
        ></TextField.Root>
      </Flex>

      <Flex align="center" justify="end">
        <Button
          className="cursor-pointer !text-[14px] !px-4 !font-medium"
          onClick={handleStake}
        >
          Stake
        </Button>
      </Flex>
    </Flex>
  )
}

export default Stake
