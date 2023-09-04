"use client"
import React, { useState, useEffect } from 'react';
import { Contract, ethers } from 'ethers';

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
  const [interval, setIntervalVar] = useState<any>();


  useEffect(() => {
    const init = async () => {
      const { Alert, Input, initTE } = await import("tw-elements");
      initTE({ Alert, Input });
    };
    init();
  }, []);


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

    setIntervalVar(checkPriceInterval)

    return () => clearInterval(interval);
    // return () => clearInterval(checkPriceInterval);
  };

  const updateStopped = async () => {
    const stopped = await auction?.stopped();

    if (stopped) {
      clearInterval(interval);
      // clearInterval(checkPriceInterval);
    }

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
      <div className='w-full h-screen flex items-center justify-center'>
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
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

      {currentPrice && (
        <div>
          <div className='text-center text-xl font-bold bg-black text-white p-6 mb-6'>Test Dutch Auction</div>
          <div className='w-full flex flex-col gap-6 px-6 m-28'>
            {balance && <h3 className="w-fit text-3xl font-medium leading-tight">Your balance: {ethers.utils.formatEther(balance)} ETH</h3>}
            <h3 className="w-fit text-3xl font-medium leading-tight">Current item price: {currentPrice} ETH</h3>
          </div>
          <div className='w-screen flex justify-center'>
            <button
              type="button"
              onClick={buy}
              data-te-ripple-init
              data-te-ripple-color="light"
              className="inline-block rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]">
                Buy!
            </button>
          </div>
        </div>
      )}

      {transactionError && (
        <div
          className="my-4 hidden w-full items-center rounded-lg bg-danger-100 px-6 py-5 text-base text-danger-700 data-[te-alert-show]:inline-flex"
          role="alert"
          data-te-alert-init
          data-te-alert-show>
            <strong className="mr-1">{_getRpcErrorMessage(transactionError)}</strong>
            <button
              type="button"
              className="ml-auto box-content rounded-none border-none p-1 text-danger-900 opacity-50 hover:text-danger-900hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-te-alert-dismiss
              aria-label="Close">
            <span
              onClick={_dismissTransactionError}
              className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6">
                <path
                  fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clip-rule="evenodd" />
              </svg>
            </span>
          </button>
        </div>
      )}
    </>
  );
}










