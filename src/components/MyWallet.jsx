import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CopyIcon } from '@radix-ui/react-icons'
import {
  Badge,
  Code,
  DataList,
  Flex,
  IconButton,
  Link,
  Text,
} from '@radix-ui/themes'
import React, { useContext, useEffect, useState } from 'react'
import { getBalance } from '../utils/contractFunctions'
import { AppContext } from '../App'

const MyWallet = () => {
  const { connectWallet, contract, signer, provider, isReload, setIsReload } =
    useContext(AppContext)

  const [balance, setBalance] = useState(0)

  const fetchBalance = async () => {
    if (!contract || !signer) return
    const address = await signer.getAddress()
    const _balance = await getBalance(contract, address)
    console.log(_balance)
    setBalance(_balance)
  }

  useEffect(() => {
    fetchBalance()
  }, [isReload])

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (error) {}
  }

  return (
    <div className="p-4 bg-[#fff] rounded-[4px] border-[1px] mb-4">
      <Flex align="center" justify="start" className="mb-4">
        <Text className="mr-2 font-semibold text-[20px]">My Wallet</Text>
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
              <Code variant="ghost">{contract.walletAddress}</Code>
              <IconButton
                size="1"
                aria-label="Copy value"
                color="gray"
                variant="ghost"
                onClick={() => handleCopy(contract.walletAddress)}
              >
                <CopyIcon />
              </IconButton>
            </Flex>
          </DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label minWidth="88px">Balance</DataList.Label>
          <DataList.Value>{balance} tokens</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </div>
  )
}

export default MyWallet
