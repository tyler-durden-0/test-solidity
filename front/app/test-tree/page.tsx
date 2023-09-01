"use client"
import React, { useState, useEffect } from 'react';
import { Contract, ethers } from 'ethers';

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
        init()
    }, [])

    const init = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        // await provider.send("eth_requestAccounts", []);
        // const provider2 = new ethers.providers.JsonRpcProvider();

        // const signer2 = provider.getSigner()
        // console.log('signer2', signer2)

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
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <div>Test Merkel Tree</div>
                <label>
                    Transaction: 
                    <input         
                        type="text"
                        id="message"
                        name="message"
                        onChange={handleTransaction}
                        value={transaction}/>
                </label>
                <label>
                    index: 
                    <input         
                        type="number"
                        id="message"
                        name="message"
                        onChange={handleIndex}
                        value={index}/>
                </label>
                <button onClick={handleHashes}>Hashes</button>
                {outputHash ? `Output hash: ${outputHash}` : ''}
                <label>
                    rootHash: 
                    <input         
                        type="text"
                        id="message"
                        name="message"
                        onChange={handleRootHash}
                        value={rootHash}/>
                </label>
                <label>
                    proof1: 
                    <input         
                        type="text"
                        id="message"
                        name="message"
                        onChange={handleProof1}
                        value={proof1}/>
                </label>
                <label>
                    proof2: 
                    <input         
                        type="text"
                        id="message"
                        name="message"
                        onChange={handleProof2}
                        value={proof2}/>
                </label>
                <button onClick={handleClick}>Verify</button>
                {verify ? `Result: ${verify}` : verifyButtonClicked ? `Result: ${verify}` : ``}
            </div>

            ) : <div>loading</div>}
        </>
    )
}