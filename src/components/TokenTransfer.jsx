import React, { useState } from 'react'
import { ethers } from 'ethers'

const TokenTransfer = ({ contract, provider }) => {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [transactionHash, setTransactionHash] = useState('')
  const [error, setError] = useState('')

  // Hàm xử lý chuyển token
  const handleTransfer = async () => {
    try {
      // Chuyển đổi số lượng từ ETH sang đơn vị của token (thường là 18 decimals)
      const tokenAmount = ethers.utils.parseUnits('1.0', 18)

      // Gửi giao dịch chuyển token
      const tx = await contract.transfer(recipient, tokenAmount)

      // Chờ giao dịch được xác nhận
      const receipt = await tx.wait()

      setTransactionHash(receipt.transactionHash)
      alert('Giao dịch thành công!')
    } catch (err) {
      console.error('Lỗi khi chuyển token:', err)
      setError(err.message || 'Đã xảy ra lỗi khi chuyển token.')
    }
  }

  return (
    <div>
      <h2>Chuyển Token</h2>
      <div>
        <label>
          Địa chỉ người nhận:
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0x..."
          />
        </label>
      </div>
      <div>
        <label>
          Số lượng token:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Nhập số lượng"
          />
        </label>
      </div>
      <button onClick={handleTransfer}>Gửi Token</button>
      {transactionHash && (
        <div>
          <p>Giao dịch thành công!</p>
          <p>
            Hash giao dịch:{' '}
            <a
              href={`https://etherscan.io/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {transactionHash}
            </a>
          </p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>Lỗi: {error}</p>}
    </div>
  )
}

export default TokenTransfer
