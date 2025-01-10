import React, { useContext, useState } from 'react'
import { stakeTokens } from '../utils/contractFunctions'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { PersonIcon } from '@radix-ui/react-icons'
import { AppContext } from '../App'
import { ethers } from 'ethers'

const Transfer = () => {
  const {
    connectWallet,
    contract,
    signer,
    provider,
    isReload,
    setIsReload,
    setLogs,
  } = useContext(AppContext)

  const [fromAdd, setFromAdd] = useState('')
  const [toAdd, setToAdd] = useState('')
  const [amount, setAmount] = useState('')

  // Hàm xử lý chuyển token
  const handleTransfer = async () => {
    try {
      // Chuyển đổi số lượng từ ETH sang đơn vị của token (thường là 18 decimals)
      const tokenAmount = ethers.utils.parseUnits(amount, 18)

      // Gửi giao dịch chuyển token
      const tx = await contract.transfer(toAdd, tokenAmount)

      // Chờ giao dịch được xác nhận
      const receipt = await tx.wait()

      // setTransactionHash(receipt.transactionHash)
      setToAdd('')
      setAmount('')
      alert('Giao dịch thành công!')
      setIsReload((prev) => !prev)
      setLogs((prev) => [...prev, receipt])
    } catch (err) {
      console.error('Lỗi khi chuyển token:', err)
    }
  }

  return (
    <Flex
      direction="column"
      align="stretch"
      justify="start"
      className="p-2 w-[280px] border-[1px] rounded-[4px] mb-2 bg-[#fff]"
    >
      <Text className="font-medium text-[16px] mb-2">Transfer</Text>
      <Flex align="center" justify="end" className="mb-2">
        <Text className="text-[12px] mr-2">to:</Text>
        <TextField.Root
          type="text"
          value={toAdd}
          onChange={(e) => setToAdd(e.target.value)}
          placeholder="Address"
          className="border-none focus:border-none shadow-none focus:shadow-none"
          size={4}
        ></TextField.Root>
      </Flex>

      <Flex align="center" justify="end" className="mb-2">
        <Text className="text-[12px] mr-2">value:</Text>
        <TextField.Root
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="uint256"
          className="border-none focus:border-none shadow-none focus:shadow-none"
          size={4}
        ></TextField.Root>
      </Flex>

      <Flex align="center" justify="end">
        <Button
          className="cursor-pointer !text-[14px] !px-4 !font-medium"
          onClick={handleTransfer}
        >
          Transfer
        </Button>
      </Flex>
    </Flex>
  )
}

export default Transfer
