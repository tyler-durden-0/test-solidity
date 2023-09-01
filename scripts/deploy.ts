import { ethers, network, artifacts } from 'hardhat';
import path from 'path';
import fs from 'fs';

async function main() {
  if (network.name === "hardhat") {
    console.warn(
      "You are trying to deploy a contract to the Hardhat Network, which" +
        "gets automatically created and destroyed every time. Use the Hardhat" +
        " option '--network localhost'"
    );
  }

  const [deployer] = await ethers.getSigners()

  console.log("Deploying with", await deployer.getAddress())

  const DutchAuction = await ethers.getContractFactory("DutchAuction", deployer)
  const auction = await DutchAuction.deploy(
    ethers.parseEther('2.0'),
    1,
    "Motorbike"
  )
  // await auction.deployed()

  saveFrontendFiles({
    DutchAuction: auction
  })

  const Tree = await ethers.getContractFactory("Tree", deployer);
  const tree =await Tree.deploy();

  saveFrontendFiles({
    Tree: tree
  })
}

function saveFrontendFiles(contracts: any) {
  const contractsDir = path.join(__dirname, '/..', 'front/contracts')

  if(!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir)
  }

  Object.entries(contracts).forEach((contract_item) => {
    const [name, contract] = contract_item
    console.log('contract', contract);
    if(contract) {
      fs.writeFileSync(
        path.join(contractsDir, '/', name + '-contract-address.json'),
        // JSON.stringify({[name]: contract.address}, undefined, 2)
        JSON.stringify({[name]: contract.target}, undefined, 2)
      )
    }

    const ContractArtifact = artifacts.readArtifactSync(name)

    fs.writeFileSync(
      path.join(contractsDir, '/', name + ".json"),
      JSON.stringify(ContractArtifact, null, 2)
    )
  })
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
// import { ethers } from "hardhat";

// async function main() {
//   const currentTimestampInSeconds = Math.round(Date.now() / 1000);
//   const unlockTime = currentTimestampInSeconds + 60;

//   const lockedAmount = ethers.parseEther("0.001");

//   const lock = await ethers.deployContract("Lock", [unlockTime], {
//     value: lockedAmount,
//   });

//   await lock.waitForDeployment();

//   console.log(
//     `Lock with ${ethers.formatEther(
//       lockedAmount
//     )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
//   );
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
