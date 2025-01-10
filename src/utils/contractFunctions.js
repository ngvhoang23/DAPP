import { ethers } from 'ethers'
import contractABI from '../contractABI.json'

const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

// Kết nối tới contract
export const getContract = (signerOrProvider) => {
  return new ethers.Contract(contractAddress, contractABI, signerOrProvider)
}

// Lấy số dư của người dùng
export const getBalance = async (contract, address) => {
  if (!ethers.utils.isAddress(address)) {
    throw new Error('Địa chỉ không hợp lệ')
  }

  try {
    const balance = await contract.balanceOf(address)
    return ethers.utils.formatUnits(balance, 18) // Đảm bảo chuyển đổi số dư từ Wei sang Ether
  } catch (error) {
    console.error('Lỗi khi lấy số dư:', error)
    throw new Error(
      `Lỗi khi lấy số dư cho địa chỉ ${address}: ${error.message}`
    )
  }
}

// Stake token
export const stakeTokens = async (contract, amount) => {
  try {
    const tx = await contract.stake(ethers.utils.parseUnits(amount, 18))
    await tx.wait()
    console.log('Staking successful:', tx)
    return tx
  } catch (error) {
    console.error('Error staking tokens:', error)
    throw error
  }
}

// Unstake token
export const unstakeTokens = async (contract) => {
  try {
    const tx = await contract.unstake()
    await tx.wait()
    console.log('Unstaking successful:', tx)
    return tx
  } catch (error) {
    console.error('Error unstaking tokens:', error)
    throw error
  }
}

// Lấy phần thưởng từ staking (nếu có)
export const getRewardRate = async (contract) => {
  try {
    const rewardRate = await contract.rewardRate()
    return ethers.utils.formatUnits(rewardRate, 18)
  } catch (error) {
    console.error('Error fetching reward rate:', error)
    throw error
  }
}
