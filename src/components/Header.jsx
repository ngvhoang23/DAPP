import { Button, Flex, Heading } from '@radix-ui/themes'
import React from 'react'
import CreateWallet from './CreateWallet'

const Header = () => {
  return (
    <Flex
      align="center"
      justify="between"
      className="w-[100vw] p-4 border-[1px] bg-[#fff]"
    >
      <Heading>Staking DApp</Heading>
      <CreateWallet />
    </Flex>
  )
}

export default Header
