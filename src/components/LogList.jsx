import { Code, Flex, ScrollArea } from '@radix-ui/themes'
import React, { useContext, useEffect, useRef } from 'react'
import { AppContext } from '../App'

const LogList = () => {
  const { connectWallet, contract, signer, provider, logs } =
    useContext(AppContext)

  useEffect(() => {
    ;(async () => {
      const blockNumber = await provider.getBlockNumber() // Lấy số block hiện tại
      let allTransactions = []

      // Duyệt qua các block từ block 0 đến block hiện tại
      for (let i = 0; i <= blockNumber; i++) {
        const block = await provider.getBlockWithTransactions(i) // Lấy block với tất cả giao dịch
        allTransactions = [...allTransactions, ...block.transactions]
      }

      const tx1 = await provider.getTransactionReceipt(allTransactions[0].hash)

      const receipt1 = await provider.getTransactionReceipt(
        allTransactions[0].hash
      )

      receipt1.logs.forEach((log) => {
        try {
          const parsedLog = contract.interface.parseLog(log)
        } catch (err) {
          console.log('Unparsed Log:', log)
        }
      })
    })()
  }, [])

  const lastRef = useRef()

  useEffect(() => {
    lastRef.current.scrollIntoView({
      behavior: 'smooth',
    })
  }, [logs])

  return (
    <div className="w-full">
      <ScrollArea
        type="always"
        scrollbars="vertical"
        style={{ height: '80vh', width: '490px' }}
        className="w-full bg-[#fff] p-2 border-[1px] rounded-[4px]"
      >
        <Flex align="start" justify="start" direction="column">
          {logs.map((log) => {
            return (
              <pre
                className="mb-2 text-[12px]"
                style={{
                  backgroundColor: '#f4f4f4',
                  padding: '15px',
                  borderRadius: '5px',
                  whiteSpace: 'pre-wrap',
                  wordWrap: 'break-word',
                  overflowX: 'auto',
                }}
              >
                {JSON.stringify(log, null, 2)}
              </pre>
            )
          })}
          <div ref={lastRef}></div>
        </Flex>
      </ScrollArea>
    </div>
  )
}

export default LogList
