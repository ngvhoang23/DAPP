import { ethers } from 'ethers'
import contractABI from './contractABI.json'

const contractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

let provider
let contract

// RPC URL của Hardhat node hoặc các mạng lưới khác (như Rinkeby, Goerli)

export const connect = async () => {
  if (window.ethereum) {
    provider = new ethers.providers.JsonRpcProvider('http://localhost:8545')
    await window.ethereum.request({ method: 'eth_requestAccounts' })
    contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider.getSigner()
    )
  } else {
    alert('Please install MetaMask!')
  }
}

export const getBalance = async (address) => {
  try {
    const balance = await contract.balanceOf(address)
    return ethers.utils.formatUnits(balance, 18) // chuyển đổi sang đơn vị token
  } catch (error) {
    console.error('Error getting balance', error)
  }
}

export const stake = async (amount, lockTime) => {
  try {
    const tx = await contract.stake(ethers.utils.parseUnits(amount, 18))
    await tx.wait()
    console.log('Staked successfully')
  } catch (error) {
    console.error('Error staking', error)
  }
}

// Thêm các hàm khác như unstake, withdrawReward, v.v.
