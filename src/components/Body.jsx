import { Flex } from '@radix-ui/themes'
import OperationForm from './OperationForm'
import MyWallet from './MyWallet'
import TransactionList from './TransactionList'
import LogList from './LogList'

const Body = ({ contract, signer }) => {
  return (
    <Flex align="start" justify="between" className="px-4 py-6 pt-8">
      <OperationForm contract={contract} />

      <Flex align="end" justify="start" direction="column" className="px-4">
        <MyWallet contract={contract} signer={signer} />
        <TransactionList />
      </Flex>
      <LogList />
    </Flex>
  )
}

export default Body
