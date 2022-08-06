// Truffle supports the JavaScript test framework Mocha.

const XYZCoin = artifacts.require("XYZCoin");

contract ("XYZCoin", async accounts => {
    // the initial token balance of the creator account is equal to the total token supply
    it("should set the initial token balance of the creator account correctly", async () => {
        let xyzCoinInstance = await XYZCoin.deployed();
        let balance = await xyzCoinInstance.balanceOf(accounts[0]);
        assert.equal(balance.toNumber(), 1000);
    });

    // tokens can be transferred using the transfer() function
    it("should transfer tokens correctly", async () => {
        let xyzCoinInstance = await XYZCoin.deployed();
        let initialBalance = await xyzCoinInstance.balanceOf(accounts[0]);
        assert.equal(initialBalance.toNumber(), 1000);
        await xyzCoinInstance.transfer(accounts[1], 100);
        let finalBalance = await xyzCoinInstance.balanceOf(accounts[0]);
        assert.equal(finalBalance.toNumber(), 900);
        let newBalance = await xyzCoinInstance.balanceOf(accounts[1]);
        assert.equal(newBalance.toNumber(), 100);
    });

    // the allowance can be set and read
    it("should set the allowance correctly", async () => {
        let xyzCoinInstance = await XYZCoin.deployed();
        await xyzCoinInstance.approve(accounts[1], 100);
        let allowance = await xyzCoinInstance.allowance(accounts[0], accounts[1]);
        assert.equal(allowance.toNumber(), 100);
    });

    // account can transfer tokens on behalf of other accounts
    it("should transfer tokens on behalf of other accounts correctly", async () => {
        let xyzCoinInstance = await XYZCoin.deployed();
        let initialBalance = await xyzCoinInstance.balanceOf(accounts[0]);
        assert.equal(initialBalance.toNumber(), 900);
        await xyzCoinInstance.transferFrom(accounts[0], accounts[1], 100, {from: accounts[1]});
        let finalBalance = await xyzCoinInstance.balanceOf(accounts[0]);
        assert.equal(finalBalance.toNumber(), 800);
        let newBalance = await xyzCoinInstance.balanceOf(accounts[1]);
        assert.equal(newBalance.toNumber(), 200);
    });
});
