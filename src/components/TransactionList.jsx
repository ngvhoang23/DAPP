import { Flex, IconButton, ScrollArea, Table, Text } from '@radix-ui/themes'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { ethers } from 'ethers'

const pageSize = 8 // Số dòng mỗi trang

const TransactionList = () => {
  const [page, setPage] = useState(1)
  const [transactions, setTransactions] = useState([])

  const {
    connectWallet,
    contract,
    signer,
    provider,
    isLoading,
    setIsLoading,
    isReload,
  } = useContext(AppContext)

  const getTransactionList = async () => {
    setIsLoading(true)
    const blockNumber = await provider.getBlockNumber() // Lấy số block hiện tại

    let allTransactions = []

    const transactions = []

    // Duyệt qua các block từ block 0 đến block hiện tại
    for (let i = 0; i <= blockNumber; i++) {
      const block = await provider.getBlockWithTransactions(i) // Lấy block với tất cả giao dịch
      const transInBlock = block.transactions.map((trans) => {
        return { ...trans, time: block.timestamp }
      })
      allTransactions = [...allTransactions, ...transInBlock]
    }

    console.log('allTransactions ==>', allTransactions)

    allTransactions.forEach(async (trans, index) => {
      let amount = 0
      let fee = 0
      let from = ''
      let to = ''

      try {
        const transaction = await provider.getTransaction(trans.hash)
        const receipt = await provider.getTransactionReceipt(trans.hash)

        const parsedLog = contract.interface.parseLog(
          receipt.logs[receipt.logs.length - 1]
        )

        from = parsedLog.args.from
        to = parsedLog.args.to

        amount = ethers.utils.formatEther(parsedLog.args.value)

        const gasUsed = receipt.gasUsed
        const gasPrice = transaction.gasPrice

        // Tính phí giao dịch (gas used * gas price)
        const transactionFee = gasUsed.mul(gasPrice) // Phí giao dịch tính bằng wei

        // Chuyển đổi phí giao dịch từ Wei sang Ether
        const transactionFeeInEther = ethers.utils.formatEther(transactionFee)
        fee = transactionFeeInEther
      } catch (error) {
        console.log('error', error)
      }

      const transaction = {
        TransactionHash: trans.hash,
        Block: trans.blockNumber,
        Time: trans.time,
        Instructions:
          to === contract.address
            ? 'Stake'
            : from === contract.address
            ? 'Unstake'
            : 'Transfer',
        FromAddress: from,
        ToAddress: to,
        Amount: amount,
        Fee: fee,
      }

      transactions.push(transaction)

      if (index === allTransactions.length - 1) {
        setTransactions(transactions)
        setIsLoading(false)
      }
    })
  }

  useEffect(() => {
    getTransactionList()
  }, [isReload])

  // Tính toán dữ liệu cho trang hiện tại
  const startIndex = (page - 1) * pageSize
  const currentData = transactions.slice(startIndex, startIndex + pageSize)

  // Tổng số trang
  const totalPages = Math.ceil(transactions.length / pageSize)

  const handlePageChange = (page) => {
    setPage(page)
  }

  return (
    <div className="max-w-[700px]">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>TransactionHash</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Block</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Time</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Instructions</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>FromAddress</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>ToAddress</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Amount</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fee</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {currentData.map((trans, index) => {
            return (
              <Table.Row key={trans.TransactionHash}>
                <Table.RowHeaderCell>
                  {/* <Text className="max-w-9" truncate>
                    {trans.TransactionHash}
                  </Text> */}

                  <Flex maxWidth="160px">
                    <Text truncate>{trans.TransactionHash}</Text>
                  </Flex>
                </Table.RowHeaderCell>
                <Table.Cell>{trans.Block}</Table.Cell>
                <Table.Cell>{trans.Time}</Table.Cell>
                <Table.Cell>{trans.Instructions}</Table.Cell>
                <Table.Cell>{trans.FromAddress}</Table.Cell>
                <Table.Cell>{trans.ToAddress}</Table.Cell>
                <Table.Cell>{trans.Amount}</Table.Cell>
                <Table.Cell>
                  <p className="text-nowrap">{`${parseFloat(trans.Fee).toFixed(
                    4
                  )} ETH`}</p>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table.Root>

      <Flex className="mt-2" align="center" justify="end">
        {Array.from({ length: totalPages }, (_, index) => {
          return (
            <IconButton
              key={index}
              className={
                index + 1 === page
                  ? '!mx-2 !outline-none'
                  : '!mx-2 !border-[1px] !border-[#3358d4] !border-solid !bg-[#fff] !text-[#3358d4] !outline-none'
              }
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </IconButton>
          )
        })}
      </Flex>
    </div>
  )
}

export default TransactionList
