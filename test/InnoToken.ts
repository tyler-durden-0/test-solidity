import { expect } from "chai";
import { ethers } from "hardhat";
import tokenJSON from '../artifacts/contracts/ERC20.sol/INNOToken.json'

describe("INNOToken", function() {

    async function deployContract() {
        const [shopOwner, buyer] = await ethers.getSigners();
    
        const INNOShop = await ethers.getContractFactory("INNOShop", shopOwner);
        const shop = await INNOShop.deploy();

        const erc20 = new ethers.Contract(await shop.token(), tokenJSON.abi, shopOwner);

        return {shopOwner, buyer, shop, erc20};
      }

    it("should have owner and a token", async function() {
        const {shop, shopOwner} = await deployContract();
        expect(await shop.owner()).to.equal(shopOwner.address);

        expect(await shop.token()).to.be.properAddress;
    })

    it("allows to buy", async function() {
        const {shop, erc20, buyer} = await deployContract();

        const tokenAmount = 3;

        const shopAddress = await shop.getAddress();

        const txData = {
            value: tokenAmount, //3 wei
            to: shopAddress
        }

        console.log('txData', txData)

        const tx = await buyer.sendTransaction(txData);
        await tx.wait();

        expect(await erc20.balanceOf(buyer.address)).to.eq(tokenAmount); // ok

        await expect(tx).to.changeEtherBalance(shop, tokenAmount); // ok

        await expect(tx).to.emit(shop, "Bought").withArgs(tokenAmount, buyer.address); // ok
    })

    it("allows to sell", async function() {
        const {shop, erc20, buyer} = await deployContract();

        const shopAddress = await shop.getAddress();
        
        const tx = await buyer.sendTransaction({
            value: 3,
            to: shopAddress
        })

        await tx.wait();

        const sellAmount = 2;

        //разрешаем магазину списывать ко-во токенов на продажу
        const approval = await erc20.connect(buyer).approve(shopAddress, sellAmount);
        
        await approval.wait();

        const sellTx = await shop.connect(buyer).sell(sellAmount);

        expect(await erc20.balanceOf(buyer.address)).to.eq(1); // ok

        await expect(() => sellTx).to.changeEtherBalance(shop, -sellAmount) //ok

        await expect(sellTx).to.emit(shop, "Sold").withArgs(sellAmount, buyer.address); //ok
    })
})