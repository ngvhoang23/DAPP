import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CopyIcon } from '@radix-ui/react-icons'
import {
  Button,
  Code,
  DataList,
  Dialog,
  Flex,
  IconButton,
  Text,
} from '@radix-ui/themes'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { ethers } from 'ethers'
import { getBalance } from '../utils/contractFunctions'

const CreateWallet = () => {
  const { connectWallet, contract, signer, provider, isReload, setIsReload } =
    useContext(AppContext)

  const [newWallet, setNewWallet] = useState({})

  const fetchBalance = async (address) => {
    if (!contract) return
    const _balance = await getBalance(contract, address)
    return _balance
  }

  const createNewWallet = async () => {
    const wallet = ethers.Wallet.createRandom() // Tạo một ví ngẫu nhiên
    const res = await fetchBalance(wallet.address)
    wallet.balance = res
    setNewWallet(wallet)
  }

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {}
  }

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button onClick={createNewWallet}>Create a wallet</Button>
        </Dialog.Trigger>

        <Dialog.Content
          maxWidth="450px"
          className="p-4 bg-[#fff] rounded-[4px] border-[1px]"
        >
          <Flex align="center" justify="start" className="mb-4">
            <Text className="mr-2 font-semibold text-[20px]">New Wallet</Text>
            <FontAwesomeIcon
              icon={faWallet}
              className="text-[30px] text-[#3e63dd]"
            />
          </Flex>
          <DataList.Root>
            <DataList.Item>
              <DataList.Label minWidth="88px">Address</DataList.Label>
              <DataList.Value>
                <Flex align="center" gap="2">
                  <Code variant="ghost">{newWallet.address}</Code>
                  <IconButton
                    size="1"
                    aria-label="Copy value"
                    color="gray"
                    variant="ghost"
                    onClick={() => handleCopy(newWallet?.address)}
                  >
                    <CopyIcon />
                  </IconButton>
                </Flex>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">Balance</DataList.Label>
              <DataList.Value>{newWallet.balance} tokens</DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  )
}

export default CreateWallet
