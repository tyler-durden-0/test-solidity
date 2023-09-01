"use client"
import React, { useState, useEffect } from 'react';
import { Contract, ethers } from 'ethers';

import { ConnectWallet } from '../../components/ConnectWallet';
import { WaitingForTransactionMessage } from '../../components/WaitingForTransactionMessage';
import { TransactionErrorMessage } from '../../components/TransactionErrorMessage';

import auctionAddress from '../../contracts/DutchAuction-contract-address.json';
import auctionArtifact from '../../contracts/DutchAuction.json';

const HARDHAT_NETWORK_ID = '31337';
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function App() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [txBeingSent, setTxBeingSent] = useState(null);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const [transactionError, setTransactionError] = useState<string>('');
  const [balance, setBalance] = useState<string | null>(null);
  const [currentPrice, setCurrentPrice] = useState<string>('');
  const [stopped, setStopped] = useState(false);
  const [auction, setAuction] = useState<Contract | null>(null);

  useEffect(() => {
    _connectWallet();
  }, []);

  const _connectWallet = async () => {
    if (window.ethereum === undefined) {
      setNetworkError('Please install Metamask!');
      return;
    }

    const [selectedAddress] = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (!_checkNetwork()) {
      return;
    }

    _initialize(selectedAddress);

    window.ethereum.on('accountsChanged', ([newAddress]: any[]) => {
      if (newAddress === undefined) {
        return _resetState();
      }

      _initialize(newAddress);
    });

    window.ethereum.on('chainChanged', ([networkId]: any[]) => {
      _resetState();
    });
  };

  const _initialize = async (selectedAddress: any) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const auction = new ethers.Contract(
      auctionAddress.DutchAuction,
      auctionArtifact.abi,
      provider.getSigner(0)
    );
    setAuction(prev => prev = auction);

    setSelectedAccount(selectedAddress);

    await updateBalance(provider, selectedAddress);

    if (await updateStopped()) {
      return;
    }

    const startingPrice = await auction.startingPrice();
    const startAt = await auction.startAt();
    const discountRate = await auction.discountRate();

    const checkPriceInterval = setInterval(() => {
      const elapsed = ethers.BigNumber.from(Math.floor(Date.now() / 1000)).sub(startAt);
      const discount = discountRate.mul(elapsed);
      const newPrice = startingPrice.sub(discount);
      setCurrentPrice(ethers.utils.formatEther(newPrice));
    }, 1000);

    return () => clearInterval(checkPriceInterval);
  };

  const updateStopped = async () => {
    const stopped = await auction?.stopped();

    // if (stopped) {
    //   clearInterval(checkPriceInterval);
    // }

    setStopped(stopped);

    return stopped;
  };

  const updateBalance = async (provider: ethers.providers.Web3Provider, selectedAddress: string) => {
    const newBalance = (await provider.getBalance(selectedAddress)).toString();

    setBalance(newBalance);
  };

  const _resetState = () => {
    setSelectedAccount(null);
    setTxBeingSent(null);
    setNetworkError(null);
    setTransactionError('');
    setBalance(null);
    setCurrentPrice('');
    setStopped(false);
  };

  const _checkNetwork = () => {
    if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
      return true;
    }

    setNetworkError('Please connect to localhost:8545');

    return false;
  };

  const _dismissNetworkError = () => {
    setNetworkError(null);
  };

  const _dismissTransactionError = () => {
    setTransactionError('');
  };

  const buy = async () => {
    try {
      const tx = await auction?.buy({
        value: ethers.utils.parseEther(currentPrice),
      });

      setTxBeingSent(tx.hash);

      await tx.wait();
    } catch (error: any) {
      if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
        return;
      }

      console.error(error);

      setTransactionError(error);
    } finally {
      setTxBeingSent(null);
      // await updateBalance();
      await updateStopped();
    }
  };

  const _getRpcErrorMessage = (error: any) => {
    if (error.data) {
      return error.data.message;
    }

    return error.message;
  };

  if (!selectedAccount) {
    return (
      <ConnectWallet
        connectWallet={_connectWallet}
        networkError={networkError}
        dismiss={_dismissNetworkError}
      />
    );
  }

  if (stopped) {
    return (
      <>
        <p>Auction stopped.</p>
      </>
      );

  }

  return (
    <>
      {txBeingSent && <WaitingForTransactionMessage txHash={txBeingSent} />}

      {transactionError && (
        <TransactionErrorMessage
          message={_getRpcErrorMessage(transactionError)}
          dismiss={_dismissTransactionError}
        />
      )}

      {balance && <p>Your balance: {ethers.utils.formatEther(balance)} ETH</p>}

      {currentPrice && (
        <div>
          <p>Current item price: {currentPrice} ETH</p>
          <button onClick={buy}>Buy!</button>
        </div>
      )}
    </>
  );
}


















// "use client"
// import React, { useState, useEffect } from 'react'
// import { ethers } from "ethers";

// import { ConnectWallet } from '../../components/ConnectWallet';

// import auctionAddress from '../../contracts/DutchAuction-contract-address.json';
// import auctionArtifact from '../../contracts/DutchAuction.json';

// export {};

// declare global {
//   interface Window {
//     ethereum: any;
//   }
// }

// const HARDHAT_NETWORK_ID = '31337'
// const ERROR_CODE_TX_REJECTED_BY_USER = 4001

// export default function TestWallet() {
//   const [selectedAccount, setSelectedAccount] = useState(null)
//   const [txBeingSent, setTxBeingSent] = useState(null)
//   const [networkError, setNetworkError] = useState<string | null>(null)
//   const [transactionError, setTransactionError] = useState(null)
//   const [balance, setBalance] = useState<string | null>(null)

//   useEffect(() => {
//     _connectWallet()
//   }, [])

//   const _connectWallet = async () => {
//     if (window.ethereum === undefined) {
//       setNetworkError('Please install Metamask!')
//       return
//     }

//     const [selectedAddress] = await window.ethereum.request({
//       method: 'eth_requestAccounts'
//     })

//     console.log('selectedAddress', selectedAddress);

//     if (!_checkNetwork()) {
//       return
//     }

//     _initialize(selectedAddress)

//     window.ethereum.on('accountsChanged', ([newAddress]: any[]) => {
//       console.log('accountsChanged');
//       console.log('newAddress', newAddress);
//       if (newAddress === undefined) {
//         return _resetState()
//       }

//       _initialize(newAddress)
//     })

//     window.ethereum.on('chainChanged', ([networkId]: any[]) => {
//       console.log('chainChanged');
//       console.log('networkId',networkId);
//       _resetState()
//     })
//   }

//   const _initialize = async (selectedAddress: any) => {
//     console.log('window.ethereum', window.ethereum);
//     const provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum)
//     // const provider = new ethers.BrowserProvider(window.ethereum);

//     const auction = new ethers.Contract(
//       auctionAddress.DutchAuction,
//       auctionArtifact.abi,
//       provider.getSigner(0)
//     )

//     console.log('auction', auction);

//     setSelectedAccount(selectedAddress)

//     await updateBalance(provider, selectedAddress)
//   }

//   const updateBalance = async (provider: ethers.providers.Web3Provider, selectedAddress: any) => {
//     const newBalance = (await provider.getBalance(selectedAddress)).toString()

//     setBalance(newBalance)
//   }

//   const _resetState = () => {
//     setSelectedAccount(null)
//     setTxBeingSent(null)
//     setNetworkError(null)
//     setTransactionError(null)
//     setBalance(null)
//   }

//   const _checkNetwork = () => {
//     if (window.ethereum.networkVersion === HARDHAT_NETWORK_ID) {
//       return true
//     }

//     console.log('window.ethereum.networkVersion', window.ethereum.networkVersion)

//     setNetworkError('Please connect to localhost:8545')

//     return false
//   }

//   const _dismissNetworkError = () => {
//     setNetworkError(null)
//   }

//   if (!selectedAccount) {
//     return (
//       <ConnectWallet
//         connectWallet={_connectWallet}
//         networkError={networkError}
//         dismiss={_dismissNetworkError}
//       />
//     )
//   }

//   return (
//     <>
//       {balance && (
//         <p>Your balance: {ethers.utils.formatEther(balance)} ETH</p>
//       )}
//     </>
//   )
// }