import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import contractABI from '../contractABI.json'

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export const useContract = () => {
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [contract, setContract] = useState(null)

  const connectWallet = async () => {
    if (window.ethereum) {
      let _provider = new ethers.providers.JsonRpcProvider(
        'http://localhost:8545'
      )
      const _signer = _provider.getSigner()
      const acc = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      const _contract = new ethers.Contract(
        contractAddress,
        contractABI,
        _signer
      )

      _contract.walletAddress = acc[0]

      setProvider(_provider)
      setSigner(_signer)
      setContract(_contract)
    } else {
      console.log('Please install MetaMask!')
    }
  }

  return { connectWallet, contract, signer, provider }
}
