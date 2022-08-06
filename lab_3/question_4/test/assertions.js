const truffleAssert = require('truffle-assertions');
const XYZCoin = artifacts.require("XYZCoin");

 contract ("XYZCoin", async accounts => {   
    // An insufficient balance throws an error when trying to transfer tokens
    it("should throw an error when trying to transfer tokens with insufficient balance", async () => {
        let xyzCoinInstance = await XYZCoin.deployed();
        await truffleAssert.reverts(xyzCoinInstance.transfer(accounts[1], 1001), "Insufficient balance");
    });

    // transferring from an account that has not explicitly authorized the transfer should revert the transaction
    it("should throw an error when trying to transfer tokens on behalf of an unauthorized account", async () => {
        let xyzCoinInstance = await XYZCoin.deployed();
        await truffleAssert.reverts(xyzCoinInstance.transferFrom(accounts[0], accounts[1], 100, {from: accounts[1]}), "Sender is not authorized");
    });

    // the transfer() and transferFrom() functions must fire the Transfer event (even for 0 value transfers)
    it("should fire the Transfer event when transferring tokens", async () => {
        let xyzCoinInstance = await XYZCoin.deployed();
        let result = await xyzCoinInstance.transfer(accounts[1], 100, {from: accounts[0]});
        truffleAssert.eventEmitted(result, "Transfer", (ev) => {
            return ev.from == accounts[0] && ev.to == accounts[1] && ev.value == 100;
        });
    });

    // the approve() function must fire the Approval event
    it("should fire the Approval event when approving tokens", async () => {
        let xyzCoinInstance = await XYZCoin.deployed();
        let result = await xyzCoinInstance.approve(accounts[1], 100, {from: accounts[0]});
        truffleAssert.eventEmitted(result, "Approval", (ev) => {
            return ev.owner == accounts[0] && ev.spender == accounts[1] && ev.value == 100;
        } );
    });
});