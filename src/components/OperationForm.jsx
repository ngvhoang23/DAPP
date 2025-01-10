import { Flex } from '@radix-ui/themes'
import React from 'react'
import Stake from './Stake'
import Unstake from './Unstake'
import Transfer from './Transfer'
import TransferFrom from './TransferFrom'

const OperationForm = ({ contract }) => {
  return (
    <Flex direction="column">
      <Stake contract={contract} />
      <Unstake contract={contract} />
      <Transfer contract={contract} />
      {/* <TransferFrom contract={contract} /> */}
    </Flex>
  )
}

export default OperationForm
