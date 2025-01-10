import React, { useContext, useState } from 'react'
import { stakeTokens } from '../utils/contractFunctions'
import { Box, Button, Flex, Text, TextField } from '@radix-ui/themes'
import { PersonIcon } from '@radix-ui/react-icons'
import { AppContext } from '../App'
import { ethers } from 'ethers'

const TransferFrom = () => {
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

  const transferTokens = async () => {
    try {
      // Kiểm tra xem người dùng có MetaMask không
      if (!window.ethereum) {
        throw new Error('MetaMask chưa được cài đặt!')
      }

      // Tạo giao dịch chuyển token sử dụng ABI "transferFrom"
      const tx = await contract.transferFrom(
        fromAdd,
        toAdd,
        ethers.utils.parseUnits(amount, 18)
      )

      // Gửi giao dịch
      const transactionResponse = await tx.wait() // Chờ giao dịch xác nhận

      console.log('Giao dịch thành công:', transactionResponse)

      setIsReload((prev) => !prev)
      setLogs((prev) => [...prev, transactionResponse])

      return transactionResponse
    } catch (error) {
      console.error('Lỗi khi chuyển token:', error)
      throw error
    }
  }

  return (
    <Flex
      direction="column"
      align="stretch"
      justify="start"
      className="p-2 w-[280px] border-[1px] rounded-[4px] mb-2 bg-[#fff]"
    >
      <Text className="font-medium text-[16px] mb-2">TransferFrom</Text>

      <Flex align="center" justify="end" className="mb-2">
        <Text className="text-[12px] mr-2">from:</Text>
        <TextField.Root
          type="text"
          value={fromAdd}
          onChange={(e) => setFromAdd(e.target.value)}
          placeholder="address"
          className="border-none focus:border-none shadow-none focus:shadow-none"
          size={4}
        ></TextField.Root>
      </Flex>

      <Flex align="center" justify="end" className="mb-2">
        <Text className="text-[12px] mr-2">to:</Text>
        <TextField.Root
          type="text"
          value={toAdd}
          onChange={(e) => setToAdd(e.target.value)}
          placeholder="address"
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
          onClick={transferTokens}
        >
          TransferFrom
        </Button>
      </Flex>
    </Flex>
  )
}

export default TransferFrom
