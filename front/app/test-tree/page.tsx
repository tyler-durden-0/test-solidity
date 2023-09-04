"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { Contract, ethers } from 'ethers';
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../../utils/initFarebase';

import treeAddress from '../../contracts/Tree-contract-address.json';
import treeArtifact from '../../contracts/Tree.json';

const HARDHAT_NETWORK_ID = '31337';
const ERROR_CODE_TX_REJECTED_BY_USER = 4001;

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function TestTree() {
    const router = useRouter();
    const [transaction, setTransaction] = useState('')
    const [index, setIndex] = useState(0)
    const [rootHash, setRootHash] = useState('')
    const [proof1, setProof1] = useState('')
    const [proof2, setProof2] = useState('')
    const [contractTree, setContractTree] = useState<Contract | null>(null);
    const [outputHash, setOutputHash] = useState('')
    const [verify, setVerify] = useState(false)
    const [verifyButtonClicked, setVrifyButtonClicked] = useState(false);

    useEffect(() => {
        const init = async () => {
          const { Alert, Input, initTE } = await import("tw-elements");
          initTE({ Alert, Input });
        };
        init();
      }, []);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              console.log('user in onAuthStateChanged', user);
              const uid = user.uid;
              // ...
            } else {
                console.log('we dont have current user')
                router.push('/auth')
              // User is signed out
              // ...
            }
          });
        init()
    }, [])

    const init = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const [selectedAddress] = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });

        console.log('selectedAddress', selectedAddress)

        const signer = provider.getSigner()
        console.log('signer', signer);
        console.log('provider.getSigner(0)', provider.getSigner(0));


        const tree = new ethers.Contract(
            treeAddress.Tree,
            treeArtifact.abi,
            provider.getSigner(0)
        );

        console.log('tree', tree)
        setContractTree(prev => prev = tree);

    }

    const handleTransaction = (event: any) => {
        setTransaction(prev => prev = event.target.value)
    }

    const handleIndex = (event: any) => {
        setIndex(prev => prev = event.target.value)
    }

    const handleRootHash = (event: any) => {
        setRootHash(prev => prev = event.target.value)
    }

    const handleProof1 = (event: any) => {
        setProof1(prev => prev = event.target.value)
    }

    const handleProof2 = (event: any) => {
        setProof2(prev => prev = event.target.value)
    }

    const handleClick = async () => {
        if (!verifyButtonClicked) {
            setVrifyButtonClicked(prev => prev = true)
        }
        if (index === 0 || index && transaction && rootHash && proof1 && proof2) {
            const res = await contractTree?.verify(transaction, index, rootHash, [proof1, proof2])
            console.log('res', res)
            setVerify(prev => prev = res)
        }
    }

    const handleHashes = async() => {
        const hash = await contractTree?.hashes(index);
        setOutputHash(prev => prev = hash)
    }

    return(
        <>  {contractTree ? (
            <div className='flex flex-col gap-5 px-4 py-4'>
                <div className='text-center text-xl font-bold bg-black text-white p-6 mb-6'>Test Merkel Tree</div>
                <div className="relative mb-3" data-te-input-wrapper-init>
                    <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInputText"
                        placeholder="Example label"
                        onChange={handleTransaction}
                        value={transaction}
                        />
                    <label
                        htmlFor="exampleFormControlInputText"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Transaction
                    </label>
                </div>
                <div className="relative mb-3" data-te-input-wrapper-init>
                    <input
                        type="number"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInputNumber"
                        placeholder="Example label"
                        onChange={handleIndex}
                        value={index}
                        />
                    <label
                        htmlFor="exampleFormControlInputNumber"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Index
                    </label>
                </div>
                <button
                    type="button"
                    className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    onClick={handleHashes}
                    >
                        Hashes
                </button>
                {outputHash ? `Output hash: ${outputHash}` : ''}
                <div className="relative mb-3" data-te-input-wrapper-init>
                    <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInputText"
                        placeholder="Example label"
                        onChange={handleRootHash}
                        value={rootHash}
                        />
                    <label
                        htmlFor="exampleFormControlInputText"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Root Hash
                    </label>
                </div>
                <div className="relative mb-3" data-te-input-wrapper-init>
                    <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInputText"
                        placeholder="Example label"
                        onChange={handleProof1}
                        value={proof1}
                        />
                    <label
                        htmlFor="exampleFormControlInputText"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Proof 1
                    </label>
                </div>
                <div className="relative mb-3" data-te-input-wrapper-init>
                    <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInputText"
                        placeholder="Example label"
                        onChange={handleProof2}
                        value={proof2}
                        />
                    <label
                        htmlFor="exampleFormControlInputText"
                        className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                        >Proof 2
                    </label>
                </div>
                <button
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    onClick={handleClick}
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
                        Verify
                </button>
                {verify ? 
                    <div
                        className="mb-4 rounded-lg bg-primary-100 px-6 py-5 text-base text-primary-600"
                        role="alert">
                            Result: {verify}
                    </div>
                 : verifyButtonClicked ? 
                    <div
                        className="mb-4 rounded-lg bg-primary-100 px-6 py-5 text-base text-primary-600"
                        role="alert">
                            Result: {verify}
                    </div>
                 : ``}
            </div>

            ) : <div>loading</div>}
        </>
    )
}